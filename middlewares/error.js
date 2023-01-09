import { constants } from 'http2';
import { errMessages } from '../errors/index.js';

export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = err.message || errMessages.app.unknown;
  res.status(status).send({ message });
  next();
};
