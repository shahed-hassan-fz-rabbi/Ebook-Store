"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllEbooks } from "@/services/ebook.service";

const useEBooks = (params = {}) => {
  const query = useQuery({
    queryKey: ["ebooks", params],
    queryFn: () => getAllEbooks(params),
  });

  return {
    ebooks: query.data?.data?.result || [],
    meta: query.data?.data?.meta || {},
    ...query,
  };
};

export default useEBooks;