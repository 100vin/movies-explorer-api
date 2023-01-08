import { Router } from 'express';
import { getUser, updateUser } from '../controllers/users.js';
import { celebrateBodyProfile } from '../validators/users.js';

export const userRouter = Router();

userRouter.get('/me', getUser);
userRouter.patch('/me', celebrateBodyProfile, updateUser);
