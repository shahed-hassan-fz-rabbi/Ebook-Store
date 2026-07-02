import axiosInstance from "@/lib/axios";

export const checkout = async (ebookId) => {
  const res = await axiosInstance.post("/purchases/checkout", {
    ebook: ebookId,
  });
  return res.data;
};

export const getMyPurchases = async () => {
  const res = await axiosInstance.get("/purchases/my");
  return res.data;
};