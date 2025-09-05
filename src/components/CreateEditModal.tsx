import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { BlogPost } from '../lib/supabase';

interface CreateEditModalProps {
  post?: BlogPost;
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string, author: string) => Promise<void>;
}

export function CreateEditModal({ post, isOpen, onClose, onSave }: CreateEditModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setAuthor(post.author);
    } else {
      setTitle('');
      setContent('');
      setAuthor('');
    }
  }, [post, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) return;
    
    setSaving(true);
    try {
      await onSave(title.trim(), content.trim(), author.trim());
      // Small delay to ensure the post is saved and UI updates
      setTimeout(() => {
        onClose();
      }, 100);
    } catch (error) {
      console.error('Failed to save post:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn">
      <div className="flex items-center justify-center min-h-screen px-2 sm:px-4 py-4 sm:py-8">
        <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col transform animate-slideUp transition-colors duration-300">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {post ? 'Edit Post' : 'Create New Post'}
            </h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md text-gray-600 dark:text-gray-300 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
                  placeholder="Your name"
                  required
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                />
              </div>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter a compelling title..."
                  required
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
                  placeholder="Write your blog post content here..."
                  required
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                />
              </div>
            </div>
            
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 text-sm sm:text-base touch-manipulation min-h-[44px]"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !title.trim() || !content.trim() || !author.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base touch-manipulation min-h-[44px]"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Save size={16} className="sm:w-5 sm:h-5" />
                <span>{saving ? 'Saving...' : 'Save Post'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}