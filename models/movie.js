import mongoose from 'mongoose';
import validator from 'validator';
import { errMessages } from '../errors/index.js';

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: true,
  },
  director: { // режиссёр фильма
    type: String,
    required: true,
  },
  duration: { // длительность фильма
    type: Number,
    required: true,
  },
  year: { // год выпуска фильма
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
  description: { // описание фильма
    type: String,
    required: true,
  },
  image: { // ссылка на постер к фильму
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: () => errMessages.app.notURL,
    },
  },
  trailerLink: { // ссылка на трейлер фильма
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: () => errMessages.app.notURL,
    },
  },
  thumbnail: { // миниатюрное изображение постера к фильму
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: () => errMessages.app.notURL,
    },
  },
  owner: { // _id пользователя, который сохранил фильм
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    type: Number,
    required: true,
  },
  nameRU: { // название фильма на русском языке
    type: String,
    required: true,
  },
  nameEN: { // название фильма на английском языке
    type: String,
    required: true,
  },
}, { versionKey: false });

export const Movie = mongoose.model('movie', movieSchema);
