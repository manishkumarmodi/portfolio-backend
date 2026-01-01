import type { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
  public statusCode: number;
  public details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace?.(this, HttpError);
  }
}

type ExpressError = Error & Partial<HttpError>;

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new HttpError(404, 'The requested resource was not found.'));
};

export const errorHandler = (error: ExpressError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = error.statusCode && error.statusCode >= 100 ? error.statusCode : 500;
  const payload = {
    message: error.message || 'Unexpected server error.',
    details: error.details ?? undefined
  };

  if (statusCode >= 500) {
    console.error('[server] internal error', error);
  }

  res.status(statusCode).json(payload);
};
