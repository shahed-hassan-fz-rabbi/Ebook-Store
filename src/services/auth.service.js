import axiosInstance from "@/lib/axios";

export const loginUser = (data) => {
  return axiosInstance.post("/auth/login", data);
};

export const registerUser = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const forgotPassword = (email) => {
  return axiosInstance.post("/auth/forgot-password", {
    email,
  });
};

export const logoutUser = () => {
  return axiosInstance.post("/auth/logout");
};

export const getCurrentUser = () => {
  return axiosInstance.get("/auth/me");
};