const Cards = require('../models/card');

//get all cards
module.exports.getCards = (req, res) => {
  Cards.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

//post new card by body request
module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Cards.create({ name, link, owner: _id })
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

//delete card by Id in param
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Cards.deleteOne({ _id: cardId })
    .then(() => res.send({ 'result': 'ok' }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

// puts like to card by cardId in param
module.exports.putLike = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Cards.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then(updatedCard => res.send(updatedCard))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

// deletes like to card by cardId in param
module.exports.deleteLike = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Cards.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then(updatedCard => res.send(updatedCard))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}