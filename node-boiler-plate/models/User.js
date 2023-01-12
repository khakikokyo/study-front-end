const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = { User };