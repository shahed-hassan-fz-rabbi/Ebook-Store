import toast from "react-hot-toast";

export const uploadImage = async (file) => {
  if (!file) {
    toast.error("No file selected");
    return null;
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    toast.error("Please select a valid image file");
    return null;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    toast.error("Image size must be less than 5MB");
    return null;
  }

  const formData = new FormData();
  formData.append("image", file);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    toast.error("imgBB API key is missing");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      return data.data.url;
    } else {
      toast.error("Image upload failed");
      return null;
    }
  } catch (error) {
    console.error("imgBB upload error:", error);
    toast.error("Image upload failed. Please try again.");
    return null;
  }
};