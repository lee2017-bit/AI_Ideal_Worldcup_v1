document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { id: 1, src: 'videos/1.mp4', ai: 'Nano Banana' },
        { id: 2, src: 'videos/2.mp4', ai: 'DALL-E' },
        { id: 3, src: 'videos/3.mp4', ai: 'Nano Banana' },
        { id: 4, src: 'videos/4.mp4', ai: 'DALL-E' },
        { id: 5, src: 'videos/5.mp4', ai: 'Nano Banana' },
        { id: 6, src: 'videos/6.mp4', ai: 'DALL-E' },
        { id: 7, src: 'videos/7.mp4', ai: 'Nano Banana' },
        { id: 8, src: 'videos/8.mp4', ai: 'DALL-E' },
    ];

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
            showRankings: '랭킹보기',
            rankingsTitle: '전체 랭킹',
            rankingWins: '회',
            rankingLoading: '랭킹 로딩 중...',
            rankingError: '랭킹을 불러올 수 없습니다.',
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
            showRankings: 'View Rankings',
            rankingsTitle: 'Overall Rankings',
            rankingWins: 'wins',
            rankingLoading: 'Loading rankings...',
            rankingError: 'Failed to load rankings.',
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
            showRankings: 'ランキングを見る',
            rankingsTitle: '全体ランキング',
            rankingWins: '回',
            rankingLoading: 'ランキング読み込み中...',
            rankingError: 'ランキングを読み込めません。',
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
            showRankings: '查看排名',
            rankingsTitle: '总排名',
            rankingWins: '次',
            rankingLoading: '排名加载中...',
            rankingError: '无法加载排名。',
        },
    };

    let currentLang = 'ko';
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
        document.getElementById('show-rankings').textContent = lang.showRankings;
        document.getElementById('rankings-title').textContent = lang.rankingsTitle;

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
        document.getElementById('winner-ai').textContent = `Created by: ${winner.ai}`;
        document.getElementById('winner-title').textContent = i18n[currentLang].winnerTitle;
        document.getElementById('rankings-container').style.display = 'none';

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
    async function loadRankings() {
        const lang = i18n[currentLang];
        const rankingsList = document.getElementById('rankings-list');
        rankingsList.innerHTML = `<p class="rankings-loading">${lang.rankingLoading}</p>`;
        document.getElementById('rankings-container').style.display = 'block';

        try {
            const res = await fetch(SCRIPT_URL + '?action=getRankings&lang=' + currentLang);
            const data = await res.json();

            const sorted = data.sort((a, b) => b.wins - a.wins);
            const totalWins = sorted.reduce((sum, item) => sum + item.wins, 0);

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

    document.getElementById('show-rankings').addEventListener('click', loadRankings);

    document.getElementById('submit-feedback').addEventListener('click', async () => {
        const feedback = document.getElementById('feedback-text').value.trim();
        const winnerVideo = document.getElementById('winner-video');
        const winnerAi = document.getElementById('winner-ai').textContent;
        const statusEl = document.getElementById('feedback-status');

        if (!feedback) {
            statusEl.textContent = '피드백을 입력해주세요.';
            statusEl.className = 'feedback-status error';
            return;
        }

        const submitBtn = document.getElementById('submit-feedback');
        submitBtn.disabled = true;
        statusEl.textContent = '제출 중...';
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
            statusEl.textContent = '피드백이 제출되었습니다!';
            statusEl.className = 'feedback-status success';
            document.getElementById('feedback-text').value = '';
        } catch (err) {
            statusEl.textContent = '제출에 실패했습니다. 다시 시도해주세요.';
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
