import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose, { mongo } from 'mongoose';
import cookieSession from 'cookie-session';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@babketickets/gittixcommon';

import { indexOrderRouter } from './routes/index';
import { showOrderRouter } from './routes/show';
import { deleteOrderRouter } from './routes/delete';
import { newOrderRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);
mongoose.set('strictQuery', false);

export { app };
