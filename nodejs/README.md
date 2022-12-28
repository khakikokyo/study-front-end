# Node.js

## 서버(Serveran)

클라이언트의 요청을 받으면 서비스, 데이터를 제공하는 컴퓨터 혹은 프로그램을 말한다. 쉽게 말하자면 요청을 받으면 데이터를 보내주는 기계이다.

### 서버에 요청할 수 있는 4가지 방법

1. 읽기(GET)
2. 쓰기(POST)
3. 수정(PUT)
4. 삭제(DELETE)

### 서버 재실행 자동화

```bash
# npm
$ npm i -g nodemon

# yarn
$ yarn add global nodemon

# 실행
$ nodemon server.js
```

## GET 요청

```javascript
// server.js
// express 라이브러리 첨부와 사용
const express = require('express');
const app = express();

// 원하는 포트에 서버를 오픈
app.listen(8080, function() {
  console.log('listening on 8080');
});

app.get('/pet', function(요청, 응답) {
  응답.send('펫용품 페이지');
});
```

### GET 요청시 HTML 파일 보내기

```javascript
// server.js
// 1. sendFile() 함수: 파일
// 2. __dirname: 현재 파일의 경로
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});
```