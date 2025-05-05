import React, { useState } from 'react';
import { useBooks } from '../../contexts/BookContext';
import { Book } from '../../types';

interface BookFormProps {
  initialBook?: Omit<Book, 'id'>;
  onSubmit?: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({ 
  initialBook = {
    title: '',
    author: '',
    cover: '',
    description: '',
    price: 0,
    isAvailableForSale: true,
    isAvailableForReading: true,
    category: 'Fiction'
  }, 
  onSubmit 
}) => {
  const { addBook } = useBooks();
  const [book, setBook] = useState(initialBook);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setBook({ ...book, [name]: checked });
    } else if (type === 'number') {
      setBook({ ...book, [name]: parseFloat(value) });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!book.title.trim()) newErrors.title = 'Title is required';
    if (!book.author.trim()) newErrors.author = 'Author is required';
    if (!book.cover.trim()) newErrors.cover = 'Cover image URL is required';
    if (!book.description.trim()) newErrors.description = 'Description is required';
    if (!book.category) newErrors.category = 'Category is required';
    
    if (book.isAvailableForSale && (isNaN(book.price) || book.price <= 0)) {
      newErrors.price = 'Price must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      addBook(book);
      if (onSubmit) onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={book.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-300' : ''}`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={book.author}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.author ? 'border-red-300' : ''}`}
        />
        {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
      </div>

      <div>
        <label htmlFor="cover" className="block text-sm font-medium text-gray-700">
          Cover Image URL
        </label>
        <input
          type="text"
          id="cover"
          name="cover"
          value={book.cover}
          onChange={handleChange}
          placeholder="https://example.com/book-cover.jpg"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.cover ? 'border-red-300' : ''}`}
        />
        {errors.cover && <p className="mt-1 text-sm text-red-600">{errors.cover}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={book.description}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.description ? 'border-red-300' : ''}`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={book.category}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.category ? 'border-red-300' : ''}`}
        >
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Mystery">Mystery</option>
          <option value="Science">Science</option>
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAvailableForSale"
            name="isAvailableForSale"
            checked={book.isAvailableForSale}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="isAvailableForSale" className="ml-2 block text-sm text-gray-700">
            Available for sale
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAvailableForReading"
            name="isAvailableForReading"
            checked={book.isAvailableForReading}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="isAvailableForReading" className="ml-2 block text-sm text-gray-700">
            Available for reading
          </label>
        </div>
      </div>

      {book.isAvailableForSale && (
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={book.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.price ? 'border-red-300' : ''}`}
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>
      )}

      <div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Book
        </button>
      </div>
    </form>
  );
};