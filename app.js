const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { logger, handleSyntaxErrorInJSON } = require('./middleware');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

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
app.use(logger);

// prevent crush on invalid incoming data
app.use(handleSyntaxErrorInJSON);

// routes
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

// handle 404
app.all('*', (req, res) => {
  res.status(404).send({});
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log('Welcome to Mesto backend API');
});
