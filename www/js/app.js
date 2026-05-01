/**
 * LEAGUE_MASTERS: 指定された10リーグのチーム名を格納
 * ※一般的な英語/ローマ字表記です。表示されない場合はコンソールのログを確認し、
 * APIが実際に吐き出している名前に書き換えてください。
 */
const LEAGUE_MASTERS = {
    // 1. イングランド1部
    "premier_league": [
        "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton", 
        "Chelsea", "Crystal Palace", "Everton", "Fulham", "Ipswich", 
        "Leicester", "Liverpool", "Manchester City", "Manchester United", 
        "Newcastle United", "Nottingham Forest", "Tottenham Hotspur", 
        "West Ham United", "Wolverhampton"
    ],
    // 2. スペイン1部
    "laliga": [
        "Alaves", "Athletic Club", "Atletico Madrid", "Barcelona", "Celta Vigo", 
        "Espanyol", "Getafe", "Gironina", "Las Palmas", "Leganes", 
        "Mallorca", "Osasuna", "Rayo Vallecano", "Real Betis", "Real Madrid", 
        "Real Sociedad", "Sevilla", "Valencia", "Valladolid", "Villarreal"
    ],
    // 3. ドイツ1部（確定版）
    "bundesliga": [
        "Bayern München", "Borussia Dortmund", "RB Leipzig", "VfB Stuttgart", "Hoffenheim", 
        "Bayer Leverkusen", "Eintracht Frankfurt", "Freiburg", "Augsburg", "Mainz 05", 
        "Borussia Mönchengladbach", "Werder Bremen", "Union Berlin", "1. FC Köln", 
        "Hamburger SV", "St. Pauli", "Wolfsburg", "FC Heidenheim"
    ],
    // 4. イタリア1部
    "serie_a": [
        "Atalanta", "Bologna", "Cagliari", "Como", "Empoli", 
        "Fiorentina", "Genoa", "Inter", "Juventus", "Lazio", 
        "Lecce", "Milan", "Monza", "Napoli", "Parma", 
        "Roma", "Torino", "Udinese", "Venezia", "Verona"
    ],
    // 5. フランス1部
    "ligue_1": [
        "Angers", "Auxerre", "Brest", "Le Havre", "Lens", 
        "Lille", "Lyon", "Marseille", "Monaco", "Montpellier", 
        "Nantes", "Nice", "PSG", "Reims", "Rennes", 
        "Saint-Etienne", "Strasbourg", "Toulouse"
    ],
    // 6. イングランド2部
    "championship": [
        "Blackburn", "Burnley", "Coventry", "Derby", "Leeds", 
        "Luton", "Middlesbrough", "Millwall", "Norwich", "Oxford", 
        "Plymouth", "Portsmouth", "Preston", "QPR", "Sheffield United", 
        "Sheffield Wednesday", "Stoke", "Sunderland", "Swansea", "Watford", 
        "West Bromwich Albion", "Bristol City", "Hull City", "Southampton", "Cardiff", "Birmingham"
    ],
    // 7. ベルギー1部
    "belgium": [
        "Anderlecht", "Antwerp", "Cercle Brugge", "Charleroi", "Club Brugge", 
        "Dender", "Genk", "Gent", "Kortrijk", "KV Mechelen", 
        "OH Leuven", "Sint-Truiden", "Standard Liege", "Union SG", "Westerlo", "Zulte Waregem"
    ],
    // 8. ポルトガル1部
    "portugal": [
        "Benfica", "Boavista", "Braga", "Casa Pia", "Estoril", 
        "Estrela da Amadora", "Famalicao", "Farense", "FC Porto", "Gil Vicente", 
        "Moreirense", "Nacional", "Rio Ave", "Santa Clara", "Sporting CP", 
        "Vitoria de Guimaraes", "AVS", "Arouca"
    ],
    // 9. オランダ1部
    "netherlands": [
        "Ajax", "Almere City", "AZ Alkmaar", "Feyenoord", "Fortuna Sittard", 
        "Go Ahead Eagles", "Groningen", "Heerenveen", "Heracles", "NAC Breda", 
        "NEC Nijmegen", "PEC Zwolle", "PSV Eindhoven", "RKC Waalwijk", "Sparta Rotterdam", 
        "Twente", "Utrecht", "Willem II"
    ],
    // 10. 日本 J1リーグ
    "j_league": [
        "Albirex Niigata", "Avispa Fukuoka", "Cerezo Osaka", "Consadole Sapporo", "FC Tokyo", 
        "Gamba Osaka", "Jubilo Iwata", "Kashima Antlers", "Kashiwa Reysol", "Kawasaki Frontale", 
        "Kyoto Sanga", "Machida Zelvia", "Nagoya Grampus", "Sagan Tosu", "Sanfrecce Hiroshima", 
        "Shonan Bellmare", "Tokyo Verdy", "Urawa Red Diamonds", "Vissel Kobe", "Yokohama F. Marinos"
    ],
    "ex": [
        "Bochum", "Fortuna Düsseldorf", "Darmstadt", "Hannover", "Karlsruhe", 
        "Preußen Münster", "Real Sociedad B", "Celtic"
    ]
};


