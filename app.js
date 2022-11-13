require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { logger, handleSyntaxErrorInJSON } = require('./middleware');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000, DEV = false } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(cookieParser());

/** TEMPORAL HARDCODE START */

// middleware to inject user _id
app.use((req, res, next) => {
  req.user = {
    _id: '6365ffa7604cf3bcbf92b59c',
  };

  next();
});

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

// routes
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.post('/signin', login);
app.post('/signup', createUser);

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
