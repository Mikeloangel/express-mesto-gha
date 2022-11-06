const Cards = require('../models/card');

const { ERROR_CODE = 400, ERROR_NOTFOUND = 404, DEFAULT_ERROR = 500 } = require('../utils/errorCodes');

// get all cards
module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' }));
};

// post new card by body request
module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Cards.create({ name, link, owner: _id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

// delete card by Id in param
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Cards.deleteOne({ _id: cardId })
    .orFail()
    .then(() => {
      res.status(200).send({ message: 'ok' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении карточки.' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

// puts like to card by cardId in param
module.exports.putLike = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Cards.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .orFail()
    .then((updatedCard) => {
      res.status(200).send(updatedCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении карточки.' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Передан несуществующий _id карточки. ' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

// deletes like to card by cardId in param
module.exports.deleteLike = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Cards.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .orFail()
    .then((updatedCard) => {
      res.status(200).send(updatedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении карточки.' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Передан несуществующий _id карточки. ' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
