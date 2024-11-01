import { Request, Response } from 'express';
import { supabase } from '../db';
import { createPostSchema, updatePostSchema, searchPostSchema } from '../schemas/postSchemas';

// Get all posts
export const getPosts = async (req: Request, res: Response): Promise<void> => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    res.status(200).json(data);
};

// Search posts by query with validation
export const searchPosts = async (req: Request, res: Response): Promise<void> => {
    const validation = searchPostSchema.safeParse(req.query);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.errors });
        return;
    }

    const { query } = validation.data;
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`);
    
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json(data);
};

// Get a single post by ID
export const getPost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(200).json(data);
};

// Create a new post with validation
export const createPost = async (req: Request, res: Response): Promise<void> => {
  const validation = createPostSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ error: validation.error.errors });
    return;
  }

  const { title, content } = validation.data;
  const userEmail = req.user?.email;
  const { data, error } = await supabase.from('posts').insert([{ title, content, email: userEmail }]).select('*');
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(201).json(data[0]);
};

// Update a post by ID with validation
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  const validation = updatePostSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ error: validation.error.errors });
    return;
  }

  const { id } = req.params;
  const updated_at = new Date().toISOString();
  const { title, content } = validation.data;
  const { data, error } = await supabase.from('posts').update({ title, content, updated_at }).eq('id', id).select('*');

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  if (!data) {
    res.status(404).json({ error: `Post with ID ${id} not found` });
    return;
  }

  res.status(200).json(data);
};

// Delete a post by ID
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { data, error } = await supabase.from('posts').delete().eq('id', id).select('*');
  
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  if (data.length === 0) {
    res.status(404).json({ error: `Post with ID ${id} not found` });
    return;
  }

  res.status(200).json(data);
};