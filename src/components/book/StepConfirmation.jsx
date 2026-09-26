import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Calendar as CalendarIcon, Download, ArrowUpRight, MapPin, Clock, User, Sparkles, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import { generateIcsFile } from "../../lib/icsGenerator";
import { formatDate, formatTime } from "../../lib/utils";
import { salonConfig } from "../../data/salonConfig";
import { Button } from "../common/Button";

export function StepConfirmation({ bookingResult, onReset }) {
  const [downloadedIcs, setDownloadedIcs] = useState(false);
  const details = bookingResult?.details || {};

  useEffect(() => {
    // Elegant luxury gold & blush confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#C9A96E", "#DFCA9E", "#D9B8A8", "#FAF6F0"],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handleDownloadIcs = () => {
    const success = generateIcsFile({
      appointmentId: bookingResult?.appointmentId,
      serviceName: details.serviceName,
      stylistName: details.stylistName,
      dateStr: details.date,
      timeStr: details.time,
      durationMinutes: details.durationMinutes,
      salonName: salonConfig.name,
      address: salonConfig.address.full,
      clientName: details.clientName,
      clientEmail: details.clientEmail,
      notes: details.specialRequests,
    });

    if (success) {
      setDownloadedIcs(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-6">
      {/* Gold Seal Monogram Badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="w-20 h-20 mx-auto rounded-full border-2 border-gold flex items-center justify-center bg-espresso shadow-gold-glow-lg relative"
      >
        <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center bg-gold/10">
          <Check size={32} className="text-gold" strokeWidth={2.5} />
        </div>
      </motion.div>

      {/* Confirmation Title */}
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans font-medium block mb-2">
          Reservation Confirmed
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-ivory font-light leading-tight">
          We Await Your Presence,{" "}
          <span className="italic font-normal text-gold-light">{details.clientName}</span>.
        </h2>
        <p className="text-sm font-sans text-taupe mt-3 max-w-lg mx-auto leading-relaxed">
          Your appointment has been registered in the Maison Aurelia guest register. A formal confirmation dispatch has been sent to{" "}
          <span className="text-ivory font-mono">{details.clientEmail}</span>.
        </p>
      </div>

      {/* Appointment Voucher Card */}
      <div className="bg-espresso border border-gold/30 p-8 text-left shadow-2xl relative overflow-hidden">
        {/* Subtle watermark monogram */}
        <div className="absolute -right-8 -bottom-8 font-serif text-9xl text-white/[0.02] select-none pointer-events-none">
          M
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gold/15 mb-6">
          <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-medium">
            Atelier Register Voucher
          </span>
          <span className="font-mono text-xs text-gold-light tracking-wider bg-gold/10 px-2.5 py-1 border border-gold/25">
            Ref: {bookingResult?.appointmentId}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
          <div>
            <span className="text-taupe uppercase tracking-wider text-[10px] block mb-1">
              Ritual
            </span>
            <p className="font-serif text-xl text-ivory">
              {details.serviceName}
            </p>
            <p className="text-taupe mt-0.5">{details.durationMinutes} Minutes</p>
          </div>

          <div>
            <span className="text-taupe uppercase tracking-wider text-[10px] block mb-1">
              Master Practitioner
            </span>
            <p className="font-serif text-xl text-ivory">
              {details.stylistName}
            </p>
            <p className="text-gold/80 mt-0.5">Haute Coiffure Atelier</p>
          </div>

          <div className="pt-4 border-t border-white/5">
            <span className="text-taupe uppercase tracking-wider text-[10px] block mb-1">
              Date & Arrival Hour
            </span>
            <p className="font-medium text-ivory text-sm">
              {formatDate(details.date)}
            </p>
            <p className="font-mono text-gold text-sm mt-0.5">{details.time} CET</p>
          </div>

          <div className="pt-4 border-t border-white/5">
            <span className="text-taupe uppercase tracking-wider text-[10px] block mb-1">
              Atelier Address
            </span>
            <p className="text-ivory leading-snug">{salonConfig.address.full}</p>
          </div>
        </div>

        {/* Arrival Tips */}
        <div className="mt-6 pt-4 border-t border-gold/15 flex items-start gap-2.5 text-[11px] text-taupe">
          <Sparkles size={14} className="text-gold shrink-0 mt-0.5" />
          <p>
            Kindly arrive 10 minutes ahead of your reservation to enjoy your chosen botanical welcome infusion and initial hair fiber consultation.
          </p>
        </div>
      </div>

      {/* Action Buttons: Calendar Download & Return */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Button
          onClick={handleDownloadIcs}
          variant="primary"
          size="lg"
          className="w-full sm:w-auto shadow-gold-glow"
          icon={<Download size={16} />}
        >
          {downloadedIcs ? "Calendar File Downloaded (.ics)" : "Add to Calendar (.ics)"}
        </Button>

        <Button
          onClick={onReset}
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
          icon={<RefreshCw size={14} />}
        >
          Book Another Experience
        </Button>

        <Button
          to="/"
          variant="dark"
          size="lg"
          className="w-full sm:w-auto"
        >
          Return to Sanctuary
        </Button>
      </div>
    </div>
  );
}
