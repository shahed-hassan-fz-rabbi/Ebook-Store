"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { uploadImage } from "@/utils/uploadImage";

export default function ImageUpload({ value, onUploadSuccess, label = "Cover Image" }) {
  const [preview, setPreview] = useState(value || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    setUploading(true);
    const uploadedUrl = await uploadImage(file);
    setUploading(false);

    if (uploadedUrl) {
      setPreview(uploadedUrl);
      onUploadSuccess(uploadedUrl);
    } else {
      setPreview(value || null);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onUploadSuccess("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm font-medium"
        style={{ color: "var(--brand)" }}
      >
        {label}
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className="relative rounded-2xl cursor-pointer overflow-hidden transition-all"
        style={{
          border: "2px dashed var(--border)",
          backgroundColor: "var(--card)",
          minHeight: "200px",
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full"
              style={{ minHeight: "200px" }}
            >
              <img
                src={preview}
                alt="Cover preview"
                className="w-full h-full object-cover"
                style={{ minHeight: "200px", maxHeight: "300px" }}
              />

              {uploading && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                  <Loader2 size={32} color="white" className="animate-spin" />
                </div>
              )}

              {!uploading && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "white",
                  }}
                >
                  <X size={16} />
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-3 py-12"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "var(--secondary)" }}
              >
                <ImageIcon size={24} style={{ color: "var(--primary)" }} />
              </div>
              <div className="text-center">
                <p
                  className="text-sm font-medium flex items-center gap-1 justify-center"
                  style={{ color: "var(--brand)" }}
                >
                  <Upload size={14} />
                  Click or drag image to upload
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  PNG, JPG up to 5MB
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}