"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  UploadCloud, 
  BookText, 
  DollarSign, 
  AlignLeft, 
  FileText, 
  Tags, 
  Loader2, 
  Save,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "your_imgbb_api_key_here";

export default function EbookForm({ mode = "create", ebookId = null }) {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(mode === "edit");
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    genre: "Fiction",
    price: "",
    description: "",
    content: "",
    coverImage: "" 
  });

  useEffect(() => {
    if (mode === "edit" && ebookId) {
      const fetchEbookDetails = async () => {
        try {
          const res = await axiosInstance.get(`/ebooks/${ebookId}`);
          const book = res.data?.data || res.data;
          
          setFormData({
            title: book.title || "",
            genre: book.genre || "Fiction",
            price: book.price || "",
            description: book.description || "",
            content: book.content || "",
            coverImage: book.coverImage || ""
          });
          
          if (book.coverImage) {
            setImagePreview(book.coverImage);
          }
        } catch (err) {
          console.error("Failed to fetch ebook details:", err);
          toast.error("Failed to load ebook data.");
          router.push("/dashboard/writer/manage-ebooks");
        } finally {
          setFetching(false);
        }
      };
      
      fetchEbookDetails();
    }
  }, [mode, ebookId, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large. Maximum size is 5MB.");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, or WEBP formats are allowed.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImageToImgBB = async (file) => {
    const imgData = new FormData();
    imgData.append("image", file);
    
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: imgData,
    });
    
    const data = await response.json();
    if (data.success) {
      return data.data.display_url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (mode === "create" && !imageFile) {
      toast.error("Please upload a cover image.");
      return;
    }

    try {
      setLoading(true);
      
      let finalCoverUrl = formData.coverImage;
      
      if (imageFile) {
        finalCoverUrl = await uploadImageToImgBB(imageFile);
      }

      const ebookPayload = {
        title: formData.title,
        genre: formData.genre,
        price: Number(formData.price),
        description: formData.description,
        content: formData.content, 
        coverImage: finalCoverUrl
      };

      if (mode === "create") {
        ebookPayload.status = "unpublished"; 
        await axiosInstance.post("/ebooks", ebookPayload);
        toast.success("Ebook drafted successfully!");
      } else {
        await axiosInstance.patch(`/ebooks/${ebookId}`, ebookPayload);
        toast.success("Ebook updated successfully!");
      }
      
      router.push("/dashboard/writer/manage-ebooks");

    } catch (err) {
      console.error("Ebook submission error:", err);
      toast.error(err.response?.data?.message || "Failed to process request.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-orange-500" />
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Loading Ebook Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
            {mode === "create" ? "Add New Ebook" : "Edit Ebook"}
          </h1>
          <p className="text-xs text-neutral-400 font-medium mt-1">
            {mode === "create" 
              ? "Draft a new ebook for the marketplace." 
              : "Update your existing ebook content and metadata."}
          </p>
        </div>
        <Link href="/dashboard/writer/manage-ebooks" className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-orange-500 transition-colors">
          <ArrowLeft size={16} />
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
        
        {/* Text Details Panel */}
        <div className="flex-1 space-y-6">
          <div className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm space-y-5">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <BookText size={14} className="text-orange-500" /> Book Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a captivating title..."
                className="w-full h-11 px-4 rounded-xl border bg-neutral-50/50 dark:bg-neutral-900/30 text-sm font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <AlignLeft size={14} className="text-orange-500" /> Short Description
              </label>
              <textarea
                name="description"
                required
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="A brief summary for the marketplace preview..."
                className="w-full p-4 rounded-xl border bg-neutral-50/50 dark:bg-neutral-900/30 text-sm font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <FileText size={14} className="text-orange-500" /> Full Ebook Content
              </label>
              <textarea
                name="content"
                required
                rows="12"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Paste your complete story or manuscript here..."
                className="w-full p-4 rounded-xl border bg-neutral-50/50 dark:bg-neutral-900/30 text-sm font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all scrollbar-thin"
              />
            </div>

          </div>
        </div>

        {/* Media & Config Panel */}
        <div className="w-full lg:w-80 space-y-6 shrink-0">
          
          <div className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm space-y-4">
            <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <UploadCloud size={14} className="text-orange-500" /> Cover Image
            </label>
            
            <div className="relative w-full aspect-[3/4] rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 flex flex-col items-center justify-center overflow-hidden transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer group">
              {imagePreview ? (
                <img src={imagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4 space-y-2">
                  <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <UploadCloud size={18} />
                  </div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Upload Cover</p>
                  <p className="text-[9px] text-neutral-500 font-medium">Max 5MB (JPG, PNG, WEBP)</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/jpeg, image/png, image/webp" 
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 shadow-sm space-y-5">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <Tags size={14} className="text-orange-500" /> Genre category
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="w-full h-11 px-4 rounded-xl border bg-neutral-50/50 dark:bg-neutral-900/30 text-sm font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
              >
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science Fiction">Sci-Fi</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Horror">Horror</option>
                <option value="Thriller">Thriller</option>
                <option value="Biography">Biography</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <DollarSign size={14} className="text-orange-500" /> Retail Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">$</span>
                <input
                  type="number"
                  name="price"
                  required
                  min="1"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full h-11 pl-8 pr-4 rounded-xl border bg-neutral-50/50 dark:bg-neutral-900/30 text-sm font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 text-white disabled:text-neutral-400 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    {mode === "create" ? "Save as Draft" : "Save Changes"}
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}