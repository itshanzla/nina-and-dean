import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Transition from "../components/Transition";
import Touch from "../components/Touch";
import Timer from "../components/Timer";
import { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Handle scroll after loading is done
  useEffect(() => {
    if (isLoading) return;

    // Check for hash in URL (e.g., /#contact)
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "auto" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [isLoading, location.hash]);

  return (
    <div
      className={`min-h-screen bg-white ${isLoading ? "overflow-hidden" : ""}`}
    >
      {isLoading && <Loader onFinished={() => setIsLoading(false)} />}
      <Toaster />
      <Header />
      <main className="relative z-0">
        <Hero />
        <div className="-mt-[1px]">
          <Transition />
        </div>
        <div className="-mt-[1px]">
          <Timer />
        </div>
        <div className="-mt-[1px]">
          <Touch />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
