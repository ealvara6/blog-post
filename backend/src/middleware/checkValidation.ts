import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const checkValidationResults = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default checkValidationResults;
