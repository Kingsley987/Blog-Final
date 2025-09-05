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
      // Don't show error alert for session missing - it's handled gracefully
      if (error instanceof Error && !error.message.includes('Auth session missing')) {
        alert(`Sign out failed: ${error.message}`);
      }
    } finally {
      setIsSigningOut(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-black via-gray-900 to-black dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white border-b border-gray-800 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-pulse"></div>
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 md:py-6">
          <div className="flex items-center justify-between relative z-10">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity min-h-[44px]" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative">
              <BookOpen size={20} className="text-white sm:w-6 sm:h-6 md:w-8 md:h-8" />
              <Sparkles size={10} className="absolute -top-1 -right-1 text-yellow-400 animate-bounce sm:w-3 sm:h-3 md:w-4 md:h-4" />
            </div>
            <div className="hidden sm:block">
              {/* Clean header without tagline */}
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Bold Blog</h1>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-sm font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Bold Blog</h1>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={onCreatePost}
                  className="inline-flex items-center space-x-2 bg-white text-black px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group min-h-[44px]"
                >
                  <PenTool size={18} className="transition-transform duration-300 group-hover:rotate-12 lg:w-5 lg:h-5" />
                  <span className="text-sm lg:text-base">Write Post</span>
                </button>
                
                <div className="flex items-center space-x-3">
                  <ThemeSwitcher />
                  <div className="flex items-center space-x-2 text-sm">
                    <User size={16} className="text-gray-300" />
                    <span className="text-gray-300 hidden xl:inline">{user.email}</span>
                    <span className="text-gray-300 xl:hidden">{user.email?.split('@')[0]}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="inline-flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    {isSigningOut ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <LogOut size={16} />
                    )}
                    <span className="text-sm">{isSigningOut ? 'Signing Out...' : 'Sign Out'}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <ThemeSwitcher />
                <Link
                  to="/signin"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 min-h-[44px] flex items-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center space-x-2 bg-white text-black px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg min-h-[44px]"
                >
                  <User size={18} className="lg:w-5 lg:h-5" />
                  <span className="text-sm lg:text-base">Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Tablet/Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-1 sm:space-x-2">
            <ThemeSwitcher />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        </div>
      </header>

      {/* Mobile Navigation Menu - Outside header */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white border-b border-gray-700 shadow-lg">
          <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="space-y-2 sm:space-y-3">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      onCreatePost();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 active:from-blue-800 active:to-purple-800 transition-all duration-300 min-h-[48px] shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <PenTool size={18} />
                    <span className="text-sm sm:text-base">Write Post</span>
                  </button>
                  
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-3 sm:p-4 shadow-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-white sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-300">Signed in as</p>
                        <p className="text-white font-medium truncate text-sm sm:text-base">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="w-full flex items-center justify-center space-x-2 text-gray-300 hover:text-white active:text-white px-3 py-2 rounded-lg hover:bg-gray-600 active:bg-gray-500 transition-all duration-300 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600 hover:border-gray-500"
                    >
                      {isSigningOut ? (
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <LogOut size={16} />
                      )}
                      <span className="font-medium text-sm">{isSigningOut ? 'Signing Out...' : 'Sign Out'}</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 active:from-blue-800 active:to-purple-800 transition-all duration-300 min-h-[48px] shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <User size={18} />
                    <span className="text-sm sm:text-base">Sign Up</span>
                  </Link>
                  
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-3 sm:p-4 shadow-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-white sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-300">Not signed in</p>
                        <p className="text-white font-medium text-sm sm:text-base">Sign in to create posts</p>
                      </div>
                    </div>
                    <Link
                      to="/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center space-x-2 text-gray-300 hover:text-white active:text-white px-3 py-2 rounded-lg hover:bg-gray-600 active:bg-gray-500 transition-all duration-300 min-h-[44px] border border-gray-600 hover:border-gray-500"
                    >
                      <User size={16} />
                      <span className="font-medium text-sm">Sign In</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}