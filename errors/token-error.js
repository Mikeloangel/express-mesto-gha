class TokenError extends Error{
  constructor(message = 'что-то не так с токеном'){
    super(message);
    this.statusCode = 401;
  }
}

module.exports = TokenError;