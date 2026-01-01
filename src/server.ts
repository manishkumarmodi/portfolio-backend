import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { appConfig } from './config/env';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { apiRouter } from './routes';

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (appConfig.allowedOrigins.includes('*') || appConfig.allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin not allowed by CORS policy.'));
  }
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    supportEmail: appConfig.supportEmail
  });
});

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(appConfig.port, () => {
  console.log(`API listening on port ${appConfig.port}`);
});

const shutdown = () => {
  server.close(() => {
    console.log('Server closed gracefully');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export { app };
