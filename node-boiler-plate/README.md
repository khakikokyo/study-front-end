# Node-boiler-plate

1. node 설치 확인

```bash
$ node -v
```

2. 프로젝트 폴더 생성
3. npm package 생성

```bash
$ npm init
```

3. express 다운

```bash
$ npm i express
```

```javascript
// (server.js)
// express 모듈 가져오기
const express = require("express");
// 새로운 express app 생성
const app = express();
const port = 8080;

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```