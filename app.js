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

// protected routes
app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);

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
