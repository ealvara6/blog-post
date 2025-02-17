import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';

interface CheckUserDTO {
  username: string;
  email: string;
}

const checkIfUserExists = async (
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

const createUserInDatabase = async (
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

const findUser = async (prisma: PrismaClient, id: number): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

export { checkIfUserExists, createUserInDatabase, findUser };
