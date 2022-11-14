class CardNotFound extends Error{
  constructor(msg = 'карточка не найдена'){
    super(msg);
    this.statusCode = 404;
  }
}

module.exports = CardNotFound;