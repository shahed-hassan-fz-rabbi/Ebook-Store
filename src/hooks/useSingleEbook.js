"use client";

import { useQuery } from "@tanstack/react-query";
import { getSingleEbook } from "@/services/ebook.service";

const useSingleEbook = (id) => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["ebook", id],
    queryFn: () => getSingleEbook(id),
    enabled: !!id,
  });

  return {
    ebook: data?.data,
    isLoading,
    error,
    refetch,
  };
};

export default useSingleEbook;