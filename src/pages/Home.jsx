import React, { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Transition from "../components/Transition";
import Touch from "../components/Touch";
import Lenis from "lenis";
import Timer from "../components/Timer";
import { Toaster } from "react-hot-toast";

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Balanced smoothness (5 was too slow/laggy)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly reduce scroll speed
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Set lenis as a global object so Header/Footer can use it to scroll
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Toaster />
      <Header />
      <main className="flex-grow">
        <Hero />
        <Transition />
        <Timer />
        <Touch />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
