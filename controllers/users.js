const User = require('../models/user');

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
  User.find({ _id: userId })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// creates user in Db
// returns new user JSON
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// patches user info {name, about}
module.exports.updateUserInfo = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// patches user avatar {avatar}
module.exports.updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
