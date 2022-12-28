const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:phy1206@cluster0.ksfxvce.mongodb.net/?retryWrites=true&w=majority"

MongoClient.connect(url, function(error, client) {
  app.listen(8080, function() {
    console.log("listening on 8080");
  });
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

app.get('/write', function(request, response) {
  response.sendFile(__dirname + '/write.html');
});

// Post 요청
app.post('/add', function(request, response) {
  response.send('전송완료');
  console.log(request.body.date);
  console.log(request.body.title);
  console.log(request.body);
});