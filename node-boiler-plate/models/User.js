const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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

userSchema.methods.comparePassword = function(plainPassword, cb) {
  // 입력한 비밀번호와 DB에 암호화된 비밀번호 비교
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err)
    cb(null, isMatch)
  })
}

// token
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

// Auth
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

const User = mongoose.model('User', userSchema);

module.exports = { User };