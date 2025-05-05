import React from 'react';
import { Layout } from '../components/common/Layout';
import { BookList } from '../components/books/BookList';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, ShoppingCart, CreditCard } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { books } = useBooks();
  const { isAuthenticated } = useAuth();
  
  const forSaleBooks = books.filter(book => book.isAvailableForSale);
  const forReadingBooks = books.filter(book => book.isAvailableForReading);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl"></div>
        <div className="relative rounded-2xl overflow-hidden">
          <div className="bg-cover bg-center h-96" style={{ backgroundImage: "url('https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')" }}>
            <div className="bg-black bg-opacity-50 h-full w-full flex items-center">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-4">
                  Discover Your Next Favorite Book
                </h1>
                <p className="text-xl text-white mb-8">
                  Explore thousands of books to read or buy. Join our community of book lovers today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="/books"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Browse Books
                  </a>
                  {!isAuthenticated && (
                    <a
                      href="/signup"
                      className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      Sign Up Free
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">What We Offer</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BookHaven is your one-stop destination for all things books
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Read Books</h3>
            <p className="text-gray-600">
              Access thousands of e-books with our subscription plans. Read anytime, anywhere.
            </p>
            <a 
              href="/subscription" 
              className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              Learn more <span className="ml-1">→</span>
            </a>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full text-green-600 mb-4">
              <ShoppingCart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Buy Books</h3>
            <p className="text-gray-600">
              Shop for physical books and build your personal collection with competitive prices.
            </p>
            <a 
              href="/books" 
              className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              Shop now <span className="ml-1">→</span>
            </a>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105">
            <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full text-purple-600 mb-4">
              <CreditCard className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Subscription Plans</h3>
            <p className="text-gray-600">
              Choose from our flexible subscription plans that fit your reading habits.
            </p>
            <a 
              href="/subscription" 
              className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              View plans <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900">Books Available for Reading</h2>
          <a 
            href="/books" 
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View all <span>→</span>
          </a>
        </div>
        
        <BookList books={forReadingBooks.slice(0, 4)} />
      </section>

      {/* Books for Sale */}
      <section className="py-16">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900">Books Available for Purchase</h2>
          <a 
            href="/books" 
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View all <span>→</span>
          </a>
        </div>
        
        <BookList books={forSaleBooks.slice(0, 4)} />
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">What Our Members Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied readers in our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                    {['JD', 'AL', 'MK'][i-1]}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {['Jane Doe', 'Alex Lee', 'Mark Kim'][i-1]}
                    </h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  {[
                    "BookHaven has transformed my reading experience. The subscription is worth every penny with such a vast selection of books.",
                    "I love being able to both read and purchase books in one place. The interface is intuitive and the recommendations are spot on!",
                    "The premium subscription gives me access to so many titles I wouldn't have discovered otherwise. Highly recommend it!"
                  ][i-1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="bg-indigo-700 rounded-2xl overflow-hidden">
          <div className="px-6 py-16 sm:px-12 lg:py-20 lg:px-16 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left md:max-w-2xl mb-8 md:mb-0">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                Ready to Start Your Reading Journey?
              </h2>
              <p className="text-xl text-indigo-100">
                Join BookHaven today and discover a world of books at your fingertips.
              </p>
            </div>
            <div>
              <a
                href={isAuthenticated ? "/subscription" : "/signup"}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-indigo-700"
              >
                {isAuthenticated ? "Choose Your Subscription" : "Sign Up Now"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};