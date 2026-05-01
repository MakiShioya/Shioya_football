const TARGET_TEAMS = [
    { id: 1049, name: "久保 建英 / レアル・ソシエダ" },
    { id: 397,  name: "三笘 薫 / ブライトン" },
    { id: 503,  name: "南野 拓実 / モナコ" },
    { id: 57,   name: "冨安 健洋 / アーセナル" },
    { id: 5,    name: "守田 英正 / スポルティング" },
    { id: 4,    name: "堂安 律 / フライブルク" },
    { id: 2,    name: "板倉 滉 / ボルシアMG" }
];

async function loadMatches() {
    const container = document.getElementById('match-list');
    
    try {
        // --- 修正：自分のサーバーのAPIエンドポイントを叩く ---
        const response = await fetch('/api/matches');
        const data = await response.json();
        
        const matches = data.matches.filter(match => 
            TARGET_TEAMS.some(team => team.id === match.homeTeam.id || team.id === match.awayTeam.id)
        );

        if (matches.length === 0) {
            container.innerHTML = '<p>現在、表示対象チームの試合予定はありません。</p>';
            return;
        }

        container.innerHTML = matches.map(match => {
            const matchDate = new Date(match.utcDate).toLocaleString('ja-JP', {
                month: 'short', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit'
            });
            return `
                <div style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 8px; background: white;">
                    <div style="font-size: 0.9em; color: #555;">${matchDate}</div>
                    <div style="font-weight: bold; margin-top: 5px;">${match.homeTeam.name} <span style="color:#888;">vs</span> ${match.awayTeam.name}</div>
                </div>
            `;
        }).join('');

    } catch (error) {
        container.innerHTML = '<p>データの取得に失敗しました。サーバーが起動しているか確認してください。</p>';
    }
}

loadMatches();
