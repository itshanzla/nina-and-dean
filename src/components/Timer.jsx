import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import api from "../services/api";

const Timer = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const triggerConfetti = () => {
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

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

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
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await api.submitWaitlistEmail(values.email);
        localStorage.setItem("ninaAndDeanEmail", values.email);
        setEmailSubmitted(true);
        triggerConfetti();
        toast.success("Thank you! You'll be notified when the app launches.", {
          duration: 4000,
          position: "top-center",
          icon: null,
          style: {
            background: "#5D4037",
            color: "#fff",
          },
        });
      } catch (error) {
        toast.error(error.message || "Something went wrong. Please try again.", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#dc2626",
            color: "#fff",
          },
        });
      } finally {
        setIsSubmitting(false);
      }
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
      const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;
      const now = Date.now();
      // Calculate remaining time within a 14-day cycle
      const remaining = FOURTEEN_DAYS_MS - (now % FOURTEEN_DAYS_MS);

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [emailSubmitted]);

  return (
    <section
      id="timer-section"
      className="relative h-[100dvh] md:min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,#FFF4E9,#f8dbc0)]"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-primary font-bold text-3xl md:text-7xl tracking-[0.5em] uppercase">
            NINA & DEAN APP
          </h1>
          <p className="text-primary/80 mt-10 text-sm md:text-3xl font-normal mx-auto">
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
                  disabled={isSubmitting}
                  className="px-10 py-3 bg-white text-[#5D4037] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm hover:bg-white/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Notify Me"}
                </button>
              </form>
            ) : (
              <div className="text-primary">
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
                <p className="text-sm md:text-xl mt-10 mb-4 text-primary/80">
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
