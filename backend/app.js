// eslint-disable-next-line
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('./middleware/cors');
const usersRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { signInSchema, signUpSchema } = require('./middleware/validation');
const auth = require('./middleware/auth');
const { errorHandler } = require('./middleware/error-handler');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { NotFoundError } = require('./utils/errors');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(`Error during MongoDB connection: ${error}`));

const app = express();

app.use(cors);

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', signInSchema, login);
app.post('/signup', signUpSchema, createUser);
app.use(auth);
app.use('/users', usersRoutes);
app.use('/cards', cardRoutes);

app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Requested resource was not found'));
});

app.use(errors());
app.use(errorHandler);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
