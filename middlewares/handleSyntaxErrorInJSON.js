// hadles syntax error in arriving JSON and stops
// flow with no next call
// eslint-disable-next-line no-unused-vars
module.exports.handleSyntaxErrorInJSON = (err, req, res, next) => {
  res.status(400).send({ message: 'Ошибка во входящем JSON' });
};
