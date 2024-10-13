import express from 'express';
const router = express.Router();
import {
  getPosts,
  createPost,
  getSinglePost,
  createComment,
  getEveryPosts,
  unpublishPost,
  updatePost,
  getAdmin,
} from '../controllers/appController';
import { upload } from '../middleware/fileUpload';

router.get('/posts', getPosts);
router.get('/posts-all', getEveryPosts);
router.get('/posts/admin', getAdmin);
// could easily combine these three ^
router.get('/posts/:id', getSinglePost);

router.post('/posts', upload.single('image'), createPost);
router.post('/posts/:id/comments', createComment);

router.patch('/posts/:id/unpublish', unpublishPost);
router.patch('/posts/:id/update', upload.single('image'), updatePost);
export default router;
