const {
  NODE_ENV = 'dev',
  JWT_SECRET = 'dev-secret',
  SALT = 10,
  PORT = 3001,
  MONGODB = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  SALT,
  PORT,
  MONGODB,
};
