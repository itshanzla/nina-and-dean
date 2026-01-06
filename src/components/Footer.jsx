import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
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
  };

  return (
    <footer className="bg-[#FFF4E9] text-[#5D4037] pt-20 pb-10 border-t border-[#f8dbc0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-12 gap-y-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-2">
            <Link
              to="/"
              onClick={scrollToTop}
              className="text-3xl font-bold tracking-[0.2em] uppercase mb-6 block"
            >
              NINA & DEAN
            </Link>
            <p className="text-[#5D4037]/80 max-w-sm leading-relaxed text-lg italic">
              "Crafting artisanal coffee and matcha experiences that linger in
              the soul. Every cup tells a story of January editions and vanilla
              dreams."
            </p>
          </div>

          {/* Experience Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 opacity-60">
              Experience
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  Our Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  January Editions
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  The App
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 opacity-60">
              In Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  onClick={scrollToContact}
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[#5D4037]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#5D4037]/60 text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} NINA & DEAN Artisanal. All rights
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
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
