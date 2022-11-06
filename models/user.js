const mongoose = require('mongoose');

const { validateUrlObject } = require('../utils/utils');

const userSchema = mongoose.Schema({
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
    validate: validateUrlObject,
  },
});

module.exports = mongoose.model('user', userSchema);
