const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

// app.use((req, res, next) => {
//   res.header('Cache-Control','no-store')
//   next();
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
  console.log(`Welcome to Mesto backend API`);
});


