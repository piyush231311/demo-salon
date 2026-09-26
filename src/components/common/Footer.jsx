import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, MapPin, Phone, Mail, Instagram } from "lucide-react";
import { salonConfig } from "../../data/salonConfig";

export function Footer() {
  return (
    <footer className="bg-espresso text-ivory border-t border-gold/15 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center bg-ink/50">
                  <span className="font-serif italic text-gold text-base">M</span>
                </div>
                <span className="font-serif text-2xl font-light tracking-wide text-ivory">
                  {salonConfig.name}
                </span>
              </div>
              <p className="text-sm text-taupe leading-relaxed font-sans max-w-sm mb-6">
                An architectural sanctuary devoted to the mastery of coiffure, bespoke tone, and restorative scalp therapy. Beauty understood as living craft.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans block mb-2">
                Curated by
              </span>
              <p className="font-serif text-lg text-ivory-dim italic">
                {salonConfig.founder.name} & Atelier Associates
              </p>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] font-sans font-medium text-gold mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-xs font-sans text-ivory-muted tracking-wider">
              <li>
                <Link to="/" className="hover:text-gold transition-colors inline-block">
                  Atelier Sanctuary
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors inline-block">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-gold transition-colors inline-block">
                  Reviews & Lookbook
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-gold transition-colors inline-block">
                  Book Reservation
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Hours Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-sans font-medium text-gold mb-6 flex items-center gap-2">
              <Clock size={14} className="text-gold" />
              Atelier Hours
            </h4>
            <div className="space-y-3 text-xs font-sans">
              {salonConfig.hours.map((h, i) => (
                <div key={i} className="pb-2.5 border-b border-white/5 last:border-0">
                  <div className="flex justify-between text-ivory-muted">
                    <span>{h.day}</span>
                    <span className="text-ivory font-mono font-normal">
                      {h.open === "Closed" ? "Closed" : `${h.open} — ${h.close}`}
                    </span>
                  </div>
                  {h.note && (
                    <span className="text-[10px] text-taupe block mt-0.5 italic">
                      {h.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Location & Concierge Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-sans font-medium text-gold mb-6 flex items-center gap-2">
              <MapPin size={14} className="text-gold" />
              Paris Location
            </h4>
            <p className="text-xs text-ivory-muted leading-relaxed font-sans mb-4">
              {salonConfig.address.full}
            </p>
            <a
              href={salonConfig.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-gold hover:text-gold-light mb-6 transition-colors"
            >
              <span>View On Maps</span>
              <ArrowUpRight size={12} />
            </a>

            <div className="space-y-2 text-xs font-sans text-taupe">
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-gold shrink-0" />
                <a href={`tel:${salonConfig.contact.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-ivory transition-colors">
                  {salonConfig.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-gold shrink-0" />
                <a href={`mailto:${salonConfig.contact.conciergeEmail}`} className="hover:text-ivory transition-colors">
                  {salonConfig.contact.conciergeEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hairline Divider & Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gold/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-taupe">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {salonConfig.name}. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Editorial Haute Coiffure</span>
          </div>

          <div className="flex items-center gap-6">
            {salonConfig.socials.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-taupe hover:text-gold transition-colors text-xs tracking-wider"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
