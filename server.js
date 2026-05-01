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
// テスト用の窓口
app.get('/api/matches', async (req, res) => {
    console.log('1. テスト通信を開始します（JSONPlaceholderへ）');
    try {
        console.log('2. 外部サーバーへのリクエストを送ります');
        // 公開されているテスト用APIを叩きます
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1', {
            timeout: 5000 
        });
        console.log('3. 通信成功！データを受信しました');
        res.json({
            status: "Success",
            message: "Renderからの外部通信は正常です！",
            data: response.data
        });
    } catch (error) {
        console.log('3. 通信失敗: ' + error.message);
        res.status(500).json({ 
            status: "Failed",
            message: "外部への通信ができませんでした",
            error: error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
