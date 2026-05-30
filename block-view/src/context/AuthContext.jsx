import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AUTH_KEY = "blockview_auth";
const USER_KEY = "blockview_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authed = localStorage.getItem(AUTH_KEY) === "true";
    const stored = localStorage.getItem(USER_KEY);
    if (authed && stored) {
      try {
        setUser(JSON.parse(stored));
        setIsAuthenticated(true);
      } catch {
        logout();
      }
    }
  }, []);

  const login = (email, password) => {
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) return { success: false, message: "No account found. Please sign up first." };
    const savedUser = JSON.parse(stored);
    if (savedUser.email === email && savedUser.password === password) {
      localStorage.setItem(AUTH_KEY, "true");
      setUser(savedUser);
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password." };
  };

  const signup = (name, email, password) => {
    localStorage.setItem(USER_KEY, JSON.stringify({ name, email, password }));
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;