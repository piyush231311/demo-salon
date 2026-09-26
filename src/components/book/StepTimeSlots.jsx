import React, { useState, useEffect } from "react";
import { calendarProvider } from "../../lib/calendarProvider";
import { Clock, Sun, Sunrise, Sunset, AlertCircle } from "lucide-react";
import { formatShortDate, cn } from "../../lib/utils";

export function StepTimeSlots({
  selectedDate,
  selectedService,
  selectedStylist,
  selectedTime,
  onSelectTime,
}) {
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState(null);

  const durationMinutes = selectedService?.durationMinutes || 60;
  const stylistId = selectedStylist?.id || "isabella-laurent";

  useEffect(() => {
    let isMounted = true;
    async function fetchSlots() {
      if (!selectedDate) return;
      setLoading(true);
      try {
        const res = await calendarProvider.getAvailability(selectedDate, durationMinutes, stylistId);
        if (isMounted) {
          setAvailability(res);
        }
      } catch (err) {
        console.error("Error fetching availability:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchSlots();

    return () => {
      isMounted = false;
    };
  }, [selectedDate, durationMinutes, stylistId]);

  if (!selectedDate) {
    return (
      <div className="text-center py-12 border border-gold/15 bg-espresso/30 p-8">
        <AlertCircle size={28} className="mx-auto text-gold mb-3" />
        <p className="font-serif text-xl text-ivory">Please select a date first</p>
        <p className="text-xs font-sans text-taupe mt-1">
          Return to Step 03 to choose your preferred day on the atelier calendar.
        </p>
      </div>
    );
  }

  const morningSlots = availability?.slots?.filter((s) => s.period === "morning") || [];
  const afternoonSlots = availability?.slots?.filter((s) => s.period === "afternoon") || [];
  const eveningSlots = availability?.slots?.filter((s) => s.period === "evening") || [];

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-2">
          Step 04
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-ivory">
          Select Your Arrival Time
        </h2>
        <p className="text-sm font-sans text-taupe mt-1">
          Showing real-time availability for{" "}
          <span className="text-gold font-medium">{formatShortDate(selectedDate)}</span> with{" "}
          <span className="text-ivory">{selectedStylist?.name || "Master Stylist"}</span>.
        </p>
      </div>

      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold">
            Querying Atelier Schedule...
          </span>
        </div>
      ) : availability?.isClosed ? (
        <div className="p-8 border border-gold/25 bg-espresso text-center">
          <p className="font-serif text-2xl text-ivory mb-2">Atelier Is Closed</p>
          <p className="text-xs font-sans text-taupe max-w-md mx-auto leading-relaxed">
            {availability.reason}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Morning Slots */}
          {morningSlots.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.2em] font-sans text-gold">
                <Sunrise size={14} />
                <span>Morning Sanctuary (10:00 – 12:00)</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                {morningSlots.map((slot) => (
                  <SlotButton
                    key={slot.time}
                    slot={slot}
                    isSelected={selectedTime === slot.time}
                    onSelect={() => onSelectTime(slot.time)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Afternoon Slots */}
          {afternoonSlots.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.2em] font-sans text-gold">
                <Sun size={14} />
                <span>Afternoon Light (12:00 – 16:00)</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                {afternoonSlots.map((slot) => (
                  <SlotButton
                    key={slot.time}
                    slot={slot}
                    isSelected={selectedTime === slot.time}
                    onSelect={() => onSelectTime(slot.time)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Evening Slots */}
          {eveningSlots.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.2em] font-sans text-gold">
                <Sunset size={14} />
                <span>Evening Quiet (16:00 – 19:00)</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                {eveningSlots.map((slot) => (
                  <SlotButton
                    key={slot.time}
                    slot={slot}
                    isSelected={selectedTime === slot.time}
                    onSelect={() => onSelectTime(slot.time)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Live schedule notice */}
          <div className="text-[11px] font-sans text-taupe pt-4 border-t border-white/5 flex items-center justify-between">
            <span>* All allocations reserve 15 minutes of acoustic calm buffer.</span>
            <span className="text-gold/70">Paris Central Time (CET)</span>
          </div>
        </div>
      )}
    </div>
  );
}

function SlotButton({ slot, isSelected, onSelect }) {
  return (
    <button
      type="button"
      disabled={!slot.available}
      onClick={onSelect}
      className={cn(
        "py-3 px-2 rounded-none text-center font-mono text-xs transition-all duration-200 border focus:outline-none flex flex-col items-center justify-center gap-1",
        isSelected
          ? "bg-gold text-ink font-semibold border-gold shadow-gold-glow scale-105"
          : !slot.available
          ? "bg-ink/30 border-white/5 text-taupe/30 cursor-not-allowed line-through"
          : "bg-espresso/60 border-gold/15 text-ivory hover:border-gold hover:text-gold hover:bg-gold/10"
      )}
    >
      <span>{slot.time}</span>
      <span className="text-[9px] uppercase tracking-tighter">
        {isSelected ? "Selected" : slot.available ? "Available" : slot.reason || "Reserved"}
      </span>
    </button>
  );
}
