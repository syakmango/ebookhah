import React from 'react';
import { Book } from '../../types';
import { ShoppingCart, BookOpen, Heart } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="aspect-w-2 aspect-h-3 overflow-hidden">
        <img 
          src={book.cover} 
          alt={book.title} 
          className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <div className="flex justify-between">
              <a 
                href={`/book/${book.id}`} 
                className="text-white text-sm font-medium bg-indigo-600 px-3 py-1 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Details
              </a>
              <div className="flex space-x-2">
                {book.isAvailableForSale && (
                  <button className="bg-white p-1.5 rounded-full text-indigo-600 hover:text-indigo-800 transition-colors">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                )}
                {book.isAvailableForReading && (
                  <button className="bg-white p-1.5 rounded-full text-indigo-600 hover:text-indigo-800 transition-colors">
                    <BookOpen className="h-4 w-4" />
                  </button>
                )}
                <button className="bg-white p-1.5 rounded-full text-pink-500 hover:text-pink-700 transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-serif font-semibold line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600">{book.author}</p>
          </div>
          {book.isAvailableForSale && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ${book.price.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {book.category}
          </span>
          {book.isAvailableForSale && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              For Sale
            </span>
          )}
          {book.isAvailableForReading && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              For Reading
            </span>
          )}
        </div>
      </div>
    </div>
  );
};