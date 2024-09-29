import prisma from './prisma';
import { User } from '@prisma/client';

// create initial user and some post data
async function main() {
  // delete all user and post data
  // await prisma.$executeRaw`DROP TABLE IF EXISTS "Comment";`;
  // await prisma.$executeRaw`DROP TABLE IF EXISTS "Post";`;
  // await prisma.$executeRaw`DROP TABLE IF EXISTS "User";`;
  // // create initial user

  const initialUser: User = await prisma.user.create({
    data: {
      username: 'test',
      name: 'test',
      email: 'test',
      password: 'test',
    },
  });

  for (let i = 1; i <= 3; i++) {
    await prisma.post.create({
      data: {
        title: `My ${i} post`,
        content: `This is my ${i} post`,
        authorId: initialUser.id,
      },
    });
  }

  console.log(
    'Seeding completed! Initial user created and some post data generated!'
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
