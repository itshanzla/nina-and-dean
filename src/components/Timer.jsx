import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

const Timer = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Formik setup for email form
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      localStorage.setItem("ninaAndDeanEmail", values.email);
      setEmailSubmitted(true);

      // Trigger optimized confetti celebration
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });

      toast.success("Thank you! You'll be notified when the app launches.", {
        duration: 4000,
        position: "top-center",
        icon: null,
        style: {
          background: "#5D4037",
          color: "#fff",
        },
      });
    },
  });

  useEffect(() => {
    // Check if email was already submitted
    const storedEmail = localStorage.getItem("ninaAndDeanEmail");
    if (storedEmail) {
      setEmailSubmitted(true);
    }
  }, []);

  useEffect(() => {
    if (!emailSubmitted) return;

    const calculateCountdown = () => {
      const launchDate = new Date("2026-01-12T12:00:00Z");
      const now = new Date();
      const difference = launchDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [emailSubmitted]);

  return (
    <section
      id="timer-section"
      className="relative h-[100dvh] md:min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto/v1767697682/HikaruFunnellPhotography-Nina_Dean-JanuaryUpdate-14-12-25-32-2_tre1jn.jpg"
          alt="Nina and Dean"
          loading="lazy"
          className="w-full h-full object-cover object-top md:object-[90%_75%]"
        />
      </div>

      <div className="relative bottom-[5%] md:bottom-[5%] z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white/90 font-bold text-3xl md:text-7xl tracking-[0.5em] uppercase">
            NINA & DEAN APP
          </h1>
          <p className="text-white/90 mt-10 text-sm md:text-3xl font-normal mx-auto">
            Order ahead, earn rewards, get exclusive promotions. Be the first to
            know.
          </p>

          {/* Email Form or Countdown Timer */}
          <div className="mt-12">
            {!emailSubmitted ? (
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-full max-w-md">
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your email"
                    className="px-6 py-3 w-full bg-white/70 backdrop-blur-sm border border-white/30 rounded-full text-black placeholder-black focus:outline-none focus:border-white/60 transition-colors"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-400 text-sm mt-2 text-left px-2">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-10 py-3 bg-white text-[#5D4037] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm hover:bg-white/90 transition-colors"
                >
                  Notify Me
                </button>
              </form>
            ) : (
              <div className="text-white/90">
                <p className="text-lg md:text-2xl font-semibold mb-6">
                  Launching in:
                </p>
                <div className="flex justify-center gap-4 md:gap-8">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl md:text-6xl font-bold">
                      {countdown.days}
                    </span>
                    <span className="text-xs md:text-sm uppercase tracking-wider mt-2">
                      Days
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl md:text-6xl font-bold">
                      {countdown.hours}
                    </span>
                    <span className="text-xs md:text-sm uppercase tracking-wider mt-2">
                      Hours
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl md:text-6xl font-bold">
                      {countdown.minutes}
                    </span>
                    <span className="text-xs md:text-sm uppercase tracking-wider mt-2">
                      Minutes
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl md:text-6xl font-bold">
                      {countdown.seconds}
                    </span>
                    <span className="text-xs md:text-sm uppercase tracking-wider mt-2">
                      Seconds
                    </span>
                  </div>
                </div>
                <p className="text-sm md:text-xl mt-10 mb-4 text-white/90">
                  Your email is submitted. You will get a notification when the
                  app launches.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timer;
