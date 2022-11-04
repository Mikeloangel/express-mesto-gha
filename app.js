const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.get('/', (req, res) => {
  res.send({ 'msg': 'hello' });
  console.log('hello');
})

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
  console.log(`Welcome to Mesto backend API`);
});
