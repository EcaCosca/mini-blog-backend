import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or fewer'),
  content: z.string().min(1, 'Content is required'),
});

export const updatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100).optional(),
  content: z.string().min(1).optional(),
});

export const searchPostSchema = z.object({
  query: z.string().min(1, 'Query is required'),
});