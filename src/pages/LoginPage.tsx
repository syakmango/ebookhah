import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-serif font-extrabold text-gray-900">
          Welcome back to BookHaven
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your books and manage your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
        
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