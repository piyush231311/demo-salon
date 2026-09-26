import React, { useState } from "react";
import { services, serviceCategories } from "../../data/services";
import { Clock, Check, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

export function StepService({ selectedService, onSelectService }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-2">
          Step 01
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-ivory">
          Select Your Bespoke Ritual
        </h2>
        <p className="text-sm font-sans text-taupe mt-1">
          Choose the craft discipline suited to your aesthetic intentions.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/5">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300",
            selectedCategory === "all"
              ? "bg-gold text-ink font-medium shadow-gold-glow"
              : "bg-espresso/60 text-taupe border border-gold/15 hover:border-gold hover:text-ivory"
          )}
        >
          All ({services.length})
        </button>
        {serviceCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300",
              selectedCategory === cat.id
                ? "bg-gold text-ink font-medium shadow-gold-glow"
                : "bg-espresso/60 text-taupe border border-gold/15 hover:border-gold hover:text-ivory"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((service) => {
          const isSelected = selectedService?.id === service.id;

          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className={cn(
                "p-5 rounded-none border transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden",
                isSelected
                  ? "bg-espresso border-gold shadow-gold-glow"
                  : "bg-espresso/40 border-gold/15 hover:border-gold/50 hover:bg-espresso/70"
              )}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-8 h-8 bg-gold flex items-center justify-center text-ink">
                  <Check size={16} strokeWidth={2.5} />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  {service.badge && (
                    <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-sans font-medium px-2 py-0.5 bg-gold/10 border border-gold/25">
                      {service.badge}
                    </span>
                  )}
                  <span className="text-[11px] font-sans text-taupe flex items-center gap-1">
                    <Clock size={11} className="text-gold" />
                    {service.durationMinutes} mins
                  </span>
                </div>

                <h3 className="font-serif text-xl text-ivory group-hover:text-gold-light transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs font-sans text-taupe mt-1.5 line-clamp-2 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-widest text-taupe font-sans">
                  Atelier Rate
                </span>
                <span className="font-serif text-2xl text-gold font-light">
                  {service.priceFormatted}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
