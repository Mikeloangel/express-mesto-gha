const Cards = require('../models/card');

const WrongDataError = require('../errors/wrong-data-error');
const ResourceNotFoundError = require('../errors/not-found-error');

// get all cards
module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// post new card by body request
module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Cards.create({ name, link, owner: _id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError());
      } else {
        next(err);
      }
    });
};

// delete card by Id in param
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { user } = req;

  Cards.findOne({ _id: cardId, owner: user })
    .orFail()
    .then(() => {
      Cards.deleteOne({ _id: cardId })
        .orFail()
        .then(() => {
          res.status(200).send({ message: 'ok' });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new WrongDataError());
          } else if (err.name === 'DocumentNotFoundError') {
            next(new ResourceNotFoundError());
          } else {
            next(err);
          }
        });
    })
    .catch(() => {
      next(new ResourceNotFoundError());
    });
};

// puts like to card by cardId in param
module.exports.putLike = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Cards.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .orFail()
    .then((updatedCard) => {
      res.status(200).send(updatedCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new WrongDataError());
      } else if (err.name === 'DocumentNotFoundError') {
        next(new ResourceNotFoundError());
      } else {
        next(err);
      }
    });
};

// deletes like to card by cardId in param
module.exports.deleteLike = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Cards.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .orFail()
    .then((updatedCard) => {
      res.status(200).send(updatedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new WrongDataError());
      } else if (err.name === 'DocumentNotFoundError') {
        next(new ResourceNotFoundError());
      } else {
        next(err);
      }
    });
};
