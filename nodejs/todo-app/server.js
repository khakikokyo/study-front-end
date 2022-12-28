const express = require('express');
const app = express();

app.listen(8080, function() {
  console.log("listening on 8080");
});

app.get('/pet', function(request, response) {
  response.send('펫용품 쇼핑 페이지입니다.');
});

app.get('/beauty', function(request, response) {
  response.send('뷰티용품 쇼핑 페이지입니다.');
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});