// queries.js
import prisma from './prisma';

export async function getHomePosts() {
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

export async function getAllPosts() {
  try {
    const allPosts = await prisma.post.findMany({
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
  image: string,
  authorId: string
) {
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        image,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
    return newPost;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostById(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            username: true, // This is the commenter's username, stored in the comment model
            content: true, // Include the comment content
            createdAt: true, // Include when the comment was created
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function createSingleComment(
  id: string,
  content: string,
  username: string
) {
  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        username,
        post: {
          connect: {
            id,
          },
        },
      },
    });
    return newComment;
  } catch (error) {
    console.log(error);
  }
}
