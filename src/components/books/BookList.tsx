import React from 'react';
import { Book } from '../../types';
import { BookCard } from './BookCard';

interface BookListProps {
  books: Book[];
  title?: string;
}

export const BookList: React.FC<BookListProps> = ({ books, title }) => {
  return (
    <div>
      {title && (
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">{title}</h2>
      )}
      
      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No books found. Try a different search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};