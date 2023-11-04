import 'dotenv/config';

import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';

import db from './models';
import apiRoutes from './routes/api';
import homeRoutes from './routes/home';
import viewEngine from './configs/view.config';
import { morgan, session, response, notFound, errorHandler } from './middlewares';

const app = express();

db.connectDB();
viewEngine(app);

app.use(cors());
app.use(morgan());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session);
app.use(response);

app.use('/', homeRoutes);
app.use('/v1/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
