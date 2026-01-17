import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkEmail = () => {
      const storedEmail = localStorage.getItem("ninaAndDeanEmail");
      if (storedEmail) {
        setEmailSubmitted(true);
      }
    };
    checkEmail();

    // Add an event listener to check for storage changes (in case of submission)
    window.addEventListener("storage", checkEmail);
    // Custom check for when we are in the same tab
    const interval = setInterval(checkEmail, 1000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkEmail);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      const mainContent = document.querySelector("main");
      if (mainContent) mainContent.style.filter = "blur(8px)";
    } else {
      document.body.style.overflow = "unset";
      const mainContent = document.querySelector("main");
      if (mainContent) mainContent.style.filter = "none";
    }
    return () => {
      document.body.style.overflow = "unset";
      const mainContent = document.querySelector("main");
      if (mainContent) mainContent.style.filter = "none";
    };
  }, [isMenuOpen]);

  const handleNavigation = (e, hash = null) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname !== "/") {
      // Navigate to home, with optional hash
      navigate(hash ? `/${hash}` : "/");
    } else if (hash) {
      // Already on home, just scroll to section
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "auto" });
      }
    } else {
      // Scroll to top
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 z-[60] transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md shadow-lg py-0"
            : "bg-transparent py-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center relative z-[70]">
              <Link
                to="/"
                onClick={(e) => handleNavigation(e)}
                className={`font-bold transition-all duration-300 ${
                  isScrolled ? "text-xl md:text-2xl" : "text-xl md:text-3xl"
                } text-white tracking-[0.3em]`}
              >
                NINA & DEAN
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link
                to="/"
                onClick={(e) => handleNavigation(e)}
                className="text-white/90 hover:text-primary transition-colors font-medium text-sm tracking-wide uppercase"
              >
                Home
              </Link>
              <Link
                to="/#contact"
                onClick={(e) => handleNavigation(e, "#contact")}
                className="text-white/90 hover:text-primary transition-colors font-medium text-sm tracking-wide uppercase"
              >
                Contact
              </Link>
              {!emailSubmitted && (
                <Link
                  to="/#timer-section"
                  onClick={(e) => handleNavigation(e, "#timer-section")}
                  className={`transition-all duration-300 ${
                    isScrolled
                      ? "bg-primary text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-primary"
                      : "text-white/90 hover:text-primary font-bold text-lg"
                  }`}
                >
                  Join Waitlist
                </Link>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center relative z-[80]">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-primary focus:outline-none transition-all p-2 active:scale-90"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay / Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-[50vh] z-50 bg-black/95 border-b border-white/10 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 pt-12">
          <Link
            to="/"
            className="text-2xl font-light tracking-[0.3em] text-white/90 hover:text-primary transition-colors uppercase"
            onClick={(e) => handleNavigation(e)}
          >
            Home
          </Link>
          <Link
            to="/#contact"
            className="text-2xl font-light tracking-[0.3em] text-white/90 hover:text-primary transition-colors uppercase"
            onClick={(e) => handleNavigation(e, "#contact")}
          >
            Contact
          </Link>
          {!emailSubmitted && (
            <Link
              to="/#timer-section"
              onClick={(e) => handleNavigation(e, "#timer-section")}
              className="bg-white text-black px-10 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-bold hover:bg-accent transition-all duration-300 mt-4 shadow-xl"
            >
              Join Waitlist
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
