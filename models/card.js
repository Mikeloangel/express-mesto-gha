const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: [true, 'Должен быть валидный адрес'],
    validate: {
      validator: (v) => isURL(v),
      message: (props) => `${props.value} неверный адрес!`,
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
