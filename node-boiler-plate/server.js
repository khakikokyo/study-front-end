const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URL, {})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));