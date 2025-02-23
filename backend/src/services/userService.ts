import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';

interface CheckUserDTO {
  username: string;
  email: string;
}

export const getUsersService = async (
  prisma: PrismaClient
): Promise<User[]> => {
  return await prisma.user.findMany({
    include: { posts: true, comments: true },
  });
};

export const checkIfUserExists = async (
  { username, email }: CheckUserDTO,
  prisma: PrismaClient
): Promise<User> => {
  return prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });
};

interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export const createUserInDatabase = async (
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

export const updateUserService = async (
  prisma: PrismaClient,
  id: number,
  updateData: Partial<User>
): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data: updateData,
  });
};

export const findUser = async (
  prisma: PrismaClient,
  id: number
): Promise<User> => {
  return await prisma.user.findUnique({
    where: { id },
  });
};
