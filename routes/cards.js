const router = require('express').Router();

const { Joi, celebrate } = require('celebrate');

const {
  getCards, addCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().required().uri({ scheme: [/https?/] }),
    }),
  }),
  addCard
);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  deleteCard
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  putLike
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  deleteLike
);

module.exports = router;
