document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { id: 1, src: 'videos/Female AI Animation Ideal Worldcup/GPT-image.mp4', ai: 'GPT Image' },
        { id: 2, src: 'videos/Female AI Animation Ideal Worldcup/nanobanana_pro.mp4', ai: 'NanoBanana Pro' },
        { id: 3, src: 'videos/Female AI Animation Ideal Worldcup/Hunyuan.mp4', ai: 'Hunyuan' },
        { id: 4, src: 'videos/Female AI Animation Ideal Worldcup/seedream.mp4', ai: 'Seedream' },
        { id: 5, src: 'videos/Female AI Animation Ideal Worldcup/flux2.pro.mp4', ai: 'Flux 2 Pro' },
        { id: 6, src: 'videos/Female AI Animation Ideal Worldcup/Recraft.mp4', ai: 'Recraft' },
        { id: 7, src: 'videos/Female AI Animation Ideal Worldcup/Reve.mp4', ai: 'Reve' },
        { id: 8, src: 'videos/Female AI Animation Ideal Worldcup/Grok.mp4', ai: 'Grok' },
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
            createdBy: '제작:',
            feedbackNotice: '여러분의 피드백을 반영하여 2탄을 제작할 예정입니다.',
            feedbackEmpty: '피드백을 입력해주세요.',
            feedbackSubmitting: '제출 중...',
            feedbackSuccess: '피드백이 제출되었습니다!',
            feedbackFail: '제출에 실패했습니다. 다시 시도해주세요.',
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
            createdBy: 'Created by:',
            feedbackNotice: 'We plan to create a second edition based on your feedback.',
            feedbackEmpty: 'Please enter your feedback.',
            feedbackSubmitting: 'Submitting...',
            feedbackSuccess: 'Feedback submitted successfully!',
            feedbackFail: 'Submission failed. Please try again.',
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
            createdBy: '制作:',
            feedbackNotice: '皆さんのフィードバックを反映して第2弾を制作する予定です。',
            feedbackEmpty: 'フィードバックを入力してください。',
            feedbackSubmitting: '送信中...',
            feedbackSuccess: 'フィードバックが送信されました！',
            feedbackFail: '送信に失敗しました。もう一度お試しください。',
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
            createdBy: '制作:',
            feedbackNotice: '我们计划根据您的反馈制作第二期。',
            feedbackEmpty: '请输入您的反馈。',
            feedbackSubmitting: '提交中...',
            feedbackSuccess: '反馈提交成功！',
            feedbackFail: '提交失败，请重试。',
        },
    };

    let currentLang = 'en';
    let currentRound = 8;
    let contenders = [...images];
    let winners = [];

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

        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });
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
        tournamentContainer.style.display = 'none';
        winnerContainer.style.display = 'flex';
        const winnerVideo = document.getElementById('winner-video');
        winnerVideo.querySelector('source').src = winner.src;
        winnerVideo.load();
        document.getElementById('winner-ai').textContent = `${i18n[currentLang].createdBy} ${winner.ai}`;
        document.getElementById('winner-title').textContent = i18n[currentLang].winnerTitle;
        document.getElementById('rankings-container').style.display = 'none';

        // Show winner personality description
        const descEl = document.getElementById('winner-description');
        const desc = winnerDescriptions[winner.ai];
        if (desc) {
            const lang = (currentLang === 'ko' || currentLang === 'en') ? currentLang : (currentLang === 'ja' ? 'ja' : 'zh');
            descEl.textContent = desc[lang] || desc['en'];
            descEl.style.display = 'block';
        } else {
            descEl.style.display = 'none';
        }

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
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxk_FMxH9b4-HyPU3aC7p7XR3LSCb_zK0yiU-GnnLQ0hrE5jSFmR_WjNYWvDMymZ833/exec';

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
                rankingsList.innerHTML = `<p class="rankings-loading">No data yet.</p>`;
                return;
            }

            rankingsList.innerHTML = sorted.map((item, idx) => {
                const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`;
                const pct = totalWins > 0 ? Math.round((item.wins / totalWins) * 100) : 0;
                return `
                    <div class="ranking-item">
                        <span class="ranking-rank">${medal}</span>
                        <div class="ranking-video-wrap">
                            <video autoplay loop muted playsinline>
                                <source src="videos/${item.winner}" type="video/mp4">
                            </video>
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

    // Show landing page on load
    showLanding();
});
