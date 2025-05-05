// Types for the application

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  subscription: SubscriptionTier | null;
}

export type SubscriptionTier = 'basic' | 'standard' | 'premium';

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  price: number;
  isAvailableForSale: boolean;
  isAvailableForReading: boolean;
  category: string;
}

export interface SearchFilters {
  query: string;
  category: string;
}