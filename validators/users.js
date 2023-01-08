import { Joi, Segments } from 'celebrate';
import { celebrate } from './common.js';

const schemaName = Joi.string().min(2).max(30);
const schemaEmail = Joi.string().email();
const schemaPassword = Joi.string().required();

export const celebrateBodyUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: schemaName.required(),
    email: schemaEmail.required(),
    password: schemaPassword,
  }),
});

export const celebrateBodyAuth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: schemaEmail.required(),
    password: schemaPassword,
  }),
});

export const celebrateBodyProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: schemaName,
    email: schemaEmail,
  }),
});
