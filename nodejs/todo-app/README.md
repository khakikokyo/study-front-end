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
5. Database / collection 만들기 (Databases > Collections > Add My Own Data > Database name/Collection name 설정)

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
  app.listen(8080, function() {
    console.log("listening on 8080");
  });
});
```