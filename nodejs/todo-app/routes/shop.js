let router = require('express').Router();

// router 폴더와 파일을 생성하여 API 관리 예제
router.get('/shop/shirts', function(request, response) {
  response.send('셔츠 판매 페이지 예제');
});

router.get('/shop/pants', function(request, response) {
  response.send('바지 판매 페이지 예제');
});

module.exports = router;