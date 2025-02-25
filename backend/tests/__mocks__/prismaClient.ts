import { PrismaClient } from '@prisma/client';

export const setupPrismaMock = () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      comment: {
        findMany: jest.fn(),
      },
    })),
  };
};

export const prismaMock = new PrismaClient();
