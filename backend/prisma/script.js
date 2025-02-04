import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const user = await prisma.user.create({
    data: {
      username: 'ealvara73',
      email: 'ealvara73@gmail.com',
      password: 'Idontknow73.',
      blogAuthor: true,
      posts: [],
      comments: [],
    },
  });
  console.log(user);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
