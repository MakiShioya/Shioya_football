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
        "Newcastle United", "Nottingham Forest", "Southampton", "Tottenham Hotspur", 
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
        "West Bromwich Albion", "Bristol City", "Hull City", "Cardiff"
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
    ]
};

let allMatches = []; // APIから取得した生データを保持

async function loadMatches() {
    const container = document.getElementById('match-list');
    const filter = document.getElementById('league-filter');
    
    try {
        const response = await fetch('/api/matches');
        const data = await response.json();
        
        if (!data.status || !data.response.matches) {
            container.innerHTML = '<p>試合データがありません。</p>';
            return;
        }

        allMatches = data.response.matches;

        // ▼▼ デバッグ用ログ：表示漏れがあったらここで実際のスペルを確認 ▼▼
        console.log("--- 今日の試合データ構造の確認 ---");
        if (allMatches.length > 0) {
            console.log("--- 本日の全試合リスト ---");
            allMatches.forEach(match => {
                console.log(`${match.home.name} vs ${match.away.name}`, match);
            });
        }
        // ▲▲ ここまで ▲▲

        // セレクトボックスが変更されたら表示を更新する設定
        filter.addEventListener('change', renderMatches);

        // 初回表示（全表示）
        renderMatches();

    } catch (error) {
        console.error('Display Error:', error);
        container.innerHTML = '<p>データの取得に失敗しました。</p>';
    }
}

function renderMatches() {
    const container = document.getElementById('match-list');
    const selectedValue = document.getElementById('league-filter').value;
    
    // 表示対象のチーム名を決定
    let targetTeams = [];
    if (selectedValue === "all") {
        // すべてのマスターリストを統合
        Object.values(LEAGUE_MASTERS).forEach(teams => {
            targetTeams = targetTeams.concat(teams);
        });
    } else {
        targetTeams = LEAGUE_MASTERS[selectedValue] || [];
    }

    // フィルタリング（完全一致判定）
    const filtered = allMatches.filter(match => 
        targetTeams.includes(match.home.name) || targetTeams.includes(match.away.name)
    );

    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding: 40px; color: #888;">今日の試合予定はありません。</p>';
        return;
    }

    // 画面への描画
    container.innerHTML = filtered.map(match => `
        <div style="border: 1px solid #eee; padding: 20px; margin: 15px; border-radius: 12px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="font-size: 0.8em; color: #999; margin-bottom: 10px; text-align: center;">${match.time} (現地)</div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="width: 40%; text-align: center; font-weight: bold;">${match.home.name}</div>
                <div style="width: 20%; text-align: center; font-size: 1.2em; font-weight: 900;">${match.home.score} - ${match.away.score}</div>
                <div style="width: 40%; text-align: center; font-weight: bold;">${match.away.name}</div>
            </div>
        </div>
    `).join('');
}

loadMatches();
