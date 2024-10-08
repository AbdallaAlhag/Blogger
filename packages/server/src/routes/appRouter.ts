import express from 'express';
const router = express.Router();
import {
  getPosts,
  createPost,
  getSinglePost,
  createComment,
  getEveryPosts,
} from '../controllers/appController';

router.get('/posts', getPosts);
router.get('/posts-all', getEveryPosts);
router.get('/posts/:id', getSinglePost);

router.post('/posts', createPost);
router.post('/posts/:id/comments', createComment);
export default router;
