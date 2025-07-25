"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, RotateCcw, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WebcamCaptureProps {
  onImageCapture: (imageData: string) => void;
  capturedImage: string | null;
  isRequired?: boolean;
}

const WebcamCaptureSimple: React.FC<WebcamCaptureProps> = ({
  onImageCapture,
  capturedImage,
  isRequired = false,
}) => {
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [streamReady, setStreamReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setIsLoading(true);
    setError(null);
    setStreamReady(false);

    try {
      console.log("Requesting camera access...");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
          facingMode: "user",
        },
        audio: false,
      });

      console.log("Camera stream obtained:", stream);

      if (videoRef.current && stream) {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;

        // Set up event listeners
        videoRef.current.onloadedmetadata = () => {
          console.log("Video metadata loaded");
          setStreamReady(true);
        };

        videoRef.current.oncanplay = () => {
          console.log("Video can play");
          if (videoRef.current) {
            videoRef.current
              .play()
              .then(() => {
                console.log("Video is playing");
                setIsStreamActive(true);
              })
              .catch((err) => {
                console.error("Error playing video:", err);
              });
          }
        };

        // Fallback - set active after a short delay
        setTimeout(() => {
          if (!isStreamActive) {
            console.log("Fallback: Setting stream active");
            setIsStreamActive(true);
          }
        }, 1000);
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError(
        `Camera access failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    console.log("Stopping camera");
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
        console.log("Stopped track:", track.kind);
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreamActive(false);
    setStreamReady(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !streamRef.current) {
      console.error("Video or stream not available");
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;

      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Cannot get canvas context");
        return;
      }

      // Flip horizontally for mirrored effect
      ctx.scale(-1, 1);
      ctx.drawImage(video, -canvas.width, 0);

      const imageData = canvas.toDataURL("image/jpeg", 0.8);
      console.log("Image captured, size:", imageData.length);

      onImageCapture(imageData);
      stopCamera();
    } catch (err) {
      console.error("Error capturing image:", err);
    }
  };

  const retakeImage = () => {
    onImageCapture("");
    startCamera();
  };

  // Cleanup on unmount
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

      {/* Debug Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-xs">
        <p>
          <strong>Debug Info:</strong>
        </p>
        <p>Stream Active: {isStreamActive ? "✅ YES" : "❌ NO"}</p>
        <p>Stream Ready: {streamReady ? "✅ YES" : "❌ NO"}</p>
        <p>Loading: {isLoading ? "⏳ YES" : "✅ NO"}</p>
        <p>Error: {error || "None"}</p>
        <p>Captured: {capturedImage ? "✅ YES" : "❌ NO"}</p>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl p-4">
          <p className="text-red-700 dark:text-red-300 text-sm font-semibold">
            Camera Error:
          </p>
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          <button
            type="button"
            onClick={startCamera}
            className="mt-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Camera Start Button */}
      {!capturedImage && !isStreamActive && !isLoading && (
        <div className="border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-xl p-8 text-center bg-orange-50/50 dark:bg-orange-900/20">
          <Camera className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-2">
            Take a Photo of the Animal
          </h3>
          <p className="text-orange-600 dark:text-orange-400 mb-4 text-sm">
            Click below to open your camera and take a photo
          </p>
          <Button
            type="button"
            onClick={startCamera}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Camera className="w-4 h-4 mr-2" />
            Open Camera
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-700 dark:text-blue-300 font-medium">
            Starting Camera...
          </p>
          <p className="text-blue-600 dark:text-blue-400 text-sm">
            Please allow camera access when prompted
          </p>
        </div>
      )}

      {/* Live Camera Feed */}
      {isStreamActive && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl border-4 border-orange-400">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-80 object-cover bg-black"
              style={{
                transform: "scaleX(-1)",
                minHeight: "320px",
              }}
            />

            {/* Live Indicator */}
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-2 animate-pulse shadow-lg">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span>🔴 LIVE</span>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
              📸 Position the animal in the frame and click capture
            </div>

            {/* Video Status */}
            {!streamReady && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p>Loading camera feed...</p>
                </div>
              </div>
            )}
          </div>

          {/* Camera Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              type="button"
              onClick={captureImage}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Camera className="w-6 h-6 mr-3" />
              📸 Capture Photo
            </Button>
            <Button
              type="button"
              onClick={stopCamera}
              variant="outline"
              className="px-6 py-3 border-2 border-red-300 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>

          <p className="text-center text-orange-600 dark:text-orange-400 text-sm">
            💡 Make sure the animal is clearly visible and well-lit
          </p>
        </div>
      )}

      {/* Captured Image Display */}
      {capturedImage && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src={capturedImage}
              alt="Captured animal"
              className="w-full h-80 object-cover rounded-xl"
            />
            <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
              <Check className="w-5 h-5" />
              <span>✅ Photo Captured!</span>
            </div>
          </div>

          <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl p-4 text-center">
            <p className="text-green-700 dark:text-green-300 font-bold mb-2">
              🎉 Perfect! Photo successfully captured!
            </p>
            <p className="text-green-600 dark:text-green-400 text-sm">
              This image will help rescuers identify and locate the animal
              quickly.
            </p>
          </div>
        </div>
      )}

      {isRequired && !capturedImage && (
        <p className="text-red-600 dark:text-red-400 text-sm font-medium">
          ⚠️ A photo is required to submit the report
        </p>
      )}
    </div>
  );
};

export default WebcamCaptureSimple;
