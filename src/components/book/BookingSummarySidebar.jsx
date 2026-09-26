import React from "react";
import { Clock, Calendar as CalendarIcon, User, Sparkles, MapPin, ShieldCheck } from "lucide-react";
import { formatShortDate, formatCurrency } from "../../lib/utils";
import { salonConfig } from "../../data/salonConfig";

export function BookingSummarySidebar({
  selectedService,
  selectedStylist,
  selectedDate,
  selectedTime,
  currentStep,
}) {
  return (
    <aside className="bg-espresso border border-gold/25 p-6 md:p-8 shadow-2xl relative">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="flex items-center justify-between pb-5 border-b border-gold/15 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium block">
            Reservation Register
          </span>
          <h3 className="font-serif text-xl text-ivory">
            Summary of Experience
          </h3>
        </div>
        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
      </div>

      <div className="space-y-5 text-xs font-sans">
        {/* Service Item */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-wider text-taupe block mb-1">
              Ritual & Discipline
            </span>
            {selectedService ? (
              <div>
                <span className="font-serif text-lg text-ivory block leading-snug">
                  {selectedService.name}
                </span>
                <span className="text-taupe flex items-center gap-1 mt-1">
                  <Clock size={12} className="text-gold" />
                  {selectedService.durationMinutes} Minutes Allocation
                </span>
              </div>
            ) : (
              <span className="text-taupe italic">Awaiting service selection...</span>
            )}
          </div>
          {selectedService && (
            <span className="font-serif text-lg text-gold font-light shrink-0">
              {selectedService.priceFormatted}
            </span>
          )}
        </div>

        {/* Master Stylist */}
        <div className="pt-4 border-t border-white/5">
          <span className="text-[10px] uppercase tracking-wider text-taupe block mb-1">
            Master Practitioner
          </span>
          {selectedStylist ? (
            <div className="flex items-center gap-3">
              <img
                src={selectedStylist.imageUrl}
                alt={selectedStylist.name}
                className="w-9 h-9 rounded-full object-cover border border-gold/40 p-0.5"
              />
              <div>
                <span className="font-serif text-base text-ivory block">
                  {selectedStylist.name}
                </span>
                <span className="text-[11px] text-gold/80 block">
                  {selectedStylist.role}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-taupe">
              <User size={14} />
              <span className="italic">First available master or specific selection</span>
            </div>
          )}
        </div>

        {/* Date & Time Slot */}
        <div className="pt-4 border-t border-white/5">
          <span className="text-[10px] uppercase tracking-wider text-taupe block mb-1">
            Appointment Time
          </span>
          {selectedDate ? (
            <div className="flex items-center gap-2 text-ivory">
              <CalendarIcon size={14} className="text-gold shrink-0" />
              <span className="font-medium text-ivory">
                {formatShortDate(selectedDate)}
              </span>
              {selectedTime ? (
                <span className="px-2 py-0.5 bg-gold/15 border border-gold/30 text-gold font-mono rounded">
                  {selectedTime}
                </span>
              ) : (
                <span className="text-taupe italic">(Select hour)</span>
              )}
            </div>
          ) : (
            <span className="text-taupe italic">Awaiting atelier date...</span>
          )}
        </div>

        {/* Atelier Sanctuary Address */}
        <div className="pt-4 border-t border-white/5">
          <span className="text-[10px] uppercase tracking-wider text-taupe block mb-1">
            Atelier Address
          </span>
          <div className="flex items-start gap-2 text-taupe">
            <MapPin size={13} className="text-gold shrink-0 mt-0.5" />
            <span className="leading-snug">{salonConfig.address.full}</span>
          </div>
        </div>

        {/* Included Amenities Box */}
        <div className="p-3.5 bg-ink/70 border border-gold/15 space-y-1.5 text-[11px] text-ivory-dim">
          <div className="flex items-center gap-2 text-gold">
            <Sparkles size={12} />
            <span className="uppercase tracking-widest font-medium">Included Amenities</span>
          </div>
          <p className="text-taupe leading-relaxed">
            Organic herbal infusions, cranial acupressure wash, and private styling suite.
          </p>
        </div>

        {/* Total Price & Deposit Policy */}
        <div className="pt-4 border-t border-gold/20">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-lg text-ivory">Estimated Total</span>
            <span className="font-serif text-2xl md:text-3xl text-gold font-light">
              {selectedService ? selectedService.priceFormatted : "€0"}
            </span>
          </div>
          <span className="text-[10px] text-taupe block mt-1">
            No prepayment required today. Payable at the atelier upon completion.
          </span>
        </div>

        {/* Assurance Badge */}
        <div className="pt-3 flex items-center gap-2 text-[10px] text-gold/80">
          <ShieldCheck size={14} />
          <span>Complimentary rescheduling up to 24 hours prior.</span>
        </div>
      </div>
    </aside>
  );
}
