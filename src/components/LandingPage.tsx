"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-amber-900/20 overflow-hidden relative pt-24">
        {/* Added pt-24 for navbar spacing */}
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
          <div className="text-center backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl p-12 max-w-5xl mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-parry-hotter text-orange-400 dark:text-orange-300 mb-6 relative z-10">
                  Paw Alert
                </h1>
                <div className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-parry-hotter text-orange-400/20 dark:text-orange-300/20 blur-sm transform translate-x-2 translate-y-2">
                  Paw Alert
                </div>
              </div>
              <p className="text-xl md:text-2xl text-orange-700 dark:text-orange-200 font-medium max-w-3xl mx-auto leading-relaxed">
                A comprehensive crisis-response ecosystem for street animal
                welfare. Bridging the gap between public compassion and
                effective rescue action.
              </p>
              <div className="bg-orange-100/50 dark:bg-orange-900/30 rounded-2xl p-6 mx-auto max-w-2xl backdrop-blur-sm border border-orange-200/50 dark:border-orange-700/30">
                <p className="text-orange-800 dark:text-orange-200 font-medium">
                  <span className="font-bold">200M+</span> street animals
                  worldwide need our help. Paw Alert transforms how we report,
                  verify, and rescue animals in distress.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <Link
                  href="/report"
                  className="group px-8 py-4 bg-gradient-to-r from-orange-400 to-amber-400 text-white font-semibold rounded-2xl shadow-lg backdrop-blur-sm border border-white/20 hover:from-orange-500 hover:to-amber-500 transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <span className="flex items-center space-x-2">
                    <span>Report an Animal</span>
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </span>
                </Link>
                <button className="px-8 py-4 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-2xl text-orange-700 dark:text-orange-200 font-semibold hover:bg-white/30 dark:hover:bg-black/30 transform hover:scale-105 transition-all duration-300">
                  Join as NGO Partner
                </button>
              </div>
            </div>
          </div>

          {/* Core System Features */}
          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* AI-Powered Verification */}
            <div className="group backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="text-center space-y-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-orange-700 dark:text-orange-200">
                  AI Verification
                </h3>
                <p className="text-sm text-orange-600 dark:text-orange-300 leading-relaxed">
                  Multi-layer verification using deepfake detection, image
                  analysis, and metadata validation
                </p>
              </div>
            </div>

            {/* Mission Control Dashboard */}
            <div className="group backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="text-center space-y-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
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
                <h3 className="text-lg font-bold text-orange-700 dark:text-orange-200">
                  Mission Control
                </h3>
                <p className="text-sm text-orange-600 dark:text-orange-300 leading-relaxed">
                  Professional dispatch dashboard with real-time mapping and
                  case management
                </p>
              </div>
            </div>

            {/* Paw Patrol Community */}
            <div className="group backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="text-center space-y-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-orange-700 dark:text-orange-200">
                  Paw Patrol
                </h3>
                <p className="text-sm text-orange-600 dark:text-orange-300 leading-relaxed">
                  Gamified volunteer platform with badges, leaderboards, and
                  community support
                </p>
              </div>
            </div>

            {/* Blockchain Trust */}
            <div className="group backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="text-center space-y-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-orange-700 dark:text-orange-200">
                  Chain of Trust
                </h3>
                <p className="text-sm text-orange-600 dark:text-orange-300 leading-relaxed">
                  Blockchain-powered transparency for donations and rescue
                  tracking
                </p>
              </div>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-xl max-w-5xl mx-auto">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-700 dark:text-orange-200">
                The Crisis We're Solving
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-rose-400 rounded-full flex items-center justify-center mx-auto">
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
                  <h4 className="font-bold text-orange-700 dark:text-orange-200">
                    Discovery Gap
                  </h4>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    Injured animals go unnoticed or unreported due to lack of
                    clear reporting channels
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto">
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
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-orange-700 dark:text-orange-200">
                    Coordination Gap
                  </h4>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    NGOs struggle with information overload and inefficient
                    resource dispatch
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-orange-700 dark:text-orange-200">
                    Trust Gap
                  </h4>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    Fake rescue content and lack of transparency erode trust
                    between public and NGOs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Urban Oasis Initiative */}
          <div className="backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 dark:from-black/10 dark:to-black/5 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-xl text-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-orange-700 dark:text-orange-200">
                  Urban Oasis Initiative
                </h2>
              </div>
              <p className="text-lg text-orange-600 dark:text-orange-300 max-w-3xl mx-auto leading-relaxed">
                Smart IoT feeding stations that provide proactive care while
                collecting valuable data on street animal populations and
                movement patterns.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-orange-500">📊</div>
                  <h4 className="font-semibold text-orange-700 dark:text-orange-200">
                    Data Collection
                  </h4>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    Motion sensors track animal visits and feeding patterns
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-amber-500">🔧</div>
                  <h4 className="font-semibold text-orange-700 dark:text-orange-200">
                    Smart Maintenance
                  </h4>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    Automated alerts when stations need refilling or repairs
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-500">🎯</div>
                  <h4 className="font-semibold text-orange-700 dark:text-orange-200">
                    Targeted Interventions
                  </h4>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    Data drives strategic sterilization and vaccination
                    campaigns
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-xl max-w-5xl mx-auto transform hover:scale-105 transition-all duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 group-hover:scale-110 transition-transform duration-300">
                  200M+
                </div>
                <div className="text-orange-600 dark:text-orange-300 font-medium">
                  Street Animals
                </div>
              </div>
              <div className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold text-amber-500 group-hover:scale-110 transition-transform duration-300">
                  99.9%
                </div>
                <div className="text-orange-600 dark:text-orange-300 font-medium">
                  Verification Accuracy
                </div>
              </div>
              <div className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-orange-600 dark:text-orange-300 font-medium">
                  Crisis Response
                </div>
              </div>
              <div className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold text-green-500 group-hover:scale-110 transition-transform duration-300">
                  100%
                </div>
                <div className="text-orange-600 dark:text-orange-300 font-medium">
                  Transparent
                </div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-xl max-w-6xl mx-auto">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-orange-700 dark:text-orange-200">
                API-First Architecture
              </h2>
              <p className="text-lg text-orange-600 dark:text-orange-300 max-w-3xl mx-auto">
                Leveraging best-in-class APIs instead of building from scratch,
                enabling rapid development and enterprise-grade reliability.
              </p>
              <div className="grid md:grid-cols-4 gap-6 mt-8">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-orange-700 dark:text-orange-200">
                    Google Vision API
                  </h4>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    Animal detection & image analysis
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-orange-700 dark:text-orange-200">
                    Deepfake Detection
                  </h4>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    AI-powered authenticity verification
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-orange-700 dark:text-orange-200">
                    Blockchain Ledger
                  </h4>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    Immutable rescue tracking
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-orange-700 dark:text-orange-200">
                    IoT Integration
                  </h4>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    Smart feeding station network
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 dark:from-black/10 dark:to-black/5 border border-white/20 dark:border-white/10 rounded-3xl p-12 shadow-xl text-center max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-700 dark:text-orange-200 mb-4">
              Join the Animal Rescue Revolution
            </h2>
            <p className="text-lg text-orange-600 dark:text-orange-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Be part of a comprehensive ecosystem that transforms public
              compassion into effective rescue action. Together, we can close
              the gaps that leave 200 million street animals vulnerable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group px-12 py-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-orange-500 hover:via-amber-500 hover:to-yellow-500">
                <span className="flex items-center space-x-2">
                  <span>Start Reporting</span>
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
              <button className="px-8 py-4 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-2xl text-orange-700 dark:text-orange-200 font-semibold hover:bg-white/30 dark:hover:bg-black/30 transform hover:scale-105 transition-all duration-300">
                Partner with Us
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-8 text-sm text-orange-600 dark:text-orange-300">
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>✨ No cost to report</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>🔒 Fully transparent</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>🚀 Instant verification</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-orange-600 dark:text-orange-300">
            <p className="text-sm">
              © 2025 Paw Alert. From concept to crisis-response ecosystem. Made
              with ❤️ for every street animal.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
