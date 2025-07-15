import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const NUM_USERS = 10;
  const NUM_POSTS_PER_USER = 5;
  const NUM_COMMENTS = 50;

  const categories = await prisma.category.createMany({
    data: [
      { name: 'Technology' },
      { name: 'Lifestyle' },
      { name: 'Education' },
      { name: 'Gaming' },
    ],
    skipDuplicates: true,
  });

  const categoryList = await prisma.category.findMany();

  for (let i = 0; i < NUM_USERS; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        blogAuthor: faker.datatype.boolean(),
      },
    });

    for (let j = 0; j < NUM_POSTS_PER_USER; j++) {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(2),
          published: faker.datatype.boolean(),
          userId: user.id,
          categories: {
            connect: [
              categoryList[Math.floor(Math.random() * categoryList.length)],
            ],
          },
        },
      });

      // Add random comments
      for (let k = 0; k < 3; k++) {
        await prisma.comment.create({
          data: {
            content: faker.lorem.sentences(2),
            postId: post.id,
            userId: user.id,
          },
        });
      }
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