// ▼▼ 日本人選手マスターデータ ▼▼

// ▼▼ 日本人選手マスターデータ（提供データからの完全抽出版） ▼▼
const JAPANESE_PLAYERS = {
    // イングランド1部・2部
    "Crystal Palace": ["鎌田大地"],
    "Liverpool": ["遠藤航"],
    "Brighton": ["三笘薫"],
    "Southampton": ["松木玖生"],
    "Leeds": ["田中碧"],
    "Blackburn": ["大橋祐紀", "森下龍矢"],
    "Coventry": ["坂元達裕"],
    "Hull City": ["平河悠"],
    "QPR": ["斉藤光毅"],
    "Stoke": ["瀬古樹"],
    "Birmingham": ["岩田智輝", "藤本寛也", "古橋亨梧"],

    // スペイン1部・2部
    "Real Sociedad": ["久保建英"],
    "Mallorca": ["浅野拓磨"],
    "Las Palmas": ["宮代大聖"],
    "Real Sociedad B": ["喜多壱也"],

    // ドイツ1部・2部
    "Bayern München": ["伊藤洋輝"],
    "Freiburg": ["鈴木唯人"],
    "Werder Bremen": ["菅原由勢"],
    "Eintracht Frankfurt": ["小杉啓太", "堂安律"],
    "Hoffenheim": ["町田浩樹"],
    "Mainz 05": ["川崎颯太", "佐野海舟"],
    "Borussia Mönchengladbach": ["高井幸大", "町野修斗"],
    "St. Pauli": ["ニック・シュミット", "安藤智哉", "原大智", "藤田譲瑠チマ"],
    "Wolfsburg": ["塩貝健人"],
    "Bochum": ["三好康児"],
    "Fortuna Düsseldorf": ["アペルカンプ真大", "田中聡"],
    "Darmstadt": ["秋山裕紀", "古川陽介"],
    "Hannover": ["松田隼風", "横田大祐"],
    "Karlsruhe": ["福田師王"],
    "Preußen Münster": ["山田新"],

    // イタリア1部
    "Parma": ["鈴木彩艶"],

    // フランス1部
    "Monaco": ["南野拓実"],
    "Le Havre": ["瀬古歩夢"],

    // ベルギー1部
    "OH Leuven": ["明本考浩", "大南拓磨"],
    "Westerlo": ["木村誠二", "齋藤俊輔", "坂本一彩"],
    "Genk": ["伊東純也", "横山歩夢", "吉永夢希"],
    "Sint-Truiden": ["伊藤涼太郎", "小久保玲央ブライアン", "後藤啓介", "新川志音", "谷口彰悟", "畑大雅", "松澤海斗", "山本理仁"],
    "Gent": ["伊藤敦樹", "橋岡大樹"],
    "Antwerp": ["綱島悠斗", "野沢大志ブランドン"],

    // オランダ1部
    "Ajax": ["板倉滉", "冨安健洋"],
    "NEC Nijmegen": ["小川航基", "佐野航大"],
    "Feyenoord": ["上田綺世", "渡辺剛"],
    "AZ Alkmaar": ["市原吏音", "毎熊晟矢"],
    "Sparta Rotterdam": ["三戸舜介"],

    // ポルトガル1部
    "Sporting CP": ["守田英正"],
    "Arouca": ["福井太智"],

    // スコットランド（10リーグ外）
    "Celtic": ["旗手怜央", "前田大然"]
};

