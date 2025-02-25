import { Response } from 'express';

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
    errorMessage = 'An unknown error occured',
  } = options;

  if (err instanceof Error) {
    res.status(500).json({ error: errorMessage, details: err.message });
    return;
  }
  return res.status(500).json({ error: defaultMessage });
};
