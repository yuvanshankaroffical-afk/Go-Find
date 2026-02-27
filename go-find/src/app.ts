
import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import searchRoutes from './routes/search.routes';
import { globalRateLimiter, searchRateLimiter } from './middleware/rateLimit';
import { errorHandler } from './middleware/errorHandler';

export async function createApp() {
  const app = express();

  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());
  app.use(globalRateLimiter);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Routes
  app.use('/api/v1/search', searchRateLimiter, searchRoutes);

  // Error handling
  app.use(errorHandler);

  return app;
}
