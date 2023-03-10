import jwt from 'jsonwebtoken';
import { UnauthorizedError, errMessages } from '../errors/index.js';

export const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errMessages.app.unauthorized);
  }

  const token = authorization.replace(/^Bearer\s/i, '');
  let payload;
  const { JWT_SECRET } = req.app.get('config');

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(errMessages.app.unauthorized));
  }

  req.user = payload;
  next();
};
