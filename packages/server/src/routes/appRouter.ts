import express from 'express';
const router = express.Router();
import {
  getPosts,
  createPost,
  getSinglePost,
} from '../controllers/appController';

router.get('/posts', getPosts);
router.get('/posts/:id', getSinglePost);

router.post('/posts', createPost);

export default router;
