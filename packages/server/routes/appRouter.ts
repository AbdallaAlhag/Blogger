import express from 'express';
const router = express.Router();
import { getPosts, createPost } from '../controllers/appController';

router.get('/posts', getPosts);

router.post('/posts', createPost);

export default router;
