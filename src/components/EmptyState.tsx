import React from 'react';
import { BookOpen, PenTool } from 'lucide-react';

interface EmptyStateProps {
  onCreatePost: () => void;
}

export function EmptyState({ onCreatePost }: EmptyStateProps) {
  return (
    <div className="text-center py-16 animate-fadeIn">
      <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-6 animate-bounce">
        <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        No posts yet
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto text-lg">
        Create your first blog post to get started.
      </p>
      
      <button
        onClick={onCreatePost}
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
      >
        <PenTool size={20} className="transition-transform duration-300 group-hover:rotate-12" />
        <span>Write Your First Post</span>
      </button>
    </div>
  );
}