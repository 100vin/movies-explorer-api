import rateLimit from 'express-rate-limit';
import { errMessages } from '../errors/index.js';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: errMessages.app.rateLimit,
});
