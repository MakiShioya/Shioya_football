/**
 * LEAGUE_MASTERS: 14リーグの全チーム名をここに格納します。
 * APIの「Get Teams All List by League ID」で確認した名前を正確に入力してください。
 */
const LEAGUE_MASTERS = {
    "bundesliga": [
    "Bayern München",
    "Borussia Dortmund",
    "RB Leipzig",
    "VfB Stuttgart",
    "Hoffenheim",
    "Bayer Leverkusen",
    "Eintracht Frankfurt",
    "Freiburg",
    "Augsburg",
    "Mainz 05",
    "Borussia Mönchengladbach",
    "Werder Bremen",
    "Union Berlin",
    "1. FC Köln",
    "Hamburger SV",
    "St. Pauli",
    "Wolfsburg",
    "FC Heidenheim"
],
    "premier_league": [
        "Arsenal", "Liverpool", "Brighton", "Crystal Palace"
        // ここにプレミアリーグの全20チームを登録します
    ],
 
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



        console.log("--- 今日の試合データ構造の確認 ---");
        if (allMatches.length > 0) {
            // まず1件目の試合データの中身を「全て」出力し、リーグIDの項目名を探します
            console.log("1試合目の全データ:", allMatches[0]); 
            
            console.log("--- 本日の全試合リスト ---");
            allMatches.forEach(match => {
                // 試合のカードと、その試合オブジェクトの中身を出力します
                console.log(`${match.home.name} vs ${match.away.name}`, match);
            });
        }

        

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
