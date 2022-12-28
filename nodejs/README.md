# Node.js

## 서버(Serveran)

클라이언트의 요청을 받으면 서비스, 데이터를 제공하는 컴퓨터 혹은 프로그램을 말한다. 쉽게 말하자면 요청을 받으면 데이터를 보내주는 기계이다.

### 서버에 요청할 수 있는 4가지 방법

1. 읽기(GET)
2. 쓰기(POST)
3. 수정(PUT)
4. 삭제(DELETE)

### 서버 재실행 자동화

```bash
# npm
$ npm i -g nodemon

# yarn
$ yarn add global nodemon

# 실행
$ nodemon server.js
```