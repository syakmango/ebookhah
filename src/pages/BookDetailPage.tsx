import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { BookDetail } from '../components/books/BookDetail';
import { BookList } from '../components/books/BookList';
import { useBooks } from '../contexts/BookContext';
import { Book } from '../types';

export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookById, books } = useBooks();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    if (!id) {
      navigate('/books');
      return;
    }
    
    const foundBook = getBookById(id);
    if (!foundBook) {
      navigate('/books');
      return;
    }
    
    setBook(foundBook);
    
    // Find related books (same category)
    const related = books
      .filter(b => b.id !== id && b.category === foundBook.category)
      .slice(0, 4);
      
    setRelatedBooks(related);
  }, [id, getBookById, navigate, books]);
  
  if (!book) {
    return null;
  }

  return (
    <Layout>
      <div className="mb-12">
        <BookDetail book={book} />
      </div>
      
      {relatedBooks.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">You may also like</h2>
          <BookList books={relatedBooks} />
        </div>
      )}
    </Layout>
  );
};