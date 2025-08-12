import { Response } from 'express';
import multer from 'multer';
import { NextFunction } from 'express';

interface errorHandlerOptions {
  defaultMessage?: string;
  errorMessage?: string;
}

export const handleError = (
  err: unknown,
  res: Response,
  options: errorHandlerOptions = {}
) => {
  const {
    defaultMessage = 'An unknown error occurred',
    errorMessage = 'An unknown error occurred',
  } = options;

  if (err instanceof Error) {
    res.status(500).json({ error: errorMessage, details: err.message });
    return;
  }
  return res.status(500).json({ error: defaultMessage });
};
