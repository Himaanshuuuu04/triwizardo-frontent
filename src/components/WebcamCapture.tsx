"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, RotateCcw, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WebcamCaptureProps {
  onImageCapture: (imageData: string) => void;
  capturedImage: string | null;
  isRequired?: boolean;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  onImageCapture,
  capturedImage,
  isRequired = false,
}) => {
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreamActive(true);

        // Ensure video plays
        try {
          await videoRef.current.play();
        } catch (playError) {
          console.warn("Video autoplay prevented:", playError);
          // This is normal on some browsers, user interaction will trigger play
        }
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Unable to access camera. Please ensure you have granted camera permissions and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreamActive(false);
  }, []);

  const captureImage = useCallback(async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Flip the image horizontally to match the mirrored preview
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0);

    const imageData = canvas.toDataURL("image/jpeg", 0.8);

    setIsProcessing(true);

    try {
      // Call the API to upload the image
      const apiResult = await uploadImageToAPI(imageData);
      console.log("API upload result:", apiResult);

      // Update the form with the captured image
      onImageCapture(imageData);
      stopCamera();
    } catch (error) {
      console.error("Failed to upload image to API:", error);
      // Still save the image locally even if API fails
      onImageCapture(imageData);
      stopCamera();
    } finally {
      setIsProcessing(false);
    }
  }, [onImageCapture, stopCamera]);

  // API integration function - ready for your backend
  const uploadImageToAPI = async (imageData: string) => {
    try {
      const response = await fetch("/api/upload-animal-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageData,
          timestamp: new Date().toISOString(),
          reportId: `temp_${Date.now()}`, // You can generate a proper ID
          metadata: {
            capturedWith: "webcam",
            userAgent: navigator.userAgent,
            resolution: `${videoRef.current?.videoWidth}x${videoRef.current?.videoHeight}`,
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

  const retakeImage = useCallback(() => {
    onImageCapture("");
    startCamera();
  }, [onImageCapture, startCamera]);

  const cancelCapture = useCallback(() => {
    stopCamera();
  }, [stopCamera]);

  // Clean up stream when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-orange-700 dark:text-orange-300 font-medium">
          Photo Evidence {isRequired && <span className="text-red-500">*</span>}
        </label>
        {capturedImage && (
          <button
            type="button"
            onClick={retakeImage}
            className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Photo</span>
          </button>
        )}
      </div>

      {/* Debug Info - Remove in production */}
      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs">
        <p>Debug: isStreamActive: {isStreamActive.toString()}</p>
        <p>Debug: isLoading: {isLoading.toString()}</p>
        <p>Debug: error: {error || "none"}</p>
        <p>Debug: capturedImage: {capturedImage ? "yes" : "no"}</p>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl p-4">
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          <button
            type="button"
            onClick={startCamera}
            className="mt-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium underline"
          >
            Try Again
          </button>
        </div>
      )}

      {!capturedImage && !isStreamActive && (
        <div className="border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-xl p-8 text-center bg-orange-50/50 dark:bg-orange-900/20">
          <Camera className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-2">
            Take a Photo of the Animal
          </h3>
          <p className="text-orange-600 dark:text-orange-400 mb-4 text-sm">
            A clear photo helps rescuers identify the animal quickly and
            accurately.
          </p>
          <Button
            type="button"
            onClick={startCamera}
            disabled={isLoading}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Starting Camera...
              </>
            ) : (
              <>
                <Camera className="w-4 h-4 mr-2" />
                Open Camera
              </>
            )}
          </Button>
        </div>
      )}

      {isStreamActive && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              controls={false}
              className="w-full h-80 object-cover"
              style={{ transform: "scaleX(-1)" }}
              onLoadedMetadata={() => {
                console.log("Video metadata loaded");
                if (videoRef.current) {
                  console.log(
                    "Video dimensions:",
                    videoRef.current.videoWidth,
                    "x",
                    videoRef.current.videoHeight
                  );
                }
              }}
              onPlay={() => console.log("Video is playing")}
              onError={(e) => console.error("Video error:", e)}
            />
            <div className="absolute inset-0 border-4 border-orange-400 rounded-xl pointer-events-none"></div>
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>LIVE</span>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              Position the animal in the frame
            </div>

            {/* Processing Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-lg font-semibold">Processing Image...</p>
                  <p className="text-sm opacity-80">Preparing for API upload</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              type="button"
              onClick={captureImage}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5 mr-3" />
                  Capture Photo
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={cancelCapture}
              disabled={isProcessing}
              variant="outline"
              className="px-6 py-3 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900/30 disabled:opacity-50"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>

          <p className="text-center text-orange-600 dark:text-orange-400 text-sm">
            💡 Tip: Make sure the animal is clearly visible and well-lit for the
            best results
          </p>
        </div>
      )}

      {capturedImage && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src={capturedImage}
              alt="Captured animal"
              className="w-full h-80 object-cover rounded-xl"
            />
            <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg">
              <Check className="w-4 h-4" />
              <span>Photo Captured</span>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              Ready to submit
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={retakeImage}
              variant="outline"
              className="px-6 py-2 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900/30"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Photo
            </Button>
          </div>

          <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl p-4">
            <p className="text-green-700 dark:text-green-300 text-sm font-medium text-center mb-2">
              ✅ Photo successfully captured! This image will be sent to our
              animal identification API for processing and will help rescuers
              identify the animal.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3 mt-3">
              <p className="text-blue-700 dark:text-blue-300 text-xs">
                <strong>🔧 For Developers:</strong> The captured image is ready
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

      {isRequired && !capturedImage && (
        <p className="text-red-600 dark:text-red-400 text-sm">
          * Photo is required to submit the report
        </p>
      )}
    </div>
  );
};

export default WebcamCapture;
