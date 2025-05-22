import { PrismaClient } from '@prisma/client/extension';

export const getCategoriesService = async (prisma: PrismaClient) => {
  return await prisma.category.findMany();
};
