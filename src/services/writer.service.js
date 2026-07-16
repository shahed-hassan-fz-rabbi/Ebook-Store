import axiosInstance from "@/lib/axios";

// Top writers by actual sales (assignment: "3 writers with most sales")
export const getTopWriters = async () => {
  const res = await axiosInstance.get("/purchases/top-writers");
  return res.data;
};

// Writer dashboard stats (used later in writer dashboard)
export const getWriterDashboard = async () => {
  const res = await axiosInstance.get("/writer/dashboard");
  return res.data;
};