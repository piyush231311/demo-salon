import React from "react";
import { stylists } from "../../data/stylists";
import { Check, Sparkles, UserCheck } from "lucide-react";
import { cn } from "../../lib/utils";

export function StepStylist({ selectedStylist, onSelectStylist }) {
  // Add "Any Available" option
  const anyStylistOption = {
    id: "any-practitioner",
    name: "First Available Master Stylist",
    role: "Optimal Schedule Availability",
    specialties: ["Comprehensive Coiffure & Care", "Flexible Booking Windows"],
    bio: "We will allocate your session to the highest-matched master practitioner available at your chosen time.",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80",
    experienceYears: 10,
    priceTier: "Standard Tier",
  };

  const allOptions = [anyStylistOption, ...stylists];

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-2">
          Step 02
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-ivory">
          Select Your Master Practitioner
        </h2>
        <p className="text-sm font-sans text-taupe mt-1">
          Every stylist at Maison Aurelia possesses over nine years of high-fashion and anatomical discipline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allOptions.map((st) => {
          const isSelected = selectedStylist?.id === st.id;

          return (
            <div
              key={st.id}
              onClick={() => onSelectStylist(st)}
              className={cn(
                "p-5 border transition-all duration-300 cursor-pointer flex gap-4 group relative overflow-hidden",
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

              {/* Stylist Portrait Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden border border-gold/30">
                <img
                  src={st.imageUrl}
                  alt={st.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-medium">
                    {st.role}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-ivory group-hover:text-gold-light transition-colors">
                  {st.name}
                </h3>

                <p className="text-xs font-sans text-taupe mt-1 line-clamp-2 leading-relaxed">
                  {st.bio}
                </p>

                {/* Specialties Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {st.specialties?.slice(0, 2).map((spec, i) => (
                    <span
                      key={i}
                      className="text-[9px] uppercase tracking-wider text-ivory-dim/80 px-2 py-0.5 bg-ink/70 border border-white/10"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
