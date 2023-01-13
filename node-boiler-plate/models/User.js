const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, // 문자간 공백 삭제 ex) khakiko kyo90@gmail.com
    unique: 1 // 중복 이메일 허용X
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: { // 일반, 관리자
    type: Number,
    default: 0
  },
  image: String,
  token: { // 유효성
    type: String
  },
  tokenExp: { // token 유효기간
    type: Number
  }
});

userSchema.pre('save', function(next) {
  let user = this;

  // password가 변환될 때만 bcrypt를 이용해 암호화
  if(user.isModified('password')) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err);

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

const User = mongoose.model('User', userSchema);

module.exports = { User };