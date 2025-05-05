import React, { useState } from 'react';
import { Book } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingCart, BookOpen, Heart, Share2, ArrowLeft } from 'lucide-react';

interface BookDetailProps {
  book: Book;
}

export const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const { isAuthenticated, user } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 sm:h-96 bg-gray-200">
        <a href="/books" className="absolute top-4 left-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </a>
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">{book.title}</h1>
            <p className="text-lg text-gray-600">by {book.author}</p>
          </div>
          
          <div className="flex space-x-3 mt-2 sm:mt-0">
            <button
              onClick={toggleWishlist}
              className={`p-2 rounded-full ${isInWishlist ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'} hover:bg-pink-100 hover:text-pink-600 transition-colors`}
            >
              <Heart className="h-5 w-5" fill={isInWishlist ? "currentColor" : "none"} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {book.category}
          </span>
          {book.isAvailableForSale && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              For Sale
            </span>
          )}
          {book.isAvailableForReading && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              For Reading
            </span>
          )}
        </div>
        
        <div className="prose max-w-none mb-8">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{book.description}</p>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            {book.isAvailableForSale && (
              <div className="mb-4 sm:mb-0">
                <p className="text-lg text-gray-600">Price</p>
                <p className="text-3xl font-bold text-gray-900">${book.price.toFixed(2)}</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              {book.isAvailableForReading && (
                <button
                  className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  onClick={() => window.location.href = isAuthenticated ? `/read/${book.id}` : '/login'}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  {isAuthenticated ? (
                    user?.subscription ? 'Read Now' : 'Subscribe to Read'
                  ) : (
                    'Login to Read'
                  )}
                </button>
              )}
              
              {book.isAvailableForSale && (
                <button
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};