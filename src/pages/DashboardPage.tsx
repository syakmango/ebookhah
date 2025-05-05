import React from 'react';
import { Layout } from '../components/common/Layout';
import { BookList } from '../components/books/BookList';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';
import { BookPlus, Heart, BookOpen, Clock } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { books } = useBooks();
  const { user } = useAuth();
  
  // In a real app, these would be fetched from user data
  const readingBooks = books.filter(book => book.isAvailableForReading).slice(0, 2);
  const wishlistedBooks = books.slice(2, 4);
  const canAddBooks = user?.isAdmin || false;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900">My Books</h1>
        
        {canAddBooks && (
          <a
            href="/add-book"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <BookPlus className="h-4 w-4 mr-2" />
            Add New Book
          </a>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Currently Reading</h2>
          </div>
          
          {readingBooks.length > 0 ? (
            <BookList books={readingBooks} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">You're not currently reading any books.</p>
              <a
                href="/books"
                className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
              >
                Browse books to read <span className="ml-1">→</span>
              </a>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Heart className="h-5 w-5 text-pink-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Wishlist</h2>
          </div>
          
          {wishlistedBooks.length > 0 ? (
            <BookList books={wishlistedBooks} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Your wishlist is empty.</p>
              <a
                href="/books"
                className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
              >
                Browse books to add <span className="ml-1">→</span>
              </a>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-orange-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Reading History</h2>
          </div>
          
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Your reading history will appear here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};