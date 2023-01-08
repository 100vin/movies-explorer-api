import { Joi, Segments } from 'celebrate';
import { celebrate, schemaObjectId, schemaURL } from './common.js';

const schemaString = Joi.string();
const schemaNumber = Joi.number();

export const celebrateBodyMovie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: schemaString.required(),
    director: schemaString.required(),
    duration: schemaNumber.required(),
    year: schemaString.min(4).max(4).required(),
    description: schemaString.required(),
    image: schemaURL.required(),
    trailerLink: schemaURL.required(),
    thumbnail: schemaURL.required(),
    movieId: schemaNumber.required(),
    nameRU: schemaString.required(),
    nameEN: schemaString.required(),
  }),
});

export const celebrateParamsMovieId = celebrate({
  [Segments.PARAMS]: Joi.object({
    _id: schemaObjectId.required(),
  }).required(),
});
