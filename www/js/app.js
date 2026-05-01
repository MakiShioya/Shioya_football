// 【マスターリスト】APIで確定させた名前をここへ追加していきます
const MASTER_TEAMS = {
    "bundesliga_1": ["Bayern München", "VfB Stuttgart", "Eintracht Frankfurt", "Freiburg", "Mainz 05", "Borussia Mönchengladbach", "Werder Bremen", "St. Pauli", "Hoffenheim"],
    "premier_league": ["Brighton", "Liverpool", "Crystal Palace", "Arsenal"],
    "laliga_1": ["Real Sociedad", "Mallorca"],
    "serie_a": ["Parma"],
    "ligue_1": ["Monaco", "Reims"],
    "j_league": ["町田ゼルビア", "ヴィッセル神戸"], // 例
    // 残りの2部リーグやベルギー、オランダ等も同様のキー（名前）で作っていきます
};

// 【表示設定】ここを書き換えるだけで表示内容が変わります
const APP_CONFIG = {
    // 表示したいリーグのキーを配列に入れる
    activeLeagues: ["bundesliga_1", "premier_league", "laliga_1", "serie_a", "ligue_1"],
    // デバッグモード：trueにするとAPIから届いた全チーム名をコンソールに出します
    debugMode: true 
};

async function loadMatches() {
    const container = document.getElementById('match-list');
    
    try {
        const response = await fetch('/api/matches');
        const data = await response.json();
        
        if (!data.status || !data.response.matches) {
            container.innerHTML = '<p>試合データがありません。</p>';
            return;
        }

        const matches = data.response.matches;

        // 1. 設定されているリーグのチームを一つの配列に統合する
        let currentTargets = [];
        APP_CONFIG.activeLeagues.forEach(leagueKey => {
            if (MASTER_TEAMS[leagueKey]) {
                currentTargets = currentTargets.concat(MASTER_TEAMS[leagueKey]);
            }
        });

        // 2. デバッグ用：全チーム名を出力（新しいチームの正式名称を知るため）
        if (APP_CONFIG.debugMode) {
            console.log("--- API Data Check ---");
            matches.forEach(m => console.log(`"${m.home.name}" vs "${m.away.name}"`));
        }

        // 3. 統合したリスト（currentTargets）に含まれるチームだけを抽出
        const filteredMatches = matches.filter(match => 
            currentTargets.includes(match.home.name) || 
            currentTargets.includes(match.away.name)
        );

        // --- 以下、表示処理（変更なし） ---
        if (filteredMatches.length === 0) {
            container.innerHTML = '<p style="text-align:center; color: #666; margin-top: 50px;">本日、注目チームの試合予定はありません。</p>';
            return;
        }

        container.innerHTML = filteredMatches.map(match => {
            const isFinished = match.status.finished;
            return `
                <div style="border: 1px solid #eee; padding: 25px; margin-bottom: 20px; border-radius: 16px; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <span style="font-size: 0.8em; background: #f0f0f0; padding: 4px 10px; border-radius: 20px; color: #555;">
                            ${match.time} (現地)
                        </span>
                        ${isFinished ? '<span style="font-size: 0.8em; color: #dc3545; font-weight: bold;">試合終了</span>' : ''}
                    </div>
                    <div style="display: flex; justify-content: space-around; align-items: center;">
                        <div style="width: 40%; text-align: center; font-weight: bold;">${match.home.name}</div>
                        <div style="width: 20%; text-align: center; font-size: 1.5em; font-weight: 900;">
                            ${match.home.score} - ${match.away.score}
                        </div>
                        <div style="width: 40%; text-align: center; font-weight: bold;">${match.away.name}</div>
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error('Display Error:', error);
        container.innerHTML = '<p>データの表示中にエラーが発生しました。</p>';
    }
}

loadMatches();
