"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import WebcamCaptureSimple from "./WebcamCaptureSimple";
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
    animalType: "",
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

  useEffect(() => {
    setMounted(true);
  }, []);

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

    // Check if photo is captured (mandatory)
    if (!formData.animalPhoto) {
      alert(
        "Please capture a photo of the animal before submitting the report."
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        animalType: "",
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
  };

  const handleImageCapture = (imageData: string) => {
    setFormData((prev) => ({
      ...prev,
      animalPhoto: imageData,
    }));
  };

  if (!mounted) return null;

  if (submitSuccess) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20 pt-24">
          <div className="max-w-2xl mx-auto p-6">
            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-12 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
                Report Submitted Successfully!
              </h1>
              <p className="text-lg text-green-700 dark:text-green-300 mb-8">
                Thank you for reporting. Your animal report has been received
                and will be shared with the community to help with the search.
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
                Report a Missing Animal
              </h1>
              <p className="text-lg text-orange-700 dark:text-orange-300">
                Help us spread the word about your missing pet. The more details
                you provide, the better we can help reunite you.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Animal Information */}
            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-3" />
                Animal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Animal Type *
                  </label>
                  <select
                    name="animalType"
                    value={formData.animalType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select animal type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="hamster">Hamster</option>
                    <option value="guinea-pig">Guinea Pig</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Breed
                  </label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    placeholder="e.g., Golden Retriever, Persian Cat"
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Pet's name"
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g., 3 years, 6 months"
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
                    placeholder="e.g., Brown, Black and White"
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
                    <option value="">Select size</option>
                    <option value="very-small">
                      Very Small (under 10 lbs)
                    </option>
                    <option value="small">Small (10-25 lbs)</option>
                    <option value="medium">Medium (25-60 lbs)</option>
                    <option value="large">Large (60-90 lbs)</option>
                    <option value="very-large">Very Large (over 90 lbs)</option>
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

                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Urgency Level *
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="low">Low - Missing for over a week</option>
                    <option value="medium">
                      Medium - Missing for 1-7 days
                    </option>
                    <option value="high">
                      High - Missing less than 24 hours
                    </option>
                    <option value="critical">
                      Critical - Animal needs medical attention
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
                  placeholder="Describe your pet's appearance, distinctive markings, personality, and any other identifying features..."
                  className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Photo Capture Section */}
              <div className="mt-6">
                <WebcamCaptureSimple
                  onImageCapture={handleImageCapture}
                  capturedImage={formData.animalPhoto}
                  isRequired={true}
                />
              </div>
            </div>

            {/* Last Seen Information */}
            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3" />
                Last Seen Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Last Seen Date *
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
                    Last Seen Time
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
                  Last Seen Location *
                </label>
                <textarea
                  name="lastSeenLocation"
                  value={formData.lastSeenLocation}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="Provide detailed location information including street address, nearby landmarks, park names, etc."
                  className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3" />
                Contact Information
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
                Additional Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                    Reward Amount (Optional)
                  </label>
                  <input
                    type="text"
                    name="rewardAmount"
                    value={formData.rewardAmount}
                    onChange={handleInputChange}
                    placeholder="e.g., $500, No questions asked"
                    className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-orange-700 dark:text-orange-300 font-medium mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Any other relevant information such as medical conditions, favorite treats, behavioral notes, etc."
                  className="w-full p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
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
                      Submitting Report...
                    </>
                  ) : !formData.animalPhoto ? (
                    <>
                      <Camera className="w-5 h-5 mr-3" />
                      Photo Required to Submit
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-3" />
                      Submit Missing Pet Report
                    </>
                  )}
                </Button>
                <p className="text-orange-700 dark:text-orange-300 mt-4 text-sm">
                  By submitting this report, you agree to share this information
                  and photo publicly to help find your pet.
                  <br />
                  <strong>Note:</strong> A photo is required to submit the
                  report.
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
