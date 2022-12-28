const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:phy1206@cluster0.ksfxvce.mongodb.net/?retryWrites=true&w=majority"

// EJS 템플릿 엔진
app.set('view engine', 'ejs');

let db;

MongoClient.connect(url, function(error, client) {
  // 연결되면 할 일
  if(error) {return console.log(error)}

  // todoapp database(폴더)에 연결
  db = client.db('todoapp');

  app.listen(8080, function() {
    console.log("listening on 8080");
  });
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/write', function(request, response) {
  response.sendFile(__dirname + '/write.html');
});

// '/add'로 POST 요청시 DB에 데이터 저장
app.post('/add', function(request, response) {
  response.send('전송완료');
  db.collection('post').insertOne({제목: request.body.title, 날짜: request.body.date}, function(error, result) {
    console.log('저장완료');
  });
});

app.get('/list', function(request, response) {
  // DB에 저장된 post collection의 모든 데이터 꺼내기
  db.collection('post').find().toArray(function(error, result) {
    console.log(result);
    response.render('list.ejs', {posts: result});
  });
});