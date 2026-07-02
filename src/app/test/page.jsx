"use client";

import { useState } from "react";
import ImageUpload from "@/components/ui/ImageUpload";

export default function TestPage() {
  const [coverImage, setCoverImage] = useState("");

  return (
    <div className="container section-padding max-w-md">
      <ImageUpload
        value={coverImage}
        onUploadSuccess={(url) => setCoverImage(url)}
      />
      <p className="mt-4 text-sm break-all">{coverImage}</p>
    </div>
  );
}