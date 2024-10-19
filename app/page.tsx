"use client";

import React from 'react';
import { useAuth } from '@/context/authContext';

export const HomePage = () => {
  const { isAuthenticated, acc_level, user_id, username } = useAuth(); 

  console.log('isAuthenticated:', isAuthenticated);
  console.log('User Details:', { acc_level, user_id, username }); // Log user details

  return (
    <div>
      <h1>Home Page</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {username}!</p>
          <p>Your account level: {acc_level}</p>
          <p>Your User ID: {user_id}</p>
        </div>
      ) : (
        <p>Please log in to access your account details.</p>
      )}
    </div>
  );
}

export default HomePage;
