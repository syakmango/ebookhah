import React from 'react';
import { Layout } from '../components/common/Layout';
import { BookForm } from '../components/books/BookForm';
import { useNavigate } from 'react-router-dom';

export const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmitSuccess = () => {
    navigate('/books');
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Add a New Book</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BookForm onSubmit={handleSubmitSuccess} />
        </div>
      </div>
    </Layout>
  );
};