import axiosInstance from "@/lib/axios";

export const getAnalytics = async () => {
  const res = await axiosInstance.get("/admin/analytics");
  return res.data;
};