let allMatches = [];

async function loadMatches() {
    const container = document.getElementById('match-list');
    const leagueFilter = document.getElementById('league-filter');
    const japaneseFilter = document.getElementById('japanese-filter'); // 追加
    
    try {
        const response = await fetch('/api/matches');
        const data = await response.json();
        
        if (!data.status || !data.response.matches) {
            container.innerHTML = '<p>試合データがありません。</p>';
            return;
        }

        allMatches = data.response.matches;

        // リスナーの登録（切り替え時に再描画されるようにする）
        leagueFilter.addEventListener('change', renderMatches);
        japaneseFilter.addEventListener('change', renderMatches); // 追加

        // 初回表示
        renderMatches();

    } catch (error) {
        console.error('Display Error:', error);
        container.innerHTML = '<p>データの取得に失敗しました。</p>';
    }
}

function renderMatches() {
    const container = document.getElementById('match-list');
    const selectedLeague = document.getElementById('league-filter').value;
    const isJapaneseOnly = document.getElementById('japanese-filter').checked; // チェック状態を取得
    
    // 1. リーグによる絞り込みの準備
    let targetTeams = [];
    if (selectedLeague === "all") {
        Object.values(LEAGUE_MASTERS).forEach(teams => {
            targetTeams = targetTeams.concat(teams);
        });
    } else {
        targetTeams = LEAGUE_MASTERS[selectedLeague] || [];
    }

    // 2. フィルタリングの実行
    const filtered = allMatches.filter(match => {
        // 条件A: 選んだリーグのチームが含まれているか
        const inTargetLeague = targetTeams.includes(match.home.name) || targetTeams.includes(match.away.name);
        if (!inTargetLeague) return false;

        // 条件B: 「日本人所属のみ」がONの場合、JAPANESE_PLAYERSに登録があるか
        if (isJapaneseOnly) {
            const hasJapaneseHome = JAPANESE_PLAYERS[match.home.name] !== undefined;
            const hasJapaneseAway = JAPANESE_PLAYERS[match.away.name] !== undefined;
            return hasJapaneseHome || hasJapaneseAway;
        }

        return true; // OFFの場合はリーグ条件だけで通過
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding: 40px; color: #888;">該当する試合予定はありません。</p>';
        return;
    }

    // 3. 画面への描画（選手名バッジの追加）
    container.innerHTML = filtered.map(match => {
        // JAPANESE_PLAYERSに登録があれば名前を取得し、HTMLバッジ化する
        const homePlayers = JAPANESE_PLAYERS[match.home.name] ? JAPANESE_PLAYERS[match.home.name].join(', ') : '';
        const awayPlayers = JAPANESE_PLAYERS[match.away.name] ? JAPANESE_PLAYERS[match.away.name].join(', ') : '';

        const homeBadge = homePlayers ? `<div style="font-size: 0.75em; color: white; background: #0046A7; padding: 3px 8px; border-radius: 10px; margin-top: 8px; display: inline-block;">🇯🇵 ${homePlayers}</div>` : '';
        const awayBadge = awayPlayers ? `<div style="font-size: 0.75em; color: white; background: #0046A7; padding: 3px 8px; border-radius: 10px; margin-top: 8px; display: inline-block;">🇯🇵 ${awayPlayers}</div>` : '';

        return `
            <div style="border: 1px solid #eee; padding: 20px; margin: 15px; border-radius: 12px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="font-size: 0.8em; color: #999; margin-bottom: 10px; text-align: center;">${match.time} (現地)</div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div style="width: 40%; text-align: center;">
                        <div style="font-weight: bold;">${match.home.name}</div>
                        ${homeBadge}
                    </div>
                    <div style="width: 20%; text-align: center; font-size: 1.2em; font-weight: 900; margin-top: 5px;">
                        ${match.home.score} - ${match.away.score}
                    </div>
                    <div style="width: 40%; text-align: center;">
                        <div style="font-weight: bold;">${match.away.name}</div>
                        ${awayBadge}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

loadMatches();
