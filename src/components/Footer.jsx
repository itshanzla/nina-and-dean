import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (e, hash = null) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate(hash ? `/${hash}` : "/");
    } else if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "auto" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-[#FFF4E9] text-[#5D4037] pt-20 pb-10 border-t border-[#f8dbc0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-12 gap-y-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-2">
            <Link
              to="/"
              onClick={(e) => handleNavigation(e)}
              className="text-3xl font-bold tracking-[0.2em] uppercase mb-6 block"
            >
              NINA & DEAN
            </Link>
            <p className="text-[#5D4037]/80 max-w-sm leading-relaxed text-lg">
              Highly rated, cool coffee bars for commercial spaces.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/menu"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  Our Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/#transition-section"
                  onClick={(e) => handleNavigation(e, "#transition-section")}
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  2026 Editions
                </Link>
              </li>
              <li>
                <Link
                  to="/#timer-section"
                  onClick={(e) => handleNavigation(e, "#timer-section")}
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  The App
                </Link>
              </li>
              <li>
                <a
                  href="https://maps.apple.com/?address=77%20Marsh%20Wall,%20London,%20E14%209SH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  Location
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/#contact"
                  onClick={(e) => handleNavigation(e, "#contact")}
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  onClick={(e) => handleNavigation(e, "#contact")}
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  Work With Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[#5D4037]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#5D4037]/60 text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} NINA & DEAN. All rights
            reserved.
          </p>

          <div className="flex space-x-8">
            <a
              href="#"
              className="hover:opacity-60 transition-opacity uppercase tracking-[0.1em] text-xs font-bold"
            >
              Instagram
            </a>
            <a
              href="#"
              className="hover:opacity-60 transition-opacity uppercase tracking-[0.1em] text-xs font-bold"
            >
              TikTok
            </a>
            <a
              href="#"
              className="hover:opacity-60 transition-opacity uppercase tracking-[0.1em] text-xs font-bold"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
