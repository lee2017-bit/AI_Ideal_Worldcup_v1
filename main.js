document.addEventListener('DOMContentLoaded', () => {
    // ===== Category Data =====
    const categories = {
        'dog-ai': {
            images: [
                { id: 1, src: 'videos/Dog AI Ideal Worldcup/GPT-Image.mp4', img: 'images/Dog AI Ideal Worldcup/GPT-Image.png', ai: 'GPT Image' },
                { id: 2, src: 'videos/Dog AI Ideal Worldcup/Nanobanana-pro.mp4', img: 'images/Dog AI Ideal Worldcup/Nanobanana-pro.png', ai: 'NanoBanana Pro' },
                { id: 3, src: 'videos/Dog AI Ideal Worldcup/Higgsfield.mp4', img: 'images/Dog AI Ideal Worldcup/Higgsfield.png', ai: 'Higgsfield' },
                { id: 4, src: 'videos/Dog AI Ideal Worldcup/Kling_O1.mp4', img: 'images/Dog AI Ideal Worldcup/KLING_O1.png', ai: 'KLING O1' },
                { id: 5, src: 'videos/Dog AI Ideal Worldcup/Seedream4.5.mp4', img: 'images/Dog AI Ideal Worldcup/Seedream4.5.jpeg', ai: 'Seedream 4.5' },
                { id: 6, src: 'videos/Dog AI Ideal Worldcup/Reve.mp4', img: 'images/Dog AI Ideal Worldcup/Reve.jpg', ai: 'Reve' },
                { id: 7, src: 'videos/Dog AI Ideal Worldcup/wan2.2.mp4', img: 'images/Dog AI Ideal Worldcup/Wan2.2.png', ai: 'Wan 2.2' },
                { id: 8, src: 'videos/Dog AI Ideal Worldcup/Grok.mp4', img: 'images/Dog AI Ideal Worldcup/Grok.jpg', ai: 'Grok' },
            ],
            winnerDescriptions: {
                'GPT Image': {
                    ko: '당신은 따뜻하고 안정적인 존재에 끌리는 사람입니다.\n화려하진 않지만 곁에 있으면 마음이 편안해지는 느낌을 좋아하죠.\n"믿음직한 동반자"를 가장 중요하게 여기는 타입입니다.',
                    en: 'You are drawn to warm, steady companions.\nNot flashy, but comforting just by being there.\nYou value a "reliable partner" above all else.',
                    ja: 'あなたは温かくて安定した存在に惹かれる人です。\n派手ではないけれど、そばにいるだけで心が落ち着く感覚が好きです。\n「信頼できるパートナー」を最も大切にするタイプです。',
                    zh: '你是一个被温暖稳定的存在所吸引的人。\n不华丽，但在身边就能让人安心。\n你最看重"可靠的伙伴"。',
                },
                'NanoBanana Pro': {
                    ko: '당신은 꾸밈없는 야생의 매력에 끌리는 사람입니다.\n강인하면서도 진솔한 눈빛, 있는 그대로의 모습을 사랑하죠.\n"자연스러운 멋"을 아는 타입입니다.',
                    en: 'You are attracted to raw, untamed charm.\nStrong yet honest eyes — you love authenticity as it is.\nYou appreciate "natural coolness" over polish.',
                    ja: 'あなたは飾らない野生の魅力に惹かれる人です。\n力強くも誠実な眼差し、ありのままの姿を愛します。\n「自然体のかっこよさ」を知っているタイプです。',
                    zh: '你是一个被质朴野性魅力吸引的人。\n强健却真诚的眼神，你爱的是最本真的样子。\n你懂得欣赏"自然之美"。',
                },
                'Higgsfield': {
                    ko: '당신은 세련되고 우아한 분위기를 선호하는 사람입니다.\n깔끔한 라인과 단정한 인상에 마음을 빼앗기죠.\n"품격 있는 아름다움"에 눈이 가는 타입입니다.',
                    en: 'You prefer refined and graceful vibes.\nClean lines and a neat impression win your heart.\nYou have an eye for "elegant beauty".',
                    ja: 'あなたは洗練された優雅な雰囲気を好む人です。\nすっきりしたラインと端正な印象に心を奪われます。\n「品格ある美しさ」に目がいくタイプです。',
                    zh: '你是一个偏爱优雅精致氛围的人。\n干净的线条和端庄的印象最打动你。\n你对"有品格的美"情有独钟。',
                },
                'KLING O1': {
                    ko: '당신은 솔직하고 충직한 눈빛에 약한 사람입니다.\n꾸밈없이 바라보는 그 눈에서 진심을 읽어내죠.\n"한결같은 마음"을 알아보는 타입입니다.',
                    en: 'You are a sucker for honest, loyal eyes.\nYou read sincerity in an unguarded gaze.\nYou recognize and value "unwavering devotion".',
                    ja: 'あなたは素直で忠実な眼差しに弱い人です。\n飾らずに見つめるその目から本心を読み取ります。\n「一途な心」を見抜くタイプです。',
                    zh: '你是一个对坦诚忠实的眼神毫无抵抗力的人。\n你能从毫无修饰的目光中读出真心。\n你是能看穿"始终如一的心"的类型。',
                },
                'Seedream 4.5': {
                    ko: '당신은 몽환적이고 감성적인 분위기에 끌리는 사람입니다.\n은빛 털과 호박색 눈동자처럼, 신비로운 아름다움을 사랑하죠.\n"이야기가 담긴 눈빛"에 빠지는 타입입니다.',
                    en: 'You are drawn to dreamy, emotional atmospheres.\nLike silver fur and amber eyes — you love mysterious beauty.\nYou fall for "eyes that tell a story".',
                    ja: 'あなたは夢幻的で感性的な雰囲気に惹かれる人です。\n銀色の毛と琥珀色の瞳のように、神秘的な美しさを愛します。\n「物語を宿した眼差し」に落ちるタイプです。',
                    zh: '你是一个被梦幻感性氛围所吸引的人。\n如同银色毛发和琥珀色眼眸，你爱的是神秘之美。\n你会被"蕴含故事的眼神"打动。',
                },
                'Reve': {
                    ko: '당신은 조용하고 부드러운 감성을 사랑하는 사람입니다.\n흑백 사진 속 한 장면처럼, 잔잔한 여운이 남는 순간을 좋아하죠.\n"고요한 아름다움"을 느끼는 타입입니다.',
                    en: 'You love quiet, gentle emotions.\nLike a scene from a black-and-white photo — you enjoy lingering moments.\nYou feel "beauty in stillness".',
                    ja: 'あなたは静かで優しい感性を愛する人です。\nモノクロ写真の一場面のように、静かな余韻が残る瞬間が好きです。\n「静寂の美しさ」を感じるタイプです。',
                    zh: '你是一个热爱安静温柔情感的人。\n如同黑白照片中的一幕，你喜欢留有余韵的瞬间。\n你能感受到"静谧之美"。',
                },
                'Wan 2.2': {
                    ko: '당신은 또렷한 개성과 강한 존재감에 끌리는 사람입니다.\n선명한 색감과 당당한 눈빛, 한눈에 사로잡는 매력을 좋아하죠.\n"첫눈에 반하는" 타입입니다.',
                    en: 'You are drawn to vivid personality and strong presence.\nBold colors and a confident gaze — you love instant magnetism.\nYou are the "love at first sight" type.',
                    ja: 'あなたは鮮明な個性と強い存在感に惹かれる人です。\nはっきりした色合いと堂々とした眼差し、一目で魅了する力が好きです。\n「一目惚れする」タイプです。',
                    zh: '你是一个被鲜明个性和强大存在感吸引的人。\n鲜艳的色彩和自信的目光，你爱的是瞬间的吸引力。\n你是"一见钟情"的类型。',
                },
                'Grok': {
                    ko: '당신은 묵직한 존재감과 깊은 눈빛을 가진 상대에 끌리는 사람입니다.\n말없이 바라보는 것만으로 위로가 되는, 그런 따뜻함을 좋아하죠.\n"듬직한 수호자"를 원하는 타입입니다.',
                    en: 'You are drawn to a solid presence with deep, soulful eyes.\nJust a quiet gaze is enough to comfort you.\nYou want a "dependable guardian" by your side.',
                    ja: 'あなたはどっしりとした存在感と深い眼差しを持つ相手に惹かれる人です。\n黙って見つめるだけで癒される、そんな温かさが好きです。\n「頼もしい守護者」を求めるタイプです。',
                    zh: '你是一个被沉稳存在感和深邃目光所吸引的人。\n只是静静注视就能带来慰藉，你喜欢这样的温暖。\n你想要的是"可靠的守护者"。',
                },
            },
            tournamentType: 'dog-ai',
        },
        'female-ai-animation': {
            images: [
                { id: 1, src: 'videos/Female AI Animation Ideal Worldcup/GPT-image.mp4', img: 'images/Female AI Animation Ideal Worldcup/GPT-image.png', ai: 'GPT Image' },
                { id: 2, src: 'videos/Female AI Animation Ideal Worldcup/nanobanana_pro.mp4', img: 'images/Female AI Animation Ideal Worldcup/nanobanana_pro.png', ai: 'NanoBanana Pro' },
                { id: 3, src: 'videos/Female AI Animation Ideal Worldcup/Hunyuan.mp4', img: 'images/Female AI Animation Ideal Worldcup/Hunyuan.jpg', ai: 'Hunyuan' },
                { id: 4, src: 'videos/Female AI Animation Ideal Worldcup/seedream.mp4', img: 'images/Female AI Animation Ideal Worldcup/seedream.jpeg', ai: 'Seedream' },
                { id: 5, src: 'videos/Female AI Animation Ideal Worldcup/flux2.pro.mp4', img: 'images/Female AI Animation Ideal Worldcup/Flux2.pro.png', ai: 'Flux 2 Pro' },
                { id: 6, src: 'videos/Female AI Animation Ideal Worldcup/Recraft.mp4', img: 'images/Female AI Animation Ideal Worldcup/Recraft.png', ai: 'Recraft' },
                { id: 7, src: 'videos/Female AI Animation Ideal Worldcup/Reve.mp4', img: 'images/Female AI Animation Ideal Worldcup/Reve.jpg', ai: 'Reve' },
                { id: 8, src: 'videos/Female AI Animation Ideal Worldcup/Grok.mp4', img: 'images/Female AI Animation Ideal Worldcup/Grok.jpg', ai: 'Grok' },
            ],
            winnerDescriptions: {
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
            },
            tournamentType: 'female-ai-animation',
        },
    };

    // Current category & helpers
    let currentCategory = 'dog-ai';
    function getCurrentImages() { return categories[currentCategory].images; }
    function getCurrentDescriptions() { return categories[currentCategory].winnerDescriptions; }

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
            startBtn: '시작하기',
            sidebarTitle: 'AI 주인공 월드컵',
            categoryDog: 'AI 강아지\n주인공월드컵',
            categoryFemale: '여자 AI 애니메이션\n주인공월드컵',
            categoryMale: '남자 AI 애니메이션\n주인공월드컵',
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
            aiModelLabel: 'AI 모델',
            generateMovie: '영화 생성',
            webtoon: '웹툰',
            movie: '영화',
            signUp: '가입하기',
            signUpRequired: '가입이 필요합니다. (Coming soon)',
            // Footer
            about: '소개',
            terms: '이용약관',
            privacy: '개인정보 처리방침',
            adNotice: '광고 안내',
            // Community
            community: '커뮤니티',
            communityTitle: '커뮤니티',
            communityBack: '돌아가기',
            // Community tabs
            communityAll: '전체',
            communityNotice: '공지',
            communityNovel: '소설',
            communityWrite: '글쓰기',
            communityAuthor: '작가',
            // Comments
            commentHeading: '댓글',
            commentPlaceholderAuthor: '닉네임 (선택)',
            commentPasswordPlaceholder: '비밀번호 (수정/삭제용)',
            commentPlaceholderContent: '댓글을 입력하세요...',
            commentSubmit: '등록',
            commentEmpty: '아직 댓글이 없습니다.',
            commentAnon: '익명',
            commentLoading: '댓글 불러오는 중...',
            commentEdit: '수정',
            commentDelete: '삭제',
            commentDeleteConfirm: '삭제 확인',
            commentSave: '저장',
            commentCancel: '취소',
            commentProcessing: '처리 중...',
            commentWrongPassword: '비밀번호가 틀렸습니다.',
            commentPasswordHint: '비밀번호를 입력하세요',
            // Contact
            contact: '문의',
            contactTitle: '문의하기',
            contactMsg: '문의 내용은 아래 이메일로 보내주세요.',
            // Category-specific landing
            landing: {
                'dog-ai': { title: 'AI 강아지 주인공월드컵', subtitle: 'AI로 만든 8마리 강아지 중 내 취향인 강아지를 골라보세요!' },
                'female-ai-animation': { title: '여자 AI 애니메이션 주인공월드컵', subtitle: '8명의 AI 애니메이션 캐릭터 중 나의 주인공을 골라보세요!' },
            },
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
            startBtn: 'Start',
            sidebarTitle: 'AI Protagonist Worldcup',
            categoryDog: 'AI Dog\nProtagonist Worldcup',
            categoryFemale: 'Female AI Animation\nProtagonist Worldcup',
            categoryMale: 'Male AI Animation\nProtagonist Worldcup',
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
            aiModelLabel: 'AI Model',
            generateMovie: 'Generate Movie',
            webtoon: 'Webtoon',
            movie: 'Movie',
            signUp: 'Sign Up',
            signUpRequired: 'Sign-in required. (Coming soon)',
            about: 'About',
            terms: 'Terms of Service',
            privacy: 'Privacy Policy',
            adNotice: 'Ad Notice',
            community: 'Community',
            communityTitle: 'Community',
            communityBack: 'Back',
            communityAll: 'All',
            communityNotice: 'Notice',
            communityNovel: 'Novel',
            communityWrite: 'Write',
            communityAuthor: 'Author',
            // Comments
            commentHeading: 'Comments',
            commentPlaceholderAuthor: 'Nickname (optional)',
            commentPasswordPlaceholder: 'Password (for edit/delete)',
            commentPlaceholderContent: 'Write a comment...',
            commentSubmit: 'Post',
            commentEmpty: 'No comments yet.',
            commentAnon: 'Anonymous',
            commentLoading: 'Loading comments...',
            commentEdit: 'Edit',
            commentDelete: 'Delete',
            commentDeleteConfirm: 'Confirm Delete',
            commentSave: 'Save',
            commentCancel: 'Cancel',
            commentProcessing: 'Processing...',
            commentWrongPassword: 'Wrong password.',
            commentPasswordHint: 'Enter password',
            contact: 'Contact',
            contactTitle: 'Contact Us',
            contactMsg: 'Please send your inquiries to the email below.',
            landing: {
                'dog-ai': { title: 'AI Dog Protagonist Worldcup', subtitle: 'Pick your favorite among 8 AI-generated dogs!' },
                'female-ai-animation': { title: 'Female AI Animation Protagonist Worldcup', subtitle: 'Pick your protagonist among 8 AI animation characters!' },
            },
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
            startBtn: 'スタート',
            sidebarTitle: 'AI主人公ワールドカップ',
            categoryDog: 'AI犬\n主人公ワールドカップ',
            categoryFemale: '女性AIアニメ\n主人公ワールドカップ',
            categoryMale: '男性AIアニメ\n主人公ワールドカップ',
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
            aiModelLabel: 'AIモデル',
            generateMovie: '映画生成',
            webtoon: 'ウェブトゥーン',
            movie: '映画',
            signUp: '新規登録',
            signUpRequired: 'ログインが必要です。（Coming soon）',
            about: '紹介',
            terms: '利用規約',
            privacy: 'プライバシーポリシー',
            adNotice: '広告について',
            community: 'コミュニティ',
            communityTitle: 'コミュニティ',
            communityBack: '戻る',
            communityAll: '全体',
            communityNotice: 'お知らせ',
            communityNovel: '小説',
            communityWrite: '投稿',
            communityAuthor: '作家',
            // Comments
            commentHeading: 'コメント',
            commentPlaceholderAuthor: 'ニックネーム（任意）',
            commentPasswordPlaceholder: 'パスワード（修正/削除用）',
            commentPlaceholderContent: 'コメントを入力してください...',
            commentSubmit: '投稿',
            commentEmpty: 'まだコメントはありません。',
            commentAnon: '匿名',
            commentLoading: 'コメント読み込み中...',
            commentEdit: '修正',
            commentDelete: '削除',
            commentDeleteConfirm: '削除確認',
            commentSave: '保存',
            commentCancel: 'キャンセル',
            commentProcessing: '処理中...',
            commentWrongPassword: 'パスワードが違います。',
            commentPasswordHint: 'パスワードを入力',
            contact: 'お問い合わせ',
            contactTitle: 'お問い合わせ',
            contactMsg: 'お問い合わせは下記メールアドレスまでお送りください。',
            landing: {
                'dog-ai': { title: 'AI犬 主人公ワールドカップ', subtitle: 'AIが作った8匹の犬から好みの犬を選ぼう！' },
                'female-ai-animation': { title: '女性AIアニメ主人公ワールドカップ', subtitle: '8人のAIアニメキャラから主人公を選ぼう！' },
            },
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
            startBtn: '开始',
            sidebarTitle: 'AI主角世界杯',
            categoryDog: 'AI狗狗\n主角世界杯',
            categoryFemale: '女性AI动画\n主角世界杯',
            categoryMale: '男性AI动画\n主角世界杯',
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
            aiModelLabel: 'AI模型',
            generateMovie: '生成电影',
            webtoon: '网漫',
            movie: '电影',
            signUp: '注册',
            signUpRequired: '需要登录。（Coming soon）',
            about: '关于',
            terms: '服务条款',
            privacy: '隐私政策',
            adNotice: '广告说明',
            community: '社区',
            communityTitle: '社区',
            communityBack: '返回',
            communityAll: '全部',
            communityNotice: '公告',
            communityNovel: '小说',
            communityWrite: '写文章',
            communityAuthor: '作者',
            // Comments
            commentHeading: '评论',
            commentPlaceholderAuthor: '昵称（可选）',
            commentPasswordPlaceholder: '密码（用于编辑/删除）',
            commentPlaceholderContent: '写下评论...',
            commentSubmit: '发布',
            commentEmpty: '暂无评论。',
            commentAnon: '匿名',
            commentLoading: '加载评论中...',
            commentEdit: '编辑',
            commentDelete: '删除',
            commentDeleteConfirm: '确认删除',
            commentSave: '保存',
            commentCancel: '取消',
            commentProcessing: '处理中...',
            commentWrongPassword: '密码错误。',
            commentPasswordHint: '请输入密码',
            contact: '联系我们',
            contactTitle: '联系我们',
            contactMsg: '请将您的问题发送至以下邮箱。',
            landing: {
                'dog-ai': { title: 'AI狗狗主角世界杯', subtitle: '从8只AI生成的狗狗中选出你最喜欢的！' },
                'female-ai-animation': { title: '女性AI动画主角世界杯', subtitle: '从8位AI动画角色中选出你的主角！' },
            },
        },
    };

    let currentLang = 'ko';
    let currentRound = 8;
    let contenders = [...getCurrentImages()];
    let winners = [];
    let currentWinner = null;

    const landingPage = document.getElementById('landing-page');
    const gameArea = document.getElementById('game-area');
    const roundTitleEl = document.getElementById('round-title');
    const tournamentContainer = document.getElementById('tournament-container');
    const winnerContainer = document.getElementById('winner-container');
    const langButtons = document.querySelectorAll('#globe-dropdown button');

    function updatePreviewGrid() {
        const grid = document.querySelector('.preview-grid');
        grid.innerHTML = getCurrentImages().map(item => `
            <div class="preview-item">
                <video autoplay loop muted playsinline>
                    <source src="${item.src}" type="video/mp4">
                </video>
            </div>
        `).join('');
    }

    function updateTexts() {
        const lang = i18n[currentLang];
        document.title = lang.sidebarTitle;

        // Sidebar texts
        document.querySelector('.sidebar-title').textContent = lang.sidebarTitle;
        document.querySelector('#category-dog .category-label').innerHTML = lang.categoryDog.replace('\n', '<br>');
        document.querySelector('#category-female .category-label').innerHTML = lang.categoryFemale.replace('\n', '<br>');
        document.querySelector('#category-male .category-label').innerHTML = lang.categoryMale.replace('\n', '<br>');
        document.querySelector('.coming-soon').textContent = lang.comingSoon;

        // Landing page texts (category-specific)
        const landingTexts = lang.landing[currentCategory];
        document.querySelector('.landing-title').textContent = landingTexts.title;
        document.querySelector('.landing-subtitle').textContent = landingTexts.subtitle;
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

        // Studio buttons & Header menus
        document.getElementById('write-webtoon-btn').childNodes[0].textContent = lang.webtoon + ' ';
        document.getElementById('write-movie-btn').childNodes[0].textContent = lang.movie + ' ';
        document.getElementById('menu-signup-text').textContent = lang.signUp;
        document.getElementById('menu-community-text').textContent = lang.community;
        document.getElementById('menu-contact-text').textContent = lang.contact;
        document.getElementById('footer-about').textContent = lang.about;
        document.getElementById('footer-terms').textContent = lang.terms;
        document.getElementById('footer-privacy').textContent = lang.privacy;
        document.getElementById('footer-ad').textContent = lang.adNotice;
        document.getElementById('community-title').textContent = lang.communityTitle;
        document.getElementById('community-back-btn').textContent = lang.communityBack;
        document.getElementById('post-back-btn').textContent = lang.communityBack;
        document.getElementById('contact-modal-title').textContent = lang.contactTitle;
        document.getElementById('contact-msg').textContent = lang.contactMsg;

        // Community tabs & write btn
        document.getElementById('tab-all').textContent = lang.communityAll;
        document.getElementById('tab-notice').textContent = lang.communityNotice;
        document.getElementById('tab-novel').textContent = lang.communityNovel;
        document.getElementById('community-write-text').textContent = lang.communityWrite;

        // Comment section
        document.getElementById('comment-heading-text').textContent = lang.commentHeading;
        document.getElementById('comment-author-input').placeholder = lang.commentPlaceholderAuthor;
        document.getElementById('comment-password-input').placeholder = lang.commentPasswordPlaceholder;
        document.getElementById('comment-input').placeholder = lang.commentPlaceholderContent;
        document.getElementById('comment-submit').textContent = lang.commentSubmit;

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
            document.getElementById('novel-model-label').textContent = lang.aiModelLabel;
            document.getElementById('novel-movie-text').textContent = lang.generateMovie;
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
        const desc = getCurrentDescriptions()[currentWinner.ai];
        if (desc) {
            descEl.textContent = desc[currentLang] || desc['en'];
            descEl.style.display = 'block';
        } else {
            descEl.style.display = 'none';
        }
    }

    const categoryToSidebar = {
        'dog-ai': 'category-dog',
        'female-ai-animation': 'category-female',
    };

    function switchCategory(categoryId) {
        currentCategory = categoryId;
        // Update sidebar active state
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.toggle('active', item.id === categoryToSidebar[categoryId]);
        });
        updatePreviewGrid();
        showLanding();
    }

    function showLanding() {
        landingPage.style.display = 'flex';
        gameArea.style.display = 'none';
        document.getElementById('community-page').style.display = 'none';
        updateTexts();
    }

    function startTournament() {
        landingPage.style.display = 'none';
        gameArea.style.display = 'block';
        contenders = [...getCurrentImages()];
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
            category: currentCategory,
        });
        fetch(SCRIPT_URL + '?' + voteParams.toString(), { mode: 'no-cors' }).catch(() => {});
    }

    // Google Apps Script
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwpD_eNlqkaQ0-IAUmwae5qGJHYDbvOXhcChfuOix8jEOs655HrfkbsjOnATAfqATOx/exec';

    // 비디오 파일명 → 이미지 경로 매핑
    function getImageFromVideo(videoFilename) {
        const entry = getCurrentImages().find(item => item.src.endsWith(videoFilename));
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
            let url = SCRIPT_URL + '?action=getRankings&category=' + currentCategory;
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
                category: currentCategory,
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

    // Sidebar category clicks
    document.getElementById('category-dog').addEventListener('click', () => switchCategory('dog-ai'));
    document.getElementById('category-female').addEventListener('click', () => switchCategory('female-ai-animation'));

    // Language selector
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentLang = button.dataset.lang;
            globeDropdown.classList.remove('open');
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
        const aiModel = document.getElementById('novel-model').value;

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
                tournamentType: categories[currentCategory].tournamentType,
                language: currentLang,
                genre: genre,
                humor: humor,
                catharsis: catharsis,
                coherence: coherence,
                lengthMode: 'prologue',
                aiModel: aiModel,
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
                document.getElementById('novel-movie-btn').style.display = 'inline-block';
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
        document.getElementById('novel-movie-btn').style.display = 'none';
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

    // ===== Dropdown Menus =====
    const globeBtn = document.getElementById('globe-btn');
    const globeDropdown = document.getElementById('globe-dropdown');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const hamburgerDropdown = document.getElementById('hamburger-dropdown');

    globeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        globeDropdown.classList.toggle('open');
        hamburgerDropdown.classList.remove('open');
    });

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburgerDropdown.classList.toggle('open');
        globeDropdown.classList.remove('open');
    });

    document.addEventListener('click', () => {
        globeDropdown.classList.remove('open');
        hamburgerDropdown.classList.remove('open');
    });

    globeDropdown.addEventListener('click', (e) => e.stopPropagation());
    hamburgerDropdown.addEventListener('click', (e) => e.stopPropagation());

    // ===== Community =====
    const communityPage = document.getElementById('community-page');
    const communityList = document.getElementById('community-list');
    const communityPost = document.getElementById('community-post');
    let communityPosts = [];
    let communityFilter = 'all';

    function showCommunity() {
        landingPage.style.display = 'none';
        gameArea.style.display = 'none';
        communityPage.style.display = 'block';
        communityList.style.display = 'flex';
        communityPost.style.display = 'none';
        hamburgerDropdown.classList.remove('open');
        loadCommunityList();
    }

    function hideCommunity() {
        communityPage.style.display = 'none';
        showLanding();
    }

    async function loadCommunityList() {
        try {
            const res = await fetch('posts/index.json');
            communityPosts = await res.json();
            renderCommunityList();
        } catch (err) {
            communityList.innerHTML = '<p style="color:#aaa;">No posts yet.</p>';
        }
    }

    function renderCommunityList() {
        const lang = i18n[currentLang];
        const filtered = communityFilter === 'all'
            ? communityPosts
            : communityPosts.filter(p => p.category === communityFilter);

        communityList.innerHTML = filtered.map(post => {
            const title = post.title[currentLang] || post.title['en'];
            const summary = post.summary[currentLang] || post.summary['en'];
            const authorHtml = post.author
                ? `<div class="community-card-author">${lang.communityAuthor}: ${post.author}</div>`
                : '';
            return `
                <div class="community-card" data-id="${post.id}">
                    <div class="community-card-title">${title}</div>
                    <div class="community-card-summary">${summary}</div>
                    <div class="community-card-date">${post.date}</div>
                    ${authorHtml}
                </div>
            `;
        }).join('');

        communityList.querySelectorAll('.community-card').forEach(card => {
            card.addEventListener('click', () => openPost(card.dataset.id));
        });
    }

    // Community tab clicks
    document.querySelectorAll('.community-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            communityFilter = tab.dataset.filter;
            document.querySelectorAll('.community-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderCommunityList();
        });
    });

    let currentPostId = null;

    async function openPost(postId) {
        const post = communityPosts.find(p => p.id === postId);
        if (!post) return;

        currentPostId = postId;
        const lang = i18n[currentLang];
        communityList.style.display = 'none';
        communityPost.style.display = 'block';
        document.getElementById('post-title').textContent = post.title[currentLang] || post.title['en'];
        document.getElementById('post-date').textContent = post.date;

        const authorEl = document.getElementById('post-author');
        if (post.author) {
            authorEl.textContent = `${lang.communityAuthor}: ${post.author}`;
            authorEl.style.display = 'block';
        } else {
            authorEl.style.display = 'none';
        }

        try {
            const res = await fetch('posts/' + post.file);
            const text = await res.text();
            document.getElementById('post-content').textContent = text;
        } catch (err) {
            document.getElementById('post-content').textContent = 'Failed to load content.';
        }

        loadComments(postId);
    }

    // ===== Comments =====
    async function loadComments(postId) {
        const lang = i18n[currentLang];
        const commentList = document.getElementById('comment-list');
        commentList.innerHTML = `<p class="comment-empty">${lang.commentLoading}</p>`;
        try {
            const url = SCRIPT_URL + '?action=getComments&postId=' + encodeURIComponent(postId);
            const res = await fetch(url, { redirect: 'follow' });
            const comments = await res.json();
            renderComments(comments);
            return comments;
        } catch (err) {
            renderComments([]);
            return [];
        }
    }

    function renderComments(comments) {
        const lang = i18n[currentLang];
        const commentList = document.getElementById('comment-list');
        const countEl = document.getElementById('comment-count');
        countEl.textContent = comments.length;

        if (comments.length === 0) {
            commentList.innerHTML = `<p class="comment-empty">${lang.commentEmpty}</p>`;
            return;
        }

        commentList.innerHTML = comments.map(c => {
            const author = (c.author || lang.commentAnon).replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const date = c.timestamp ? new Date(c.timestamp).toLocaleDateString(currentLang, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
            const content = c.content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const safeContent = c.content.replace(/"/g, '&quot;');
            const editDeleteBtns = c.id ? `
                <div class="comment-actions">
                    <button class="comment-edit-btn">${lang.commentEdit}</button>
                    <button class="comment-delete-btn">${lang.commentDelete}</button>
                </div>` : '';
            return `<div class="comment-item" data-id="${c.id || ''}" data-content="${safeContent}">
                <div class="comment-meta">
                    <span class="comment-author">${author}</span>
                    <span class="comment-date">${date}</span>
                    ${editDeleteBtns}
                </div>
                <div class="comment-content">${content}</div>
                <div class="comment-action-form"></div>
            </div>`;
        }).join('');
    }

    // 댓글 수정/삭제 이벤트 위임
    document.getElementById('comment-list').addEventListener('click', async function(e) {
        const btn = e.target.closest('button');
        if (!btn) return;
        const item = btn.closest('.comment-item');
        if (!item) return;
        const commentId = item.dataset.id;
        const actionForm = item.querySelector('.comment-action-form');
        const lang = i18n[currentLang];

        if (btn.classList.contains('comment-delete-btn')) {
            actionForm.innerHTML = `
                <input type="password" class="comment-pw-inline" placeholder="${lang.commentPasswordHint}" maxlength="30">
                <button class="comment-delete-confirm-btn">${lang.commentDeleteConfirm}</button>
                <button class="comment-cancel-btn">${lang.commentCancel}</button>`;

        } else if (btn.classList.contains('comment-edit-btn')) {
            const originalContent = item.dataset.content;
            actionForm.innerHTML = `
                <textarea class="comment-edit-textarea" maxlength="500" rows="3">${originalContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
                <div class="comment-action-row">
                    <input type="password" class="comment-pw-inline" placeholder="${lang.commentPasswordHint}" maxlength="30">
                    <button class="comment-edit-save-btn">${lang.commentSave}</button>
                    <button class="comment-cancel-btn">${lang.commentCancel}</button>
                </div>`;

        } else if (btn.classList.contains('comment-cancel-btn')) {
            actionForm.innerHTML = '';

        } else if (btn.classList.contains('comment-delete-confirm-btn')) {
            const pw = actionForm.querySelector('.comment-pw-inline').value;
            if (!pw) return;
            actionForm.innerHTML = `<span class="comment-processing">${lang.commentProcessing}</span>`;
            const params = new URLSearchParams({ action: 'deleteComment', id: commentId, password: pw });
            try { fetch(SCRIPT_URL + '?' + params.toString(), { mode: 'no-cors' }); } catch (err) {}
            await new Promise(r => setTimeout(r, 1800));
            const updated = await loadComments(currentPostId);
            // 삭제 실패 (비밀번호 오류) 감지: id가 여전히 목록에 있으면
            if (updated.find(c => c.id === commentId)) {
                const failItem = document.querySelector(`.comment-item[data-id="${commentId}"] .comment-action-form`);
                if (failItem) failItem.innerHTML = `<span class="comment-error">${lang.commentWrongPassword}</span>`;
            }

        } else if (btn.classList.contains('comment-edit-save-btn')) {
            const pw = actionForm.querySelector('.comment-pw-inline').value;
            const newContent = actionForm.querySelector('.comment-edit-textarea').value.trim();
            if (!pw || !newContent) return;
            actionForm.innerHTML = `<span class="comment-processing">${lang.commentProcessing}</span>`;
            const params = new URLSearchParams({ action: 'updateComment', id: commentId, password: pw, content: newContent });
            try { fetch(SCRIPT_URL + '?' + params.toString(), { mode: 'no-cors' }); } catch (err) {}
            await new Promise(r => setTimeout(r, 1800));
            const updated = await loadComments(currentPostId);
            // 수정 실패 감지: 내용이 그대로면
            const found = updated.find(c => c.id === commentId);
            if (found && found.content === item.dataset.content) {
                const failItem = document.querySelector(`.comment-item[data-id="${commentId}"] .comment-action-form`);
                if (failItem) failItem.innerHTML = `<span class="comment-error">${lang.commentWrongPassword}</span>`;
            }
        }
    });

    document.getElementById('comment-submit').addEventListener('click', async () => {
        if (!currentPostId) return;
        const lang = i18n[currentLang];
        const authorInput = document.getElementById('comment-author-input');
        const passwordInput = document.getElementById('comment-password-input');
        const contentInput = document.getElementById('comment-input');
        const author = authorInput.value.trim() || lang.commentAnon;
        const password = passwordInput.value;
        const content = contentInput.value.trim();
        if (!content) return;

        const submitBtn = document.getElementById('comment-submit');
        submitBtn.disabled = true;

        const params = new URLSearchParams({
            action: 'addComment',
            postId: currentPostId,
            author: author,
            password: password,
            content: content
        });

        try {
            fetch(SCRIPT_URL + '?' + params.toString(), { mode: 'no-cors' });
        } catch (err) { /* ignore */ }

        authorInput.value = '';
        passwordInput.value = '';
        contentInput.value = '';
        await new Promise(r => setTimeout(r, 1800));
        submitBtn.disabled = false;
        await loadComments(currentPostId);
    });

    document.getElementById('menu-community').addEventListener('click', showCommunity);
    document.getElementById('community-back-btn').addEventListener('click', hideCommunity);
    document.getElementById('post-back-btn').addEventListener('click', () => {
        communityPost.style.display = 'none';
        communityList.style.display = 'flex';
    });

    // ===== Legal Modal (Footer) =====
    const legalModalOverlay = document.getElementById('legal-modal-overlay');
    const legalModalTitle = document.getElementById('legal-modal-title');
    const legalModalContent = document.getElementById('legal-modal-content');

    async function openLegal(file, titleKey) {
        const lang = i18n[currentLang];
        legalModalTitle.textContent = lang[titleKey];
        legalModalContent.textContent = 'Loading...';
        legalModalOverlay.style.display = 'flex';
        try {
            const res = await fetch('posts/' + file);
            legalModalContent.textContent = await res.text();
        } catch (err) {
            legalModalContent.textContent = 'Failed to load.';
        }
    }

    document.getElementById('footer-about').addEventListener('click', (e) => { e.preventDefault(); openLegal('about.txt', 'about'); });
    document.getElementById('footer-terms').addEventListener('click', (e) => { e.preventDefault(); openLegal('terms.txt', 'terms'); });
    document.getElementById('footer-privacy').addEventListener('click', (e) => { e.preventDefault(); openLegal('privacy.txt', 'privacy'); });
    document.getElementById('footer-ad').addEventListener('click', (e) => { e.preventDefault(); openLegal('ad-notice.txt', 'adNotice'); });
    document.getElementById('legal-modal-close').addEventListener('click', () => { legalModalOverlay.style.display = 'none'; });
    legalModalOverlay.addEventListener('click', (e) => { if (e.target === legalModalOverlay) legalModalOverlay.style.display = 'none'; });

    // Contact modal
    const contactModalOverlay = document.getElementById('contact-modal-overlay');
    document.getElementById('menu-contact').addEventListener('click', () => {
        hamburgerDropdown.classList.remove('open');
        contactModalOverlay.style.display = 'flex';
    });
    document.getElementById('contact-modal-close').addEventListener('click', () => {
        contactModalOverlay.style.display = 'none';
    });
    contactModalOverlay.addEventListener('click', (e) => {
        if (e.target === contactModalOverlay) contactModalOverlay.style.display = 'none';
    });

    // Initialize: show landing with preview grid
    updatePreviewGrid();
    showLanding();
});
