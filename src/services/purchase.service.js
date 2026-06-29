import axiosInstance from "@/lib/axios";

export const checkout = async (
  ebook
) => {
  const res = await axiosInstance.post(
    "/purchases/checkout",
    {
      ebook,
    }
  );

  return res.data;
};