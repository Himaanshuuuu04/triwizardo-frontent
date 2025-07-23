"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";

const LandingPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-amber-900/20 overflow-hidden relative pt-16 lg:pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl animate-pulse opacity-60"></div>
          <div
            className="absolute top-40 right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse opacity-60"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-200/25 rounded-full blur-3xl animate-pulse opacity-60"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl animate-pulse opacity-40"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 space-y-12">
          {/* Hero Section */}
          <div
            id="hero"
            className="text-center backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
          >
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-parry-hotter text-orange-400 dark:text-orange-300 mb-6 relative z-10">
                  Paw Alert
                </h1>
                <div className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-parry-hotter text-orange-400/20 dark:text-orange-300/20 blur-sm transform translate-x-2 translate-y-2">
                  Paw Alert
                </div>
              </div>
              <p className="text-xl md:text-2xl text-orange-700 dark:text-orange-200 font-medium max-w-2xl mx-auto leading-relaxed">
                Keeping your furry friends safe with intelligent pet monitoring
                and instant alerts
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <button className="group px-8 py-4 bg-gradient-to-r from-orange-400 to-amber-400 text-white font-semibold rounded-2xl shadow-lg backdrop-blur-sm border border-white/20 hover:from-orange-500 hover:to-amber-500 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <span className="flex items-center space-x-2">
                    <span>Get Started</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>
                <button className="px-8 py-4 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-2xl text-orange-700 dark:text-orange-200 font-semibold hover:bg-white/30 dark:hover:bg-black/30 transform hover:scale-105 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div
            id="features"
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {/* Real-time Monitoring */}
            <div className="group backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-orange-700 dark:text-orange-200">
                  Real-time Monitoring
                </h3>
                <p className="text-orange-600 dark:text-orange-300 leading-relaxed">
                  24/7 surveillance with AI-powered pet detection and behavior
                  analysis
                </p>
              </div>
            </div>

            {/* Instant Alerts */}
            <div className="group backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-orange-700 dark:text-orange-200">
                  Instant Alerts
                </h3>
                <p className="text-orange-600 dark:text-orange-300 leading-relaxed">
                  Get notified immediately when your pet needs attention or
                  shows unusual behavior
                </p>
              </div>
            </div>

            {/* Smart Analytics */}
            <div className="group backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-orange-700 dark:text-orange-200">
                  Smart Analytics
                </h3>
                <p className="text-orange-600 dark:text-orange-300 leading-relaxed">
                  Detailed insights into your pet's health, activity patterns,
                  and wellness trends
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-xl max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 group-hover:scale-110 transition-transform duration-300">
                  10K+
                </div>
                <div className="text-orange-600 dark:text-orange-300 font-medium">
                  Happy Pets
                </div>
              </div>
              <div className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold text-amber-500 group-hover:scale-110 transition-transform duration-300">
                  99.9%
                </div>
                <div className="text-orange-600 dark:text-orange-300 font-medium">
                  Uptime
                </div>
              </div>
              <div className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-orange-600 dark:text-orange-300 font-medium">
                  Monitoring
                </div>
              </div>
              <div className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 group-hover:scale-110 transition-transform duration-300">
                  5000+
                </div>
                <div className="text-orange-600 dark:text-orange-300 font-medium">
                  Alerts Sent
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div
            id="pricing"
            className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-xl max-w-5xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-700 dark:text-orange-200 mb-4">
                Simple Pricing
              </h2>
              <p className="text-lg text-orange-600 dark:text-orange-300">
                Choose the perfect plan for your furry family
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="backdrop-blur-sm bg-white/5 dark:bg-black/5 border border-white/10 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold text-orange-700 dark:text-orange-200 mb-2">
                  Basic
                </h3>
                <div className="text-3xl font-bold text-orange-500 mb-4">
                  $9
                  <span className="text-lg text-orange-600 dark:text-orange-300">
                    /mo
                  </span>
                </div>
                <ul className="text-orange-600 dark:text-orange-300 space-y-2 mb-6">
                  <li>✓ 1 Pet Monitor</li>
                  <li>✓ Basic Alerts</li>
                  <li>✓ Mobile App</li>
                </ul>
                <button className="w-full px-4 py-2 border border-orange-400 text-orange-700 dark:text-orange-200 rounded-xl hover:bg-orange-400/10 transition-all duration-300">
                  Get Started
                </button>
              </div>
              <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 dark:from-black/10 dark:to-black/5 border border-orange-400/30 rounded-2xl p-6 text-center transform scale-105 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-400 to-amber-400 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Popular
                </div>
                <h3 className="text-xl font-bold text-orange-700 dark:text-orange-200 mb-2">
                  Pro
                </h3>
                <div className="text-3xl font-bold text-orange-500 mb-4">
                  $19
                  <span className="text-lg text-orange-600 dark:text-orange-300">
                    /mo
                  </span>
                </div>
                <ul className="text-orange-600 dark:text-orange-300 space-y-2 mb-6">
                  <li>✓ 3 Pet Monitors</li>
                  <li>✓ Advanced AI Alerts</li>
                  <li>✓ Health Analytics</li>
                  <li>✓ 24/7 Support</li>
                </ul>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-400 text-white rounded-xl hover:from-orange-500 hover:to-amber-500 transition-all duration-300">
                  Get Started
                </button>
              </div>
              <div className="backdrop-blur-sm bg-white/5 dark:bg-black/5 border border-white/10 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold text-orange-700 dark:text-orange-200 mb-2">
                  Premium
                </h3>
                <div className="text-3xl font-bold text-orange-500 mb-4">
                  $39
                  <span className="text-lg text-orange-600 dark:text-orange-300">
                    /mo
                  </span>
                </div>
                <ul className="text-orange-600 dark:text-orange-300 space-y-2 mb-6">
                  <li>✓ Unlimited Monitors</li>
                  <li>✓ Vet Integration</li>
                  <li>✓ Custom Reports</li>
                  <li>✓ Priority Support</li>
                </ul>
                <button className="w-full px-4 py-2 border border-orange-400 text-orange-700 dark:text-orange-200 rounded-xl hover:bg-orange-400/10 transition-all duration-300">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-xl max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-orange-700 dark:text-orange-200">
                  Vet Approved
                </h4>
                <p className="text-sm text-orange-600 dark:text-orange-300">
                  Recommended by veterinarians nationwide
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-orange-700 dark:text-orange-200">
                  Secure & Private
                </h4>
                <p className="text-sm text-orange-600 dark:text-orange-300">
                  End-to-end encryption for all your data
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-orange-700 dark:text-orange-200">
                  Money Back
                </h4>
                <p className="text-sm text-orange-600 dark:text-orange-300">
                  30-day satisfaction guarantee
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div
            id="contact"
            className="backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 dark:from-black/10 dark:to-black/5 border border-white/20 dark:border-white/10 rounded-3xl p-12 shadow-xl text-center max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-700 dark:text-orange-200 mb-4">
              Ready to keep your pets safe?
            </h2>
            <p className="text-lg text-orange-600 dark:text-orange-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of pet owners who trust Paw Alert to keep their
              furry family members safe and healthy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group px-12 py-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-orange-500 hover:via-amber-500 hover:to-yellow-500">
                <span className="flex items-center space-x-2">
                  <span>Start Your Free Trial</span>
                  <svg
                    className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </span>
              </button>
              <div className="text-sm text-orange-600 dark:text-orange-300">
                <p>✨ No credit card required</p>
                <p>🐾 Setup in under 5 minutes</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-orange-600 dark:text-orange-300">
            <p className="text-sm">
              © 2025 Paw Alert. Made with ❤️ for pet lovers everywhere.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
