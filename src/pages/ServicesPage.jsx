import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowUpRight, Sparkles, Check, X, Info } from "lucide-react";
import { serviceCategories, services } from "../data/services";
import { SectionHeading } from "../components/common/SectionHeading";
import { Button } from "../components/common/Button";
import { PageTransition } from "../components/common/PageTransition";
import { cn } from "../lib/utils";

export function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [hoveredService, setHoveredService] = useState(services[0]);
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);

  // Sync category state with URL search param
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === "all") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  const activeCategoryMeta = serviceCategories.find((c) => c.id === activeCategory);

  return (
    <PageTransition>
      <div className="pt-28 pb-32 bg-ink min-h-screen text-ivory">
        {/* Page Hero Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-16 text-center">
          <SectionHeading
            kicker="The Services Menu"
            title="Haute Coiffure & Bespoke Rituals."
            subtitle="All services begin with an unhurried consultation, aromatic botanical hair bath, and tension-release cranial massage."
            className="mx-auto"
            size="lg"
          />

          {/* Category Tabs Pill Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-4xl mx-auto">
            <button
              onClick={() => handleCategoryChange("all")}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300",
                activeCategory === "all"
                  ? "bg-gold text-ink font-medium shadow-gold-glow"
                  : "bg-espresso/60 text-ivory-dim border border-gold/20 hover:border-gold hover:text-ivory"
              )}
            >
              All Disciplines ({services.length})
            </button>

            {serviceCategories.map((cat) => {
              const count = services.filter((s) => s.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 flex items-center gap-2",
                    isActive
                      ? "bg-gold text-ink font-medium shadow-gold-glow"
                      : "bg-espresso/60 text-ivory-dim border border-gold/20 hover:border-gold hover:text-ivory"
                  )}
                >
                  <span>{cat.name}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full",
                      isActive ? "bg-ink/20 text-ink" : "bg-white/10 text-taupe"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Description Notice */}
          {activeCategoryMeta && (
            <motion.p
              key={activeCategoryMeta.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-sm font-sans text-gold-light/90 italic tracking-wide"
            >
              {activeCategoryMeta.description}
            </motion.p>
          )}
        </section>

        {/* Main Services Interactive Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Services Interactive Table / List */}
            <div className="lg:col-span-7 flex flex-col divide-y divide-gold/15">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    onMouseEnter={() => setHoveredService(service)}
                    className="py-8 group flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:pl-2"
                  >
                    <div className="flex-1">
                      {/* Meta header */}
                      <div className="flex items-center gap-3 mb-2">
                        {service.badge && (
                          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-medium text-gold px-2 py-0.5 border border-gold/30 bg-gold/5 rounded-none">
                            {service.badge}
                          </span>
                        )}
                        <span className="text-xs font-sans text-taupe flex items-center gap-1.5">
                          <Clock size={12} className="text-gold" />
                          {service.durationMinutes} Minutes
                        </span>
                      </div>

                      {/* Service Title */}
                      <h3 className="font-serif text-2xl md:text-3xl text-ivory group-hover:text-gold-light transition-colors duration-300">
                        {service.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs md:text-sm text-taupe mt-2 font-sans leading-relaxed max-w-xl">
                        {service.shortDescription}
                      </p>

                      {/* Quick Details Trigger */}
                      <button
                        type="button"
                        onClick={() => setSelectedServiceModal(service)}
                        className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-gold hover:text-gold-light transition-colors"
                      >
                        <Info size={12} />
                        <span>View Ritual Details & Inclusions</span>
                      </button>
                    </div>

                    {/* Pricing & Booking Trigger */}
                    <div className="flex items-center md:flex-col md:items-end justify-between md:justify-center gap-3 shrink-0 pt-2 md:pt-0 border-t border-white/5 md:border-0">
                      <span className="font-serif text-3xl text-gold font-light">
                        {service.priceFormatted}
                      </span>
                      <Button
                        to={`/book?service=${service.id}`}
                        variant="primary"
                        size="sm"
                        className="shadow-gold-glow"
                        icon={<ArrowUpRight size={13} />}
                      >
                        Book This
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Column: Sticky Editorial Hover Image Preview */}
            <div className="lg:col-span-5 hidden lg:block sticky top-32">
              <div className="relative aspect-[4/5] overflow-hidden border border-gold/30 bg-espresso shadow-2xl p-2.5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredService?.id || "fallback"}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="relative w-full h-full overflow-hidden"
                  >
                    <img
                      src={hoveredService?.imageUrl}
                      alt={hoveredService?.alt}
                      className="w-full h-full object-cover object-center filter contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-1">
                        Currently Previewing
                      </span>
                      <h4 className="font-serif text-2xl text-ivory mb-1">
                        {hoveredService?.name}
                      </h4>
                      <p className="text-xs font-sans text-ivory-dim italic">
                        {hoveredService?.priceFormatted} · {hoveredService?.durationMinutes} min allocation
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Consultation Note */}
              <div className="mt-6 p-5 border border-gold/15 bg-espresso/40 backdrop-blur-sm">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans block mb-1.5">
                  Bespoke Consultation
                </span>
                <p className="text-xs font-sans text-taupe leading-relaxed">
                  Unsure which ritual fits your hair texture? Reserve an exploratory 20-minute consultation with creative director Isabella Laurent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Service Inclusions Modal */}
        <AnimatePresence>
          {selectedServiceModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedServiceModal(null)}
                className="absolute inset-0 bg-ink/90 backdrop-blur-md"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-2xl bg-espresso border border-gold/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-gold/15 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-1">
                      Ritual Specification
                    </span>
                    <h3 className="font-serif text-3xl text-ivory">
                      {selectedServiceModal.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-xs font-sans text-taupe">
                      <span>Duration: {selectedServiceModal.durationMinutes} mins</span>
                      <span>·</span>
                      <span className="text-gold font-medium">{selectedServiceModal.priceFormatted}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedServiceModal(null)}
                    className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-ivory hover:text-gold hover:border-gold transition-colors focus:outline-none"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-sans mb-2 font-medium">
                      Description & Methodology
                    </h4>
                    <p className="text-sm font-sans text-ivory-dim leading-relaxed">
                      {selectedServiceModal.fullDescription}
                    </p>
                  </div>

                  {selectedServiceModal.inclusions && (
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-sans mb-3 font-medium">
                        What Every Session Includes
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedServiceModal.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-taupe font-sans">
                            <Check size={14} className="text-gold shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-6 bg-ink/60 border-t border-gold/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-taupe block font-sans">
                      All Inclusive Price
                    </span>
                    <span className="font-serif text-2xl text-gold font-light">
                      {selectedServiceModal.priceFormatted}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedServiceModal(null)}
                    >
                      Close
                    </Button>
                    <Button
                      to={`/book?service=${selectedServiceModal.id}`}
                      variant="primary"
                      size="sm"
                      className="shadow-gold-glow"
                      icon={<ArrowUpRight size={14} />}
                    >
                      Book This Service
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
