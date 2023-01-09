import { Router } from 'express';
import { createUser, loginUser } from '../controllers/users.js';
import { celebrateBodyUser, celebrateBodyAuth } from '../validators/users.js';
import { auth } from '../middlewares/auth.js';
import { userRouter } from './users.js';
import { movieRouter } from './movies.js';
import { NotFoundError, errMessages } from '../errors/index.js';

export const router = Router();

router.post('/signin', celebrateBodyAuth, loginUser);
router.post('/signup', celebrateBodyUser, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.all('/*', (req, res, next) => {
  next(new NotFoundError(errMessages.app.pageNotFound));
});
