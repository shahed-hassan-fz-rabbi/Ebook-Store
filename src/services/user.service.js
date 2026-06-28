import axiosInstance from "@/lib/axios";

export const getProfile = () => {
  return axiosInstance.get("/users/profile");
};

export const updateProfile = (data) => {
  return axiosInstance.patch("/users/profile", data);
};
