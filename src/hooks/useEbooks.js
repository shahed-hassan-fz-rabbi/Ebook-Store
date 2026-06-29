"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllEbooks } from "@/services/ebook.service";

const useEBooks = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["ebooks"],
    queryFn: getAllEbooks,
  });

  return {
    ebooks: data?.data || [],
    meta: data?.meta || {},
    isLoading,
    error,
    refetch,
  };
};

export default useEBooks;