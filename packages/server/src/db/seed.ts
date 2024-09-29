import prisma from './prisma';
import { User } from '@prisma/client';

// create initial user and some post data
async function main() {
  const initialUser: User = await prisma.user.create({
    data: { username: 'test', name: 'test', email: 'test', password: 'test' },
  });
  await prisma.post.create({
    data: {
      title: 'My first post',
      content: 'This is my first post',
      authorId: initialUser.id,
    },
  });

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
