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
  var prompt = buildStoryPrompt(winnerModelName, language, genre, humor, catharsis, coherence, userNote);

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
function buildStoryPrompt(winnerModelName, language, genre, humor, catharsis, coherence, userNote) {
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

  var systemPrompt = [
    'You are a creative fiction writer specializing in short-form web novels.',
    'You must NEVER use real celebrity names, real IP characters, or copyrighted characters.',
    'The protagonist is a character inspired by the AI model named "' + winnerModelName + '". Turn this into an original fictional character:',
    '- Give them a unique name fitting the genre.',
    '- Their personality should reflect the aesthetic and vibe of the AI model (creative, mysterious, bold, gentle, etc.).',
    '',
    'CRITICAL LENGTH RULES:',
    '- The TOTAL output (title + intro + prologue) must NEVER exceed 2000 characters. This is a hard limit.',
    '- Structure:',
    '  1) Title (one line)',
    '  2) 【주인공 & 세계관】 section: 200-300 characters. Introduce protagonist name, personality, role/job, and the world setting in 3-5 sentences.',
    '  3) 【프롤로그】 section: 600-900 characters. The actual story prologue.',
    '- Do NOT write Episode 1 or beyond.',
    '- Start the prologue with an engaging hook.',
    '- End with a cliffhanger that makes readers want Episode 1.',
    '- Make sure the story reaches a natural pause point. NEVER cut off mid-sentence.',
    '',
    'TONE INSTRUCTIONS:',
    '- ' + humorDesc,
    '- ' + catharsisDesc,
    '- ' + coherenceDesc,
    '',
    'GENRE: ' + (genreMap[genre] || genre),
    '',
    langInstruction[language] || langInstruction['en'],
    '',
    userNote ? 'ADDITIONAL USER REQUEST:\n' + userNote + '\n' : '',
    'OUTPUT FORMAT (follow this exactly):',
    'Line 1: the story title (just the title text, no label/prefix).',
    'Blank line.',
    '【주인공 & 세계관】',
    '(Character and world introduction paragraph here)',
    'Blank line.',
    '【프롤로그】',
    '(Prologue text here)',
    '',
    'IMPORTANT: Use the section headers 【주인공 & 세계관】 and 【프롤로그】 exactly as shown regardless of language.'
  ].join('\n');

  return systemPrompt;
}

// ============================================================
// GLM-5 API 호출
// ============================================================
function callGLM(systemPrompt, language) {
  var userMsg = 'Please write the prologue now.';
  if (language === 'ko') userMsg = '프롤로그를 작성해 주세요.';
  else if (language === 'ja') userMsg = 'プロローグを書いてください。';
  else if (language === 'zh') userMsg = '请写序章。';

  var payload = {
    model: GLM_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMsg }
    ],
    temperature: 0.85,
    max_tokens: 4000
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
