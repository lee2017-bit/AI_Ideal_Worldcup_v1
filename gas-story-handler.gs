// ============================================================
// Code.gs — 완성본 (GLM-5 + OpenAI GPT 소설 생성)
// Google Apps Script 에디터에서 Code.gs 전체를 이 코드로 교체하세요.
// ============================================================

// GLM-5 API 설정
var GLM_API_KEY = '8d184c97c16b4c8c99d4c37592be2b94.g1PqXfir72KvgYiY';
var GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
var GLM_MODEL   = 'glm-5';

// OpenAI API 설정
var OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE'; // Apps Script에서 직접 입력하세요
var OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var action = e.parameter.action || 'feedback';

  // ===== 투표 =====
  if (action === 'vote') {
    var sheet = ss.getSheetByName('Rankings');
    if (!sheet) {
      sheet = ss.insertSheet('Rankings');
      sheet.appendRow(['winner', 'ai', 'lang', 'wins', 'category']);
    }
    var winner = e.parameter.winner;
    var ai = e.parameter.ai;
    var lang = e.parameter.lang || 'ko';
    var category = e.parameter.category || 'female-ai-animation';
    var data = sheet.getDataRange().getValues();
    var found = false;
    // category 컬럼(index 4)이 없는 기존 데이터 호환
    for (var i = 1; i < data.length; i++) {
      var rowCategory = data[i][4] || 'female-ai-animation';
      if (data[i][0] === winner && data[i][2] === lang && rowCategory === category) {
        sheet.getRange(i + 1, 4).setValue(data[i][3] + 1);
        found = true;
        break;
      }
    }
    if (!found) {
      sheet.appendRow([winner, ai, lang, 1, category]);
    }
    return ContentService.createTextOutput('ok');

  // ===== 랭킹 =====
  } else if (action === 'getRankings') {
    var sheet = ss.getSheetByName('Rankings');
    var filterLang = e.parameter.lang;
    var filterCategory = e.parameter.category || '';
    var result = [];
    if (sheet && sheet.getLastRow() > 1) {
      var data = sheet.getDataRange().getValues();
      var totals = {};
      for (var i = 1; i < data.length; i++) {
        if (filterLang && data[i][2] !== filterLang) continue;
        // category 필터링 (기존 데이터는 빈값 → female-ai-animation 취급)
        if (filterCategory) {
          var rowCategory = data[i][4] || 'female-ai-animation';
          if (rowCategory !== filterCategory) continue;
        }
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

  // ===== 댓글 관련 (별도 함수로 분리 — var 충돌 방지) =====
  } else if (action === 'getComments') {
    return gasGetComments(e);
  } else if (action === 'addComment') {
    return gasAddComment(e);
  } else if (action === 'deleteComment') {
    return gasDeleteComment(e);
  } else if (action === 'updateComment') {
    return gasUpdateComment(e);

  // ===== 소설 생성 =====
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
      e.parameter.lang,
      e.parameter.category || 'female-ai-animation'
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
  var aiModel         = p.aiModel || 'gpt-5.1';

  var userNote = p.userNote || '';
  var tournamentType = p.tournamentType || 'female-ai-animation';
  var characterType = 'female';
  if (tournamentType === 'dog-ai') characterType = 'dog';
  else if (tournamentType.indexOf('female') < 0) characterType = 'male';
  var prompt = buildStoryPrompt(winnerModelName, language, genre, humor, catharsis, coherence, userNote, characterType);

  try {
    // 최대 2회 시도 (빈 응답 시 재시도)
    var result;
    for (var attempt = 0; attempt < 2; attempt++) {
      try {
        if (aiModel === 'glm-5') {
          result = callGLM(prompt, language);
        } else {
          result = callOpenAI(prompt, language, aiModel);
        }
        break; // 성공하면 루프 탈출
      } catch (retryErr) {
        if (attempt === 1) throw retryErr; // 2번째도 실패하면 에러
        Utilities.sleep(1000); // 1초 대기 후 재시도
      }
    }
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
function buildStoryPrompt(winnerModelName, language, genre, humor, catharsis, coherence, userNote, characterType) {
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

  var characterDesc = '';
  if (characterType === 'dog') {
    characterDesc = '주인공은 반드시 강아지(개)다. 강아지 이름을 지어주고, 강아지의 시점이나 강아지가 핵심 역할을 하는 이야기를 써. 강아지의 감정, 행동, 모험을 생생하게 묘사해.';
  } else if (characterType === 'female') {
    characterDesc = '주인공은 반드시 여성이다. 여성 이름을 사용하고, "그녀"로 지칭해.';
  } else {
    characterDesc = '주인공은 반드시 남성이다. 남성 이름을 사용하고, "그"로 지칭해.';
  }

  var systemPrompt = '짧은 웹소설 작가. 실존 인물/IP 캐릭터 사용 금지.\n' +
    '"' + winnerModelName + '"에서 영감받은 독창적 주인공을 만들어.\n' +
    characterDesc + '\n' +
    '장르: ' + (genreMap[genre] || genre) + '\n' +
    '톤: ' + humorDesc + ' ' + catharsisDesc + ' ' + coherenceDesc + '\n' +
    (userNote ? '추가 요청: ' + userNote + '\n' : '') +
    (langInstruction[language] || langInstruction['en']) + '\n\n' +
    '아래 형식을 반드시 지켜서 출력해. 총 800자 이내로 짧게 써.\n\n' +
    '제목\n\n' +
    '【주인공 & 세계관】\n' +
    '웹소설 소개글처럼 강렬하고 재밌게 써! 딱딱한 설명 금지.\n' +
    '핵심 설정 + 반전/갭 + 한줄 요약을 2~3문장에 담아.\n' +
    '예시: "S급 헌터였던 주인공이 건망증으로 리트리버 강아지로 회귀! 으르렁거리면 태풍이 일고 꼬리를 치면 지진이 나지만 세상은 그를 댕댕이라 부르며 쓰다듬기만 한다. 벽 뚫고 악당 때려잡는데 목줄 끌려가는 유쾌한 생존기."\n' +
    '이런 느낌으로 (100~150자)\n\n' +
    '【프롤로그】\n' +
    '짧은 프롤로그. 흥미로운 도입 → 클리프행어로 끝. (400~600자)\n' +
    '절대 문장 중간에 끊지 말 것.';

  return systemPrompt;
}

// ============================================================
// OpenAI API 호출
// ============================================================
function callOpenAI(systemPrompt, language, model) {
  var payload = {
    model: model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: '작성해줘.' }
    ],
    temperature: 0.8,
    max_completion_tokens: 1200
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + OPENAI_API_KEY
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(OPENAI_API_URL, options);
  var code = response.getResponseCode();
  var body = response.getContentText();

  if (code !== 200) {
    throw new Error('OpenAI API error: ' + code + ' - ' + body);
  }

  var json = JSON.parse(body);

  if (!json.choices || json.choices.length === 0 || !json.choices[0].message) {
    throw new Error('OpenAI invalid structure: ' + body.substring(0, 200));
  }

  var content = json.choices[0].message.content;

  if (!content || content.trim().length === 0) {
    var finishReason = json.choices[0].finish_reason || 'unknown';
    throw new Error('OpenAI empty (finish: ' + finishReason + ')');
  }

  return parseStoryContent(content);
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

  if (!json.choices || json.choices.length === 0 || !json.choices[0].message) {
    throw new Error('GLM invalid structure: ' + body.substring(0, 200));
  }

  var content = json.choices[0].message.content;

  // 빈 응답 체크
  if (!content || content.trim().length === 0) {
    var finishReason = json.choices[0].finish_reason || 'unknown';
    throw new Error('GLM empty (finish: ' + finishReason + ')');
  }

  return parseStoryContent(content);
}

// ============================================================
// 소설 응답 파싱 (공통)
// ============================================================
function parseStoryContent(content) {
  // 마크다운 기호 정리
  content = content.replace(/\*\*/g, '').replace(/^#+\s*/gm, '');

  // title = 첫 줄 (빈 줄 스킵), storyText = 나머지
  var lines = content.split('\n');
  var title = '';
  var storyStartIdx = 0;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.length > 0) {
      title = line.replace(/^제목[:\s]*/i, '');
      storyStartIdx = i + 1;
      break;
    }
  }
  var storyText = lines.slice(storyStartIdx).join('\n').trim();

  // title이 여전히 비어있으면 전체를 storyText로
  if (!title) {
    title = '무제';
    storyText = content.trim();
  }

  return {
    title: title,
    storyText: storyText
  };
}

// ============================================================
// 댓글 핸들러 — doGet 에서 var 충돌 방지를 위해 별도 함수로 분리
// ============================================================
function gasGetComments(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Comments');
    var pid = e.parameter.postId || '';
    var out = [];
    if (!sheet || sheet.getLastRow() < 2) {
      return ContentService.createTextOutput(JSON.stringify(out))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      var r = rows[i];
      if (!r[0]) continue; // 빈 행 스킵
      var rid = String(r[0]);
      // UUID 형식(36자, 하이픈 4개) → 신규 스키마 [id, postId, author, content, timestamp, password]
      var isUUID = (rid.length === 36 && rid.split('-').length === 5);
      if (isUUID) {
        if (String(r[1]) === pid) {
          out.push({ id: rid, author: String(r[2] || '익명'), content: String(r[3] || ''), timestamp: String(r[4] || '') });
        }
      } else {
        // 구버전 스키마 [postId, author, content, timestamp]
        if (rid === pid) {
          out.push({ id: '', author: String(r[1] || '익명'), content: String(r[2] || ''), timestamp: String(r[3] || '') });
        }
      }
    }
    return ContentService.createTextOutput(JSON.stringify(out))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function gasAddComment(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Comments');
    if (!sheet) {
      sheet = ss.insertSheet('Comments');
      sheet.appendRow(['id', 'postId', 'author', 'content', 'timestamp', 'password']);
    }
    var pid    = e.parameter.postId || '';
    var author = String(e.parameter.author  || '익명').substring(0, 30);
    var body   = String(e.parameter.content || '').substring(0, 500);
    var pw     = String(e.parameter.password || '').substring(0, 50);
    if (pid && body.trim()) {
      sheet.appendRow([Utilities.getUuid(), pid, author, body, new Date().toISOString(), pw]);
    }
  } catch (err) { /* 기록 실패 무시 */ }
  return ContentService.createTextOutput('ok');
}

function gasDeleteComment(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Comments');
    if (!sheet) return ContentService.createTextOutput('error');
    var tid = e.parameter.id || '';
    var pw  = e.parameter.password || '';
    if (!tid) return ContentService.createTextOutput('error');
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === tid) {
        if (String(rows[i][5]) === pw) {
          sheet.deleteRow(i + 1);
          return ContentService.createTextOutput('ok');
        }
        return ContentService.createTextOutput('wrong_password');
      }
    }
    return ContentService.createTextOutput('not_found');
  } catch (err) {
    return ContentService.createTextOutput('error');
  }
}

function gasUpdateComment(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Comments');
    if (!sheet) return ContentService.createTextOutput('error');
    var tid        = e.parameter.id || '';
    var pw         = e.parameter.password || '';
    var newContent = String(e.parameter.content || '').substring(0, 500);
    if (!tid || !newContent.trim()) return ContentService.createTextOutput('error');
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === tid) {
        if (String(rows[i][5]) === pw) {
          sheet.getRange(i + 1, 4).setValue(newContent);
          return ContentService.createTextOutput('ok');
        }
        return ContentService.createTextOutput('wrong_password');
      }
    }
    return ContentService.createTextOutput('not_found');
  } catch (err) {
    return ContentService.createTextOutput('error');
  }
}
