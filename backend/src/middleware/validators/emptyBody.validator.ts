import { NextFunction, Request, Response } from 'express';

export const validateEmptyBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Request body cannot be empty',
      message: 'Please provide data to update',
    });
  }
  next();
};
