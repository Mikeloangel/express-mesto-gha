const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.send({ 'msg': 'hello' });
  console.log('hello');
})

app.listen(PORT, () => {
  const hello_world = '12';
  console.log(`Server started at port ${PORT} ${hello_world}`);
});
