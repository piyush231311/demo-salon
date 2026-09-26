import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { services, serviceCategories } from "../../data/services";
import { SectionHeading } from "../common/SectionHeading";
import { Button } from "../common/Button";

export function ServicesTeaser() {
  const [hoveredImage, setHoveredImage] = useState(services[0].imageUrl);
  const [hoveredAlt, setHoveredAlt] = useState(services[0].alt);

  // Pick top 4 representative services
  const featuredServices = [
    services[0], // Cut & Finish
    services[3], // French Balayage
    services[6], // Head Spa
    services[8], // Bridal Couture
  ];

  return (
    <section className="py-24 md:py-36 bg-espresso relative overflow-hidden border-t border-gold/15">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header with Title and Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            align="left"
            kicker="Atelier Repertoire"
            title="Sculpted Forms & Botanical Alchemy."
            subtitle="Every treatment is tailored to the individual texture of your hair, lifestyle cadence, and personal aesthetic identity."
          />
          <Button
            to="/services"
            variant="secondary"
            size="md"
            icon={<ArrowUpRight size={14} />}
            className="self-start md:self-end shrink-0"
          >
            All Services & Pricing
          </Button>
        </div>

        {/* Categories Pill Strip */}
        <div className="flex flex-wrap items-center gap-2.5 mb-14 pb-4 border-b border-white/5">
          <span className="text-[11px] uppercase tracking-[0.2em] text-taupe mr-3">Disciplines:</span>
          {serviceCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/services?category=${cat.id}`}
              className="px-3.5 py-1.5 rounded-full text-xs font-sans text-ivory-dim border border-white/10 hover:border-gold/50 hover:text-gold hover:bg-gold/5 transition-all duration-300"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Interactive Editorial Service Rows & Floating Image Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Service Items List (8 cols) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-gold/15">
            {featuredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onMouseEnter={() => {
                  setHoveredImage(service.imageUrl);
                  setHoveredAlt(service.alt);
                }}
                className="py-7 group flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:pl-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-gold">
                      {service.badge}
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="text-xs font-sans text-taupe flex items-center gap-1">
                      <Clock size={12} className="text-gold/70" />
                      {service.durationMinutes} mins
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-ivory group-hover:text-gold-light transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-xs md:text-sm text-taupe mt-1.5 font-sans leading-relaxed line-clamp-2 max-w-lg">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="flex items-center gap-4 sm:flex-col sm:items-end justify-between sm:justify-center">
                  <span className="font-serif text-2xl text-gold font-light">
                    {service.priceFormatted}
                  </span>
                  <Link
                    to={`/book?service=${service.id}`}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-ivory-dim group-hover:text-gold transition-colors"
                  >
                    <span>Reserve</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Preview Image (5 cols) */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative aspect-[4/5] rounded-none overflow-hidden border border-gold/25 shadow-2xl p-2 bg-ink/60">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={hoveredImage}
                  alt={hoveredAlt}
                  className="w-full h-full object-cover object-center filter contrast-[1.03] transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans block mb-1">
                    Visual Craft
                  </span>
                  <span className="font-serif text-lg text-ivory italic">
                    {hoveredAlt}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
