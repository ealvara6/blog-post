import { PrismaClient, User } from '@prisma/client';

interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export const createUserService = async (
  prisma: PrismaClient,
  userData: CreateUserDTO
): Promise<User> => {
  return await prisma.user.create({
    data: userData,
  });
};
