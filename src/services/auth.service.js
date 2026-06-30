import axiosInstance from "@/lib/axios";

export const loginUser = (data) => {
  return axiosInstance.post("/users/login", data);
};

export const registerUser = (data) => {
  return axiosInstance.post("/users/register", data);
};

export const forgotPassword = (email) => {
  return axiosInstance.post("/users/forgot-password", { email });
};

export const logoutUser = () => {
  return axiosInstance.post("/users/logout");
};

export const getCurrentUser = () => {
  return axiosInstance.get("/users/me");
};

export const googleSync = (data) => {
  return axiosInstance.post("/users/google-sync", data);
};