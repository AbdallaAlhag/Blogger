import prisma from './prisma';

// queries.js
export async function getAllPosts() {
  try {
    prisma.post.findMany({
      where: { published: true },
      include: { author: true, comments: true },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function createSinglePost(
  title: string,
  content: string,
  authorId: number
) {
  try {
    prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
