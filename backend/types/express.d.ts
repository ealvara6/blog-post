import { PrismaClient } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient;
      user: {
        id: number;
        username: string;
        email: string;
        password: string;
      };
      file?;
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
