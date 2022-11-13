const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  try {
    const payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev');
    console.log('payload', payload);
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).send({ message: 'token not found' });
  }

}