import express from 'express';
const router = express.Router();
import {
  getPosts,
  createPost,
  getSinglePost,
  createComment,
  getEveryPosts,
} from '../controllers/appController';
import { upload } from '../middleware/fileUpload';

router.get('/posts', getPosts);
router.get('/posts-all', getEveryPosts);
router.get('/posts/:id', getSinglePost);

router.post('/posts', upload.single('image'), createPost);
router.post('/posts/:id/comments', createComment);
export default router;
