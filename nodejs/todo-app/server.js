const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// static 파일을 보관하기 위해 public 폴더 사용
app.use('/public', express.static('public'));

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:phy1206@cluster0.ksfxvce.mongodb.net/?retryWrites=true&w=majority"

// EJS 템플릿 엔진
app.set('view engine', 'ejs');

// 수정(PUT)
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

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

// 메인 화면
app.get('/', function(request, response) {
  response.render('index.ejs');
});

// 글작성 화면
app.get('/write', function(request, response) {
  response.render('write.ejs');
});

// '/add'로 POST 요청시 DB에 데이터 저장
app.post('/add', function(request, response) {
  response.send('전송완료');
  db.collection('counter').findOne({name: '게시물갯수'}, function(error, result) {
    let totalNum = result.totalPost;

    db.collection('post').insertOne({_id: totalNum + 1, 제목: request.body.title, 날짜: request.body.date}, function(error, result) {
      console.log('저장완료');
      // counter collection의 totalPost 1 증가 (updateOne(1개의 DB 데이터 수정))
      db.collection('counter').updateOne({name: '게시물갯수'}, {$inc: {totalPost:1}}, function(error, result) {
        if(error) {return console.log(error)}
      });
    });
  });
});

// 글목록 화면
app.get('/list', function(request, response) {
  // DB에 저장된 post collection의 모든 데이터 꺼내기
  db.collection('post').find().toArray(function(error, result) {
    response.render('list.ejs', {posts: result});
  });
});

// 삭제
app.delete('/delete', function(request, response) {
  request.body._id = parseInt(request.body._id);
  db.collection('post').deleteOne(request.body, function(error, result) {
    console.log('삭제완료');
    response.status(200).send({message: '성공했습니다.'});
  });
});

// 상세 페이지 화면
// 파라미터: URL 뒤에 무작위의 문자를 붙일 수 있게 만들어 주는 URL 작명 방식
app.get('/detail/:id', function(request, response) {
  db.collection('post').findOne({_id: parseInt(request.params.id)}, function(error, result) {
    response.render('detail.ejs', { data: result });
  });
});

// 수정 페이지
app.get('/edit/:id', function(request, response) {
  db.collection('post').findOne({_id: parseInt(request.params.id)}, function(error, result) {
    response.render('edit.ejs', { post: result });
  })
});

// 수정
app.put('/edit', function(request, response) {
  db.collection('post').updateOne({_id: parseInt(request.body.id)}, {$set: {제목: request.body.title, 날짜: request.body.date}}, function(error, result) {
    console.log('수정완료');
    response.redirect('/list');
  });
});