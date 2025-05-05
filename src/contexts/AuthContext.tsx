import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, SubscriptionTier } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateSubscription: (tier: SubscriptionTier) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false,
    subscription: null as SubscriptionTier | null,
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true,
    subscription: 'premium' as SubscriptionTier,
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
  };

  const signup = async (name: string, email: string, password: string) => {
    // In a real app, this would be an API call
    const userExists = mockUsers.some((u) => u.email === email);
    
    if (userExists) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      password,
      isAdmin: false,
      subscription: null as SubscriptionTier | null,
    };
    
    // In a real app, would save to database
    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
  };

  const logout = () => {
    setUser(null);
  };

  const updateSubscription = (tier: SubscriptionTier) => {
    if (user) {
      setUser({ ...user, subscription: tier });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};