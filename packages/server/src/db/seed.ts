import prisma from './prisma';
import { User } from '@prisma/client';
import { loremIpsum } from 'lorem-ipsum'; // You can install this library for generating random content

// create initial user and some post data
async function main() {
  // delete all user and post data
  // await prisma.comment.deleteMany({});
  // await prisma.post.deleteMany({});
  // await prisma.user.deleteMany({});

  // // create initial user

  const initialUser: User = await prisma.user.create({
    data: {
      username: 'test',
      name: 'test',
      email: 'test',
      password: 'test',
    },
  });

  // const initialUser: User | null = await prisma.user.findUnique({
  //   where: {
  //     username: 'test',
  //   },
  // });
  // if (!initialUser) {
  //   console.log('No user with username test found, exiting');
  //   process.exit(1);
  // }

  // Generate 10 posts with 5 paragraphs of random content
  for (let i = 1; i <= 10; i++) {
    await prisma.post.create({
      data: {
        title: `Post Title ${i}`,
        content: generateContent(5), // Generate 5 paragraphs of content
        authorId: initialUser.id,
        published: false, // You can change this to true if you want the posts to be published
      },
    });
  }

  console.log('Seeding completed! Initial user and post data generated!');
}

// Helper function to generate 5 paragraphs of content
function generateContent(paragraphCount: number): string {
  let content = '';
  for (let i = 0; i < paragraphCount; i++) {
    content += `${loremIpsum({
      count: 5, // Number of sentences per paragraph
      units: 'sentences',
    })}\n\n`; // Add a new line between paragraphs
  }
  return content;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
