import axiosInstance from "@/lib/axios";

export const toggleBookmark = async (ebookId) => {
  const res = await axiosInstance.post("/bookmarks", {
    ebook: ebookId,
  });

  return res.data;
};

export const getBookmarks = async () => {
  const res = await axiosInstance.get("/bookmarks");

  return res.data;
};