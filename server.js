const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors()); // これでCORSエラーとおさらばです

// 静的ファイルの提供（wwwフォルダの中身を見せる）
app.use(express.static('www'));

const API_TOKEN = '998d25444615428e83885e7579e83568';

// 自分のサーバー内に「/api/matches」という窓口を作る
app.get('/api/matches', async (req, res) => {
    console.log('1. /api/matches へのアクセスがありました');
    try {
        console.log('2. football-data.org へのデータ要求を開始します');
        const response = await axios.get('https://api.football-data.org/v4/matches', {
            headers: { 'X-Auth-Token': API_TOKEN }
        });
        console.log('3. football-data.org からのデータ取得に成功しました');
        res.json(response.data);
    } catch (error) {
        console.log('3. エラーが発生しました: ' + error.message);
        res.status(500).json({ error: 'API取得失敗' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
