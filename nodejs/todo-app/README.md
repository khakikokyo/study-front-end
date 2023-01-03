# Todo-App

## REST API

Representational State Transfer, API 디자인 방법

1. Uniform Interface

    - 인터페이스는 일관성이 있어야 한다.
    - 하나의 URL로는 하나의 데이터를 가져와야 한다. (하나를 가져오기 위한 두개의 URL을 만들지 말 것)
    - 간결하고 예측 가능하게 코딩(URL 하나를 알면 둘을 알 수 있도록)
    - URL 이름짓기 관습을 잘 지킬 것

- (참고) 다른 곳에서 URL 대신 URI라는 용어를 많이 쓰기도 하는데, URI는 자료를 넘버링하고 지칭하는 방법이라고 보면 된다. URL과 비슷하지만 조금 더 큰 의미이다. 도서관에서 책을 분류할 때 URI에 의해서 분류하기도 한다.

2. Client-server 역할 구분하기

    - 고객에게 서버역할을 맡기거나, 고객에게 DB에 있는 자료를 직접 꺼내라고 하는 식으로 코드를 짜면 안된다.

3. Stateless

    - 요청들은 각각 독립적으로 처리되어야 한다.
    - 요청1이 성공해야 요청2를 보내주는 식으로 요청간의 의존성이 존재하는 코드를 짜면 안된다. 즉, 하나의 요청만으로 자료를 가져오기 충분하도록 요청에 필요한 모든 정보들을 실어 보내는게 좋다.

4. Cacheable

    - 요청을 통해 보내는 자료들은 캐싱이 가능해야 한다. 그리고 캐싱이 가능하다고 표시하거나 캐싱 기간을 설정해 주어야 한다.

- 캐싱) 네이버를 방문하면 크롬 브라우저는 자동으로 자주 사용하는 이미지 파일, CSS 파일 등을 하드에 저장해 놓는다. (별로 변동될 일이 없는 네이버 로고나 아이콘 같은 것) 하드에 저장해 놓고 네이버 방문할 때 네이버 서버에 로고 등을 별도로 요청하지 않아도 하드에서 불러온다. 이 행위를 캐싱이라고 한다.

5. Layered System

    - 여러개의 레이어를 거쳐서 요청을 처리하게 만들어도 된다. 즉 요청처리하는 곳, DB에 저장하는 곳 이런 여러가지 단계를 거쳐서 요층을 처리해도 된다.

6. Code on Demand

- 서버는 고객에게 실제 실행가능한 코드를 전송해줄 수도 있다.

### URL 이름짓기 관습

잘 만들어진 API

- instagram.com/explore/tags/kpop
- instagram.com/explore/tags/food
- facebook.com/natgeo/photos
- facebook.com/bbc/photos

관습

1. 단어들을 동사보다는 명사 위주로 구성
2. 응용해서 다른 정보들을 쉽게 가져올 수 있을 정도로 일관성이 있음
3. 대충 봐도 어떤 정보가 들어올지 예측 가능
4. 띄어쓰기는 언더바_대신 대시-기호-사용
5. 파일 확장자 쓰지 말기 (.html 등)
6. 하위 문서들을 뜻할 땐 '/' 기호를 사용 (하위폴더같은 느낌)

### API

Application Programming Interface

서로 다른 프로그램간에 소통할 수 있게 도와주는 통신 규약을 뜻한다. 이걸 웹에서 사용하면 `서버와 고객간의 통신 규약`을 뜻하며, 조금 더 쉽게 풀어 말하면 `서버에게 요청해서 데이터 가져오는 방법`이 바로 API이다.

## .env

환경변수 관리

1. 라이브러리 설치

```bash
$ npm i dotenv
```

2. 라이브러리 등록

```javascript
// server.js
require('dotenv').config();
```

3. .env 파일 생성(server.js와 같은 경로)

```javascript
// .env (형식)
PORT=8080
DB_URL= "mongodb+srv://codingapple1@123"

// 형식은 var 문법으로 왼쪽엔 변수명, 오른쪽은 값을 넣는다고 보면 된다.
// 변수 이름은 보통 대문자로 표기한다.
```

## GET 요청

```javascript
// server.js
// express 라이브러리 첨부와 사용
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));

// 원하는 포트에 서버를 오픈
app.listen(8080, function() {
  console.log('listening on 8080');
});

app.get('/pet', function(요청, 응답) {
  응답.send('펫용품 페이지');
});
```

### GET 요청시 HTML 파일 보내기

```javascript
// server.js
// 1. sendFile() 함수: 파일
// 2. __dirname: 현재 파일의 경로
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});
```

### form 데이터를 서버로 전송1

