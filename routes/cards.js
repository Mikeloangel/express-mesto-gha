const router = require('express').Router();

const {
  getCards, addCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', addCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
