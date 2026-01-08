import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const Touch = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
      lastName: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      message: Yup.string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form submitted:", values);
      toast.success("Thank you for your message! We'll get back to you soon.", {
        duration: 4000,
        position: "top-center",
        icon: null,
        style: {
          background: "#5D4037",
          color: "#fff",
        },
      });
      resetForm();
    },
  });

  return (
    <div
      id="contact"
      className="w-full min-h-[500px] flex flex-col lg:flex-row font-sans bg-[radial-gradient(circle_at_center,#FFF4E9,#f8dbc0)]"
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 pt-16 lg:p-16 lg:pt-24 xl:p-20 xl:pt-28 text-[#5D4037]">
        {/* Top Text */}
        <div className="w-full text-center mb-8 lg:mb-10">
          <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-[0.3em]">
            Start a
          </h2>
          <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-[0.3em]">
            conversation
          </h2>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-lg mx-auto mt-2 lg:mt-4">
          <div className="bg-white/20 backdrop-blur-sm p-6 lg:p-8 rounded-xl border border-white/30 shadow-sm">
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6 lg:space-y-20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* First Name */}
                <div className="flex flex-col space-y-2 group">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-bold uppercase tracking-widest opacity-70 group-focus-within:opacity-100 transition-opacity"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-transparent border-b border-[#5D4037]/40 focus:border-[#5D4037] outline-none py-2 text-lg text-[#3E2723] placeholder-[#3E2723]/30 transition-colors"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-600 text-xs">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>
                {/* Last Name */}
                <div className="flex flex-col space-y-2 group">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-bold uppercase tracking-widest opacity-70 group-focus-within:opacity-100 transition-opacity"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-transparent border-b border-[#5D4037]/40 focus:border-[#5D4037] outline-none py-2 text-lg text-[#3E2723] placeholder-[#3E2723]/30 transition-colors"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-600 text-xs">
                      {formik.errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-2 group">
                <label
                  htmlFor="email"
                  className="text-sm font-bold uppercase tracking-widest opacity-70 group-focus-within:opacity-100 transition-opacity"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-transparent border-b border-[#5D4037]/40 focus:border-[#5D4037] outline-none py-2 text-lg text-[#3E2723] placeholder-[#3E2723]/30 transition-colors"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-600 text-xs">{formik.errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col space-y-2 group">
                <label
                  htmlFor="message"
                  className="text-sm font-bold uppercase tracking-widest opacity-70 group-focus-within:opacity-100 transition-opacity"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="1"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-transparent border-b border-[#5D4037]/40 focus:border-[#5D4037] outline-none py-2 text-lg text-[#3E2723] placeholder-[#3E2723]/30 transition-colors resize-none"
                ></textarea>
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-600 text-xs">
                    {formik.errors.message}
                  </p>
                )}
              </div>

              <div className="pt-4 text-center lg:text-left">
                <button className="px-10 py-5 bg-white text-sm text-[#5D4037] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm overflow-hidden relative group">
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                    Send Message
                  </span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[300%] h-[300%] rounded-[45%] bg-[#5D4037] transition-all duration-700 ease-in-out group-hover:top-[-100%]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full lg:w-1/2 h-[400px] lg:h-[900px] relative lg:order-last">
        <img
          src="https://res.cloudinary.com/dqp2z8oaq/image/upload/v1767683466/HikaruFunnellPhotography-Nina_Dean-JanuaryUpdate-14-12-25-2_bsjjil.jpg"
          alt="Contact Us"
          loading='lazy'
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Touch;
