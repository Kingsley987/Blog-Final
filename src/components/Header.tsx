import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PenTool, BookOpen, Sparkles, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  onCreatePost: () => void;
}

export function Header({ onCreatePost }: HeaderProps) {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-black dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white border-b border-gray-800 dark:border-gray-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-pulse"></div>
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between relative z-10">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative">
              <BookOpen size={28} className="text-white sm:w-8 sm:h-8" />
              <Sparkles size={14} className="absolute -top-1 -right-1 text-yellow-400 animate-bounce sm:w-4 sm:h-4" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Bold Blog</h1>
              <p className="text-gray-400 text-xs sm:text-sm animate-pulse">Share your thoughts with the world</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Bold Blog</h1>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={onCreatePost}
                  className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                >
                  <PenTool size={20} className="transition-transform duration-300 group-hover:rotate-12" />
                  <span>Write Post</span>
                </button>
                
                <div className="flex items-center space-x-3">
                  <ThemeSwitcher />
                  <div className="flex items-center space-x-2 text-sm">
                    <User size={16} className="text-gray-300" />
                    <span className="text-gray-300">{user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="inline-flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSigningOut ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <LogOut size={16} />
                    )}
                    <span>{isSigningOut ? 'Signing Out...' : 'Sign Out'}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <ThemeSwitcher />
                <Link
                  to="/signin"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <User size={20} />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSwitcher />
            <button
              onClick={toggleMobileMenu}
              className="p-3 rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle mobile menu"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 dark:border-gray-600">
            <div className="pt-4 space-y-3">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      onCreatePost();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-white text-black px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 touch-manipulation min-h-[44px]"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <PenTool size={20} />
                    <span>Write Post</span>
                  </button>
                  
                  <div className="px-4 py-2 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm mb-3">
                      <User size={16} className="text-gray-300" />
                      <span className="text-gray-300">{user.email}</span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="w-full flex items-center justify-center space-x-2 text-gray-300 hover:text-white active:text-white px-4 py-3 rounded-lg hover:bg-gray-700 active:bg-gray-600 transition-all duration-300 touch-manipulation min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {isSigningOut ? (
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <LogOut size={18} />
                      )}
                      <span className="font-medium">{isSigningOut ? 'Signing Out...' : 'Sign Out'}</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-gray-300 hover:text-white active:text-white px-4 py-3 rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-all duration-300 touch-manipulation min-h-[44px] flex items-center"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full flex items-center justify-center space-x-2 bg-white text-black px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 touch-manipulation min-h-[44px]"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <User size={20} />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}