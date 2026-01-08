import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const menuItems = [
  {
    id: 1,
    name: "Vanilla Hojicha Latte",
    description: "Smooth roasted hojicha with vanilla and oat milk",
    price: "£4.80",
    category: "2026 Editions",
    img: "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_600,c_limit/v1767683466/HikaruFunnellPhotography-Nina_Dean-JanuaryUpdate-14-12-25-33-2_kw85r9.jpg",
  },
  {
    id: 2,
    name: "Brown Sugar Shaken Iced Latte",
    description: "Espresso shaken with brown sugar and fresh milk",
    price: "£5.20",
    category: "2026 Editions",
    img: "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_600,c_limit/v1767683467/2_xliwdz.jpg",
  },
  {
    id: 3,
    name: "Choc Chip Cookie Matcha",
    description: "Ceremonial grade matcha with chocolate chip cookie crumble",
    price: "£5.50",
    category: "2026 Editions",
    img: "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_600,c_limit/v1767697682/HikaruFunnellPhotography-Nina_Dean-JanuaryUpdate-14-12-25-32-2_tre1jn.jpg",
  },
  {
    id: 4,
    name: "Almond Croissant Matcha",
    description: "Creamy matcha infused with almond and buttery croissant notes",
    price: "£5.80",
    category: "2026 Editions",
    img: "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_600,c_limit/v1767684167/3_jysbbx.jpg",
  },
  {
    id: 5,
    name: "Classic Espresso",
    description: "Double shot of our signature house blend",
    price: "£3.20",
    category: "Coffee",
    img: "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_600,c_limit/v1767683466/HikaruFunnellPhotography-Nina_Dean-JanuaryUpdate-14-12-25-2_bsjjil.jpg",
  },
  {
    id: 6,
    name: "Flat White",
    description: "Velvety microfoam with a double ristretto",
    price: "£4.00",
    category: "Coffee",
    img: "https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_600,c_limit/v1767683466/HikaruFunnellPhotography-Nina_Dean-JanuaryUpdate-14-12-25-33-2_kw85r9.jpg",
  },
];

const Menu = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative z-0">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-[#3E2723]">
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://res.cloudinary.com/dqp2z8oaq/image/upload/f_auto,q_auto,w_1280,c_limit/v1767683467/2_xliwdz.jpg"
              alt="Menu background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-[0.3em]">
              Our Menu
            </h1>
            <p className="mt-6 text-white/80 text-lg md:text-xl tracking-widest uppercase">
              Crafted with care
            </p>
          </div>
        </section>

        {/* Menu Content */}
        <section className="py-20 bg-[radial-gradient(circle_at_center,#FFF4E9,#f8dbc0)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {categories.map((category) => (
              <div key={category} className="mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-[#5D4037] uppercase tracking-[0.2em] mb-12 text-center">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {menuItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/50 shadow-sm hover:shadow-lg transition-all duration-500 group"
                      >
                        <div className="h-64 overflow-hidden">
                          <img
                            src={item.img}
                            alt={item.name}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-[#3E2723] uppercase tracking-wider">
                              {item.name}
                            </h3>
                            <span className="text-lg font-bold text-[#5D4037]">
                              {item.price}
                            </span>
                          </div>
                          <p className="text-[#5D4037]/70 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}

            {/* Back to Home */}
            <div className="text-center mt-16">
              <Link
                to="/"
                className="inline-block px-10 py-5 bg-white text-sm text-[#5D4037] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm overflow-hidden relative group"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                  Back to Home
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[300%] h-[300%] rounded-[45%] bg-[#5D4037] transition-all duration-700 ease-in-out group-hover:top-[-100%]" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
