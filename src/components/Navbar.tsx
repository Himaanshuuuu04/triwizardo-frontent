"use client";

import { useState, useEffect } from "react";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-white/10 shadow-xl"
          : "backdrop-blur-sm bg-white/5 dark:bg-black/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-400 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-parry-hotter text-orange-400 dark:text-orange-300">
                Paw Alert
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-100 font-medium transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-100 font-medium transition-colors duration-300"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-100 font-medium transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-100 font-medium transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 text-orange-700 dark:text-orange-200 hover:bg-white/30 dark:hover:bg-black/30 transform hover:scale-105 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
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
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="px-4 py-2 text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-100 font-medium transition-colors duration-300">
                Sign In
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-orange-400 to-amber-400 text-white font-semibold rounded-xl shadow-lg backdrop-blur-sm border border-white/20 hover:from-orange-500 hover:to-amber-500 transform hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 text-orange-700 dark:text-orange-200 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
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
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-b-2xl mt-2 shadow-xl">
            <div className="flex flex-col space-y-4 px-4">
              <a
                href="#features"
                className="text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-100 font-medium py-2 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-100 font-medium py-2 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-100 font-medium py-2 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-100 font-medium py-2 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>

              <div className="border-t border-white/20 dark:border-white/10 pt-4 mt-4 space-y-3">
                <button className="w-full text-left text-orange-700 dark:text-orange-200 hover:text-orange-500 dark:hover:text-orange-100 font-medium py-2 transition-colors duration-300">
                  Sign In
                </button>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-400 to-amber-400 text-white font-semibold rounded-xl shadow-lg backdrop-blur-sm border border-white/20 hover:from-orange-500 hover:to-amber-500 transform hover:scale-105 transition-all duration-300">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notification Banner (Optional) */}
      {isScrolled && (
        <div className="absolute top-full left-0 right-0 bg-gradient-to-r from-orange-400/10 to-amber-400/10 backdrop-blur-sm border-b border-white/10 px-4 py-2 text-center">
          <p className="text-sm text-orange-700 dark:text-orange-200">
            🎉 <span className="font-medium">Limited Time:</span> Get 30% off
            your first year with code{" "}
            <span className="font-bold">PAWSAFE30</span>
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
