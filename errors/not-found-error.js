class ResourceNotFoundError extends Error{
  constructor(msg = 'ресурс не найден'){
    super(msg);
    this.statusCode = 404;
  }
}

module.exports = ResourceNotFoundError;