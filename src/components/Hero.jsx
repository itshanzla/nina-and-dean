import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dqp2z8oaq/image/upload/v1767684167/3_jysbbx.jpg"
          alt="Nina and Dean"
          className="w-full h-full object-cover object-center md:object-[90%_95%]"
        />
      </div>

      <div className="relative z-10 min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Content */}
        <div className="absolute top-36">
          <h1 className="text-4xl md:text-6xl font-normal text-white drop-shadow-md uppercase">
            January editions are live
          </h1>
          <button className="mt-10 md:mt-20 px-10 py-6 bg-white text-xl md:text-3xl text-primary/80 font-medium rounded-full shadow-md overflow-hidden relative group">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
              New drinks
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[300%] h-[300%] rounded-[45%] bg-primary transition-all duration-700 ease-in-out group-hover:top-[-100%]" />
          </button>
        </div>

        {/* Right Content */}
        <div className="absolute top-[65%] md:top-[50%]  right-4 sm:right-6 lg:right-8 transform -translate-y-1/2 uppercase">
          <div className="text-right">
            <p className="md:text-white/80 text-primary/80 font-bold md:font-normal text-2xl uppercase">
              Almond croissant matcha
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
