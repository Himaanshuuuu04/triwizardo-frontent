"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import FileUpload from "./FileUpload";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowLeft,
  MapPin,
  Camera,
  Calendar,
  Phone,
  Mail,
  AlertTriangle,
  Heart,
  Users,
} from "lucide-react";
import Link from "next/link";

interface FormData {
  animalType: string;
  breed: string;
  name: string;
  age: string;
  color: string;
  size: string;
  gender: string;
  description: string;
  lastSeenDate: string;
  lastSeenTime: string;
  lastSeenLocation: string;
  reporterName: string;
  reporterPhone: string;
  reporterEmail: string;
  contactPreference: string;
  urgency: string;
  rewardAmount: string;
  additionalInfo: string;
  animalPhoto: string;
}

const ReportAnimalPage = () => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    animalType: "dog", // Always dog
    breed: "",
    name: "",
    age: "",
    color: "",
    size: "",
    gender: "",
    description: "",
    lastSeenDate: "",
    lastSeenTime: "",
    lastSeenLocation: "",
    reporterName: "",
    reporterPhone: "",
    reporterEmail: "",
    contactPreference: "phone",
    urgency: "medium",
    rewardAmount: "",
    additionalInfo: "",
    animalPhoto: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isCheckingInjury, setIsCheckingInjury] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Custom toast styles for consistency with app theme
  const toastStyles = {
    error: {
      background: "rgba(254, 242, 242, 0.95)",
      color: "#B91C1C",
      border: "1px solid #FECACA",
      backdropFilter: "blur(12px)",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "500",
    },
    success: {
      background: "rgba(240, 253, 244, 0.95)",
      color: "#166534",
      border: "1px solid #BBF7D0",
      backdropFilter: "blur(12px)",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "500",
    },
    warning: {
      background: "rgba(254, 243, 199, 0.95)",
      color: "#92400E",
      border: "1px solid #FDE68A",
      backdropFilter: "blur(12px)",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "500",
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if photo is uploaded (mandatory)
    if (!formData.animalPhoto) {
      toast.error(
        "Please upload a photo of the animal before submitting the report.",
        {
          duration: 4000,
          position: "top-center",
          style: toastStyles.error,
        }
      );
      return;
    }

    setIsSubmitting(true);

    // Show loading toast for injury detection
    const loadingToastId = toast.loading(
      "Checking if animal is injured using AI detection...",
      {
        position: "top-center",
        style: {
          background: "rgba(249, 250, 251, 0.95)",
          color: "#374151",
          border: "1px solid #D1D5DB",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
        },
      }
    );

    try {
      // Send complete form data to the API
      const response = await fetch("/api/upload-animal-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: formData.animalPhoto,
          filename: `animal_report_${Date.now()}.jpg`,
          filesize: 0, // Will be calculated from base64
          filetype: "image/jpeg",
          timestamp: new Date().toISOString(),
          metadata: {
            uploadMethod: "form",
            reportType: "animal",
          },
          formData: {
            // Animal Information - always dog
            animalType: "dog",
            breed: formData.breed,
            name: formData.name || "Unknown",
            age: formData.age,
            color: formData.color,
            size: formData.size,
            gender: formData.gender,
            description: formData.description,
            urgency: formData.urgency,

            // Last Seen Information
            lastSeenDate: formData.lastSeenDate,
            lastSeenTime: formData.lastSeenTime,
            lastSeenLocation: formData.lastSeenLocation,

            // Contact Information
            reporterName: formData.reporterName,
            reporterPhone: formData.reporterPhone,
            reporterEmail: formData.reporterEmail,
            contactPreference: formData.contactPreference,

            // Additional Information
            rewardAmount: formData.rewardAmount,
            additionalInfo: formData.additionalInfo,
          },
        }),
      });

      if (!response.ok) {
        // Dismiss loading toast
        toast.dismiss(loadingToastId);

        const errorData = await response.json();

        // Handle specific error types with better user messages
        if (errorData.error === "Animal not injured") {
          toast.error(`Report Rejected: ${errorData.message}`, {
            duration: 6000,
            position: "top-center",
            style: { ...toastStyles.error, maxWidth: "500px" },
          });

          // Show additional info toast
          setTimeout(() => {
            toast(
              `Injury Detection: ${errorData.injuryDetection?.prediction} (${errorData.injuryDetection?.confidence} confidence)`,
              {
                duration: 5000,
                position: "top-center",
                style: toastStyles.warning,
                icon: "🔍",
              }
            );
          }, 1000);
        } else if (errorData.error === "Injury detection failed") {
          toast.error(
            `Injury Detection Failed: ${errorData.message}. Please try again with a clearer image.`,
            {
              duration: 5000,
              position: "top-center",
              style: toastStyles.error,
              icon: "🔍",
            }
          );
        } else {
          toast.error(errorData.message || "Failed to submit report", {
            duration: 4000,
            position: "top-center",
            style: toastStyles.error,
          });
        }

        throw new Error(errorData.message || "Failed to submit report");
      }

      const result = await response.json();
      console.log("Report submitted successfully:", result);

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      // Show success toast
      toast.success(
        "Report submitted successfully! Injured dog confirmed by AI - Emergency response activated.",
        {
          duration: 5000,
          position: "top-center",
          style: toastStyles.success,
          icon: "🚨",
        }
      );

      // Show success state
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          animalType: "dog", // Keep as dog
          breed: "",
          name: "",
          age: "",
          color: "",
          size: "",
          gender: "",
          description: "",
          lastSeenDate: "",
          lastSeenTime: "",
          lastSeenLocation: "",
          reporterName: "",
          reporterPhone: "",
          reporterEmail: "",
          contactPreference: "phone",
          urgency: "medium",
          rewardAmount: "",
          additionalInfo: "",
          animalPhoto: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Error submitting report:", error);

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit report. Please try again.",
        {
          duration: 4000,
          position: "top-center",
          style: toastStyles.error,
        }
      );
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (imageData: string) => {
    setFormData((prev) => ({
      ...prev,
      animalPhoto: imageData,
    }));
  };

  if (!mounted) return null;

  if (submitSuccess) {
    return (
      <>
        <Toaster
          toastOptions={{
            duration: 4000,
            style: {
              maxWidth: "500px",
            },
          }}
        />
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20 pt-24">
          <div className="max-w-2xl mx-auto p-6">
            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-12 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
                Emergency Report Activated!
              </h1>
              <p className="text-lg text-green-700 dark:text-green-300 mb-8">
                Thank you for reporting this injured dog. Our AI has confirmed
                the injury and emergency response has been activated. Local
                rescue organizations and veterinary services have been notified
                and will respond to assist the dog.
              </p>
              <Link href="/">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            maxWidth: "500px",
          },
        }}
      />
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-amber-900/20 pt-24">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl animate-pulse opacity-60"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-8">
              <h1 className="text-4xl md:text-5xl font-parry-hotter text-orange-600 dark:text-orange-400 mb-4">
                Report an Injured Dog
              </h1>
              <p className="text-lg text-orange-700 dark:text-orange-300">
                Help us identify and assist injured dogs that need immediate
                medical attention. Our AI system will verify the injury before
                activating the report.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Animal Information */}
            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-3" />
                Dog Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Remove Animal Type selection since it's dogs only */}
                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Breed
                  </label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    placeholder="e.g., Golden Retriever, Labrador, Mixed Breed"
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Name (if known)
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Dog's name (if known) or 'Unknown'"
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Estimated Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g., 3 years, 6 months, Puppy, Adult, Senior"
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Primary Color *
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Brown, Black, Golden, Mixed Colors"
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Size *
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select dog size</option>
                    <option value="very-small">
                      Very Small (under 10 lbs) - Toy breeds
                    </option>
                    <option value="small">
                      Small (10-25 lbs) - Small breeds
                    </option>
                    <option value="medium">
                      Medium (25-60 lbs) - Medium breeds
                    </option>
                    <option value="large">
                      Large (60-90 lbs) - Large breeds
                    </option>
                    <option value="very-large">
                      Very Large (over 90 lbs) - Giant breeds
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Injury Severity Level *
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="low">
                      Minor Injury - Limping, small cuts
                    </option>
                    <option value="medium">
                      Moderate Injury - Visible wounds, distress
                    </option>
                    <option value="high">
                      Severe Injury - Unable to move, heavy bleeding
                    </option>
                    <option value="critical">
                      Critical - Life-threatening condition
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe the dog's appearance, visible injuries, behavior, and any other identifying features. Include details about the injury you observed..."
                  className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Photo Upload Section */}
              <div className="mt-6">
                <FileUpload
                  onImageUpload={handleImageUpload}
                  uploadedImage={formData.animalPhoto}
                  isRequired={true}
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3" />
                Location Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Date Found/Spotted *
                  </label>
                  <input
                    type="date"
                    name="lastSeenDate"
                    value={formData.lastSeenDate}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Time Found/Spotted
                  </label>
                  <input
                    type="time"
                    name="lastSeenTime"
                    value={formData.lastSeenTime}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                  Current Location *
                </label>
                <textarea
                  name="lastSeenLocation"
                  value={formData.lastSeenLocation}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="Provide detailed location information including street address, nearby landmarks, park names, etc. Where is the injured dog currently located?"
                  className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Reporter Information */}
            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3" />
                Reporter Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="reporterName"
                    value={formData.reporterName}
                    onChange={handleInputChange}
                    required
                    placeholder="Full name"
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="reporterPhone"
                    value={formData.reporterPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="(555) 123-4567"
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="reporterEmail"
                    value={formData.reporterEmail}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    name="contactPreference"
                    value={formData.contactPreference}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3" />
                Emergency & Additional Information
              </h2>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Emergency Contact (Optional)
                  </label>
                  <input
                    type="text"
                    name="rewardAmount"
                    value={formData.rewardAmount}
                    onChange={handleInputChange}
                    placeholder="Emergency contact number or local rescue organization"
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Any other relevant information such as observed behavior, interaction with people, first aid given, etc."
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-8">
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.animalPhoto}
                  className={`px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                    !formData.animalPhoto
                      ? "bg-gray-400 cursor-not-allowed text-gray-200"
                      : "bg-orange-600 hover:bg-orange-700 text-white"
                  } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      {isCheckingInjury
                        ? "Checking if animal is injured..."
                        : "Submitting Report..."}
                    </>
                  ) : !formData.animalPhoto ? (
                    <>
                      <Camera className="w-5 h-5 mr-3" />
                      Photo Upload Required to Submit
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-3" />
                      Submit Injured Dog Report
                    </>
                  )}
                </Button>
                <p className="text-orange-700 dark:text-orange-300 mt-4 text-sm">
                  By submitting this report, you agree to share this information
                  and photo publicly to help rescue organizations locate and
                  assist the injured dog.
                  <br />
                  <strong>Note:</strong> The system will verify that the dog
                  appears injured using AI detection. Only confirmed injured
                  dogs can be reported.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportAnimalPage;
