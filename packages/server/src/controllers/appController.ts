import { Request, Response } from 'express';
import {
  getAllPosts,
  createSinglePost,
  getPostById,
  createSingleComment,
} from '../db/queries';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

export const createPost = [
  upload.single('image'), // Middleware to handle file upload
  async (req: Request, res: Response) => {
    const { title, content, authorId } = req.body;
    const image = req.file;

    try {
      let imagePath: string;

      if (image) {
        imagePath = image.path; // Multer already saved the file, so we just need the path
      } else {
        imagePath = 'default-image.png';
      }

      const post = await createSinglePost(
        title,
        content,
        imagePath, // Store image path in DB
        authorId
      );

      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating post' });
    }
  },
];

export const getPosts = async (req: Request, res: Response) => {
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
