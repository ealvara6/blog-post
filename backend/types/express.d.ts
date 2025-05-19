import { PrismaClient } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient;
    }
    interface User {
      id: number;
      username: string;
      email: string;
      password: string;
    }
  }
}

export {};
