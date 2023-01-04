let router = require('express').Router();

router.get('/sports', function(request, response) {
  response.send('스포츠 게시판');
});

router.get('/game', function(request, response) {
  response.send('게임 게시판');
});

module.exports = router;