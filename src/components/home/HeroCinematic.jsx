import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "../common/Button";
import { salonConfig } from "../../data/salonConfig";

export function HeroCinematic() {
  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-ink">
      {/* Background Image with Slow Ken Burns Zoom Effect */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full select-none"
      >
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=85"
          alt="Maison Aurelia interior sanctuary"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.05]"
          loading="eager"
        />
      </motion.div>

      {/* Cinematic Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-transparent to-ink/80 pointer-events-none" />
      <div className="absolute inset-0 vignette-radial pointer-events-none" />

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-12 text-center pt-28 pb-20 flex flex-col items-center w-full">
        {/* Subtle Pre-header badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-espresso/80 backdrop-blur-md mb-6 max-w-full"
        >
          <Sparkles size={12} className="text-gold shrink-0 animate-pulse" />
          <span className="text-[9px] sm:text-xs tracking-[0.15em] sm:tracking-[0.25em] uppercase font-sans font-medium text-gold-light truncate">
            Haute Coiffure & Bespoke Beauty Sanctuary · Paris
          </span>
        </motion.div>

        {/* Oversized Cinematic Editorial Headline */}
        <div className="overflow-hidden mb-6 w-full px-2">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-serif font-light text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-ivory leading-[1.1] max-w-4xl mx-auto break-words"
          >
            Where Quiet Luxury Meets{" "}
            <span className="italic font-normal text-gold-light block sm:inline">Living Craft.</span>
          </motion.h1>
        </div>

        {/* Tagline Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="max-w-2xl text-sm sm:text-lg md:text-xl font-sans font-light text-ivory-dim leading-relaxed mb-10 tracking-wide px-2"
        >
          An unhurried sanctuary in the 1er Arrondissement. Architectural cuts,
          multi-dimensional French balayage, and restorative scalp therapy calibrated to your singular presence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Button
            to="/book"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-gold-glow"
            icon={<ArrowUpRight size={16} />}
          >
            Book Your Experience
          </Button>

          <Button
            to="/services"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Explore Services & Pricing
          </Button>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-taupe font-sans">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-gold/70 to-transparent"
        />
      </motion.div>
    </section>
  );
}
