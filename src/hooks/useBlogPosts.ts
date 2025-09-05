import { useState, useEffect } from 'react';
import { supabase, BlogPost } from '../lib/supabase';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
    
    // Set up real-time subscription for posts table changes
    const subscription = supabase
      .channel('posts-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'posts' 
        }, 
        (payload) => {
          console.log('Posts table changed:', payload);
          fetchPosts();
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (title: string, content: string, author: string) => {
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated to create posts');
      }

      const { error } = await supabase
        .from('posts')
        .insert([{ title, content, author, user_id: user.id }]);

      if (error) throw error;
      
      // Immediately refetch posts to show the new post
      await fetchPosts();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create post');
    }
  };

  const updatePost = async (id: string, title: string, content: string) => {
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated to update posts');
      }

      // First check if the post exists and belongs to the user
      const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      
      if (!post || post.user_id !== user.id) {
        throw new Error('You can only update your own posts');
      }

      const { error } = await supabase
        .from('posts')
        .update({ title, content })
        .eq('id', id)
        .eq('user_id', user.id); // Double-check ownership in the update

      if (error) throw error;
      
      // Immediately refetch posts to show the updated post
      await fetchPosts();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update post');
    }
  };

  const deletePost = async (id: string) => {
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated to delete posts');
      }

      // First check if the post exists and belongs to the user
      const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      
      if (!post || post.user_id !== user.id) {
        throw new Error('You can only delete your own posts');
      }

      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // Double-check ownership in the delete

      if (error) throw error;
      
      // Immediately refetch posts to show the updated list
      await fetchPosts();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts
  };
}