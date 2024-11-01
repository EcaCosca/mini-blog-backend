import { Request, Response } from 'express';
import { supabase } from '../db';
import { authSchema } from '../schemas/authSchemas';

// POST /api/auth/signup -> Sign up a new user
export const signUp = async (req: Request, res: Response): Promise<void> => {
  const validation = authSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ error: validation.error.errors });
    return;
  }

  const { email, password } = validation.data;
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(201).json({ message: 'User signed up successfully', data });
};

// POST /api/auth/login -> Log in an existing user
export const login = async (req: Request, res: Response): Promise<void> => {
  const validation = authSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ error: validation.error.errors });
    return;
  }

  const { email, password } = validation.data;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ message: 'User logged in successfully', data });
};

// POST /api/auth/logout -> Log out the current user
export const logout = async (req: Request, res: Response): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ message: 'User logged out successfully' });
};