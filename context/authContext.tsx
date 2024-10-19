"use client";

import React, { createContext, useContext, useState } from 'react';

export interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthenticated: (status: boolean) => void;
  acc_level: string;
  setAccLevel: (level: string) => void;
  user_id: string;
  setUserId: (id: string) => void;
  username: string;
  setUsername: (name: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setAuthenticated: () => {
    throw new Error('setAuthenticated function must be overridden by AuthProvider');
  },
  acc_level: '',
  setAccLevel: () => {
    throw new Error('setAccLevel function must be overridden by AuthProvider');
  },
  user_id: '',
  username: '',
  setUserId: function (id: string): void {
    throw new Error('Function not implemented.');
  },
  setUsername: function (name: string): void {
    throw new Error('Function not implemented.');
  }
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
  initialAuthState: boolean;
  initialAccLevel?: string;
  initialUserId?: string;
  initialUsername?: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  initialAuthState, 
  initialAccLevel = '', 
  initialUserId = '', 
  initialUsername = '' 
}) => {
  const [isAuthenticated, setAuthenticated] = useState(initialAuthState);
  const [acc_level, setAccLevel] = useState(initialAccLevel);
  const [user_id, setUserId] = useState(initialUserId);
  const [username, setUsername] = useState(initialUsername);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        setAuthenticated,
        acc_level,
        setAccLevel,
        user_id,
        setUserId, // Add this line
        username,
        setUsername // Add this line
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
