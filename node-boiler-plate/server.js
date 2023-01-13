const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");
const { auth } = require('./middleware/auth');

require('dotenv').config();

// application/x-www-form-urlencoded > 분석해서 가져옴
app.use(express.urlencoded({extended: true}));
// application/json > 분석해서 가져옴
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect(process.env.REACT_APP_MONGO_URL, {})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!!'));

app.post('/api/users/register', function(req, res) {
  // 회원가입시 필요한 정보를 client에서 가져와 데이터베이스로 넣기
  const user = new User(req.body)

  user.save(function(err, userInfo) {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
});

// 로그인 기능
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

// Auth 기능
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

// 로그아웃
app.get('/api/users/logout', auth, function(req, res) {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, function(err, user) {
    if(err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

app.listen(process.env.REACT_APP_PORT, () => console.log(`Example app listening on port ${process.env.REACT_APP_PORT}!`));