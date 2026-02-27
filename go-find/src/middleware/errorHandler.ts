
import { Request, Response, NextFunction } from 'express';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
});

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error({ err, path: req.path }, 'Unhandled error');
  
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
};
