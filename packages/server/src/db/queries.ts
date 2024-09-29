import prisma from './prisma';

// queries.js
export async function getAllPosts() {
  try {
    const allPosts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true, comments: true },
    });
    return allPosts;
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
