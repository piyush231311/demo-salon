import React from "react";
import { User, Mail, Phone, MessageSquare, Coffee, Shield } from "lucide-react";

export function StepDetails({ guestDetails, onChangeDetails }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeDetails({
      ...guestDetails,
      [name]: value,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-2">
          Step 05
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-ivory">
          Guest Information & Preferences
        </h2>
        <p className="text-sm font-sans text-taupe mt-1">
          Your details are held in strictest confidence. We customize your atelier station prior to your arrival.
        </p>
      </div>

      <div className="space-y-6">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="clientName"
              className="text-xs uppercase tracking-widest text-ivory font-sans block mb-2"
            >
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                id="clientName"
                name="clientName"
                required
                value={guestDetails.clientName || ""}
                onChange={handleChange}
                placeholder="e.g. Camille Laurent"
                className="w-full bg-espresso border border-gold/25 px-4 py-3.5 pl-10 text-ivory placeholder-taupe/50 text-sm font-sans focus:outline-none focus:border-gold transition-colors"
              />
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70" />
            </div>
          </div>

          <div>
            <label
              htmlFor="clientEmail"
              className="text-xs uppercase tracking-widest text-ivory font-sans block mb-2"
            >
              Email Address (For Calendar Invite) *
            </label>
            <div className="relative">
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                required
                value={guestDetails.clientEmail || ""}
                onChange={handleChange}
                placeholder="e.g. camille@atelier.fr"
                className="w-full bg-espresso border border-gold/25 px-4 py-3.5 pl-10 text-ivory placeholder-taupe/50 text-sm font-sans focus:outline-none focus:border-gold transition-colors"
              />
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70" />
            </div>
          </div>
        </div>

        {/* Phone & Beverage Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="clientPhone"
              className="text-xs uppercase tracking-widest text-ivory font-sans block mb-2"
            >
              Telephone / Mobile *
            </label>
            <div className="relative">
              <input
                type="tel"
                id="clientPhone"
                name="clientPhone"
                required
                value={guestDetails.clientPhone || ""}
                onChange={handleChange}
                placeholder="+33 6 12 34 56 78"
                className="w-full bg-espresso border border-gold/25 px-4 py-3.5 pl-10 text-ivory placeholder-taupe/50 text-sm font-sans focus:outline-none focus:border-gold transition-colors"
              />
              <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70" />
            </div>
          </div>

          <div>
            <label
              htmlFor="beveragePreference"
              className="text-xs uppercase tracking-widest text-ivory font-sans block mb-2"
            >
              Sensory Welcome Beverage
            </label>
            <div className="relative">
              <select
                id="beveragePreference"
                name="beveragePreference"
                value={guestDetails.beveragePreference || "herbal-infusion"}
                onChange={handleChange}
                className="w-full bg-espresso border border-gold/25 px-4 py-3.5 pl-10 text-ivory text-sm font-sans focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
              >
                <option value="herbal-infusion" className="bg-espresso text-ivory">Organic Botanical Mint & Linden Infusion</option>
                <option value="espresso" className="bg-espresso text-ivory">Single-Origin Roast Parisian Espresso</option>
                <option value="matcha" className="bg-espresso text-ivory">Ceremonial Uji Japanese Matcha</option>
                <option value="champagne" className="bg-espresso text-ivory">Laurent-Perrier Brut Champagne</option>
                <option value="still-water" className="bg-espresso text-ivory">Chilled Mineral Water with Meyer Lemon</option>
              </select>
              <Coffee size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Special Requests / Hair History */}
        <div>
          <label
            htmlFor="specialRequests"
            className="text-xs uppercase tracking-widest text-ivory font-sans block mb-2"
          >
            Hair History, Sensitivities & Desired Aesthetic (Optional)
          </label>
          <div className="relative">
            <textarea
              id="specialRequests"
              name="specialRequests"
              rows={4}
              value={guestDetails.specialRequests || ""}
              onChange={handleChange}
              placeholder="Tell us about previous chemical treatments, scalp sensitivities, or the silhouette you envision..."
              className="w-full bg-espresso border border-gold/25 p-4 text-ivory placeholder-taupe/50 text-sm font-sans focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Privacy & Cancellation Notice */}
        <div className="p-4 bg-espresso-light/40 border border-gold/15 flex items-start gap-3 text-xs text-taupe font-sans">
          <Shield size={16} className="text-gold shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Maison Aurelia respects your schedule. If your itinerary changes, you may reschedule with 24 hours notice without fee.
          </p>
        </div>
      </div>
    </div>
  );
}
