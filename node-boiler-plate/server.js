const express = require('express');
const app = express();

require('dotenv').config();

const { User } = require("./models/User");

// application/x-www-form-urlencoded > 분석해서 가져옴
app.use(express.urlencoded({extended: true}));
// application/json > 분석해서 가져옴
app.use(express.json());

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect(process.env.REACT_APP_MONGO_URL, {})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World, Node.js'));

app.post('/register', (req, res) => {
  // 회원가입시 필요한 정보를 client에서 가져와 데이터베이스로 넣기
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
});

app.listen(process.env.REACT_APP_PORT, () => console.log(`Example app listening on port ${process.env.REACT_APP_PORT}!`));