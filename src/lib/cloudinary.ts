import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  bytes: number;
  url: string;
  created_at: string;
}

/**
 * Upload image to Cloudinary
 * @param base64Image - Base64 encoded image string
 * @param folder - Cloudinary folder to store the image (optional)
 * @returns Promise<CloudinaryUploadResult>
 */
export async function uploadToCloudinary(
  base64Image: string,
  folder: string = "animal-reports"
): Promise<CloudinaryUploadResult> {
  try {
    console.log("📤 Uploading image to Cloudinary...");

    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: folder,
      resource_type: "image",
      transformation: [
        { width: 1000, height: 1000, crop: "limit", quality: "auto" },
        { fetch_format: "auto" },
      ],
      tags: ["animal-report", "user-upload"],
    });

    console.log("✅ Image uploaded to Cloudinary:", uploadResponse.public_id);
    return uploadResponse as CloudinaryUploadResult;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

/**
 * Delete image from Cloudinary
 * @param publicId - Cloudinary public ID of the image
 * @returns Promise<any>
 */
export async function deleteFromCloudinary(publicId: string): Promise<any> {
  try {
    console.log("🗑️ Deleting image from Cloudinary:", publicId);

    const deleteResponse = await cloudinary.uploader.destroy(publicId);

    console.log("✅ Image deleted from Cloudinary");
    return deleteResponse;
  } catch (error) {
    console.error("❌ Cloudinary delete error:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
}

/**
 * Get optimized image URL
 * @param publicId - Cloudinary public ID
 * @param width - Desired width
 * @param height - Desired height
 * @returns string - Optimized image URL
 */
export function getOptimizedImageUrl(
  publicId: string,
  width: number = 400,
  height: number = 400
): string {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: "fill",
    quality: "auto",
    fetch_format: "auto",
  });
}

export default cloudinary;
