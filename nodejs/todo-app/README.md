# Todo-App

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

### form 데이터를 서버로 전송1

```javascript
// form 전송 버튼을 클릭시 '/add'라는 경로로 POST 요청을 하는 폼
// method: GET/POST 중 어떤 요청을 할 건지 지정
// action: 어떤 경로로 요청을 할 건지 지정
<form acrion="/add" method="POST">
  [...]
</form>
```

### form 데이터를 서버로 전송2

```javascript
// server.js
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));
```

```javascript
// Post 요청
app.post('/add', function(request, response) {
  response.send('전송완료');
  console.log(request.body.date);
  console.log(request.body.title);
  console.log(request.body);
});

// write.html
// 서버에서 input을 구분하기 위해 'name="이름"' 기재
<input type="text" class="form-control" name="title" />
<input type="text" class="form-control" name="date" />
```