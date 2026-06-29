"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllEbooks } from "@/services/ebook.service";

const useEBooks = (params = {}) => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["ebooks", params],
    queryFn: () => getAllEbooks(params),
  });

  return {
    ebooks: data?.data?.result || [],
    meta: data?.data?.meta || {},
    isLoading,
    error,
    refetch,
  };
};

export default useEBooks;