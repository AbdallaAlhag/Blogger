import { Request, Response } from 'express';
import { getAllPosts, createSinglePost } from '../db/queries';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const post = await getAllPosts();
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;
  try {
    const post = await createSinglePost(title, content, authorId);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};
