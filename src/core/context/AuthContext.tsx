import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UserManagement } from '../UserManagement';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const authToken = await UserManagement.getToken();
      setIsAuthenticated(!!authToken);
    } catch (error) {
      console.error('Error in checkAutStatus:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string): Promise<void> => {
    try {
      await UserManagement.saveToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error: ', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log("clearing token")
      await UserManagement.removeToken();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};