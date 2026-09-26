import React from "react";
import { motion } from "framer-motion";
import { salonConfig } from "../../data/salonConfig";
import { SectionHeading } from "../common/SectionHeading";
import { Button } from "../common/Button";
import { ArrowUpRight } from "lucide-react";

export function FounderSection() {
  const { founder, stats } = salonConfig;

  return (
    <section className="py-24 md:py-36 bg-ink relative overflow-hidden border-t border-gold/15">
      {/* Background aesthetic glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Editorial Portrait */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer decorative gold frame offset */}
              <div className="absolute -inset-3 border border-gold/25 translate-x-3 translate-y-3 pointer-events-none" />

              {/* Portrait Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-espresso shadow-2xl">
                <img
                  src={founder.portraitUrl}
                  alt={founder.portraitAlt}
                  className="w-full h-full object-cover object-center filter contrast-[1.05] hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-4 bg-espresso/95 backdrop-blur-md border border-gold/40 px-5 py-3 shadow-gold-glow">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium block">
                  Philosophy
                </span>
                <span className="font-serif italic text-base text-ivory">
                  "{founder.philosophy}"
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Founder Narrative & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <SectionHeading
              align="left"
              kicker="The Atelier Vision"
              title="A Devotion to the Art of Quiet Elegance."
              className="mb-8"
            />

            {/* Founder Quote */}
            <blockquote className="border-l-2 border-gold/60 pl-6 mb-8 italic font-serif text-xl md:text-2xl text-ivory-dim leading-relaxed">
              "{founder.quote}"
            </blockquote>

            {/* Founder Bio Paragraphs */}
            <div className="space-y-4 font-sans text-sm md:text-base text-taupe leading-relaxed mb-8">
              {founder.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Signature & Role */}
            <div className="flex items-center gap-6 mb-12 pb-8 border-b border-gold/15">
              <div>
                <span className="font-serif italic text-3xl md:text-4xl text-gold-light tracking-wide block">
                  {founder.name}
                </span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-taupe font-sans mt-1 block">
                  {founder.title} · {founder.experienceYears} Years of Practice
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="flex flex-col"
                >
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gold font-light tracking-tight">
                    {stat.value}
                    <span className="text-2xl text-gold-light">{stat.suffix}</span>
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-taupe font-sans mt-1.5 leading-snug">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
