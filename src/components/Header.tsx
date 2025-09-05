import React from 'react';
import { PenTool, BookOpen, Sparkles } from 'lucide-react';

interface HeaderProps {
  onCreatePost: () => void;
}

export function Header({ onCreatePost }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-black text-white border-b border-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-pulse"></div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <BookOpen size={32} className="text-white" />
              <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-400 animate-bounce" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Bold Blog</h1>
              <p className="text-gray-400 text-sm animate-pulse">Share your thoughts with the world</p>
            </div>
          </div>
          
          <button
            onClick={onCreatePost}
            className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
          >
            <PenTool size={20} className="transition-transform duration-300 group-hover:rotate-12" />
            <span>Write Post</span>
          </button>
        </div>
      </div>
    </header>
  );
}