import React from "react";
import { motion } from "framer-motion";
import { atelierAtmosphere } from "../../data/gallery";
import { SectionHeading } from "../common/SectionHeading";

export function AtelierAtmosphere() {
  return (
    <section className="py-24 md:py-36 bg-espresso relative overflow-hidden border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          kicker="Sanctuary Architecture"
          title="Designed for Acoustic & Visual Serenity."
          subtitle="A 350-square-meter historical residence reimagined with raw travertine stone, diffused skylights, and custom walnut cabinetry."
          className="mb-16"
        />

        {/* Gallery 4-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {atelierAtmosphere.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              className="group relative aspect-[3/4] overflow-hidden bg-ink border border-gold/15"
            >
              <img
                src={item.imageUrl}
                alt={item.alt}
                className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.05] group-hover:scale-110 group-hover:brightness-95 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-1">
                  Atelier Space 0{idx + 1}
                </span>
                <h4 className="font-serif text-xl text-ivory group-hover:text-gold-light transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs font-sans text-taupe mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
