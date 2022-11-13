const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: (props) => `${props.value} неверный email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => isURL(v),
      message: (props) => `${props.value} неверный адрес!`,
    }
  },
});

// finds user returns user data of reject promise
userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject('not user');
      }

      return bcrypt.compare(password, user.password)
        .then((isMatched) => {
          if (!isMatched) {
            return Promise.reject('not matched')
          }
          return Promise.resolve(user);
        })
    })
}

module.exports = mongoose.model('user', userSchema);