```javascript
// form 전송 버튼을 클릭시 '/add'라는 경로로 POST 요청을 하는 폼
// method: GET/POST 중 어떤 요청을 할 건지 지정
// action: 어떤 경로로 요청을 할 건지 지정
<form acrion="/add" method="POST">
  [...]
</form>
```

### form 데이터를 서버로 전송2

```javascript
// server.js
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
```

```javascript
// Post 요청
app.post('/add', function(request, response) {
  response.send('전송완료');
  console.log(request.body.date);
  console.log(request.body.title);
  console.log(request.body);
});

// write.html
// 서버에서 input을 구분하기 위해 'name="이름"' 기재
<input type="text" class="form-control" name="title" />
<input type="text" class="form-control" name="date" />
```

# MongoDB Atlas 가입/초기셋팅

1. [Mongodb atlas](https://www.mongodb.com/try/download/community) 구글 검색
2. 회원가입 & 티어선택 & 서버위치 선택
3. Database Access 메뉴에서 DB 접속용 아이디/비번 생성 (Built-in Role > Atlas admin 설정)
4. Network Access 메뉴에서 IP 추가 (데이터베이스에 접속할 수 있는 IP를 미리 정의해 놓는 일종의 보안장치, Allow access from anywhere > 0.0.0.0/0)
5. Database / collection 만들기 (Databases > Collections > Add My Own Data > Database name/Collection name 설정) -> 데이터베이스

## 만든 Database 접속(Connect) 하는 방법

Database > Connect > Connect your application > url 주소

## 연결하기

```bash
# mongoDB 라이브러리 설치
$ npm i mongodb
```

```javascript
// server.js
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:phy1206@cluster0.ksfxvce.mongodb.net/?retryWrites=true&w=majority"

MongoClient.connect(url, function(error, client) {
  // 연결되면 할 일
  if(error) {return console.log(error)} // 에러처리
  app.listen(8080, function() {
    console.log("listening on 8080");
  });
});
```

## 데이터 저장

```javascript
// server.js
let db;

MongoClient.connect(url, function(error, client) {
  [...]

  // todoapp database(폴더)에 연결
  db = client.db('todoapp');

  // 데이터 저장1
  db.collection('post').insertOne({이름: 'John', _id: 100}, function(error, result) {
    console.log('저장완료');
  });

  // '/add'로 POST 요청시 DB에 저장
  app.post('/add', function(request, response) {
    response.send('전송완료');
    db.collection('post').insertOne({제목: request.body.title, 날짜: request.body.date}, function(error, result) {
      console.log('저장완료');
    });
  });

  [...]
});
```

## EJS 템플릿 엔진

서버 데이터를 HTML에서 쉽게 사용할 수 있도록 도와주는 일종의 HTML 렌더링 엔진이다.

```bash
$ npm i ejs
```

```javascript
// server.js
app.set('view engine', 'ejs');
```

- list.html > list.ejs (html == ejs)
- ejs 파일들은 views 폴더 안에 생성해야 한다.

```javascript
// server.js
app.get('/list', function(request, response) {
  // DB에 저장된 post collection의 모든 데이터 꺼내기
  db.collection('post').find().toArray(function(error, result) {
    console.log(result);
    response.render('list.ejs', {posts: result});
  });
});

// views/list.ejs
<% for (let i = 0; i < posts.length; i++) { %>
  <h4>할 일 제목 : <%= posts[i].제목 %></h4>
  <p>할 일 마감 날짜 : <%= posts[i].날짜 %></p>
<% } %>
```

## 게시물에 번호달기

다른 DB에선 _id를 자동으로 1 증가시키는 Auto Increment 기능이 있는데 MongoDB는 Auto Increment 기능이 없다. 그래서 직접 지금까지 몇 번 게시물을 발행했는지를 따로 기록해 두고 사용해야 한다.

- MongoDB atlas 홈페이지 대시보드에서 collection 추가 생성<br/>
counter collection 생성 > 데이터 추가 (totalPost: 0, name: "게시물갯수")

- operator: $set(변경), $inc(증가), $min(기존값보다 적을때만 변경), $rename(key값 이름변경) ...

```javascript
// server.js
app.post('/add', function(request, response) {
  response.send('전송완료');
  // findOne(): collection 내에서 내가 원하는 문서를 쉽게 찾을 수 있도록 도와주는 함수, 찾은 결과는 function 내의 result라는 이름의 변수에 담긴다.
  db.collection('counter').findOne({name: '게시물갯수'}, function(error, result) {
    let totalNum = result.totalPost;

    db.collection('post').insertOne({_id: totalNum + 1, 제목: request.body.title, 날짜: request.body.date}, function(error, result) {
      console.log('저장완료');
      // counter collection의 totalPost 1 증가 (updateOne(1개의 DB 데이터 수정))
      // {$set: {totalPost: 바꿀값}}
      db.collection('counter').updateOne({name: '게시물갯수'}, {$inc: {totalPost:1}}, function(error, result) {
        if(error) {return console.log(error)}
      });
    });
  });
});
```

## AJAX - 삭제하기

```javascript
// server.js
app.delete('/delete', function(request, response) {
  // _id: '1' > _id: 1, int로 변환
  request.body._id = parseInt(request.body._id);
  db.collection('post').deleteOne(request.body, function(error, result) {
    console.log('삭제완료');
    response.status(200).send({message: '성공했습니다.'});
  });
});
```

```javascript
// list.ejs
// AJAX 기본 문법 (jquery)
<script>
  $('.delete').click(function(e) {
    let postNum = e.target.dataset.id; // 지금 클릭한 것
    let postTarget = $(this); // 지금 이벤트 동작하는 곳
    
    $.ajax({
    method: 'DELETE',
    url: '/delete',
    data: {_id: postNum}
    }).done(function(result) {
      // 요청 성공시 실행
      postTarget.parent('li').fadeOut();
    }).fail(function(xhr, textStatus, errorThrown) {
      // 요청 실패시 실행
      console.log(xhr, textStatus, errorThrown);
    });
  });
</script>
```

## 상세 페이지

```javascript
// server.js
// 파라미터: URL 뒤에 무작위의 문자를 붙일 수 있게 만들어 주는 URL 작명 방식 (/detail/:id)
app.get('/detail/:id', function(request, response) {
  // parseInt(request.params.id): URL에 입력한 id 값을 숫자로 변환
  db.collection('post').findOne({_id: parseInt(request.params.id)}, function(error, result) {
    response.render('detail.ejs', { data: result });
  });
});
```

```javascript
// list.ejs
<a href="/detail/<%=posts[i]._id%>" class="list-group-item">
  [...]
</a>
```

## CSS & NavBar

1. CSS

```javascript
// server.js
// static 파일을 보관하기 위해 public 폴더 사용 (public > main.css)
app.use('/public', express.static('public'));
```

2. NavBar

```javascript
// 1. nav.html 생성 (views > nav.html)
// 2. navbar를 필요로 하는 파일(ejs)에 nav.html 적용
<%- include('nav.html') %>

// 3. html 파일(index.html, write.html) ejs 파일로 변경
// server.js
app.get('/', function(request, response) {
  // response.render(__dirname + '/index.html');
  response.render('index.ejs');
});

// 글작성 화면
app.get('/write', function(request, response) {
  // response.sendFile(__dirname + '/write.ejs');
  response.render('write.ejs');
});
```

## 수정(PUT)

1. PUT 요청을 하기 위해 DELETE 요청 방식처럼 AJAX를 사용하던가, method-override 라이브러리를 설치하여 form 태그에 method 사용

```bash
$ npm i method-override
```

2. 설치 후 method-override 라이브러리 사용 방법

```javascript
// server.js
// form 태그에서 method로 PUT or DELETE 요청
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// edit.ejs
<form action="/edit?_method=PUT" method="POST">
  [...]
</form>
```

3. 수정 기능 구현

```javascript
// server.js
// 수정 페이지
app.get('/edit/:id', function(request, response) {
  db.collection('post').findOne({_id: parseInt(request.params.id)}, function(error, result) {
    response.render('edit.ejs', { post: result });
  })
});

// 수정
// request.body.id(=title, =date): edit.ejs 파일에서 name
app.put('/edit', function(request, response) {
  db.collection('post').updateOne({_id: parseInt(request.body.id)}, {$set: {제목: request.body.title, 날짜: request.body.date}}, function(error, result) {
    console.log('수정완료');
    response.redirect('/list');
  });
});
```

## 회원 인증 방법

1. Session-based Authentication

    사용자의 세션 정보를 저장해서 로그인 기능을 구현하는 방법
    - 로그인 했었다는 정보를 서버의 메모리에다가 기록 (세션 저장)
    - 고객이 로그인이 필요한 페이지(MyPage)를 요청하면 세션을 확인해서 로그인 정보가 나오면 OK

2. JSON Web Token(JWT)

    토큰 방식은 세션 데이터를 서버에 저장하지 않고, 마이페이지를 열람할 수 있는 토큰(열쇠)을 사용자에게 준다. 그래서 해당 토큰에는 session 방식보다 약간 더 많은 정보들이 들어간다.

    - 로그인시 제출한 아이디, 비번이 DB에 저장된 회원정보와 일치한다면 서버는 `Token` 하나를 만들어서 고객 브러우저로 전송한다. `Token`은 그냥 긴 암호화된 문자열일 뿐이고, 사용자가 로그인 했었는지, 아이디는 무엇인지 등의 정보들을 넣을 수 있다. 물론 위조가 불가능하도록 특별한 서명이 추가된다. 토큰은 쿠키나 로컬스토리지라는 곳에 저장된다. (+ 코드를 짜서 고객이 페이지 방문시마다 `Token`이 서버로 보내지도록 미리 장치를 추가한다.)

    - 고객이 마이페이지를 요청하면, 서버는 응답하기 전 로그인 여부를 확인한다.

    - 고객이 마이페이지 요청시 함께 보낸 `Token`을 검사한다. 유통기한이 지나지 않았는지, 서명이 잘 되어 있는지, 블랙리스트에 등록된 토큰인지 검사를 거친 후 이상이 없는 경우 마이페이지로 이동한다.

    하지만 이러한 방식은 단점이나 취약점이 존재할 수 있다. 해당 고객이 로그인을 했는지에 대한 정보 전체를 서버는 가지고 있지 않고 사용자가 가지고 있게 하는 것 자체가 보안상 좋은 방법은 아니다. 그래서 `stateful JWT` 라고 부르는 '어떤 사용자가 언제 로그인 했는지'를 서버에 저장해 두는 방식이 좋은 관습이긴 한데, 그 중 하나가 `refresh token` 방식이다. 그러나 이런 방식을 사용하면 1번의 세션 방식이랑 기능 상 큰 차이가 없다.

3. Open Autentication

    해당 방법은 쉽게 말하자만 페이스북, 구글 로그인이다. 고객의 페이스북, 구글 계정 정보를 불러와서 그걸 가지고 승인시켜 주는 방법이다.

    - 유저가 '페이스북으로 로그인'을 할 경우 페이스북 팝업창 생성, 해당 앱에 본인의 페이스북 정보 제공을 승인하면 페이스북에서 server.js로 해당 유저의 이름, 아이디 정보 등을 제공해 준다.

    - 그럼 유저의 페이스북 정보를 바탕으로 세션이나 토큰을 생성 한다. DB에 이름, 아이디를 저장해서 회원 목록을 만들어 준다던가, 그와 동시에 세션 데이터를 만들어 주던가 한다.

    - 유저가 마이페이지를 요청하면 서버는 응답하기 전 유저의 로그인 여부를 확인(토큰이나 세션 검사)한 후 응답한다.

    비밀번호를 취급안해도 된다는 장점 때문에 관리도 편리(페이스북 등에서 제공하는 공식 개발문서가 많기 때문에 따라하기만 하면 쉽고 빠르게 개발이 가능)하고 유저도 편리함을 느끼지만, 구글이나 페이스북이 OAuth를 중단하거나, 방법을 수정하거나, 페이스북 API 서버 다운으로 접속이 불가능한 경우 해당 사이트에서도 로그인이 불가능하다.

    또한 페이스북은 OAuth 방법이나 정책 변경이 잦아 약간 관리하기 불편한 점도 있다.

# 로그인 기능(session 방식)

1. 라이브러리 설치

```bash
# 3개 라이브러리 설치 - 로그인, 로그인 검증, 세션 생성
$ npm i passport passport-local express-session
```

2. 설치한 라이브리러 사용

```javascript
// server.js
// app.use(): 미들웨어, 요청과 응답 사이에 뭔가를 실행시키는 코드(요청이 적법한지 검사하는 그런 기능들을 미들웨이에 많이 담는다.)
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret: '비밀코드', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
```

3. 로그인 인증 & session 생성

```javascript
// server.js
// 로그인 페이지 라우팅
app.get('/login', function(request, response) {
  response.render('login.ejs');
});

// passport.authenticate(): passport 라이브러리가 제공하는 '아이디/비번 인증을 도와주는 코드', 응답 전에 local 방식으로 아이디/비번을 인증하라는 뜻으로 해석
// failureRedirect: 로그인 인증 실패시 이동시켜줄 경로
app.post('/login', passport.authenticate('local', { failureRedirect: '/fail' }), function(request, response) {
  response.redirect('/');
});

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
// 마이페이지 request.user에 담김
passport.deserializeUser(function(아이디, done) {
  db.collection('login').findOne({id: 아이디}, function(error, result) {
    done(null, result)
  });
});
```

4. 마이페이지

```javascript
// server.js
// 마이페이지 라우팅
app.get('/mypage', 로그인했니, function(request, response) {
  response.render('mypage.ejs');
});

// 마이페이지 접속 전 실행할 미들웨어
function 로그인했니(request, response, next) {
  if(request.user) {
    next()
  } else {
    response.send('로그인을 해주세요.');
  }
};
```