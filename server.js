const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs'); // ファイル操作用に追加
const path = require('path'); // パス操作用に追加

const app = express();
app.use(cors());
app.use(express.static('www'));

// 取得したデータを保存するフォルダの準備
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

const RAPID_API_KEY = '3e7fd0f803msh7c6518752bbd3b4p183187jsnc96dfb9f0a8c';
const RAPID_API_HOST = 'free-api-live-football-data.p.rapidapi.com';

app.get('/api/matches', async (req, res) => {
    const targetDate = req.query.date || '20260501';
    const filePath = path.join(DATA_DIR, `matches_${targetDate}.json`);

    try {
        // 1. サーバー内に保存されたファイルがあるかチェック
        if (fs.existsSync(filePath)) {
            console.log(`[Cache Hit] ${targetDate} のデータをファイルから読み込みます`);
            const cachedData = fs.readFileSync(filePath, 'utf8');
            return res.json(JSON.parse(cachedData));
        }

        // 2. ファイルがない場合のみ、RapidAPIにリクエスト
        console.log(`[API Request] ${targetDate} のデータをAPIから新規取得します`);
        const response = await axios.get('https://free-api-live-football-data.p.rapidapi.com/football-get-matches-by-date', {
            params: { date: targetDate },
            headers: {
                'x-rapidapi-key': RAPID_API_KEY,
                'x-rapidapi-host': RAPID_API_HOST
            },
            timeout: 7000 // 少し余裕を持たせる
        });

        // 3. 取得したデータをファイルとして保存（永続化）
        fs.writeFileSync(filePath, JSON.stringify(response.data), 'utf8');
        console.log(`[Save Success] ${targetDate} のデータを保存しました`);

        res.json(response.data);

    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ error: 'データ取得に失敗しました', detail: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
