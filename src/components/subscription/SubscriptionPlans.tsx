import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Check, X } from 'lucide-react';
import { SubscriptionTier } from '../../types';

export const SubscriptionPlans: React.FC = () => {
  const { user, isAuthenticated, updateSubscription } = useAuth();
  
  const plans = [
    {
      name: 'Basic',
      id: 'basic' as SubscriptionTier,
      price: 4.99,
      description: 'Perfect for occasional readers',
      features: [
        'Access to 1000+ e-books',
        'Read on one device',
        '2 books per month',
        'Basic support',
        'No offline reading',
      ],
      limitations: [
        'No audiobooks',
        'No premium titles',
      ]
    },
    {
      name: 'Standard',
      id: 'standard' as SubscriptionTier,
      price: 9.99,
      description: 'Most popular for regular readers',
      features: [
        'Access to 10,000+ e-books',
        'Read on up to 3 devices',
        '5 books per month',
        'Priority support',
        'Offline reading',
      ],
      limitations: [
        'Limited audiobooks',
      ]
    },
    {
      name: 'Premium',
      id: 'premium' as SubscriptionTier,
      price: 14.99,
      description: 'Unlimited access for book lovers',
      features: [
        'Unlimited access to all e-books',
        'Read on unlimited devices',
        'Unlimited books per month',
        '24/7 premium support',
        'Offline reading',
        'Full audiobook library',
        'Early access to new releases',
      ],
      limitations: []
    }
  ];

  const handleSubscribe = (plan: SubscriptionTier) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    updateSubscription(plan);
  };

  return (
    <div>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Choose Your Reading Journey</h2>
        <p className="text-lg text-gray-600">
          Unlock a world of knowledge and imagination with our flexible subscription plans tailored to fit your reading habits.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrentPlan = user?.subscription === plan.id;
          
          return (
            <div 
              key={plan.id}
              className={`relative rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isCurrentPlan ? 'border-2 border-indigo-500 bg-indigo-50' : 'bg-white'
              }`}
            >
              {isCurrentPlan && (
                <div className="absolute top-0 inset-x-0 px-4 py-1 bg-indigo-500 text-white text-center text-sm font-medium">
                  Current Plan
                </div>
              )}
              
              <div className={`px-6 pt-${isCurrentPlan ? 10 : 6} pb-6`}>
                <div className="text-center mb-4">
                  <h3 className="text-xl font-serif font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="mt-2 text-gray-600">{plan.description}</p>
                </div>
                
                <div className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-500">{limitation}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isCurrentPlan}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      isCurrentPlan
                        ? 'bg-gray-300 text-gray-700 cursor-default'
                        : 'text-white bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-4">All plans include:</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">No contracts</div>
          <div className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">Cancel anytime</div>
          <div className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">Secure payments</div>
          <div className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">Customer support</div>
          <div className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">Regular new titles</div>
        </div>
      </div>
    </div>
  );
};