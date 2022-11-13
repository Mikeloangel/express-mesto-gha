const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');

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
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: [true, 'Должен быть валидный адрес'],
    validate: {
      validator: (v) => isURL(v),
      message: (props) => `${props.value} неверный адрес!`,
    }
  },
});

module.exports = mongoose.model('user', userSchema);
