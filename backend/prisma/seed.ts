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

  type UserProps = {
    username: string;
    email: string;
    id: number;
    password: string;
    blogAuthor: boolean;
    profilePictureUrl: string;
  };

  type PostProps = {
    title: string;
    createdAt: Date;
    id: number;
    content: string | null;
    published: boolean;
    userId: number;
  };

  const categoryList = await prisma.category.findMany();
  const users: UserProps[] = [];
  const posts: PostProps[] = [];

  for (let i = 1; i <= NUM_USERS; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        blogAuthor: faker.datatype.boolean(),
        profilePictureUrl: `/uploads/profile-pictures/thumbs/user-${i}.webp`,
      },
    });
    users.push(user);

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
      posts.push(post);
    }
  }
  for (let k = 0; k < 150; k++) {
    const randomUser = Math.floor(Math.random() * users.length);
    const randomPost = Math.floor(Math.random() * posts.length);
    await prisma.comment.create({
      data: {
        content: faker.lorem.sentences(2),
        postId: posts[randomPost].id,
        userId: users[randomUser].id,
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
