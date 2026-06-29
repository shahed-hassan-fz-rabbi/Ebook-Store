import axiosInstance from "@/lib/axios";

export const addBookmark = async (
  ebook
) => {
  const res = await axiosInstance.post(
    "/bookmarks",
    {
      ebook,
    }
  );

  return res.data;
};

export const getBookmarks = async () => {
  const res = await axiosInstance.get(
    "/bookmarks"
  );

  return res.data;
};

export const removeBookmark = async (
  id
) => {
  const res = await axiosInstance.delete(
    `/bookmarks/${id}`
  );

  return res.data;
};