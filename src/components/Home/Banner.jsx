import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1920",
      title: "Library at Your Doorstep",
      desc: "Borrow books from your local library without leaving your home.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1920",
      title: "Discover Rare Editions",
      desc: "Access exclusive collections and rare manuscripts instantly.",
    },
    {
      id: 3,
      image:
        "https://images.stockcake.com/public/c/d/8/cd81492a-0de5-4c87-9335-9093a39cb69f_large/ancient-knowledge-unleashed-stockcake.jpg",
      title: "Knowledge Unleashed",
      desc: "Join our community of readers and learners today.",
    },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-slate-900 group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transform scale-105 transition-transform duration-[10000ms] ease-linear"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: index === current ? 1 : 0,
                y: index === current ? 0 : 30,
              }}
              transition={{ duration: 0.8, delay: 0.3 }}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-3xl drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl leading-relaxed drop-shadow-md">
                {slide.desc}
              </p>
              <Link
                to="/books"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-emerald-900/20 hover:scale-105 active:scale-95">
                Explore Books <BookOpen size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? "bg-emerald-500 w-8"
                : "bg-white/30 w-3 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
