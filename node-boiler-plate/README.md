# Node-boiler-plate

1. node 설치 확인

```bash
$ node -v
```

2. 프로젝트 폴더 생성
3. npm package 생성

```bash
$ npm init
```

3. express 다운

```bash
$ npm i express
```

```javascript
// (server.js)
// express 모듈 가져오기
const express = require("express");
// 새로운 express app 생성
const app = express();
const port = 8080;

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

4. 환경변수 관리 (.env)

- 라이브러리 설치

```bash
$ npm i dotenv
```

- 라이브러리 등록

```javascript
// (server.js)
require("dotenv").config();
```

- .env 파일 생성(server.js 파일과 같은 경로)

```javascript
// (.env)
PORT=8080
DB_URL="mongodb+srv://admin:<password>@cluster0.ksfxvce.mongodb.net/?retryWrites=true&w=majority"

// 형식은 var 문법으로 왼쪽엔 변수명, 오른쪽은 값을 넣는다고 보면 된다.
// 변수 이름은 보통 대문자로 표기한다.

// (server.js)
// 사용 - process.env.변수이름
process.env.PORT
process.env.DB_URL
```

5. mongodb 연결 (mongoose)

    Database > Connect > Connect your application > url 주소

```bash
$ npm i mongoose
```

```javascript
// (server.js)
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URL, {
  // mongoDB 6버전 이상 기본설정
  // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
```

6. MongoDB Model & Schema
7. 회원가입 기능

```javascript
// (server.js)
const { User } = require("./models/User");

// application/x-www-form-urlencoded > 분석해서 가져옴
app.use(express.urlencoded({extended: true}));
// application/json > 분석해서 가져옴
app.use(express.json());

app.post('/register', (req, res) => {
  // 회원가입시 필요한 정보를 client에서 가져와 데이터베이스로 넣기
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
});
```

- PostMan으로 회원가입 하기<br/>
  Body > raw > JSON