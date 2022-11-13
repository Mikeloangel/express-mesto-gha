const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ERROR_CODE = 400, ERROR_NOTFOUND = 404, DEFAULT_ERROR = 500 } = require('../utils/errorCodes');
const user = require('../models/user');

// get all users from Db
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' }));
};

// get user by id from Db
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findOne({ _id: userId })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Неверный формат _id' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

// creates user in Db
module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({ name, about, avatar, email, password: hashedPassword }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
      }
    });

  // User.create({ name, about, avatar, email, password })
  //   .then((user) => res.status(201).send(user))
  //   .catch((err) => {
  //     if (err.name === 'ValidationError') {
  //       res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
  //     } else {
  //       res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
  //     }
  //   });
};

// patches user info {name, about}
module.exports.updateUserInfo = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

// patches user avatar {avatar}
module.exports.updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

// logs user in and sends JWT back
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV ? JWT_SECRET : 'dev',
        { expiresIn: '7d' }
      );
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
      // res.send({ token });
      res.send({ message: 'ok' });
    })
    .catch((err) => {
      res.cookie('jwt', '', { maxAge: 3600000 * 24 * 7, httpOnly: true });
      res.status(401).send({ message: err })
    })
}