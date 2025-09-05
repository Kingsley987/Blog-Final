/*
  # Add user ownership to posts table

  1. Schema Changes
    - Add `user_id` column to posts table (references auth.users)
    - Add foreign key constraint
    - Update existing posts to have NULL user_id (for demo data)

  2. Security Updates
    - Update RLS policies to check user ownership
    - Only allow users to edit/delete their own posts
    - Allow public read access
    - Allow authenticated users to create posts (with their user_id)
*/

-- Add user_id column to posts table
ALTER TABLE posts 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update RLS policies to enforce ownership
DROP POLICY IF EXISTS "Anyone can update posts" ON posts;
DROP POLICY IF EXISTS "Anyone can delete posts" ON posts;

-- Only allow users to update their own posts
CREATE POLICY "Users can update their own posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Only allow users to delete their own posts
CREATE POLICY "Users can delete their own posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Update insert policy to require authentication and set user_id
DROP POLICY IF EXISTS "Anyone can create posts" ON posts;

CREATE POLICY "Authenticated users can create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Keep public read access
-- (The existing "Anyone can view posts" policy remains)
