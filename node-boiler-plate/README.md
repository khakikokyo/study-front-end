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

app.post('/api/users/register', (req, res) => {
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

10. 로그인 기능 & 토큰 생성

```javascript
// (server.js)
app.post('/api/users/login', function(req, res) {
  // 이메일을 데이터베이스에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일을 다시 확인해 주세요."
      })
    }

    // 이메일 확인 후 비밀번호 일치여부 확인
    user.comparePassword(req.body.password, function(err, isMatch) {
      if(!isMatch)
      return res.json({
        loginSuccess: false,
        message: "비밀번호를 다시 확인해 주세요."
      })

      // 비밀번호 일치 확인 후 토큰 생성
      user.generateToken(function(err, user) {
        if(err) return res.status(400).send(err);

        // 토큰 저장 (Cookies, Local Storage, Session Storage) > Cookies에 저장
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
});
```

```javascript
// (models > User.js)
userSchema.methods.comparePassword = function(plainPassword, cb) {
  // 입력한 비밀번호와 DB에 암호화된 비밀번호 비교
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err)
    cb(null, isMatch)
  })
}
```

- 토큰 생성을 위해 [JSONWEBTOKEN](https://www.npmjs.com/package/jsonwebtoken) 라이브리러 설치

```bash
$ npm i jsonwebtoken
```

```javascript
// (models > User.js)
const jwt = require('jsonwebtoken');

userSchema.methods.generateToken = function(cb) {
  let user = this;

  // jsonwebtoken을 사용하여 token 생성
  let token = jwt.sign(user._id.toHexString(), 'secretToken');

  user.token = token;
  user.save(function(err, user) {
    if(err) return cb(err)
    cb(null, user)
  })
}
```

- cookieParser

```bash
$ npm i cookie-parser
```

```javascript
// (server.js)
const cookieParser = require('cookie-parser');
app.cookieParser();
```

11. Auth 기능

    authentication: 입증, 증명, 인증 등의 의미<br/>
    페이지마다 **로그인 여부**, **관리자 또는 일반유저**인지 확인, 글 등록, 수정, 삭제 시 **권한 체크**

```javascript
// (server.js)
const { auth } = require('./middleware/auth');

// role == 0 이면 일반유저, role !== 0 이면 관리자
app.get('/api/users/auth', auth, function(req, res) {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});
```

```javascript
// (models > User.js)
userSchema.statics.findByToken = function(token, cb) {
  let user = this;

  // 토큰 decode
  jwt.verify(token, 'secretToken', function(err, decoded) {
    // 유저 아이디를 이융해서 유저를 찾고, 클라이언트에서 가져온 token과 DB에 보관된 토큰의 일치여부 확인
    user.findOne({ "_id": decoded, "token": token }, function(err, user) {
      if(err) return cb(err);
      cb(null, user)
    });
  });
};
```

```javascript
// (middleware > auth.js)
const { User } = require("../models/User");

let auth = function(req, res, next) {
  // 인증 처리
  // 클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;

  // 토큰을 복호화한 후 유저 찾기
  User.findByToken(token, function(err, user) {
    if(err) throw err;
    if(!user) return res.json({ isAuth: false, error: ture });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
```

12. 로그아웃

```javascript
// (server.js)
app.get('/api/users/logout', auth, function(req, res) {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, function(err, user) {
    if(err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});
```

## React JS

- Real DOM: 만약 10개의 리스트가 있다고 가정했을 때, 그 중에 한가지의 리스트만 Update가 된다면 전체 10개의 리스트를 다시 Reload 해야한다. (Super Expensive한 작업)
- Virtual DOM: 만약 10개의 리스트가 있다고 가정했을 때, 그 중에 한가지의 리스트만 Update가 된다면 그 바뀐 1개의 리스트만 DOM에서 바뀌게 된다.

    1. JSX를 렌더링 한다. (그러면 Virtual DOM이 Update)
    2. Virtual DOM이 이전 Virtual DOM에서 찍어둔 Snapshot과 비교해서 바뀐 부분을 찾는다. (이 과정을 **"diffing"**라고 부른다.)
    3. 해당 바뀐 부분만 Real DOM에서 바꿔준다.

### create-react-app

- Babel: 최신 자바스크립트 문법을 지원하지 않는 브라우저들을 위해서 최신 자바스크립트 문법을 구형 브라우저에서도 사용할 수 있게 변환시켜주는 라이브러리
- Webpack: 오픈 소스 자바스크립트 모듈 번들러로써 여러개로 나누어져 있는 파일들을 하나의 자바스크립트 코드로 압축하고 최적화하는 라이브러리

    - 웹 팩의 장점
    1. 여러 파일의 자바스크립트 코드를 압축하여 최적화할 수 있기 때문에 로딩에 대한 네트워크 비용을 줄일 수 있다.
    2. 모듈 단위로 개발이 가능하며, 가독성과 유지보수가 쉽다.

- create-react-app을 사용하여 리액트를 설치하면 Babel이나 Webpack 설정이 이미 다 되어 있기 때문에 많은 시간이 걸리지 않고 리액트 앱을 시작할 수 있다.