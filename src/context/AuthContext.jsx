"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { authClient } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  

  const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      return;
    }
    const res = await axiosInstance.get("/users/me");
    setUser(res.data.data);
  } catch (err) {
    console.error("fetchCurrentUser failed:", err.response?.status, err.response?.data);
    localStorage.removeItem("accessToken");
    setUser(null);
  }
};

  

  const checkSession = async () => {
    try {
      
      const existingToken = localStorage.getItem("accessToken");
      if (existingToken) {
        await fetchCurrentUser();
        setLoading(false);
        return;
      }

      
      const session = await authClient.getSession();

      if (!session?.data?.user) {
        setLoading(false);
        return;
      }

      
      const res = await axiosInstance.post("/users/google-sync", {
        name: session.data.user.name,
        email: session.data.user.email,
        image: session.data.user.image,
      });

      localStorage.setItem("accessToken", res.data.data.accessToken);
      setUser(res.data.data.user);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };


  const login = async ({ email, password }) => {
    const res = await axiosInstance.post("/users/login", {
      email,
      password,
    });

    const { accessToken, user: loggedInUser } = res.data.data;

    localStorage.setItem("accessToken", accessToken);
    setUser(loggedInUser);

    return res.data;
  };

  //--------------------------------------------------
  // Email Register (existing JWT API)
  //--------------------------------------------------

  const register = async ({ name, email, password, role }) => {
    const res = await axiosInstance.post("/users/register", {
      name,
      email,
      password,
      role,
    });

    const { accessToken, user: newUser } = res.data.data;

    localStorage.setItem("accessToken", accessToken);
    setUser(newUser);

    return res.data;
  };

  //--------------------------------------------------
  // Google Login (Better Auth only)
  //--------------------------------------------------

  const googleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    });
  };

  //--------------------------------------------------
  // Logout
  //--------------------------------------------------

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("accessToken");
    setUser(null);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        googleLogin,
        logout,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);