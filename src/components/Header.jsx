import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

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
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = "unset";
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = "unset";
      if (window.lenis) window.lenis.start();
    };
  }, [isMenuOpen]);

  const scrollToTop = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
    setIsMenuOpen(false);
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      if (window.lenis) {
        window.lenis.scrollTo(contactSection, { immediate: true });
      } else {
        contactSection.scrollIntoView({ behavior: "auto" });
      }
    }
    setIsMenuOpen(false);
  };

  const scrollToWaitlist = (e) => {
    e.preventDefault();
    const timerSection = document.getElementById("timer-section");
    if (timerSection) {
      if (window.lenis) {
        window.lenis.scrollTo(timerSection, { immediate: true });
      } else {
        timerSection.scrollIntoView();
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg py-0"
          : "bg-transparent py-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              onClick={scrollToTop}
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
              onClick={scrollToTop}
              className="text-white/90 hover:text-accent transition-colors font-medium text-sm tracking-wide uppercase"
            >
              Home
            </Link>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="text-white/90 hover:text-accent transition-colors font-medium text-sm tracking-wide uppercase"
            >
              Contact
            </a>
            {!emailSubmitted && (
              <a
                href="#waitlist"
                onClick={scrollToWaitlist}
                className={`transition-all duration-300 ${
                  isScrolled
                    ? "bg-primary text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-primary"
                    : "text-white/90 hover:text-primary font-bold text-lg"
                }`}
              >
                Join Waitlist
              </a>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary focus:outline-none transition-colors p-2"
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

      {/* Mobile Menu Overlay / Backdrop */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-[45vh] z-40 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="absolute top-0 left-0 w-full px-4 h-16 flex items-center">
          <span className="text-xl font-bold text-white tracking-[0.3em]">
            NINA & DEAN
          </span>
        </div>
        <div className="flex flex-col items-center justify-center h-full space-y-6 pt-16">
          <Link
            to="/"
            className="text-xl font-light tracking-[0.2em] text-white/90 hover:text-accent transition-colors uppercase"
            onClick={scrollToTop}
          >
            Home
          </Link>
          <a
            href="#contact"
            className="text-xl font-light tracking-[0.2em] text-white/90 hover:text-accent transition-colors uppercase"
            onClick={scrollToContact}
          >
            Contact
          </a>
          {!emailSubmitted && (
            <button
              onClick={scrollToWaitlist}
              className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-white hover:text-black transition-all duration-300 mt-4 backdrop-blur-sm"
            >
              Join Waitlist
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
