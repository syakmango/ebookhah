import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, User, LogOut, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center font-serif text-xl font-bold">
              <BookOpen className="mr-2" />
              <span className="hidden md:block">BookLover Library</span>
              <span className="md:hidden">BookLover</span>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150">Home</a>
              <a href="/books" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150">Books</a>
              <a href="/subscription" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150">Subscriptions</a>
              
              {isAuthenticated ? (
                <>
                  <a href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150">My Books</a>
                  {user?.isAdmin && (
                    <a href="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150">Admin</a>
                  )}
                  <div className="relative group">
                    <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150">
                      <User className="h-4 w-4 mr-1" />
                      {user?.name}
                    </button>
                    <div className="hidden group-hover:block absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl z-10">
                      <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                      <button 
                        onClick={logout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-1" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <a href="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150">Login</a>
                  <a href="/signup" className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-500 transition duration-150">Sign Up</a>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">Home</a>
            <a href="/books" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">Books</a>
            <a href="/subscription" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">Subscriptions</a>
            
            {isAuthenticated ? (
              <>
                <a href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">My Books</a>
                {user?.isAdmin && (
                  <a href="/admin" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">Admin</a>
                )}
                <a href="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">Profile</a>
                <button 
                  onClick={logout}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">Login</a>
                <a href="/signup" className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 hover:bg-indigo-500">Sign Up</a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};