require('dotenv').config();
const { PORT = 3000, DEV = false } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { auth } = require('./middlewares/auth');
const { logger, handleSyntaxErrorInJSON } = require('./middleware');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

// cookie parser
app.use(cookieParser());

/** TEMPORAL HARDCODE START */

// middleware to inject user _id
// app.use((req, res, next) => {
//   req.user = {
//     _id: '6365ffa7604cf3bcbf92b59c',
//   };

//   next();
// });

/** TEMPORAL HARDCODE END */

// body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// logger
if (DEV) {
  app.use(logger);
}

// prevent crush on invalid incoming data
app.use(handleSyntaxErrorInJSON);

app.post('/signin', login);
app.post('/signup', createUser);

// protects next routes
app.use(auth);

// routes
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

// handle 404
app.all('*', (req, res) => {
  res.status(404).send({ message: '404' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log('Welcome to Mesto backend API');
});
