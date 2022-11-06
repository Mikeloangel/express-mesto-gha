const User = require('../models/user');

// const ERROR_CODE = 400;
// const ERROR_NOTFOUND = 404;
// const DEFAULT_ERROR = 500;
// const RES_OK = 200;
// const RES_OK_CREATED = 201;

// get all users from Db
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// get user by id from Db
// returns user JSON
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findOne({ _id: userId })
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный формат _id' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// creates user in Db
// returns new user JSON
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// patches user info {name, about}
module.exports.updateUserInfo = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
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
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
