const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const audioDir = path.join(__dirname, 'audio');

// 정적 파일 제공
app.use('/audio', express.static(audioDir));
app.use(express.static(path.join(__dirname, 'public')));

// 날짜로 시작하는 .wav 파일 목록 반환
app.get('/api/audio/:date', (req, res) => {
  const date = req.params.date;
  console.log('요청 받은 날짜:', date); // ← 추가
  fs.readdir(audioDir, (err, files) => {
    if (err) return res.status(500).send('파일 목록을 불러올 수 없습니다.');
    const matched = files.filter(file => file.startsWith(date) && file.endsWith('.wav'));
    console.log('찾은 파일:', matched); // ← 추가
    res.json(matched);
  });
});

// 서버 시작
app.listen(3000, () => {
  console.log('✅ 서버가 http://localhost:3000 에서 실행 중입니다');
});
