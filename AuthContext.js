import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // Import the necessary Firebase auth function
import { auth } from './config/firebase'; // Import your Firebase authentication instance

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect to listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed. User:', user);
      setUser(user);
    });
  
    // Cleanup function
    return () => unsubscribe();
  }, []);

  // Context value
  const contextValue = {
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};