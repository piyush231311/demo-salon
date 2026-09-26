import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, ArrowUpRight } from "lucide-react";
import { featuredQuotes } from "../../data/testimonials";
import { salonConfig } from "../../data/salonConfig";
import { Link } from "react-router-dom";

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredQuotes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredQuotes.length) % featuredQuotes.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = featuredQuotes[currentIndex];

  return (
    <section className="py-24 md:py-36 bg-ink relative overflow-hidden border-t border-gold/15">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Press Accolades Bar */}
        <div className="mb-20 pb-12 border-b border-gold/15">
          <span className="text-[10px] uppercase tracking-[0.3em] text-taupe font-sans block text-center mb-8">
            As Featured In Editorial Press
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
            {salonConfig.pressMentions.map((press, i) => (
              <div key={i} className="text-center group hover:opacity-100 transition-opacity">
                <span className="font-serif tracking-widest text-xl md:text-2xl text-ivory group-hover:text-gold transition-colors">
                  {press.publication}
                </span>
                <span className="text-[10px] text-taupe block mt-1 italic max-w-xs font-sans">
                  "{press.quote}"
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Testimonial Big Quote */}
        <div className="relative min-h-[340px] flex flex-col justify-center items-center text-center">
          <Quote size={40} className="text-gold/30 mb-6 rotate-180" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center max-w-3xl"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-6 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#C9A96E" stroke="#C9A96E" />
                ))}
              </div>

              {/* Editorial Quote */}
              <blockquote className="font-serif font-light text-2xl md:text-4xl lg:text-4xl leading-[1.3] text-ivory mb-8">
                "{current.quote}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-12 h-12 rounded-full object-cover border border-gold/40 p-0.5"
                />
                <div className="text-left">
                  <span className="font-serif text-lg text-gold-light block leading-tight">
                    {current.author}
                  </span>
                  <span className="text-xs font-sans text-taupe block">
                    {current.title} · {current.location}
                  </span>
                  <span className="text-[10px] font-sans text-gold/80 uppercase tracking-widest block mt-0.5">
                    Service: {current.service}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Arrows & Indicators */}
          <div className="flex items-center gap-4 mt-12">
            <button
              onClick={prevSlide}
              aria-label="Previous quote"
              className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-ivory hover:text-gold hover:border-gold transition-colors focus:outline-none"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {featuredQuotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    currentIndex === idx ? "w-8 bg-gold" : "w-2 bg-white/20 hover:bg-gold/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next quote"
              className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-ivory hover:text-gold hover:border-gold transition-colors focus:outline-none"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Link to Reviews & Transformations Page */}
        <div className="mt-16 text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-light transition-colors pb-1 border-b border-gold/30 hover:border-gold"
          >
            <span>Explore All 340+ Verified Reviews & Transformations</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
