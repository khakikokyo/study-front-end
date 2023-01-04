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

// 글목록 화면
app.get('/list', function(request, response) {
  // DB에 저장된 post collection의 모든 데이터 꺼내기
  db.collection('post').find().toArray(function(error, result) {
    response.render('list.ejs', {posts: result});
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

// 로그인 기능(session 방식) - 라이브러리
// app.use(): 미들웨어, 요청과 응답 사이에 뭔가를 실행시키는 코드(요청이 적법한지 검사하는 그런 기능들을 미들웨이에 많이 담는다.)
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret: '비밀코드', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

// 로그인 페이지 라우팅
app.get('/login', function(request, response) {
  response.render('login.ejs');
});

// passport.authenticate(): passport 라이브러리가 제공하는 '아이디/비번 인증을 도와주는 코드', 응답 전에 local 방식으로 아이디/비번을 인증하라는 뜻으로 해석
// failureRedirect: 로그인 인증 실패시 이동시켜줄 경로
app.post('/login', passport.authenticate('local', { failureRedirect: '/fail' }), function(request, response) {
  response.redirect('/');
});

// 마이페이지
app.get('/mypage', 로그인했니, function(request, response) {
  response.render('mypage.ejs', {사용자: request.user});
});

function 로그인했니(request, response, next) {
  if(request.user) {
    next()
  } else {
    response.send('로그인을 해주세요.');
  }
};

// 로그인 인증 세부코드 (세부사항 정의)
// done(서버에러, 성공시사용자DB데이터, 에러메세지): 라이브러리 문법, 3개의 파라미터를 가진다.
passport.use(new LocalStrategy({
  usernameField: 'id', // 유저가 입력한 아이디 항목이 뭔지 정의(form의 name 속성)
  passwordField: 'pw',
  session: true, // 로그인 후 세션 저장 여부
  passReqToCallback: false, // 아이디/비번 외의 다른 정보 검증 여부
}, function (입력한아이디, 입력한비번, done) {
  //console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)

    if (!결과) return done(null, false, { message: '아이디가 존재하지 않습니다.' })
    if (입력한비번 == 결과.pw) {
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비밀번호가 없거나 일치하지 않습니다.' })
    }
  })
}));

// session 데이터
// serializeUser(): 세션을 저장시키는 코드(로그인 성공시 발동)
// 세션 데이터를 생성하고 세션의 id 정보를 쿠키로 전송
passport.serializeUser(function(user, done) {
  done(null, user.id)
});

// deserializeUser(): 해당 세션 데이터를 가진 사람을 DB에서 해석(마이페이지 접속시 발동)
// 로그인한 유저의 개인정보를 DB에서 찾는 역할
// 아이디 = sesseion 저장된 아이디(=id: test)
passport.deserializeUser(function(아이디, done) {
  db.collection('login').findOne({id: 아이디}, function(error, result) {
    done(null, result)
  });
});

// 회원가입, id/pw DB 저장
app.post('/register', function(request, response) {
  db.collection('login').insertOne({ id: request.body.id, pw: request.body.pw }, function(error, result) {
    response.redirect('/');
  });
});

// '/add'로 POST 요청시 DB에 데이터 저장
app.post('/add', function(request, response) {
  response.send('전송완료');
  db.collection('counter').findOne({name: '게시물갯수'}, function(error, result) {
    let totalNum = result.totalPost;
    let 저장할거 = { _id: totalNum + 1, 제목: request.body.title, 날짜: request.body.date, 작성자: request.user._id }

    db.collection('post').insertOne(저장할거, function(error, result) {
      // counter collection의 totalPost 1 증가 (updateOne(1개의 DB 데이터 수정))
      db.collection('counter').updateOne({name: '게시물갯수'}, {$inc: {totalPost:1}}, function(error, result) {
        if(error) {return console.log(error)}
      });
    });
  });
});

// 삭제
app.delete('/delete', function(request, response) {
  request.body._id = parseInt(request.body._id);

  let 삭제할데이터 = { _id: request.body._id, 작성자: request.user._id };

  db.collection('post').deleteOne(삭제할데이터, function(error, result) {
    if(result) { console.log(result) };
    response.status(200).send({message: '성공했습니다.'});
  });
});

// 검색
app.get('/search', (request, response) => {
  let 검색조건 = [
    {
      $search: {
        index: "titleSearch", // Search index의 인덱스명
        text: {
          query: request.query.value,
          path: "제목" // 제목, 날짜 둘 다 검색하고 싶으면 ["제목", "날짜"]
        }
      }
    },
  ];
  db.collection('post').aggregate(검색조건).toArray((error, result) => {
    console.log(result);
    response.render('search.ejs', {posts: result});
  });
});

// router 폴더와 파일을 생성하여 API 관리 예제
app.use('/shop', require('./routes/shop.js'));
app.use('/board/sub', require('./routes/board.js'));

// 파일(이미지) 전송
app.get('/upload', function(request, response) {
  response.render('upload.ejs');
});