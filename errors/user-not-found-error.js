class UserNotFoundError extends Error{
  constructor(msg = 'пользователь не найден'){
    super(msg);
    this.statusCode = 404;
  }
}

module.exports = UserNotFoundError;