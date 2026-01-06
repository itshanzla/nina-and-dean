import React, { useEffect, useState } from "react";

const Loader = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 500);
          setTimeout(() => onFinished(), 1200);
          return 100;
        }
        // Random increment for a more "realistic" feel
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFF4E9] transition-all duration-700 ease-in-out ${
        isExiting ? "translate-y-[-100%] opacity-0" : "translate-y-0"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Brand Name */}
        <h1 className="text-3xl md:text-5xl font-bold text-[#5D4037] tracking-[0.4em] uppercase mb-12 animate-pulse">
          NINA & DEAN
        </h1>

        {/* Progress Container */}
        <div className="w-64 md:w-80 h-[1px] bg-[#5D4037]/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#5D4037] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <span className="mt-4 text-[#5D4037]/60 text-xs tracking-[0.2em] font-medium">
          {Math.min(progress, 100)}%
        </span>

        {/* Visual Decoration */}
        <div className="absolute -z-10 w-96 h-96 bg-white/40 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Loader;
