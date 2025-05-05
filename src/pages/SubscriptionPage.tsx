import React from 'react';
import { Layout } from '../components/common/Layout';
import { SubscriptionPlans } from '../components/subscription/SubscriptionPlans';

export const SubscriptionPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Subscription Plans</h1>
        
        <SubscriptionPlans />
      </div>
    </Layout>
  );
};