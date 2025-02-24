import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

export const prismaMiddleWare = (prisma: PrismaClient) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    req.prisma = prisma;
    next();
  };
};
