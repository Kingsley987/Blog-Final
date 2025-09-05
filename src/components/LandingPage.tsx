import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, Users, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';
import { ThemeSwitcher } from './ThemeSwitcher';

export const LandingPage: React.FC = () => {
  const isConfigured = isSupabaseConfigured();

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Required</h1>
            <p className="text-gray-600 mb-6">
              To use this blog application, you need to configure Supabase authentication.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Setup Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Create a <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Supabase account</a> if you don't have one</li>
                <li>Create a new project in your Supabase dashboard</li>
                <li>Go to Settings → API in your Supabase project</li>
                <li>Copy your Project URL and anon public key</li>
                <li>Create a <code className="bg-gray-200 px-1 rounded">.env</code> file in your project root</li>
                <li>Add the following variables:</li>
              </ol>
              <div className="mt-4 bg-gray-800 text-green-400 p-4 rounded font-mono text-sm">
                <div>VITE_SUPABASE_URL=your_project_url_here</div>
                <div>VITE_SUPABASE_ANON_KEY=your_anon_key_here</div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Replace the placeholder values with your actual Supabase credentials
              </p>
            </div>
            <p className="text-sm text-gray-500">
              After setting up the environment variables, restart the development server.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <BookOpen size={32} className="text-blue-600 dark:text-blue-400" />
                <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-400 animate-bounce" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bold Blog</h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Share your thoughts with the world</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <Link
                to="/signin"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Share Your Stories with the World
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join our community of writers and readers. Create, share, and discover amazing content 
            that inspires and connects people from around the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
            >
              <PenTool size={20} />
              <span>Start Writing</span>
            </Link>
            <Link
              to="/signin"
              className="inline-flex items-center space-x-2 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <BookOpen size={20} />
              <span>Explore Posts</span>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <PenTool size={32} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy Writing</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create and edit your posts with our intuitive editor. Focus on your content, not the tools.
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with like-minded writers and readers. Share feedback and grow together.
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Discover</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find amazing content from our diverse community. Get inspired by new perspectives.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of writers who are already sharing their stories with the world.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            <span>Create Your Account</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen size={24} className="text-white" />
            <span className="text-xl font-bold">Bold Blog</span>
          </div>
          <p className="text-gray-400">
            © 2024 Bold Blog. All rights reserved. Made with ❤️ for writers and readers.
          </p>
        </div>
      </footer>
    </div>
  );
};
