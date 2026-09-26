/**
 * Maison Aurelia — Brand Configuration
 * Easily swap brand identity, founder, copy, contact info, and hours from this file.
 */

export const salonConfig = {
  name: "Maison Aurelia",
  shortName: "Aurelia",
  tagline: "Haute Coiffure & Bespoke Beauty Sanctuary",
  established: 2009,
  address: {
    street: "482 Rue Vivienne, 1er Arrondissement",
    city: "Paris",
    postalCode: "75002",
    country: "France",
    full: "482 Rue Vivienne, 75002 Paris, France",
    googleMapsUrl: "https://maps.google.com/?q=Paris+France+Haute+Coiffure",
  },
  contact: {
    phone: "+33 (0)1 42 68 90 20",
    phoneDisplay: "+33 1 42 68 90 20",
    conciergeEmail: "concierge@maison-aurelia.com",
    bookingEmail: "appointments@maison-aurelia.com",
    whatsapp: "+33142689020",
  },
  hours: [
    { day: "Tuesday – Thursday", open: "10:00", close: "19:00", note: "Extended evening consultations by appointment" },
    { day: "Friday", open: "09:30", close: "20:00", note: "Champagne service after 17:00" },
    { day: "Saturday", open: "09:00", close: "18:30", note: "Bridal suites open from 07:30" },
    { day: "Sunday – Monday", open: "Closed", close: "Closed", note: "Private atelier buyouts available" },
  ],
  founder: {
    name: "Isabella Laurent",
    title: "Founder & Creative Director",
    experienceYears: 15,
    philosophy: "Beauty as Craft",
    quote: "True luxury is never loud. It is the quiet precision of a hand that understands the natural fall of hair, the subtle nuance of light against pigment, and the sacred calm of time well spent.",
    bio: [
      "Trained between the historic coiffure houses of Paris and the vibrant editorial runways of Milan, Isabella Laurent founded Maison Aurelia with a single, resolute conviction: that hairdressing is not a routine service, but a high decorative craft.",
      "Over fifteen years, her understated architectural cuts and naturalistic dimensional colour have graced international fashion weeks, private clientele, and discerning patrons who prize elegance over fleeting spectacle.",
      "Every appointment at Maison Aurelia is conceived as an intimate sensory ritual — marrying rare botanical tinctures, bespoke tailoring, and uninterrupted acoustic serenity.",
    ],
    signature: "Isabella Laurent",
    portraitUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    portraitAlt: "Isabella Laurent, Founder and Creative Director of Maison Aurelia",
  },
  stats: [
    { value: "15", label: "Years of Craft", suffix: "+" },
    { value: "8.4k", label: "Devoted Patrons", suffix: "" },
    { value: "14", label: "International Accolades", suffix: "" },
    { value: "100%", label: "Bespoke Formulations", suffix: "" },
  ],
  pressMentions: [
    { publication: "VOGUE", quote: "Paris's most discreet haven for bespoke colour and transformative cuts." },
    { publication: "ELLE", quote: "The architectural interior alone lowers your pulse — the hair work is pure alchemy." },
    { publication: "HARPER'S BAZAAR", quote: "A quiet luxury temple where beauty is approached like haute couture." },
    { publication: "L'OFFICIEL", quote: "Isabella Laurent has redefined the modern salon experience with singular poise." },
  ],
  socials: [
    { name: "Instagram", handle: "@maisonaurelia", url: "https://instagram.com" },
    { name: "Pinterest", handle: "Maison Aurelia Paris", url: "https://pinterest.com" },
    { name: "Editorial Journal", handle: "Aurelia Journal", url: "#" },
  ],
  seo: {
    siteTitle: "Maison Aurelia — Haute Coiffure & Beauty Sanctuary",
    defaultDescription: "Experience quiet luxury coiffure, bespoke colour, holistic scalp rituals, and bridal couture at Maison Aurelia Paris.",
    themeColor: "#0E0B0A",
  },
};
