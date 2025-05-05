import React, { useState, useEffect } from 'react';
import { Layout } from '../components/common/Layout';
import { BookList } from '../components/books/BookList';
import { useBooks } from '../contexts/BookContext';
import { Filter } from 'lucide-react';

export const BooksPage: React.FC = () => {
  const { filteredBooks, searchBooks } = useBooks();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterForSale, setFilterForSale] = useState(false);
  const [filterForReading, setFilterForReading] = useState(false);
  
  const categories = ['All', 'Fiction', 'Non-Fiction', 'Fantasy', 'Mystery', 'Science'];
  
  useEffect(() => {
    const filters = {
      query: '',
      category: selectedCategory === 'All' ? '' : selectedCategory,
    };
    searchBooks(filters);
  }, [selectedCategory, searchBooks]);
  
  let displayedBooks = filteredBooks;
  
  if (filterForSale) {
    displayedBooks = displayedBooks.filter(book => book.isAvailableForSale);
  }
  
  if (filterForReading) {
    displayedBooks = displayedBooks.filter(book => book.isAvailableForReading);
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <Filter className="h-5 w-5 text-gray-500" />
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      name="category"
                      type="radio"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="filter-for-sale"
                    name="filter-for-sale"
                    type="checkbox"
                    checked={filterForSale}
                    onChange={() => setFilterForSale(!filterForSale)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="filter-for-sale" className="ml-3 text-sm text-gray-700">
                    Available for Sale
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="filter-for-reading"
                    name="filter-for-reading"
                    type="checkbox"
                    checked={filterForReading}
                    onChange={() => setFilterForReading(!filterForReading)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="filter-for-reading" className="ml-3 text-sm text-gray-700">
                    Available for Reading
                  </label>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price-min" className="sr-only">Minimum price</label>
                  <input
                    type="number"
                    id="price-min"
                    placeholder="Min"
                    min="0"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="price-max" className="sr-only">Maximum price</label>
                  <input
                    type="number"
                    id="price-max"
                    placeholder="Max"
                    min="0"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <button
                type="button"
                className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Browse Books</h1>
          
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
            <p className="text-sm text-gray-500 mb-4 sm:mb-0">
              Showing <span className="font-medium">{displayedBooks.length}</span> books
            </p>
            
            <div>
              <label htmlFor="sort" className="sr-only">Sort by</label>
              <select
                id="sort"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Alphabetical</option>
              </select>
            </div>
          </div>
          
          <BookList books={displayedBooks} />
        </div>
      </div>
    </Layout>
  );
};