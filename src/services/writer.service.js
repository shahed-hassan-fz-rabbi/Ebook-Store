import axiosInstance from "@/lib/axios";

export const getWriterDashboard =
  async () => {
    const res =
      await axiosInstance.get(
        "/writer/dashboard"
      );

    return res.data;
  };