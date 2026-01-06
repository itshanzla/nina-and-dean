import React, { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    img: "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_1280,c_limit/v1767683466/HikaruFunnellPhotography-Nina_Dean-JanuaryUpdate-14-12-25-33-2_kw85r9.jpg",
    title: "January editions",
    sub: "Vanilla Hojicha Latte",
    pos: "md:object-[90%_95%]",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_1280,c_limit/v1767683467/2_xliwdz.jpg",
    title: "January editions",
    sub: "brown sugar shaken iced latte",
    pos: "md:object-[90%_95%]",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_1280,c_limit/v1767697682/HikaruFunnellPhotography-Nina_Dean-JanuaryUpdate-14-12-25-32-2_tre1jn.jpg",
    title: "January editions",
    sub: "choc chip cookie matcha",
    pos: "object-top md:object-[90%_75%]",
  },
];

const Transition = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const INTERVAL_DURATION = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };

  return (
    <div
      id="transition-section"
      className="relative h-[100dvh] w-full overflow-hidden isolate transform-gpu perspective-1000 bg-black"
    >
      <style>
        {`
          @keyframes progress-animation {
            from { stroke-dashoffset: 87.96; }
            to { stroke-dashoffset: 0; }
          }
          .animate-progress {
            animation: progress-animation ${INTERVAL_DURATION}ms linear forwards;
            transform: translate3d(0,0,0);
          }
        `}
      </style>

      {/* Indicators */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 flex gap-8 items-center px-8 py-5 bg-black/20 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/30 transition-all duration-500 hover:scale-105 group/indicator pointer-events-auto">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="group relative flex items-center justify-center w-2 h-2 focus:outline-none"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`w-full h-full rounded-full transition-all duration-500 ${
                currentIndex === i
                  ? "bg-white scale-125"
                  : "bg-white/20 group-hover:bg-white/60"
              }`}
            />
            {currentIndex === i && (
              <svg className="absolute w-8 h-8 -rotate-90 pointer-events-none transform-gpu">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="87.96"
                  strokeDashoffset="87.96"
                  strokeLinecap="round"
                  className="animate-progress"
                />
              </svg>
            )}
            <div className="absolute -inset-4 rounded-full cursor-pointer" />
          </button>
        ))}
      </div>

      {slides.map((slide, index) => {
        const isActive = currentIndex === index;
        const isPrevious = prevIndex === index;

        return (
          <section
            key={slide.id}
            className={`absolute inset-0 flex items-center justify-center overflow-hidden transition-opacity duration-1000 ease-in-out transform-gpu backface-hidden will-change-opacity ${
              isActive
                ? "opacity-100 z-20 visible"
                : isPrevious
                ? "opacity-100 z-10 visible"
                : "opacity-0 z-0 invisible"
            }`}
          >
            <div className="absolute inset-0 transform-gpu pointer-events-none">
              <img
                src={slide.img}
                alt=""
                loading="eager"
                decoding="async"
                className={`w-full h-full object-cover object-center translate-z-0 ${slide.pos}`}
              />
            </div>

            <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full pointer-events-none">
              <div className="absolute top-[30%] 2xl:left-[70%] 2xl:top-[50%] xl:left-[70%] lg:left-[60%] lg:top-[30%] md:top-[30%] md:left-[40%] left-[0%] right-0 lg:right-8 transform -translate-y-1/2 uppercase">
                <div className="text-center">
                  <h1 className="text-white/95 font-bold md:font-medium text-4xl lg:text-5xl uppercase tracking-[0.2em] translate-z-0">
                    {slide.title}
                  </h1>
                  <p className="text-white/90 mt-6 font-bold md:font-normal text-2xl lg:text-3xl leading-tight tracking-[0.1em] translate-z-0">
                    {slide.sub}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Transition;
