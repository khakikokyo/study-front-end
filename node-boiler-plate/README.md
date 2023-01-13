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
REACT_APP_PORT=8080
REACT_APP_MONGO_URL="mongodb+srv://admin:<password>@cluster0.ksfxvce.mongodb.net/?retryWrites=true&w=majority"

// 형식은 var 문법으로 왼쪽엔 변수명, 오른쪽은 값을 넣는다고 보면 된다.
// 변수 이름은 보통 대문자로 표기한다.

// (server.js)
// 사용 - process.env.변수이름
process.env.PORT
process.env.DB_URL
```

- cross-env 모듈

    - 개발(development), 배포(production) 환경 구축
    - cross-env 모듈은 프로젝트 참여자 각각이 MacOS, Windows, Linux 등 다양한 OS 마다 환경변수를 설정하는 방법이 다르기 때문에 이것에 대한 대책을 마련한 모듈이다.
    - 그래서 corss-env 패키지를 사용하면 동적으로 process.env(환경변수)를 변경할 수 있으며 **모든 운영체제에서 동일한 방법으로 환경변수를 변경**할 수 있게 된다.
    - cross-env 모듈을 사용하여 윈도우OS까지 OS간의 호환성 문제 해결

```bash
$ npm i cross-env
```

```javascript
// (package.json)
"scripts": {
  "start": "cross-env NODE_ENV=production PORT=8080 node server.js", // 서비스 배포환경
  "dev": "nodemon server.js", // 개발환경
},
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

8. Nodemon 설치

    소스를 변경할 때 그걸 감지해서 자동으로 서버를 재시작해 주는 tool

```bash
$ npm i nodemon

# devDependencies 설치
$ npm run nodemon --save-dev
```

- 사용하기

```javascript
// (package.json)
"scripts": {
  "dev": "nodemon server.js",
}
```

```bash
$ npm run dev
```

9. 비밀번호 암호화

Bcrypt를 이용하여 비밀번호 암호화 후 데이터베이스에 저장

```javascript
$ npm i bcrypt
```

```javascript
// (models > User.js)
const bcrypt = require('bcrypt');
const saltRounds = 10;

userSchema.pre('save', function(next) {
  let user = this;

  // password가 변환될 때만 bcrypt를 이용해 암호화
  if(user.isModified('password')) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err);

      // hash 암호화된 비밀번호
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
```