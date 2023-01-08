import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { UnauthorizedError, errMessages } from '../errors/index.js';

const userSchema = new mongoose.Schema({
  name: { // имя пользователя
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: { // почта пользователя
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: () => errMessages.app.notEmail,
    },
  },
  password: { // хеш пароля
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
  statics: {
    async findUserByCredentials(email, password) {
      const document = await this.findOne({ email }).select('+password');
      if (!document) {
        throw new UnauthorizedError(errMessages.user.incorrect);
      }
      const matched = await bcrypt.compare(password, document.password);
      if (!matched) {
        throw new UnauthorizedError(errMessages.user.incorrect);
      }
      const user = document.toObject();
      delete user.password;
      return user;
    },
  },
});

export const User = mongoose.model('user', userSchema);
