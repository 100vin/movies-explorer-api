import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { constants } from 'http2';
import { User } from '../models/user.js';
import {
  NotFoundError,
  BadRequestError,
  ConflictError,
  errMessages,
  notUniqueErrorCode,
} from '../errors/index.js';

export const createUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const document = await User.create({
      name,
      email,
      password: hash,
    });
    const user = document.toObject();
    delete user.password;
    res.status(constants.HTTP_STATUS_OK).send(user);
  } catch (err) {
    if (err.code === notUniqueErrorCode) {
      next(new ConflictError(errMessages.user.conflict));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestError(errMessages.user.badRequest));
    } else {
      next(err);
    }
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { JWT_SECRET } = req.app.get('config');
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError(errMessages.user.notFound);
    }
    res.status(constants.HTTP_STATUS_OK).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(errMessages.user.badRequest));
    } else {
      next(err);
    }
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true },
    );
    if (!user) {
      throw new NotFoundError(errMessages.user.notFound);
    }
    res.status(constants.HTTP_STATUS_OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError(errMessages.user.badRequest));
    } else {
      next(err);
    }
  }
};
