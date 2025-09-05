import React from 'react';
import { X, Calendar, User, Edit3, Clock, BookOpen } from 'lucide-react';
import { BlogPost } from '../lib/supabase';

interface PostModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export function PostModal({ post, isOpen, onClose, onEdit }: PostModalProps) {
  if (!isOpen || !post) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform animate-slideUp transition-colors duration-300">
          <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <User size={16} />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={16} />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock size={16} />
                <span>{getReadingTime(post.content)} min read</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={onEdit}
                className="inline-flex items-center space-x-1 px-3 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <Edit3 size={16} />
                <span>Edit</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110 text-gray-600 dark:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen size={24} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Article</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
              {post.title}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap selection:bg-blue-100 dark:selection:bg-blue-900/30">
                {post.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}