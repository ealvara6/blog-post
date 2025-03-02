import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { handleError } from '../utils/errorhandler';
require('dotenv').config();

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token is required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded as { id: string };
    next();
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Invalid or expired token',
    });
  }
};
