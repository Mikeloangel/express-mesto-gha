const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.find({ _id: userId })
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}