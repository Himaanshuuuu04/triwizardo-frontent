"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/20 dark:bg-black/20 border-b border-white/20 dark:border-white/10 shadow-lg"
          : "backdrop-blur-sm bg-white/10 dark:bg-black/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-amber-400 rounded-xl flex items-center justify-center shadow-lg">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-parry-hotter text-orange-600 dark:text-orange-300">
                Paw Alert
              </h1>
              <p className="text-xs text-orange-500 dark:text-orange-400 font-medium">
                Crisis Response
              </p>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-300 font-medium transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#technology"
              className="text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-300 font-medium transition-colors duration-300"
            >
              Technology
            </a>
            <a
              href="#urban-oasis"
              className="text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-300 font-medium transition-colors duration-300"
            >
              Urban Oasis
            </a>
            <a
              href="#mission-control"
              className="text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-300 font-medium transition-colors duration-300"
            >
              Dashboard
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Emergency Report Button */}
            <button className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300">
              <svg
                className="w-4 h-4 animate-pulse"
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
              <span className="hidden sm:inline">Emergency</span>
            </button>

            {/* Report Animal Button */}
            <Link
              href="/report"
              className="group flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-orange-400 to-amber-400 text-white font-semibold rounded-xl shadow-lg hover:from-orange-500 hover:to-amber-500 transform hover:scale-105 transition-all duration-300"
            >
              <svg
                className="w-4 h-4"
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
              <span>Report</span>
            </Link>

            {/* NGO Login */}
            <button className="hidden lg:flex items-center space-x-2 px-4 py-2 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-xl text-orange-700 dark:text-orange-200 font-medium hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>NGO Login</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-lg text-orange-700 dark:text-orange-200">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div
          className={`mt-4 transition-all duration-500 ${
            isScrolled
              ? "opacity-0 max-h-0 overflow-hidden"
              : "opacity-100 max-h-20"
          }`}
        >
          <div className="flex items-center justify-center space-x-8 text-sm text-orange-600 dark:text-orange-300">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
            <div className="hidden sm:flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>99.9% Verification Accuracy</span>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Blockchain Verified</span>
            </div>
            <div className="hidden lg:flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>AI-Powered Detection</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
