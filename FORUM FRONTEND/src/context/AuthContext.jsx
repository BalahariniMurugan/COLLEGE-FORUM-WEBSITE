import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user) => {
    return new Promise((resolve) => {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      resolve();
    });
  };

  const logout = () => {
    return new Promise((resolve) => {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
      resolve();
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
