import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from "lucide-react";
import { cn } from "../../lib/utils";

export function StepCalendar({ selectedDate, onSelectDate }) {
  // Calendar month state
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonthDate, setCurrentMonthDate] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  // First day of month (0 = Sun, 1 = Mon ... 6 = Sat)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startingDayIndex = (firstDayOfMonth + 6) % 7;

  // Number of days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  // Helper to format "YYYY-MM-DD"
  const formatDateStr = (d) => {
    const y = currentMonthDate.getFullYear();
    const m = String(currentMonthDate.getMonth() + 1).padStart(2, "0");
    const day = String(d).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-2">
          Step 03
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-ivory">
          Select Your Atelier Date
        </h2>
        <p className="text-sm font-sans text-taupe mt-1">
          The atelier welcomes patrons Tuesday through Saturday. Sunday and Monday are reserved for private buyouts.
        </p>
      </div>

      {/* Calendar Card Container */}
      <div className="bg-espresso border border-gold/25 p-6 md:p-8 max-w-xl mx-auto shadow-2xl">
        {/* Month Header Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-gold/15 mb-6">
          <h3 className="font-serif text-2xl text-ivory flex items-center gap-2">
            <CalendarIcon size={18} className="text-gold" />
            <span>{monthNames[month]}</span>
            <span className="text-gold font-light">{year}</span>
          </h3>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-ivory hover:text-gold hover:border-gold transition-colors focus:outline-none"
              aria-label="Previous Month"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-ivory hover:text-gold hover:border-gold transition-colors focus:outline-none"
              aria-label="Next Month"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 mb-3 text-center">
          {dayLabels.map((day, idx) => (
            <span
              key={idx}
              className={cn(
                "text-[10px] uppercase tracking-widest font-sans font-medium",
                idx >= 5 ? "text-gold/60" : "text-taupe"
              )}
            >
              {day}
            </span>
          ))}
        </div>

        {/* Calendar Days Matrix */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty offset cells */}
          {[...Array(startingDayIndex)].map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Days */}
          {[...Array(daysInMonth)].map((_, i) => {
            const dayNum = i + 1;
            const dateObj = new Date(year, month, dayNum);
            const dateStr = formatDateStr(dayNum);

            // 0 = Sunday, 1 = Monday
            const dayOfWeek = dateObj.getDay();
            const isClosed = dayOfWeek === 0 || dayOfWeek === 1;
            const isPast = dateObj < today;
            const isUnavailable = isClosed || isPast;

            const isSelected = selectedDate === dateStr;
            const isToday =
              dateObj.getDate() === today.getDate() &&
              dateObj.getMonth() === today.getMonth() &&
              dateObj.getFullYear() === today.getFullYear();

            return (
              <button
                key={dayNum}
                type="button"
                disabled={isUnavailable}
                onClick={() => onSelectDate(dateStr)}
                className={cn(
                  "aspect-square rounded-none flex flex-col items-center justify-center relative font-serif text-sm transition-all duration-200 focus:outline-none",
                  isSelected
                    ? "bg-gold text-ink font-semibold shadow-gold-glow scale-105 z-10"
                    : isUnavailable
                    ? "text-taupe/30 bg-ink/20 cursor-not-allowed line-through"
                    : "text-ivory bg-espresso-light/60 hover:bg-gold/20 hover:text-gold hover:border-gold/40 border border-white/5"
                )}
              >
                <span>{dayNum}</span>
                {isToday && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-gold absolute bottom-1.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[11px] font-sans text-taupe">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-gold inline-block" />
            <span>Selected Date</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-espresso-light border border-white/10 inline-block" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-ink/40 line-through inline-block" />
            <span>Closed / Past</span>
          </div>
        </div>
      </div>
    </div>
  );
}
