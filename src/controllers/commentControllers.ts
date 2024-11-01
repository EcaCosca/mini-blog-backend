import { Request, Response } from 'express';
import { supabase } from '../db';
import { createCommentSchema } from '../schemas/commentSchemas';

// POST /api/posts/:id/comments -> Adds a comment to a specific post.
export const createComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const postId = req.params.id;
        const userEmail = req.user?.email
        const validation = createCommentSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({ error: validation.error.errors });
            return;
        }

        const { content } = validation.data;

        const { data: post, error: postError } = await supabase
            .from('posts')
            .select('*')
            .eq('id', postId)
            .single();

        if (postError || !post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        const { data: comment, error: commentError } = await supabase
            .from('comments')
            .insert([{ post_id: postId, content, email: userEmail }])
            .select('*')
            .single();

        if (commentError) {
            throw commentError;
        }

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// GET /api/posts/:id/comments -> Retrieves comments for a specific post.
export const getComments = async (req: Request, res: Response): Promise<void> => {
    try {
        const postId = req.params.id;

        const { data: comments, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', postId);

        if (error) {
            throw error;
        }

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// PUT /api/posts/:id/comments/:commentId -> Updates a specific comment.
export const updateComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, commentId } = req.params;
        const { content } = req.body;
        const updated_at = new Date().toISOString();

        const { data: post, error: postError } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();
            
            if (postError || !post) {
                res.status(404).json({ message: 'Post not found' });
                return
            }
            
            const { data: comment, error: commentError } = await supabase
            .from('comments')
            .update({ content, updated_at })
            .eq('id', commentId)
            .select('*')
            .single();

        if (commentError || !comment) {
            res.status(404).json({ message: 'Comment not found' });
            return
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// DELETE /api/posts/:id/comments/:commentId -> Deletes a specific comment.
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, commentId } = req.params;

        const { data: post, error: postError } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .select('*')
            .single();

        if (postError || !post) {
            res.status(404).json({ message: 'Post not found' });
            return
        }

        const { data: comment, error: commentError } = await supabase
            .from('comments')
            .delete()
            .eq('id', commentId)
            .select('*')
            .single();

        if (commentError || !comment) {
            res.status(404).json({ message: 'Comment not found' });
            return
        }

        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};