document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { id: 1, src: 'images/1.gif', ai: 'Nano Banana' },
        { id: 2, src: 'images/2.gif', ai: 'DALL-E' },
        { id: 3, src: 'images/3.gif', ai: 'Nano Banana' },
        { id: 4, src: 'images/4.gif', ai: 'DALL-E' },
        { id: 5, src: 'images/5.gif', ai: 'Nano Banana' },
        { id: 6, src: 'images/6.gif', ai: 'DALL-E' },
        { id: 7, src: 'images/7.gif', ai: 'Nano Banana' },
        { id: 8, src: 'images/8.gif', ai: 'DALL-E' },
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
        },
    };

    let currentLang = 'ko';
    let currentRound = 8;
    let contenders = [...images];
    let winners = [];

    const roundTitleEl = document.getElementById('round-title');
    const tournamentContainer = document.getElementById('tournament-container');
    const winnerContainer = document.getElementById('winner-container');
    const langButtons = document.querySelectorAll('.lang-selector button');

    function updateTexts() {
        const lang = i18n[currentLang];
        document.title = lang.winnerTitle.replace('!', ' 월드컵');
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

        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });
    }

    function startTournament() {
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
        if (match.length < 2) { // Should not happen in a typical tournament
            winners.push(match[0]);
            contenders = [...winners];
            nextRound();
            return;
        }

        match.forEach(image => {
            const wrapper = document.createElement('div');
            wrapper.className = 'image-wrapper';
            wrapper.innerHTML = `
                <img src="${image.src}" alt="AI Image">
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
        document.getElementById('winner-img').src = winner.src;
        document.getElementById('winner-ai').textContent = `Created by: ${winner.ai}`;
        document.getElementById('winner-title').textContent = i18n[currentLang].winnerTitle;
    }

    document.getElementById('submit-feedback').addEventListener('click', () => {
        const feedback = document.getElementById('feedback-text').value;
        const winner = document.getElementById('winner-img').src;
        // This is a placeholder for saving feedback.
        // In a real app, you'd send this to a server.
        console.log({ winner, feedback }); 
        alert('피드백이 제출되었습니다!');
        document.getElementById('feedback-text').value = '';
    });

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentLang = button.dataset.lang;
            updateTexts();
            // If tournament is in progress, we might need to re-render some text
        });
    });

    startTournament();
});