import prisma from './prisma';

// queries.js
export async function getAllPosts() {
  try {
    const allPosts = await prisma.post.findMany({
      take: 9,
      orderBy: {
        createdAt: 'desc',
      },
      // where: { published: true },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    return allPosts;
  } catch (error) {
    console.log(error);
  }
}

export async function createSinglePost(
  title: string,
  content: string,
  authorId: string
) {
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    return newPost;
  } catch (error) {
    console.log(error);
  }
}
