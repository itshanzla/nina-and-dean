import React, { useEffect, useState } from "react";

const Loader = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const criticalImages = [
    "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,v1767684167/3_jysbbx.jpg",
    "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_1280,c_limit/v1767683466/HikaruFunnellPhotography-Nina_Dean-JanuaryUpdate-14-12-25-33-2_kw85r9.jpg",
    "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_1280,c_limit/v1767683467/2_xliwdz.jpg",
    "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_1280,c_limit/v1767697682/HikaruFunnellPhotography-Nina_Dean-JanuaryUpdate-14-12-25-32-2_tre1jn.jpg",
  ];

  useEffect(() => {
    let loadedCount = 0;
    const totalItems = criticalImages.length + 1; // Images + window load

    const updateProgress = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / totalItems) * 100);
      setProgress((prev) => Math.max(prev, currentProgress));

      if (loadedCount >= totalItems) {
        setTimeout(() => setIsExiting(true), 600);
        setTimeout(() => onFinished(), 1300);
      }
    };

    // Preload Images
    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress; // Continue even if one fails
    });

    // Final window load check
    if (document.readyState === "complete") {
      updateProgress();
    } else {
      window.addEventListener("load", updateProgress, { once: true });
    }

    // Safety fallback: if things take too long, force finish after 5s
    const fallback = setTimeout(() => {
      if (progress < 100) {
        setProgress(100);
        setIsExiting(true);
        setTimeout(() => onFinished(), 700);
      }
    }, 5000);

    return () => clearTimeout(fallback);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFF4E9] transition-all duration-1000 cubic-bezier(0.19, 1, 0.22, 1) ${
        isExiting ? "translate-y-[-100%] opacity-0" : "translate-y-0"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Brand Name */}
        <h1 className="text-3xl md:text-5xl font-bold text-[#5D4037] tracking-[0.4em] uppercase mb-12">
          NINA & DEAN
        </h1>

        {/* Progress Container */}
        <div className="w-64 md:w-80 h-[2px] bg-[#5D4037]/10 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-[#5D4037] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="flex justify-between w-64 md:w-80 mt-4 overflow-hidden h-5">
          <span
            className="text-[#5D4037]/60 text-[10px] tracking-[0.3em] font-bold uppercase transition-transform duration-700"
            style={{
              transform: isExiting ? "translateY(-100%)" : "translateY(0)",
            }}
          >
            Loading Artisanal Experience
          </span>
          <span
            className="text-[#5D4037] text-[10px] tracking-[0.2em] font-bold transition-transform duration-700"
            style={{
              transform: isExiting ? "translateY(-100%)" : "translateY(0)",
            }}
          >
            {progress}%
          </span>
        </div>

        {/* Visual Decoration */}
        <div className="absolute -z-10 w-[500px] h-[500px] bg-white/30 rounded-full blur-[100px] animate-pulse" />
      </div>
    </div>
  );
};

export default Loader;
