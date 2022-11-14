const jwt = require('jsonwebtoken');
const TokenError = require('../errors/token-error')

module.exports.auth = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  try {
    const payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev');
    req.user = payload;
    next();
  } catch (e) {
    next(new TokenError('Что-то не так с токеном'));
  }
};
