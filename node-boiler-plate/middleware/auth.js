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