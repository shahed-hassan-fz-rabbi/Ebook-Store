import axiosInstance from "@/lib/axios";

export const getAllEbooks = () => {
  return axiosInstance.get("/ebooks");
};

export const getSingleEbook = (id) => {
  return axiosInstance.get(`/ebooks/${id}`);
};

export const createEbook = (data) => {
  return axiosInstance.post("/ebooks", data);
};

export const updateEbook = (id, data) => {
  return axiosInstance.patch(`/ebooks/${id}`, data);
};

export const deleteEbook = (id) => {
  return axiosInstance.delete(`/ebooks/${id}`);
};