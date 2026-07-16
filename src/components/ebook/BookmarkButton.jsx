"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Bookmark, BookmarkCheck } from "lucide-react";

import { getBookmarks, toggleBookmark } from "@/services/bookmark.service";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

export default function BookmarkButton({ ebookId, size = "lg" }) {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
    enabled: !!user,
  });

  const list = Array.isArray(data?.data) ? data.data : [];

  const isBookmarked = list.some(
    (b) => (b.ebook?._id || b.ebook) === ebookId
  );

  const { mutate, isPending } = useMutation({
    mutationFn: () => toggleBookmark(ebookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast.success(
        isBookmarked ? "Removed from bookmarks" : "Added to bookmarks"
      );
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Could not update bookmark."
      );
    },
  });

  const handleClick = () => {
    if (!user) {
      toast.error("Please log in to bookmark.");
      router.push("/login");
      return;
    }
    mutate();
  };

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleClick}
      loading={isPending}
    >
      {isBookmarked ? (
        <>
          <BookmarkCheck className="h-4 w-4 text-primary" /> Bookmarked
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" /> Bookmark
        </>
      )}
    </Button>
  );
}