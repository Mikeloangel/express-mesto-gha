const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { logger, tempUserInjection } = require('./middleware');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

/** TEMPORAL HARDCODE START */

// user id injection
app.use(tempUserInjection);

/** TEMPORAL HARDCODE END */

// body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(disableCache);
app.use(logger);

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log('Welcome to Mesto backend API');
});
