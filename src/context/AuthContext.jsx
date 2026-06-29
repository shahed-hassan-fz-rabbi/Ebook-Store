"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "@/services/auth.service";


export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Login
  const login = async (data) => {
    const res = await loginUser(data);
    const accessToken = res.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    setToken(accessToken);
    await fetchCurrentUser();
  };

  // Register
  const register = async (data) => {
    return await registerUser(data);
  };

  // Logout
  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  };

  // Current User
  const fetchCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setToken(accessToken);
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        register,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);