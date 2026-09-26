import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { salonConfig } from "../../data/salonConfig";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { Button } from "./Button";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services & Pricing" },
    { to: "/reviews", label: "Reviews & Craft" },
    { to: "/book", label: "Book Atelier" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-ink/90 backdrop-blur-md py-4 border-b border-gold/15 shadow-2xl"
            : "bg-transparent py-6 md:py-8 border-b border-white/5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between w-full">
          {/* Brand Logo & Monogram */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center bg-espresso/40 group-hover:border-gold group-hover:shadow-gold-glow transition-all duration-500">
              <span className="font-serif italic text-gold text-lg select-none">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-light tracking-wide text-ivory group-hover:text-gold-light transition-colors duration-300">
                {salonConfig.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-taupe group-hover:text-ivory-dim transition-colors">
                Paris · Haute Coiffure
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 relative py-1",
                    isActive
                      ? "text-gold"
                      : "text-ivory-muted hover:text-ivory"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Button
              to="/book"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              icon={<ArrowUpRight size={14} />}
            >
              Book Experience
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-ivory hover:text-gold hover:border-gold transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl flex flex-col justify-between px-8 pt-28 pb-12 lg:hidden"
          >
            {/* Background luxury glow */}
            <div className="absolute top-1/3 -left-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-6 max-w-sm">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans font-medium">
                Atelier Navigation
              </span>
              <div className="flex flex-col gap-5">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                  >
                    <Link
                      to={link.to}
                      className={cn(
                        "font-serif text-3xl sm:text-4xl font-light tracking-wide transition-colors block",
                        location.pathname === link.to ? "text-gold italic" : "text-ivory hover:text-gold"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Footer Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="pt-8 border-t border-gold/15 flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-taupe">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                  <span>{salonConfig.address.full}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={14} className="text-gold shrink-0 mt-0.5" />
                  <span>Tue – Sat: 10:00 – 19:00</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button to="/book" variant="primary" size="md" className="w-full justify-center">
                  Book Reservation
                </Button>
                <a
                  href={`tel:${salonConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gold/30 text-xs uppercase tracking-widest text-ivory hover:border-gold"
                >
                  <Phone size={14} className="text-gold" />
                  Call Concierge
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
