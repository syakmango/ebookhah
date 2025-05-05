import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book, SearchFilters } from '../types';

interface BookContextType {
  books: Book[];
  filteredBooks: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (book: Book) => void;
  searchBooks: (filters: SearchFilters) => void;
  getBookById: (id: string) => Book | undefined;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

// Mock book data
const initialBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'A novel of the Jazz Age that follows the rise and fall of mysterious millionaire Jay Gatsby.',
    price: 12.99,
    isAvailableForSale: true,
    isAvailableForReading: true,
    category: 'Fiction',
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: 'https://images.pexels.com/photos/3747163/pexels-photo-3747163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'A classic of modern American literature, dealing with serious issues of rape and racial inequality.',
    price: 14.99,
    isAvailableForSale: true,
    isAvailableForReading: true,
    category: 'Fiction',
  },
  {
    id: '3',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    cover: 'https://images.pexels.com/photos/2078266/pexels-photo-2078266.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'A survey of the history of humankind from the evolution of archaic human species in the Stone Age up to the present day.',
    price: 18.99,
    isAvailableForSale: true,
    isAvailableForReading: false,
    category: 'Non-Fiction',
  },
  {
    id: '4',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'A fantasy novel about the adventures of hobbit Bilbo Baggins, who is hired by the wizard Gandalf as a burglar for a group of dwarves.',
    price: 15.99,
    isAvailableForSale: false,
    isAvailableForReading: true,
    category: 'Fantasy',
  },
];

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(initialBooks);

  const addBook = (bookData: Omit<Book, 'id'>) => {
    const newBook = {
      ...bookData,
      id: (books.length + 1).toString(),
    };
    setBooks([...books, newBook]);
    setFilteredBooks([...books, newBook]);
  };

  const updateBook = (updatedBook: Book) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  };

  const searchBooks = (filters: SearchFilters) => {
    const { query, category } = filters;
    let results = books;

    if (query) {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category && category !== 'All') {
      results = results.filter((book) => book.category === category);
    }

    setFilteredBooks(results);
  };

  const getBookById = (id: string) => {
    return books.find((book) => book.id === id);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        filteredBooks,
        addBook,
        updateBook,
        searchBooks,
        getBookById,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};