// 日本人選手が所属するチーム名（今回のAPIはIDが不明なため、名前で判定します）
const TARGET_TEAMS = [
    "Brighton",    // 三笘
    "Monaco",      // 南野
    "Sociedad",    // 久保
    "Arsenal",     // 冨安
    "Liverpool",   // 遠藤
    "Freiburg"     // 堂安
];

async function loadMatches() {
    const container = document.getElementById('match-list');
    
    try {
        const response = await fetch('/api/matches');
        const data = await response.json();
        
        // 階層が data.response.matches になっているので、そこを取り出す
        const matches = data.response.matches;

        // ターゲットチームが含まれる試合を抽出（大文字小文字を区別せず判定）
        const filteredMatches = matches.filter(match => 
            TARGET_TEAMS.some(name => 
                match.home.name.includes(name) || match.away.name.includes(name)
            )
        );

        if (filteredMatches.length === 0) {
            container.innerHTML = '<p style="text-align:center; color: #666;">直近の注目試合は見つかりませんでした。</p>';
            return;
        }

        container.innerHTML = filteredMatches.map(match => {
            // APIの時刻形式 "30.04.2026 21:00" を利用
            const matchTime = match.time; 
            
            return `
                <div style="border: 1px solid #eee; padding: 20px; margin-bottom: 15px; border-radius: 12px; background: white; shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="font-size: 0.85em; color: #007bff; font-weight: bold; margin-bottom: 8px;">
                        試合開始: ${matchTime} (現地時間)
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="flex: 1; text-align: center; font-weight: bold;">${match.home.name}</div>
                        <div style="padding: 0 15px; color: #999;">vs</div>
                        <div style="flex: 1; text-align: center; font-weight: bold;">${match.away.name}</div>
                    </div>
                    ${match.status.started ? `
                        <div style="text-align: center; margin-top: 10px; color: #dc3545; font-weight: bold;">
                            SCORE: ${match.home.score} - ${match.away.score}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error('Display Error:', error);
        container.innerHTML = '<p>表示処理でエラーが発生しました。</p>';
    }
}

loadMatches();
