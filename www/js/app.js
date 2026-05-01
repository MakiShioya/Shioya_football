const API_TOKEN = '998d25444615428e83885e7579e83568';

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
        // --- 修正箇所：CORS回避のために allorigins プロキシを経由させる ---
        const targetUrl = 'https://api.football-data.org/v4/matches';
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

        const response = await fetch(proxyUrl, {
            headers: { 
                // alloriginsを使う場合、ヘッダーの扱いが変わるため一旦ここでは含めず、
                // 本来はサーバーサイドで処理するのが理想的です。
            }
        });

        const result = await response.json();
        // alloriginsは結果を文字列として返すのでパースが必要
        const data = JSON.parse(result.contents);
        
        // もしAPIキーが必要なデータ（試合一覧など）を直接叩く場合は、
        // プロキシサービスを通してもAPIキーの認証で弾かれることがあります。
        // その場合は、簡単なNode.jsサーバーをRenderに立てるのが「正解」になります。

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
                <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 8px;">
                    <div style="font-size: 0.8em; color: #666;">${matchDate}</div>
                    <div style="font-weight: bold;">${match.homeTeam.name} vs ${match.awayTeam.name}</div>
                </div>
            `;
        }).join('');

    } catch (error) {
        container.innerHTML = '<p>データの取得に失敗しました。CORS制限またはAPIの仕様により、Node.js等のサーバーが必要な可能性があります。</p>';
        console.error('Error:', error);
    }
}

loadMatches();
