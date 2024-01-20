const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'leoxandro.students.nomoredomainsmonster.ru',
  'api.leoxandro.students.nomoredomainsmonster.ru',
  'http://leoxandro.students.nomoredomainsmonster.ru',
  'http://api.leoxandro.students.nomoredomainsmonster.ru',
  'https://leoxandro.students.nomoredomainsmonster.ru',
  'https://api.leoxandro.students.nomoredomainsmonster.ru',
  'http://localhost:3000',
  'http://localhost:3001',
];

// eslint-disable-next-line
module.exports = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
};
