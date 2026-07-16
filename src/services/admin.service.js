import axiosInstance from "@/lib/axios";

export const getAdminStats = async () => {
  const res = await axiosInstance.get("/admin/stats");
  return res.data;
};

export const getMonthlySales = async () => {
  const res = await axiosInstance.get("/admin/monthly-sales");
  return res.data;
};

export const getEbooksByGenre = async () => {
  const res = await axiosInstance.get("/admin/ebooks-by-genre");
  return res.data;
};