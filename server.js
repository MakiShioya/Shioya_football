const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// 静的ファイルの提供（wwwフォルダの中身を見せる）
app.use(express.static('www'));

// RapidAPIから取得した情報
const RAPID_API_KEY = '3e7fd0f803msh7c6518752bbd3b4p183187jsnc96dfb9f0a8c';
const RAPID_API_HOST = 'free-api-live-football-data.p.rapidapi.com';
app.get('/api/matches', async (req, res) => {
    try {
        console.log('1. /api/matches へのアクセスがありました');
        
        // フロントエンドから送られてきた日付を受け取る
        // 万が一送られてこなかった場合のデフォルト値として一旦 '20260501' を設定
        const targetDate = req.query.date || '20260501';
        console.log(`対象日付: ${targetDate} のデータを取得します`);
        
        const response = await axios.get('https://free-api-live-football-data.p.rapidapi.com/football-get-matches-by-date', {
            params: { date: targetDate }, // 固定値から変数に変更
            headers: {
                'x-rapidapi-key': RAPID_API_KEY,
                'x-rapidapi-host': RAPID_API_HOST
            },
            timeout: 5000
        });
        
        console.log('2. データの取得に成功しました');
        res.json(response.data);
    } catch (error) {
        // エラー内容を詳しくログに出すように変更
        console.error('API Error:', error.response ? error.response.status : error.message);
        res.status(500).json({ error: 'API取得失敗', detail: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
