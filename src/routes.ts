import { Router } from 'express';
import { getPosts, createPost, updatePost, deletePost, getPost, searchPosts } from './controllers/postControllers';
import { createComment, getComments, updateComment, deleteComment } from './controllers/commentControllers';
import { signUp, login, logout } from './controllers/authControllers';
import { authMiddleware } from './middleware/authMiddleware';

const router = Router();

// AUTH ROUTES
router.post('/auth/signup', signUp);
router.post('/auth/login', login);
router.post('/auth/logout', authMiddleware, logout);

// BLOG POST ROUTES
router.post('/posts', authMiddleware, createPost);
router.get('/posts', authMiddleware, getPosts);
router.get('/posts/search', authMiddleware, searchPosts);
router.get('/posts/:id', authMiddleware, getPost);
router.put('/posts/:id', authMiddleware, updatePost);
router.delete('/posts/:id', authMiddleware, deletePost);

// COMMENT ROUTES
router.post('/posts/:id/comments', authMiddleware, createComment);
router.get('/posts/:id/comments', authMiddleware, getComments);
router.put('/posts/:id/comments/:commentId', authMiddleware, updateComment);
router.delete('/posts/:id/comments/:commentId', authMiddleware, deleteComment);

export default router;


