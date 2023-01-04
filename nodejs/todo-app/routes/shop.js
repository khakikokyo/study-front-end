let router = require('express').Router();

// shop.js에 있는 모든 URL에 적용할 미들웨어
router.use(로그인했니);
// router.use('/shirts', 로그인했니); // /shirts에 접속할 때만 '로그인했니' 미들웨어 적용 가능

function 로그인했니(request, response, next) {
  if(request.user) {
    next()
  } else {
    response.send('로그인을 해주세요.');
  }
};

// router 폴더와 파일을 생성하여 API 관리 예제
router.get('/shirts', function(request, response) {
  response.send('셔츠 판매 페이지 예제');
});

router.get('/pants', function(request, response) {
  response.send('바지 판매 페이지 예제');
});

module.exports = router;