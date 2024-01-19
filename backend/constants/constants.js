const regEx = /(https?:\/\/)(w{3}\.)?([a-zA-Z0-9-]{0,63}\.)([a-zA-Z]{2,4})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

module.exports = {
  HTTP_STATUS_OK: 200,
  HTTP_STATUS_CREATED: 201,
  HTTP_STATUS_BAD_REQUEST: 400,
  HTTP_STATUS_NOT_FOUND: 404,
  HTTP_STATUS_CONFLICT: 409,
  HTTP_STATUS_FORBIDDEN: 403,
  HTTP_STATUS_UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
  regEx,
};
