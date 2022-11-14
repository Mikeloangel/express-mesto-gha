require('dotenv').config();

const { PORT = 3000 } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, Joi, celebrate } = require('celebrate');

const { auth } = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/handleErrors');
// const { handleSyntaxErrorInJSON } = require('./middlewares/handleSyntaxErrorInJSON');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const ResourceNotFoundError = require('./errors/not-found-error');

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

// cookie parser
app.use(cookieParser());

// body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// prevent crush on invalid incoming data
// app.use(handleSyntaxErrorInJSON);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },)
  }),
  login);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
      name: Joi.string().min(2).max(20),
      about: Joi.string().min(2).max(20),
      avatar: Joi.string().uri({
        scheme: [
          /https?/,
        ],
      })
        .required()
        .allow(''),
    }),
  }),
  createUser
);

// protected routes
app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);

// handle 404
app.all('*', (req, res, next) => {
  next(new ResourceNotFoundError());
});

// error handling
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log('Welcome to Mesto backend API');
});
