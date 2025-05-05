import React from 'react';
import { SignupForm } from '../components/auth/SignupForm';

export const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-serif font-extrabold text-gray-900">
          Join BookHaven Today
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create your account to access thousands of books
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <SignupForm />
        
        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};