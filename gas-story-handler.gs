// ============================================================
// Code.gs — 완성본 (기존 코드 + GLM-5 소설 생성)
// Google Apps Script 에디터에서 Code.gs 전체를 이 코드로 교체하세요.
// ============================================================

// GLM-5 API 설정
var GLM_API_KEY = '8d184c97c16b4c8c99d4c37592be2b94.g1PqXfir72KvgYiY';
var GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
var GLM_MODEL   = 'glm-5';

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var action = e.parameter.action || 'feedback';

  // ===== 투표 =====
  if (action === 'vote') {
    var sheet = ss.getSheetByName('Rankings');
    if (!sheet) {
      sheet = ss.insertSheet('Rankings');
      sheet.appendRow(['winner', 'ai', 'lang', 'wins']);
    }
    var winner = e.parameter.winner;
    var ai = e.parameter.ai;
    var lang = e.parameter.lang || 'ko';
    var data = sheet.getDataRange().getValues();
    var found = false;
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === winner && data[i][2] === lang) {
        sheet.getRange(i + 1, 4).setValue(data[i][3] + 1);
        found = true;
        break;
      }
    }
    if (!found) {
      sheet.appendRow([winner, ai, lang, 1]);
    }
    return ContentService.createTextOutput('ok');

  // ===== 랭킹 =====
  } else if (action === 'getRankings') {
    var sheet = ss.getSheetByName('Rankings');
    var filterLang = e.parameter.lang;
    var result = [];
    if (sheet && sheet.getLastRow() > 1) {
      var data = sheet.getDataRange().getValues();
      var totals = {};
      for (var i = 1; i < data.length; i++) {
        if (filterLang && data[i][2] !== filterLang) continue;
        var key = data[i][0];
        if (!totals[key]) {
          totals[key] = { winner: data[i][0], ai: data[i][1], wins: 0 };
        }
        totals[key].wins += data[i][3];
      }
      for (var k in totals) {
        result.push(totals[k]);
      }
    }
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  // ===== 소설 생성 (GLM-5) =====
  } else if (action === 'generateStory') {
    return handleGenerateStory(e);

  // ===== 피드백 (기본) =====
  } else {
    var sheet = ss.getSheetByName('Feedback') || ss.getSheets()[0];
    sheet.appendRow([
      e.parameter.winner,
      e.parameter.ai,
      e.parameter.feedback,
      e.parameter.timestamp,
      e.parameter.lang
    ]);
    return ContentService.createTextOutput('ok');
  }
}

// ============================================================
// 소설 생성 핸들러
// ============================================================
function handleGenerateStory(e) {
  var p = e.parameter;
  var winnerModelName = p.winnerModelName || 'Unknown';
  var language        = p.language || 'en';
  var genre           = p.genre || 'modern-fantasy';
  var humor           = parseInt(p.humor) || 50;
  var catharsis       = parseInt(p.catharsis) || 50;
  var coherence       = parseInt(p.coherence) || 50;

  var userNote = p.userNote || '';
  var tournamentType = p.tournamentType || 'female-ai-animation';
  var gender = tournamentType.indexOf('female') >= 0 ? 'female' : 'male';
  var prompt = buildStoryPrompt(winnerModelName, language, genre, humor, catharsis, coherence, userNote, gender);

  try {
    var result = callGLM(prompt, language);
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
// 프롬프트 빌드
// ============================================================
function buildStoryPrompt(winnerModelName, language, genre, humor, catharsis, coherence, userNote, gender) {
  var langInstruction = {
    'ko': '한국어로 작성하세요.',
    'en': 'Write in English.',
    'ja': '日本語で書いてください。',
    'zh': '请用中文写作。'
  };

  var genreMap = {
    'modern-fantasy': 'Modern Fantasy (현대 판타지)',
    'romance': 'Romance (로맨스)',
    'mystery': 'Mystery (미스터리)',
    'sf': 'Science Fiction (SF)',
    'healing': 'Healing / Slice of Life (힐링)'
  };

  var humorDesc = '';
  if (humor < 30) humorDesc = 'Keep the tone lighthearted, playful, and witty. Add subtle humor and fun situations.';
  else if (humor > 70) humorDesc = 'Maintain a serious, dramatic tone. Focus on tension and emotional weight.';
  else humorDesc = 'Balance humor and seriousness. Light moments are okay but keep dramatic tension.';

  var catharsisDesc = '';
  if (catharsis < 30) catharsisDesc = 'Keep the pacing gentle and calm. Let emotions build slowly without sudden twists.';
  else if (catharsis > 70) catharsisDesc = 'Include a punchy, cathartic moment — a decisive action, satisfying reversal, or a bold confrontation that feels refreshing.';
  else catharsisDesc = 'Include moderate build-up with a mildly satisfying moment. Not too explosive, not too flat.';

  var coherenceDesc = '';
  if (coherence < 30) coherenceDesc = 'Embrace surreal, imaginative elements. Logic can be loose — prioritize wonder and surprise.';
  else if (coherence > 70) coherenceDesc = 'Ensure all plot elements are logical and plausible. Clear cause-and-effect, grounded world-building, no unexplained jumps.';
  else coherenceDesc = 'Keep the story mostly grounded but allow some creative liberties. Balance realism with imagination.';

  var genderDesc = gender === 'female' ? '주인공은 반드시 여성이다. 여성 이름을 사용하고, "그녀"로 지칭해.' : '주인공은 반드시 남성이다. 남성 이름을 사용하고, "그"로 지칭해.';

  var systemPrompt = '짧은 웹소설 작가. 실존 인물/IP 캐릭터 사용 금지.\n' +
    '"' + winnerModelName + '"에서 영감받은 독창적 주인공을 만들어.\n' +
    genderDesc + '\n' +
    '장르: ' + (genreMap[genre] || genre) + '\n' +
    '톤: ' + humorDesc + ' ' + catharsisDesc + ' ' + coherenceDesc + '\n' +
    (userNote ? '추가 요청: ' + userNote + '\n' : '') +
    (langInstruction[language] || langInstruction['en']) + '\n\n' +
    '아래 형식을 반드시 지켜서 출력해. 총 800자 이내로 짧게 써.\n\n' +
    '제목\n\n' +
    '【주인공 & 세계관】\n' +
    '주인공 이름, 성격, 직업, 세계관을 2~3문장으로 소개. (100~150자)\n\n' +
    '【프롤로그】\n' +
    '짧은 프롤로그. 흥미로운 도입 → 클리프행어로 끝. (400~600자)\n' +
    '절대 문장 중간에 끊지 말 것.';

  return systemPrompt;
}

// ============================================================
// GLM-5 API 호출
// ============================================================
function callGLM(systemPrompt, language) {
  var payload = {
    model: GLM_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: '작성해줘.' }
    ],
    temperature: 0.8,
    max_tokens: 1200
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + GLM_API_KEY
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(GLM_API_URL, options);
  var code = response.getResponseCode();
  var body = response.getContentText();

  if (code !== 200) {
    throw new Error('GLM API error: ' + code + ' - ' + body);
  }

  var json = JSON.parse(body);
  var content = json.choices[0].message.content;

  // title = 첫 줄, storyText = 나머지
  var lines = content.split('\n');
  var title = lines[0].trim();
  var storyText = lines.slice(1).join('\n').trim();
  storyText = storyText.replace(/^\n+/, '');

  return {
    title: title,
    storyText: storyText
  };
}
