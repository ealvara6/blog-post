const checkIfUserExists = async ({ username, email }, prisma) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });
};

const createUserInDatabase = async (prisma, userData) => {
  return prisma.user.create({
    data: userData,
    include: {
      posts: true,
      comments: true,
    },
  });
};

const findUser = async (prisma, id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

module.exports = { checkIfUserExists, createUserInDatabase, findUser };
