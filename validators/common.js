import { celebrator, Joi } from 'celebrate';
import validator from 'validator';
import { errMessages } from '../errors/index.js';

export const celebrate = celebrator(
  { mode: 'full' },
  { abortEarly: false },
);

export const schemaObjectId = Joi.string().hex().length(24);
export const schemaURL = Joi.string().custom((value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.message(errMessages.app.notURL);
});
