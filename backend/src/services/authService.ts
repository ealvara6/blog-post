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
  return prisma.user.create({
    data: userData,
    include: {
      posts: true,
      comments: true,
    },
  });
};
