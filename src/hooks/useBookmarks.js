"use client";

import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "@/services/bookmark.service";

const useBookmarks = () => {
  const query = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });

  return {
    bookmarks: query.data?.data || [],
    ...query,
  };
};

export default useBookmarks;