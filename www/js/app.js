// チーム名を「完全一致」で指定します
const TARGET_TEAMS = [
    // Premier League (England)
    "Brighton", "Liverpool", "Crystal Palace", "Leeds",
    // La Liga (Spain)
    "Real Sociedad", "Mallorca",
    // Bundesliga (Germany)
    "Bayern Munich", "Eintracht Frankfurt", "Mainz 05", 
    "Borussia Monchengladbach", "SC Freiburg", "TSG Hoffenheim", 
    "FC St. Pauli", "Werder Bremen",
    // Ligue 1 (France)
    "Monaco", "Reims",
    // Serie A (Italy)
    "Parma"
];

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

        // 【デバッグ用】取得した全チーム名をコンソールに出力して「正解」を確認します
        console.log("--- APIから届いた全チーム名を確認中 ---");
        matches.forEach(m => {
            console.log(`[Home] "${m.home.name}" vs [Away] "${m.away.name}"`);
        });

        // 判定ロジックを「部分一致」かつ「大文字小文字を無視」に強化
        const filteredMatches = matches.filter(match => {
            const home = match.home.name.toLowerCase();
            const away = match.away.name.toLowerCase();
            
            // TARGET_TEAMSのいずれかの名前が、チーム名の中に含まれているか判定
            return TARGET_TEAMS.some(target => {
                const t = target.toLowerCase();
                return home.includes(t) || away.includes(t);
            });
        });

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
                        <div style="width: 40%; text-align: center;">
                            <div style="font-weight: bold; font-size: 1.1em;">${match.home.name}</div>
                        </div>
                        
                        <div style="width: 20%; text-align: center;">
                            <div style="font-size: 0.8em; color: #999; margin-bottom: 5px;">VS</div>
                            <div style="font-size: 1.5em; font-weight: 900; color: #333;">
                                ${match.home.score} - ${match.away.score}
                            </div>
                        </div>
                        
                        <div style="width: 40%; text-align: center;">
                            <div style="font-weight: bold; font-size: 1.1em;">${match.away.name}</div>
                        </div>
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
