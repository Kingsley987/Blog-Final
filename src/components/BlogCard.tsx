import React from 'react';
import { Calendar, User, Edit3, Trash2, Eye, Clock } from 'lucide-react';
import { BlogPost } from '../lib/supabase';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function BlogCard({ post, onClick, onEdit, onDelete }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer group transform hover:-translate-y-2 hover:scale-[1.02]">
      <div onClick={onClick} className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
          {truncateContent(post.content)}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User size={16} />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{getReadingTime(post.content)} min read</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Eye size={16} className="mr-1" />
          <span>Click to read full post</span>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600 flex justify-end space-x-2 group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition-colors duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="inline-flex items-center space-x-1 px-3 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <Edit3 size={16} className="transition-transform duration-200 hover:scale-110" />
          <span>Edit</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="inline-flex items-center space-x-1 px-3 py-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <Trash2 size={16} className="transition-transform duration-200 hover:scale-110" />
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
}