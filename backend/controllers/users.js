const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  ConflictError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../utils/errors');
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} = require('../constants/constants');

const { JWT_SECRET = 'dev_key' } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('Incorrect email or password')));
};

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => {
      res.status(HTTP_STATUS_OK).send({ data: users });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid data format'));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const { password: hashedPassword, ...userWithoutPassword } = user.toObject();
      res.status(HTTP_STATUS_CREATED).send({ data: userWithoutPassword });
    })
    .catch((err) => {
      if (err.name === 'MongoServerError') {
        return next(new ConflictError('User with same name already exists'));
      } if (err.name === 'ValidatonError') {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(', ');
        return next(new BadRequestError(`Validation error ${errorMessage}`));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Provided info is incorrect'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Provided info is incorrect'));
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
