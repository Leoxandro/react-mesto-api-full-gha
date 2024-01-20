const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'api.akarpov.students.nomoredomainsmonster.ru',
  'akarpov.students.nomoredomainsmonster.ru',
  'https://akarpov.students.nomoredomainsmonster.ru',
  'http://akarpov.students.nomoredomainsmonster.ru',
  'http://api.akarpov.students.nomoredomainsmonster.ru',
  'https://api.akarpov.students.nomoredomainsmonster.ru',
  'localhost:27017/mestodb',
  'mongodb://localhost:27017/mestodb',
  '*',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', 'true');

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
