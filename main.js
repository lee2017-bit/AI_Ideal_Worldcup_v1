document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { id: 1, src: 'videos/Female AI Animation Ideal Worldcup/GPT-image.mp4', img: 'images/Female AI Animation Ideal Worldcup/GPT-image.png', ai: 'GPT Image' },
        { id: 2, src: 'videos/Female AI Animation Ideal Worldcup/nanobanana_pro.mp4', img: 'images/Female AI Animation Ideal Worldcup/nanobanana_pro.png', ai: 'NanoBanana Pro' },
        { id: 3, src: 'videos/Female AI Animation Ideal Worldcup/Hunyuan.mp4', img: 'images/Female AI Animation Ideal Worldcup/Hunyuan.jpg', ai: 'Hunyuan' },
        { id: 4, src: 'videos/Female AI Animation Ideal Worldcup/seedream.mp4', img: 'images/Female AI Animation Ideal Worldcup/seedream.jpeg', ai: 'Seedream' },
        { id: 5, src: 'videos/Female AI Animation Ideal Worldcup/flux2.pro.mp4', img: 'images/Female AI Animation Ideal Worldcup/Flux2.pro.png', ai: 'Flux 2 Pro' },
        { id: 6, src: 'videos/Female AI Animation Ideal Worldcup/Recraft.mp4', img: 'images/Female AI Animation Ideal Worldcup/Recraft.png', ai: 'Recraft' },
        { id: 7, src: 'videos/Female AI Animation Ideal Worldcup/Reve.mp4', img: 'images/Female AI Animation Ideal Worldcup/Reve.jpg', ai: 'Reve' },
        { id: 8, src: 'videos/Female AI Animation Ideal Worldcup/Grok.mp4', img: 'images/Female AI Animation Ideal Worldcup/Grok.jpg', ai: 'Grok' },
    ];

    const winnerDescriptions = {
        'GPT Image': {
            ko: '당신은 안정적인 완성도와 밸런스를 가장 중요하게 여기는 사람입니다.\n과하지 않지만 깔끔한 미감, 누구나 공감할 수 있는 정돈된 아름다움을 선호하죠.\n"잘 만든 정공법"에 신뢰를 두는 타입입니다.',
            en: 'You value balance and reliable quality above everything else.\nClean composition and polished beauty matter more than extreme style.\nYou trust well-made, classic approaches.',
            ja: 'あなたは安定した完成度とバランスを最も大切にする人です。\n派手すぎないけれど洗練された美しさ、誰もが共感できる整った美しさを好みます。\n「王道の完成形」を信頼するタイプです。',
            zh: '你是一个最看重稳定完成度和平衡感的人。\n不过分但干净的美感，任何人都能共鸣的整洁之美。\n你信赖"精心打造的正统派"。',
        },
        'NanoBanana Pro': {
            ko: '당신은 선명한 캐릭터성과 직관적인 매력에 끌리는 사람입니다.\n한눈에 들어오는 표정과 또렷한 인상이 중요하죠.\n"캐릭터는 기억에 남아야 한다"고 생각하는 타입입니다.',
            en: 'You are drawn to clear character identity and instant appeal.\nStrong expressions and memorable faces matter to you.\nYou believe a character should stand out immediately.',
            ja: 'あなたは鮮明なキャラクター性と直感的な魅力に惹かれる人です。\n一目で分かる表情とはっきりした印象が大切です。\n「キャラクターは記憶に残るべき」と考えるタイプです。',
            zh: '你是一个被鲜明角色特性和直观魅力所吸引的人。\n一眼就能看到的表情和清晰的印象很重要。\n你认为"角色应该让人记住"。',
        },
        'Hunyuan': {
            ko: '당신은 부드럽고 감성적인 분위기를 사랑하는 사람입니다.\n조용하지만 깊은 여운, 은은한 감정을 느끼는 순간을 선호하죠.\n이미지에서 "공기감"을 읽는 타입입니다.',
            en: 'You appreciate soft, emotional atmospheres.\nSubtle feelings and gentle moods resonate with you.\nYou enjoy images that feel calm yet meaningful.',
            ja: 'あなたは柔らかく感性的な雰囲気を愛する人です。\n静かだけど深い余韻、穏やかな感情を感じる瞬間を好みます。\nイメージから「空気感」を読み取るタイプです。',
            zh: '你是一个热爱柔和感性氛围的人。\n安静但有深深余韵，喜欢感受淡淡情感的瞬间。\n你是能从图像中读出"氛围感"的类型。',
        },
        'Seedream': {
            ko: '당신은 몽환적이고 서정적인 세계관에 끌리는 사람입니다.\n현실과 꿈의 경계 같은 분위기를 좋아하죠.\n이미지를 보며 이야기를 상상하는 타입입니다.',
            en: 'You are attracted to dreamlike and poetic visuals.\nYou enjoy worlds that feel like a quiet fantasy.\nImages spark stories in your imagination.',
            ja: 'あなたは夢幻的で叙情的な世界観に惹かれる人です。\n現実と夢の境界のような雰囲気が好きです。\nイメージを見ながら物語を想像するタイプです。',
            zh: '你是一个被梦幻般诗意世界观所吸引的人。\n喜欢现实与梦境交界处般的氛围。\n你是看着图像想象故事的类型。',
        },
        'Flux 2 Pro': {
            ko: '당신은 강한 스타일과 현대적인 감각을 선호하는 사람입니다.\n디자인적인 임팩트와 개성을 중요하게 보죠.\n"평범한 건 재미없다"고 느끼는 타입입니다.',
            en: 'You prefer bold style and modern aesthetics.\nVisual impact and uniqueness matter to you.\nYou\'re not interested in anything ordinary.',
            ja: 'あなたは強いスタイルと現代的なセンスを好む人です。\nデザイン的なインパクトと個性を重視します。\n「平凡なものはつまらない」と感じるタイプです。',
            zh: '你是一个偏爱强烈风格和现代感的人。\n设计冲击力和个性对你很重要。\n你觉得"平凡的东西没意思"。',
        },
        'Recraft': {
            ko: '당신은 그래픽 디자인 감각과 구조적인 미를 중시하는 사람입니다.\n정돈된 선, 또렷한 형태, 아이콘 같은 이미지를 좋아하죠.\n디자이너 성향이 강한 타입입니다.',
            en: 'You value graphic clarity and structural beauty.\nClean lines and icon-like visuals appeal to you.\nYou have a strong designer mindset.',
            ja: 'あなたはグラフィックデザインのセンスと構造的な美を重視する人です。\n整った線、はっきりした形、アイコンのようなイメージが好きです。\nデザイナー気質が強いタイプです。',
            zh: '你是一个重视平面设计感和结构美的人。\n整齐的线条、清晰的形态、像图标一样的图像。\n你有很强的设计师倾向。',
        },
        'Reve': {
            ko: '당신은 부드러운 현실감과 인간적인 표정을 좋아하는 사람입니다.\n과한 연출보다 자연스러운 매력을 선호하죠.\n"진짜 사람 같은 캐릭터"에 끌리는 타입입니다.',
            en: 'You prefer natural expressions and human-like realism.\nSubtle charm feels more attractive than exaggeration.\nYou\'re drawn to characters that feel real.',
            ja: 'あなたは柔らかなリアリティと人間的な表情が好きな人です。\n過剰な演出より自然な魅力を好みます。\n「本物の人みたいなキャラクター」に惹かれるタイプです。',
            zh: '你是一个喜欢柔和真实感和人性化表情的人。\n比起过度演绎更偏爱自然魅力。\n你被"像真人一样的角色"所吸引。',
        },
        'Grok': {
            ko: '당신은 강렬한 분위기와 독특한 개성을 추구하는 사람입니다.\n일반적인 미감보다는 실험적인 감각에 끌리죠.\n취향이 확실한 타입입니다.',
            en: 'You seek strong atmosphere and unconventional style.\nExperimental visuals appeal more than mainstream beauty.\nYou have a very distinct taste.',
            ja: 'あなたは強烈な雰囲気と独特な個性を追求する人です。\n一般的な美感より実験的なセンスに惹かれます。\n好みがはっきりしているタイプです。',
            zh: '你是一个追求强烈氛围和独特个性的人。\n比起一般审美更被实验性的感觉所吸引。\n你是品味非常明确的类型。',
        },
    };

    const i18n = {
        ko: {
            round: (round) => `${round}강`,
            winnerTitle: '최종 우승!',
            feedbackTitle: '피드백',
            feedbackPlaceholder: '왜 이 이미지를 선택하셨나요?',
            submit: '제출',
            quarterFinals: '8강',
            semiFinals: '4강',
            final: '결승',
            landingTitle: '여자 AI 애니메이션 이상형월드컵',
            landingSubtitle: '8명의 AI 애니메이션 캐릭터 중 나의 이상형을 골라보세요!',
            startBtn: '시작하기',
            sidebarTitle: 'AI 이상형 월드컵',
            categoryFemale: '여자 AI 애니메이션\n이상형월드컵',
            categoryMale: '남자 AI 애니메이션\n이상형월드컵',
            comingSoon: '준비중',
            showRankingsAll: '전체 랭킹보기',
            showRankingsLang: '언어별 랭킹보기',
            rankingsAllTitle: '전체 랭킹',
            rankingsLangTitle: '언어별 랭킹',
            rankingWins: '회',
            rankingLoading: '랭킹 로딩 중...',
            rankingError: '랭킹을 불러올 수 없습니다.',
            rankingNoData: '아직 데이터가 없습니다.',
            createdBy: '제작:',
            feedbackNotice: '여러분의 피드백을 반영하여 2탄을 제작할 예정입니다.',
            feedbackEmpty: '피드백을 입력해주세요.',
            feedbackSubmitting: '제출 중...',
            feedbackSuccess: '피드백이 제출되었습니다!',
            feedbackFail: '제출에 실패했습니다. 다시 시도해주세요.',
            // Novel
            writeNovel: '소설 작성',
            genre: '장르',
            humor: '유쾌도',
            catharsis: '사이다',
            coherence: '개연성',
            humorLeft: '유쾌함', humorRight: '진지함',
            catharsisLeft: '담담함', catharsisRight: '통쾌함',
            coherenceLeft: '파격적', coherenceRight: '개연성',
            userNoteLabel: '세부 설정',
            userNotePlaceholder: '예: 직업 - 퇴마사 / 특수 능력 - 시간 정지 / 취미 - 고양이 수집',
            prologueFree: '프롤로그(무료)',
            episode1Locked: '1화(가입 필요)',
            episode1SigninMsg: '1화를 생성하려면 로그인이 필요합니다. (Coming soon)',
            generate: '생성',
            regenerate: '다시 생성',
            copy: '복사',
            copied: '복사됨!',
            generating: '소설을 생성 중입니다... (약 1분)',
            generateError: '생성에 실패했습니다. 다시 시도해주세요.',
            length: '길이',
            genreModernFantasy: '현대 판타지',
            genreRomance: '로맨스',
            genreMystery: '미스터리',
            genreSF: 'SF',
            genreHealing: '힐링',
            webtoon: '웹툰',
            movie: '영화',
            signUp: '가입하기',
            signUpRequired: '가입이 필요합니다. (Coming soon)',
        },
        en: {
            round: (round) => `Round of ${round}`,
            winnerTitle: 'Final Winner!',
            feedbackTitle: 'Feedback',
            feedbackPlaceholder: 'Why did you choose this image?',
            submit: 'Submit',
            quarterFinals: 'Quarter-Finals',
            semiFinals: 'Semi-Finals',
            final: 'Final',
            landingTitle: 'Female AI Animation Ideal Worldcup',
            landingSubtitle: 'Pick your ideal among 8 AI animation characters!',
            startBtn: 'Start',
            sidebarTitle: 'AI Ideal Worldcup',
            categoryFemale: 'Female AI Animation\nIdeal Worldcup',
            categoryMale: 'Male AI Animation\nIdeal Worldcup',
            comingSoon: 'Coming Soon',
            showRankingsAll: 'Overall Rankings',
            showRankingsLang: 'Language Rankings',
            rankingsAllTitle: 'Overall Rankings',
            rankingsLangTitle: 'Language Rankings',
            rankingWins: 'wins',
            rankingLoading: 'Loading rankings...',
            rankingError: 'Failed to load rankings.',
            rankingNoData: 'No data yet.',
            createdBy: 'Created by:',
            feedbackNotice: 'We plan to create a second edition based on your feedback.',
            feedbackEmpty: 'Please enter your feedback.',
            feedbackSubmitting: 'Submitting...',
            feedbackSuccess: 'Feedback submitted successfully!',
            feedbackFail: 'Submission failed. Please try again.',
            // Novel
            writeNovel: 'Write a Novel',
            genre: 'Genre',
            humor: 'Humor',
            catharsis: 'Catharsis',
            coherence: 'Coherence',
            humorLeft: 'Lighthearted', humorRight: 'Serious',
            catharsisLeft: 'Gentle', catharsisRight: 'Punchy',
            coherenceLeft: 'Surreal', coherenceRight: 'Plausible',
            userNoteLabel: 'Detail Settings',
            userNotePlaceholder: 'e.g., Job - Exorcist / Special Ability - Time Stop / Hobby - Cat collecting',
            prologueFree: 'Prologue (Free)',
            episode1Locked: 'Episode 1 (Sign-in Required)',
            episode1SigninMsg: 'Sign-in required to generate Episode 1. (Coming soon)',
            generate: 'Generate',
            regenerate: 'Regenerate',
            copy: 'Copy',
            copied: 'Copied!',
            generating: 'Generating your novel... (about 1 minute)',
            generateError: 'Generation failed. Please try again.',
            length: 'Length',
            genreModernFantasy: 'Modern Fantasy',
            genreRomance: 'Romance',
            genreMystery: 'Mystery',
            genreSF: 'SF',
            genreHealing: 'Healing',
            webtoon: 'Webtoon',
            movie: 'Movie',
            signUp: 'Sign Up',
            signUpRequired: 'Sign-in required. (Coming soon)',
        },
        ja: {
            round: (round) => `ベスト${round}`,
            winnerTitle: '最終優勝！',
            feedbackTitle: 'フィードバック',
            feedbackPlaceholder: 'この画像を選んだ理由は？',
            submit: '提出',
            quarterFinals: '準々決勝',
            semiFinals: '準決勝',
            final: '決勝',
            landingTitle: '女性AIアニメ理想ワールドカップ',
            landingSubtitle: '8人のAIアニメキャラから理想のタイプを選ぼう！',
            startBtn: 'スタート',
            sidebarTitle: 'AI理想ワールドカップ',
            categoryFemale: '女性AIアニメ\n理想ワールドカップ',
            categoryMale: '男性AIアニメ\n理想ワールドカップ',
            comingSoon: '準備中',
            showRankingsAll: '全体ランキング',
            showRankingsLang: '言語別ランキング',
            rankingsAllTitle: '全体ランキング',
            rankingsLangTitle: '言語別ランキング',
            rankingWins: '回',
            rankingLoading: 'ランキング読み込み中...',
            rankingError: 'ランキングを読み込めません。',
            rankingNoData: 'まだデータがありません。',
            createdBy: '制作:',
            feedbackNotice: '皆さんのフィードバックを反映して第2弾を制作する予定です。',
            feedbackEmpty: 'フィードバックを入力してください。',
            feedbackSubmitting: '送信中...',
            feedbackSuccess: 'フィードバックが送信されました！',
            feedbackFail: '送信に失敗しました。もう一度お試しください。',
            // Novel
            writeNovel: '小説を書く',
            genre: 'ジャンル',
            humor: 'ユーモア',
            catharsis: '爽快感（サイダー感）',
            coherence: '整合性（納得感）',
            humorLeft: '軽快', humorRight: 'シリアス',
            catharsisLeft: '穏やか', catharsisRight: '爽快',
            coherenceLeft: '破天荒', coherenceRight: '納得感',
            userNoteLabel: '詳細設定',
            userNotePlaceholder: '例：職業 - 退魔師 / 特殊能力 - 時間停止 / 趣味 - 猫集め',
            prologueFree: 'プロローグ（無料）',
            episode1Locked: '第1話（ログイン必須）',
            episode1SigninMsg: '第1話を生成するにはログインが必要です。（Coming soon）',
            generate: '生成',
            regenerate: '再生成',
            copy: 'コピー',
            copied: 'コピーしました！',
            generating: '小説を生成中...（約1分）',
            generateError: '生成に失敗しました。もう一度お試しください。',
            length: '長さ',
            genreModernFantasy: '現代ファンタジー',
            genreRomance: 'ロマンス',
            genreMystery: 'ミステリー',
            genreSF: 'SF',
            genreHealing: 'ヒーリング',
            webtoon: 'ウェブトゥーン',
            movie: '映画',
            signUp: '新規登録',
            signUpRequired: 'ログインが必要です。（Coming soon）',
        },
        zh: {
            round: (round) => `${round}强赛`,
            winnerTitle: '总冠军!',
            feedbackTitle: '反馈',
            feedbackPlaceholder: '您为什么选择这张图片？',
            submit: '提交',
            quarterFinals: '八强赛',
            semiFinals: '半决赛',
            final: '决赛',
            landingTitle: '女性AI动画理想世界杯',
            landingSubtitle: '从8位AI动画角色中选出你的理想型！',
            startBtn: '开始',
            sidebarTitle: 'AI理想世界杯',
            categoryFemale: '女性AI动画\n理想世界杯',
            categoryMale: '男性AI动画\n理想世界杯',
            comingSoon: '即将推出',
            showRankingsAll: '总排名',
            showRankingsLang: '语言排名',
            rankingsAllTitle: '总排名',
            rankingsLangTitle: '语言排名',
            rankingWins: '次',
            rankingLoading: '排名加载中...',
            rankingError: '无法加载排名。',
            rankingNoData: '暂无数据。',
            createdBy: '制作:',
            feedbackNotice: '我们计划根据您的反馈制作第二期。',
            feedbackEmpty: '请输入您的反馈。',
            feedbackSubmitting: '提交中...',
            feedbackSuccess: '反馈提交成功！',
            feedbackFail: '提交失败，请重试。',
            // Novel
            writeNovel: '写小说',
            genre: '类型',
            humor: '幽默感',
            catharsis: '爽感（爽快度）',
            coherence: '合理性（逻辑性）',
            humorLeft: '轻松', humorRight: '严肃',
            catharsisLeft: '平和', catharsisRight: '爽快',
            coherenceLeft: '超现实', coherenceRight: '合理',
            userNoteLabel: '详细设定',
            userNotePlaceholder: '例如：职业 - 驱魔师 / 特殊能力 - 时间停止 / 爱好 - 收集猫咪',
            prologueFree: '序章（免费）',
            episode1Locked: '第1话（需登录）',
            episode1SigninMsg: '生成第1话需要登录。（Coming soon）',
            generate: '生成',
            regenerate: '重新生成',
            copy: '复制',
            copied: '已复制！',
            generating: '正在生成小说...（约1分钟）',
            generateError: '生成失败，请重试。',
            length: '长度',
            genreModernFantasy: '现代奇幻',
            genreRomance: '爱情',
            genreMystery: '悬疑',
            genreSF: '科幻',
            genreHealing: '治愈',
            webtoon: '网漫',
            movie: '电影',
            signUp: '注册',
            signUpRequired: '需要登录。（Coming soon）',
        },
    };

    let currentLang = 'ko';
    let currentRound = 8;
    let contenders = [...images];
    let winners = [];
    let currentWinner = null;

    const landingPage = document.getElementById('landing-page');
    const gameArea = document.getElementById('game-area');
    const roundTitleEl = document.getElementById('round-title');
    const tournamentContainer = document.getElementById('tournament-container');
    const winnerContainer = document.getElementById('winner-container');
    const langButtons = document.querySelectorAll('.lang-selector button');

    function updateTexts() {
        const lang = i18n[currentLang];
        document.title = lang.sidebarTitle;

        // Sidebar texts
        document.querySelector('.sidebar-title').textContent = lang.sidebarTitle;
        document.querySelector('#category-female .category-label').innerHTML = lang.categoryFemale.replace('\n', '<br>');
        document.querySelector('#category-male .category-label').innerHTML = lang.categoryMale.replace('\n', '<br>');
        document.querySelector('.coming-soon').textContent = lang.comingSoon;

        // Landing page texts
        document.querySelector('.landing-title').textContent = lang.landingTitle;
        document.querySelector('.landing-subtitle').textContent = lang.landingSubtitle;
        document.getElementById('start-btn').textContent = lang.startBtn;

        // Game texts
        if (currentRound > 1) {
            let roundText;
            if (currentRound === 8) roundText = lang.quarterFinals;
            else if (currentRound === 4) roundText = lang.semiFinals;
            else if (currentRound === 2) roundText = lang.final;
            roundTitleEl.textContent = roundText || lang.round(currentRound);
        }
        document.getElementById('winner-title').textContent = lang.winnerTitle;
        document.getElementById('feedback-form').querySelector('h3').textContent = lang.feedbackTitle;
        document.getElementById('feedback-text').placeholder = lang.feedbackPlaceholder;
        document.getElementById('submit-feedback').textContent = lang.submit;
        document.getElementById('show-rankings-all').textContent = lang.showRankingsAll;
        document.getElementById('show-rankings-lang').textContent = lang.showRankingsLang;
        document.querySelector('.feedback-notice').textContent = lang.feedbackNotice;

        // Studio buttons & Sign Up
        document.getElementById('write-webtoon-btn').childNodes[0].textContent = lang.webtoon + ' ';
        document.getElementById('write-movie-btn').childNodes[0].textContent = lang.movie + ' ';
        document.getElementById('signup-btn').childNodes[0].textContent = lang.signUp + ' ';

        // Novel modal texts
        const novelModal = document.getElementById('novel-modal-overlay');
        if (novelModal) {
            document.getElementById('novel-modal-title').textContent = lang.writeNovel;
            document.getElementById('write-novel-btn').textContent = lang.writeNovel;
            document.getElementById('novel-genre-label').textContent = lang.genre;
            document.getElementById('novel-humor-label').textContent = lang.humor;
            document.getElementById('novel-catharsis-label').textContent = lang.catharsis;
            document.getElementById('novel-coherence-label').textContent = lang.coherence;
            document.getElementById('novel-humor-left').textContent = lang.humorLeft;
            document.getElementById('novel-humor-right').textContent = lang.humorRight;
            document.getElementById('novel-catharsis-left').textContent = lang.catharsisLeft;
            document.getElementById('novel-catharsis-right').textContent = lang.catharsisRight;
            document.getElementById('novel-coherence-left').textContent = lang.coherenceLeft;
            document.getElementById('novel-coherence-right').textContent = lang.coherenceRight;
            document.getElementById('novel-usernote-label').textContent = lang.userNoteLabel;
            document.getElementById('novel-usernote').placeholder = lang.userNotePlaceholder;
            document.getElementById('novel-length-prologue-text').textContent = lang.prologueFree;
            document.getElementById('novel-length-episode1-text').textContent = lang.episode1Locked;
            document.getElementById('novel-generate-btn').textContent = lang.generate;
            document.getElementById('novel-regenerate-btn').textContent = lang.regenerate;
            document.getElementById('novel-copy-btn').textContent = lang.copy;
            document.getElementById('novel-length-label').textContent = lang.length;
            // Genre options
            const genreSelect = document.getElementById('novel-genre');
            const genreKeys = ['genreModernFantasy', 'genreRomance', 'genreMystery', 'genreSF', 'genreHealing'];
            const genreValues = ['modern-fantasy', 'romance', 'mystery', 'sf', 'healing'];
            genreSelect.querySelectorAll('option').forEach((opt, idx) => {
                opt.textContent = lang[genreKeys[idx]];
            });
        }

        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });

        if (currentWinner) {
            updateWinnerTexts();
        }
    }

    function updateWinnerTexts() {
        if (!currentWinner) return;
        document.getElementById('winner-ai').textContent = `${i18n[currentLang].createdBy} ${currentWinner.ai}`;
        const descEl = document.getElementById('winner-description');
        const desc = winnerDescriptions[currentWinner.ai];
        if (desc) {
            descEl.textContent = desc[currentLang] || desc['en'];
            descEl.style.display = 'block';
        } else {
            descEl.style.display = 'none';
        }
    }

    function showLanding() {
        landingPage.style.display = 'flex';
        gameArea.style.display = 'none';
        updateTexts();
    }

    function startTournament() {
        landingPage.style.display = 'none';
        gameArea.style.display = 'block';
        contenders = [...images];
        currentRound = 8;
        currentWinner = null;
        winnerContainer.style.display = 'none';
        tournamentContainer.style.display = 'flex';
        nextRound();
    }

    function nextRound() {
        if (contenders.length === 1) {
            showWinner(contenders[0]);
            return;
        }

        if (contenders.length < currentRound) {
            currentRound /= 2;
        }

        winners = [];
        updateTexts();
        presentMatch();
    }

    function presentMatch() {
        tournamentContainer.innerHTML = '';
        if (contenders.length === 0 && winners.length > 0) {
            contenders = [...winners];
            nextRound();
            return;
        }

        const match = contenders.splice(0, 2);
        if (match.length < 2) {
            winners.push(match[0]);
            contenders = [...winners];
            nextRound();
            return;
        }

        match.forEach(image => {
            const wrapper = document.createElement('div');
            wrapper.className = 'image-wrapper';
            wrapper.innerHTML = `
                <video autoplay loop muted playsinline>
                    <source src="${image.src}" type="video/mp4">
                </video>
                <p>${image.ai}</p>
            `;
            wrapper.addEventListener('click', () => selectWinner(image));
            tournamentContainer.appendChild(wrapper);
        });
    }

    function selectWinner(winner) {
        winners.push(winner);
        if (contenders.length > 0) {
            presentMatch();
        } else {
            contenders = [...winners];
            if (contenders.length > 1) {
                nextRound();
            } else {
                showWinner(contenders[0]);
            }
        }
    }

    function showWinner(winner) {
        currentWinner = winner;
        tournamentContainer.style.display = 'none';
        winnerContainer.style.display = 'flex';
        const winnerVideo = document.getElementById('winner-video');
        winnerVideo.querySelector('source').src = winner.src;
        winnerVideo.load();
        document.getElementById('rankings-container').style.display = 'none';
        updateWinnerTexts();

        // Send vote
        const winnerFile = winner.src.split('/').pop();
        const voteParams = new URLSearchParams({
            action: 'vote',
            winner: winnerFile,
            ai: winner.ai,
            lang: currentLang,
        });
        fetch(SCRIPT_URL + '?' + voteParams.toString(), { mode: 'no-cors' }).catch(() => {});
    }

    // Google Apps Script
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyVOm7UarGCppS4KnN1aFC0u_fFBFaWHTCuOhfye_HjSkhdWzF7evSCEUe_0oNXHhyo/exec';

    // 비디오 파일명 → 이미지 경로 매핑
    function getImageFromVideo(videoFilename) {
        const entry = images.find(item => item.src.endsWith(videoFilename));
        return entry ? entry.img : null;
    }

    // Rankings
    async function loadRankings(filterByLang) {
        const lang = i18n[currentLang];
        const rankingsList = document.getElementById('rankings-list');
        const rankingsTitle = document.getElementById('rankings-title');
        rankingsList.innerHTML = `<p class="rankings-loading">${lang.rankingLoading}</p>`;
        rankingsTitle.textContent = filterByLang ? lang.rankingsLangTitle : lang.rankingsAllTitle;
        document.getElementById('rankings-container').style.display = 'block';

        try {
            let url = SCRIPT_URL + '?action=getRankings';
            if (filterByLang) url += '&lang=' + currentLang;
            const res = await fetch(url);
            const data = await res.json();

            const sorted = data.sort((a, b) => b.wins - a.wins);
            const totalWins = sorted.reduce((sum, item) => sum + item.wins, 0);

            if (sorted.length === 0) {
                rankingsList.innerHTML = `<p class="rankings-loading">${lang.rankingNoData}</p>`;
                return;
            }

            rankingsList.innerHTML = sorted.map((item, idx) => {
                const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`;
                const pct = totalWins > 0 ? Math.round((item.wins / totalWins) * 100) : 0;
                const imgSrc = getImageFromVideo(item.winner);
                const thumbnail = imgSrc
                    ? `<img src="${imgSrc}" alt="${item.ai}">`
                    : `<video autoplay loop muted playsinline><source src="videos/${item.winner}" type="video/mp4"></video>`;
                return `
                    <div class="ranking-item">
                        <span class="ranking-rank">${medal}</span>
                        <div class="ranking-thumb-wrap">
                            ${thumbnail}
                        </div>
                        <span class="ranking-ai">${item.ai}</span>
                        <span class="ranking-wins">${item.wins}${lang.rankingWins}(${pct}%)</span>
                    </div>
                `;
            }).join('');
        } catch (err) {
            rankingsList.innerHTML = `<p class="rankings-error">${lang.rankingError}</p>`;
        }
    }

    document.getElementById('show-rankings-all').addEventListener('click', () => loadRankings(false));
    document.getElementById('show-rankings-lang').addEventListener('click', () => loadRankings(true));

    document.getElementById('submit-feedback').addEventListener('click', async () => {
        const feedback = document.getElementById('feedback-text').value.trim();
        const winnerVideo = document.getElementById('winner-video');
        const winnerAi = document.getElementById('winner-ai').textContent;
        const statusEl = document.getElementById('feedback-status');

        if (!feedback) {
            statusEl.textContent = i18n[currentLang].feedbackEmpty;
            statusEl.className = 'feedback-status error';
            return;
        }

        const submitBtn = document.getElementById('submit-feedback');
        submitBtn.disabled = true;
        statusEl.textContent = i18n[currentLang].feedbackSubmitting;
        statusEl.className = 'feedback-status';

        const winnerSrc = winnerVideo.querySelector('source').src.split('/').pop();

        try {
            const params = new URLSearchParams({
                action: 'feedback',
                winner: winnerSrc,
                ai: winnerAi,
                feedback: feedback,
                timestamp: new Date().toISOString(),
                lang: currentLang,
            });
            await fetch(SCRIPT_URL + '?' + params.toString(), { mode: 'no-cors' });
            statusEl.textContent = i18n[currentLang].feedbackSuccess;
            statusEl.className = 'feedback-status success';
            document.getElementById('feedback-text').value = '';
        } catch (err) {
            statusEl.textContent = i18n[currentLang].feedbackFail;
            statusEl.className = 'feedback-status error';
        } finally {
            submitBtn.disabled = false;
        }
    });

    // Start button
    document.getElementById('start-btn').addEventListener('click', startTournament);

    // Sidebar category click
    document.getElementById('category-female').addEventListener('click', showLanding);

    // Language selector
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentLang = button.dataset.lang;
            updateTexts();
        });
    });

    // ===== Novel Modal Logic =====
    const novelModalOverlay = document.getElementById('novel-modal-overlay');
    const novelGenerateBtn = document.getElementById('novel-generate-btn');
    const novelRegenerateBtn = document.getElementById('novel-regenerate-btn');
    const novelCopyBtn = document.getElementById('novel-copy-btn');
    const novelResult = document.getElementById('novel-result');
    const novelResultTitle = document.getElementById('novel-result-title');
    const novelResultText = document.getElementById('novel-result-text');
    const novelStatus = document.getElementById('novel-status');
    const novelSigninMsg = document.getElementById('novel-signin-msg');

    // Open modal
    document.getElementById('write-novel-btn').addEventListener('click', () => {
        novelModalOverlay.style.display = 'flex';
    });

    // Close modal
    document.getElementById('novel-modal-close').addEventListener('click', () => {
        novelModalOverlay.style.display = 'none';
    });

    // Close on overlay click
    novelModalOverlay.addEventListener('click', (e) => {
        if (e.target === novelModalOverlay) {
            novelModalOverlay.style.display = 'none';
        }
    });

    // Slider value display
    ['humor', 'catharsis', 'coherence'].forEach(name => {
        const slider = document.getElementById(`novel-${name}`);
        const valueEl = document.getElementById(`novel-${name}-value`);
        slider.addEventListener('input', () => {
            valueEl.textContent = slider.value;
        });
    });

    // User note toggle
    document.getElementById('novel-usernote-toggle').addEventListener('click', () => {
        const textarea = document.getElementById('novel-usernote');
        const arrow = document.getElementById('novel-usernote-arrow');
        const isHidden = textarea.style.display === 'none';
        textarea.style.display = isHidden ? 'block' : 'none';
        arrow.classList.toggle('open', isHidden);
    });

    // Episode 1 click — show sign-in message
    document.getElementById('novel-length-episode1').addEventListener('click', () => {
        const lang = i18n[currentLang];
        novelSigninMsg.textContent = lang.episode1SigninMsg;
        novelSigninMsg.style.display = 'block';
        setTimeout(() => {
            novelSigninMsg.style.display = 'none';
        }, 3000);
    });

    // Generate story
    async function generateStory() {
        if (!currentWinner) return;

        const lang = i18n[currentLang];
        const genre = document.getElementById('novel-genre').value;
        const humor = document.getElementById('novel-humor').value;
        const catharsis = document.getElementById('novel-catharsis').value;
        const coherence = document.getElementById('novel-coherence').value;
        const userNote = document.getElementById('novel-usernote').value.trim();

        // UI state: loading
        novelGenerateBtn.disabled = true;
        novelRegenerateBtn.style.display = 'none';
        novelCopyBtn.style.display = 'none';
        novelResult.style.display = 'none';
        novelStatus.textContent = lang.generating;
        novelStatus.className = 'novel-status generating';

        try {
            const params = new URLSearchParams({
                action: 'generateStory',
                winnerModelName: currentWinner.ai,
                winnerImageUrl: currentWinner.src,
                tournamentType: 'female-ai-animation',
                language: currentLang,
                genre: genre,
                humor: humor,
                catharsis: catharsis,
                coherence: coherence,
                lengthMode: 'prologue',
            });
            if (userNote) params.append('userNote', userNote);

            const res = await fetch(SCRIPT_URL + '?' + params.toString(), { redirect: 'follow' });
            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (parseErr) {
                throw new Error('JSON parse failed: ' + text.substring(0, 100));
            }

            if (data.error) {
                throw new Error(data.error);
            }

            if (data.title !== undefined && data.storyText !== undefined && (data.title.length > 0 || data.storyText.length > 0)) {
                // 제목에서 마크다운 기호 제거
                novelResultTitle.textContent = data.title.replace(/\*\*/g, '').replace(/^#+\s*/, '').replace(/^제목:\s*/i, '');
                novelResultText.textContent = data.storyText;
                novelResult.style.display = 'block';
                novelGenerateBtn.style.display = 'none';
                novelRegenerateBtn.style.display = 'inline-block';
                novelCopyBtn.style.display = 'inline-block';
                novelStatus.textContent = '';
                novelStatus.className = 'novel-status';
            } else {
                throw new Error('Invalid response');
            }
        } catch (err) {
            novelStatus.textContent = lang.generateError + ' (' + err.message + ')';
            novelStatus.className = 'novel-status error';
        } finally {
            novelGenerateBtn.disabled = false;
        }
    }

    novelGenerateBtn.addEventListener('click', generateStory);
    novelRegenerateBtn.addEventListener('click', () => {
        // 결과 숨기고 설정 화면으로 돌아가기
        novelResult.style.display = 'none';
        novelRegenerateBtn.style.display = 'none';
        novelCopyBtn.style.display = 'none';
        novelGenerateBtn.style.display = 'inline-block';
        novelStatus.textContent = '';
        novelStatus.className = 'novel-status';
    });

    // Copy story
    novelCopyBtn.addEventListener('click', async () => {
        const lang = i18n[currentLang];
        const title = novelResultTitle.textContent;
        const text = novelResultText.textContent;
        const fullText = `${title}\n\n${text}`;

        try {
            await navigator.clipboard.writeText(fullText);
            const originalText = novelCopyBtn.textContent;
            novelCopyBtn.textContent = lang.copied;
            setTimeout(() => {
                novelCopyBtn.textContent = lang.copy;
            }, 2000);
        } catch (err) {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = fullText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            novelCopyBtn.textContent = lang.copied;
            setTimeout(() => {
                novelCopyBtn.textContent = lang.copy;
            }, 2000);
        }
    });

    // Show landing page on load
    showLanding();
});
