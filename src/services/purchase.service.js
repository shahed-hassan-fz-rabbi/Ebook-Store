import axiosInstance from "@/lib/axios";

export const checkout = async (ebookId) => {
  const res = await axiosInstance.post("/purchases/checkout", {
    ebook: ebookId,
  });

  return res.data;
};

export const getPurchaseHistory = async () => {
  const res = await axiosInstance.get("/purchases/me");
  return res.data;
};

export const getPurchasedBooks = async () => {
  const res = await axiosInstance.get("/purchases/my-books");
  return res.data;
};

export const getAllPurchases = async () => {
  const res = await axiosInstance.get("/purchases");

  return res.data;
};