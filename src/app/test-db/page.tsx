"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TestDBPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testDatabase = async () => {
    setLoading(true);
    try {
      // Create a test image (small base64 image)
      const testImage =
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

      const response = await fetch("/api/upload-animal-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: testImage,
          filename: "test_image.jpg",
          filesize: 500,
          filetype: "image/jpeg",
          timestamp: new Date().toISOString(),
          metadata: {
            uploadMethod: "test",
            reportType: "test",
          },
          formData: {
            animalType: "dog",
            breed: "Test Breed",
            name: "Test Pet",
            age: "3",
            color: "Brown",
            size: "medium",
            gender: "male",
            description: "This is a test report to verify database integration",
            urgency: "low",
            lastSeenDate: "2024-01-01",
            lastSeenTime: "12:00",
            lastSeenLocation: "Test Location, Test City",
            reporterName: "Test Reporter",
            reporterPhone: "+1234567890",
            reporterEmail: "test@example.com",
            contactPreference: "email",
            rewardAmount: "100",
            additionalInfo: "This is additional test information",
          },
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-amber-900/20 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-8">
          Database Integration Test
        </h1>

        <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-8 mb-8">
          <p className="text-lg text-orange-700 dark:text-orange-300 mb-6">
            This page tests the MongoDB and Cloudinary integration by submitting
            a test animal report.
          </p>

          <Button
            onClick={testDatabase}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3"
          >
            {loading ? "Testing..." : "Test Database Integration"}
          </Button>
        </div>

        {result && (
          <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
              Test Result:
            </h2>
            <pre className="bg-black/50 text-green-300 p-4 rounded-xl overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
