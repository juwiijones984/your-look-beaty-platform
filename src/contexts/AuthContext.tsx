import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('yourLookUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock login - in real app, this would call Firebase Auth
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: `${role}-${Date.now()}`,
      role,
      name: role === 'customer' ? 'Sarah Johnson' :
            role === 'provider' ? 'Beauty by Thandi' :
            role === 'admin' ? 'Admin User' :
            'Responder Team',
      email,
      phone: '+27 82 555 1234',
      photoUrl: undefined,
      walletBalance: role === 'customer' ? 150 : 0,
      loyaltyPoints: role === 'customer' ? 2500 : 0,
    };

    setUser(mockUser);
    localStorage.setItem('yourLookUser', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yourLookUser');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('yourLookUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateUser,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
