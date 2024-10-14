"use client";

import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthenticated: (status: boolean) => void;
  
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
  initialAuthState: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialAuthState }) => {
  const [isAuthenticated, setAuthenticated] = useState(initialAuthState);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};