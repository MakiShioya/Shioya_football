// 取得したばかりのトークンをここに設定します
const API_TOKEN = '998d25444615428e83885e7579e83568';

// 日本人選手が所属する主要なチームのリスト（必要に応じてIDを追加できます）
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
        // 全ての試合予定を取得
        const response = await fetch('https://api.football-data.org/v4/matches', {
            headers: { 'X-Auth-Token': API_TOKEN }
        });

        // メールにあった「レート制限」のチェック
        if (response.status === 429) {
            container.innerHTML = '<p>短時間に何度も読み込みすぎです。少し待ってから再開してください。</p>';
            return;
        }

        const data = await response.json();
        
        // TARGET_TEAMS に含まれるチームの試合だけを抽出
        const matches = data.matches.filter(match => 
            TARGET_TEAMS.some(team => team.id === match.homeTeam.id || team.id === match.awayTeam.id)
        );

        if (matches.length === 0) {
            container.innerHTML = '<p>現在、表示対象チームの試合予定はありません。</p>';
            return;
        }

        // 画面に表示するHTMLを生成
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
        container.innerHTML = '<p>データの取得に失敗しました。インターネット接続を確認してください。</p>';
        console.error('Error:', error);
    }
}

loadMatches();
