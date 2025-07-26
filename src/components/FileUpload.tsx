"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Check, Camera, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onImageUpload: (imageData: string) => void;
  uploadedImage: string | null;
  isRequired?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onImageUpload,
  uploadedImage,
  isRequired = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, or WebP)");
      return false;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("File size must be less than 5MB");
      return false;
    }

    return true;
  };

  const processFile = useCallback(
    async (file: File) => {
      if (!validateFile(file)) return;

      setIsUploading(true);
      setError(null);

      try {
        // Convert file to base64
        const reader = new FileReader();
        reader.onload = async (e) => {
          const result = e.target?.result as string;

          // Simulate API upload delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          onImageUpload(result);
          setIsUploading(false);

          // Here you can add your API call later
          // Example: await uploadImageToAPI(result, file);
        };

        reader.onerror = () => {
          setError("Failed to read the file");
          setIsUploading(false);
        };

        reader.readAsDataURL(file);
      } catch (err) {
        console.error("Error processing file:", err);
        setError("Failed to process the file");
        setIsUploading(false);
      }
    },
    [onImageUpload]
  );

  // Placeholder for future API integration
  const uploadImageToAPI = async (imageData: string, file: File) => {
    try {
      const response = await fetch("/api/upload-animal-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageData,
          filename: file.name,
          filesize: file.size,
          filetype: file.type,
          timestamp: new Date().toISOString(),
          reportId: `temp_${Date.now()}`,
          metadata: {
            uploadMethod: "file",
            originalName: file.name,
            size: file.size,
            type: file.type,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Image uploaded successfully:", result);
      return result;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    onImageUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-orange-700 dark:text-orange-300 font-medium">
          Photo Evidence {isRequired && <span className="text-red-500">*</span>}
        </label>
        {uploadedImage && (
          <button
            type="button"
            onClick={removeImage}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
          >
            <X className="w-4 h-4" />
            <span>Remove Photo</span>
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl p-4">
          <p className="text-red-700 dark:text-red-300 text-sm font-semibold">
            Upload Error:
          </p>
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="mt-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium underline"
          >
            Try Again
          </button>
        </div>
      )}

      {!uploadedImage && (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            isDragOver
              ? "border-orange-400 bg-orange-50/70 dark:bg-orange-900/30"
              : "border-orange-300 dark:border-orange-700 bg-orange-50/50 dark:bg-orange-900/20"
          } ${isUploading ? "opacity-50" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <div>
                <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300">
                  Uploading Image...
                </h3>
                <p className="text-orange-600 dark:text-orange-400 text-sm">
                  Please wait while we process your photo
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <Upload className="w-12 h-12 text-orange-400" />
                <FileImage className="w-12 h-12 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-2">
                  Upload Animal Photo
                </h3>
                <p className="text-orange-600 dark:text-orange-400 mb-4 text-sm">
                  Drag and drop an image here, or click to select a file
                </p>
                <p className="text-orange-500 dark:text-orange-500 text-xs mb-4">
                  Supports: JPEG, PNG, WebP • Max size: 5MB
                </p>
              </div>
              <Button
                type="button"
                onClick={handleButtonClick}
                disabled={isUploading}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
        </div>
      )}

      {uploadedImage && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src={uploadedImage}
              alt="Uploaded animal"
              className="w-full h-80 object-cover rounded-xl"
            />
            <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
              <Check className="w-5 h-5" />
              <span>✅ Photo Uploaded!</span>
            </div>
          </div>

          <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl p-4 text-center">
            <p className="text-green-700 dark:text-green-300 font-bold mb-2">
              🎉 Perfect! Photo successfully uploaded!
            </p>
            <p className="text-green-600 dark:text-green-400 text-sm mb-3">
              This image will help rescuers identify and locate the animal
              quickly.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
              <p className="text-blue-700 dark:text-blue-300 text-xs">
                <strong>🔧 For Developers:</strong> The uploaded image is ready
                for API integration. You can access the base64 image data and
                send it to your backend service using the
                <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded mx-1">
                  uploadImageToAPI
                </code>{" "}
                function.
              </p>
            </div>
          </div>
        </div>
      )}

      {isRequired && !uploadedImage && (
        <p className="text-red-600 dark:text-red-400 text-sm font-medium">
          ⚠️ A photo is required to submit the report
        </p>
      )}
    </div>
  );
};

export default FileUpload;
