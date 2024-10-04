import { Request, Response } from 'express';
import { getAllPosts, createSinglePost, getPostById } from '../db/queries';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const post = await getAllPosts();
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await getPostById(id);
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
