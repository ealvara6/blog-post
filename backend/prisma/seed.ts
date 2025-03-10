import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        username: 'joshuaelliott',
        email: 'lacosta@gmail.com',
        password: 'Di^7ZHjnm&',
        blogAuthor: true,
        createdAt: new Date('2025-03-10T13:50:19.599069'),
      },
    }),
    prisma.user.create({
      data: {
        username: 'dawn18',
        email: 'mariavalencia@taylor-lee.com',
        password: 'Wb93EoUq(Q',
        blogAuthor: true,
        createdAt: new Date('2025-03-10T13:50:19.599084'),
      },
    }),
  ]);

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: 'Technology' },
    }),
    prisma.category.create({
      data: { name: 'Science' },
    }),
    prisma.category.create({
      data: { name: 'World News' },
    }),
    prisma.category.create({
      data: { name: 'Health' },
    }),
    prisma.category.create({
      data: { name: 'Entertainment' },
    }),
  ]);

  // Create Posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: 'The Future of Artificial Intelligence',
        content: 'Artificial intelligence is evolving rapidly...',
        published: true,
        userId: users[0].id, // Linking to first user
        categories: { connect: [{ id: categories[0].id }] },
      },
    }),
    prisma.post.create({
      data: {
        title: 'Breakthrough in Quantum Computing',
        content: 'Scientists have made a major breakthrough...',
        published: true,
        userId: users[1].id, // Linking to second user
        categories: { connect: [{ id: categories[1].id }] },
      },
    }),
  ]);

  // Create Comments
  const comments = await Promise.all([
    prisma.comment.create({
      data: {
        content: 'Fascinating research. Looking forward to more breakthroughs.',
        postId: posts[0].id,
        userId: users[1].id,
      },
    }),
    prisma.comment.create({
      data: {
        content:
          "I have some concerns about the long-term effects, but it's promising.",
        postId: posts[1].id,
        userId: users[0].id,
      },
    }),
  ]);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
