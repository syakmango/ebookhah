import React from 'react';
import { Layout } from '../components/common/Layout';
import { useAuth } from '../contexts/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user, updateSubscription } = useAuth();
  
  if (!user) {
    return null;
  }
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">My Profile</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="mt-1 text-lg text-gray-900">{user.name}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Account Type</p>
                <p className="mt-1 text-lg text-gray-900">{user.isAdmin ? 'Administrator' : 'User'}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Subscription</p>
                <p className="mt-1 flex items-center">
                  {user.subscription ? (
                    <span className="text-lg text-gray-900 capitalize">{user.subscription}</span>
                  ) : (
                    <span className="text-lg text-gray-500">No active subscription</span>
                  )}
                  <a 
                    href="/subscription" 
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {user.subscription ? 'Change' : 'Subscribe'}
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h2>
            
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Edit Profile
              </button>
              
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Change Password
              </button>
            </div>
          </div>
        </div>
        
        {user.subscription && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription Details</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Plan</p>
                  <p className="mt-1 text-lg text-gray-900 capitalize">{user.subscription}</p>
                </div>
                
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500 mb-4 sm:mb-0">
                  You can change or cancel your subscription at any time.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <a
                    href="/subscription"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change Plan
                  </a>
                  
                  <button
                    onClick={() => updateSubscription(null)}
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};