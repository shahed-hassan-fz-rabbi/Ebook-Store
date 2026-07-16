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

export const getWriterSalesHistory = async () => {
  const res = await axiosInstance.get("/purchases/writer/sales-history");
  return res.data;
};

export const getAllPurchases = async () => {
  const res = await axiosInstance.get("/purchases");
  return res.data;
};

export const readPurchasedBook = async (ebookId) => {
  const res = await axiosInstance.get(`/purchases/read/${ebookId}`);
  return res.data;
};