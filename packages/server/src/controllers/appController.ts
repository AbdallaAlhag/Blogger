import { Request, Response } from 'express';
import {
  getAllPosts,
  getHomePosts,
  createSinglePost,
  getPostById,
  createSingleComment,
} from '../db/queries';
import jwt from 'jsonwebtoken';

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const image = req.file;
  const token = req.headers.authorization?.split(' ')?.[1];

  // console.log(`Received token: ${token}`);

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const secret = process.env.JWT_SECRET || 'a santa cat';

  try {
    interface DecodedToken {
      id: string;
    }

    const decoded = jwt.verify(token, secret) as unknown as DecodedToken;

    // console.log(`Decoded token: ${JSON.stringify(decoded)}`);

    if (!(decoded && 'id' in decoded)) {
      throw new Error('Token verification failed or missing id');
    }

    const authorId = decoded.id;

    if (!title || !content) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    let imagePath: string;

    if (image) {
      imagePath = image.path;
    } else {
      imagePath = 'default-image.png';
    }

    await createSinglePost(title, content, imagePath, authorId);

    res.status(201).json({ message: 'Post created successfully!' });
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const post = await getHomePosts();
    res.json(post);
    // console.log(post);
  } catch (error) {
    console.error(error);
  }
};

export const getEveryPosts = async (req: Request, res: Response) => {
  try {
    const post = await getAllPosts();
    res.json(post);
  } catch (error) {
    console.error(error);
  }
};

export const getSinglePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await getPostById(id);
    res.json(post);
  } catch (error) {
    console.error(error);
  }
};

export const createComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { username, content } = req.body;
  try {
    const comment = await createSingleComment(id, content, username);
    res.json(comment);
  } catch (error) {
    console.error(error);
  }
};
