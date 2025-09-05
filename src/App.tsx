import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { BlogCard } from './components/BlogCard';
import { PostModal } from './components/PostModal';
import { CreateEditModal } from './components/CreateEditModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './components/LandingPage';
import { useBlogPosts } from './hooks/useBlogPosts';
import { BlogPost } from './lib/supabase';

function BlogApp() {
  const { posts, loading, error, createPost, updatePost, deletePost } = useBlogPosts();
  const { user } = useAuth();
  
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowCreateModal(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowPostModal(false);
    setShowEditModal(true);
  };

  const handleDeletePost = (post: BlogPost) => {
    setDeletingPost(post);
    setShowDeleteModal(true);
  };

  const handleSavePost = async (title: string, content: string, author: string) => {
    try {
      if (editingPost) {
        await updatePost(editingPost.id, title, content);
      } else {
        await createPost(title, content, author);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save post';
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingPost) {
      try {
        await deletePost(deletingPost.id);
        setShowDeleteModal(false);
        setDeletingPost(null);
      } catch (error) {
        console.error('Error deleting post:', error);
        // You could add a toast notification here
        alert(error instanceof Error ? error.message : 'Failed to delete post');
      }
    }
  };

  const handleViewPost = (post: BlogPost) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header onCreatePost={handleCreatePost} />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
            <p className="text-red-800 dark:text-red-300">
              Please connect to Supabase to start using the blog. Click the "Connect to Supabase" button in the top right corner.
            </p>
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header onCreatePost={handleCreatePost} />
      
      
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {loading ? (
          <LoadingSpinner />
        ) : posts.length === 0 ? (
          <EmptyState onCreatePost={handleCreatePost} />
        ) : (
          <>
            <div className="mb-6 sm:mb-8 text-center px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Latest Posts</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Discover amazing stories and insights from our community</p>
            </div>
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-fadeIn">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onClick={() => handleViewPost(post)}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post)}
              />
            ))}
          </div>
          </>
        )}
      </main>

      <PostModal
        post={selectedPost}
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onEdit={() => selectedPost && handleEditPost(selectedPost)}
      />

      <CreateEditModal
        post={editingPost}
        isOpen={showCreateModal || showEditModal}
        onClose={() => {
          setShowCreateModal(false);
          setShowEditModal(false);
          setEditingPost(null);
        }}
        onSave={handleSavePost}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingPost(null);
        }}
        onConfirm={handleConfirmDelete}
        title={deletingPost?.title || ''}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <BlogApp />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;