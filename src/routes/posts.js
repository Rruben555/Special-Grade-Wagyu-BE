import express from 'express';
import { getPosts, createPost, getPost, deletePost } from '../controllers/postControllers.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', getPosts);
router.post('/', protect, createPost);
router.get('/:postId', getPost);
router.delete('/:id', protect, deletePost);
export default router;