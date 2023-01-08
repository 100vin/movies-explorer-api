import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';

import { router } from './routes/index.js';
import { limiter } from './middlewares/ratelimit.js';
import { errorHandler } from './middlewares/error.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

// const { PORT = 3000 } = process.env;

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

const config = dotenv.config({
  path: path.resolve(process.env.NODE_ENV === 'production' ? '.env' : '.env.common'),
}).parsed;

const app = express();
app.set('config', config);

mongoose.set('runValidators', true);
mongoose.connect(config.DB_URL);

app.use(requestLogger);
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
