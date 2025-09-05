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
      onClose();
    } catch (error) {
      console.error('Failed to save post:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col transform animate-slideUp">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <h2 className="text-xl font-bold text-gray-900">
              {post ? 'Edit Post' : 'Create New Post'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md"
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <div className="p-6 space-y-4 flex-1">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-400"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-400"
                  placeholder="Enter a compelling title..."
                  required
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-400 resize-none"
                  placeholder="Write your blog post content here..."
                  required
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !title.trim() || !content.trim() || !author.trim()}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Save size={20} />
                <span>{saving ? 'Saving...' : 'Save Post'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}