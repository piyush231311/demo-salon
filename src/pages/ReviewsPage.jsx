import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, Quote, Sparkles, Filter } from "lucide-react";
import { reviewSummary, reviews, featuredQuotes } from "../data/testimonials";
import { SectionHeading } from "../components/common/SectionHeading";
import { BeforeAfterSlider } from "../components/reviews/BeforeAfterSlider";
import { PageTransition } from "../components/common/PageTransition";
import { Button } from "../components/common/Button";
import { cn } from "../lib/utils";

export function ReviewsPage() {
  const [filterRating, setFilterRating] = useState("all");

  const filteredReviews =
    filterRating === "all"
      ? reviews
      : reviews.filter((r) => r.rating === parseInt(filterRating, 10));

  return (
    <PageTransition>
      <div className="pt-28 pb-32 bg-ink min-h-screen text-ivory">
        {/* Page Hero Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-16 text-center">
          <SectionHeading
            kicker="Patron Praises & Press"
            title="Reflections of Excellence."
            subtitle="The intimate testimonies of patrons who trust Maison Aurelia with their image, confidence, and sacred moments."
            className="mx-auto"
            size="lg"
          />

          {/* Overall Rating Overview Dashboard */}
          <div className="mt-14 max-w-4xl mx-auto bg-espresso border border-gold/25 p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Score Big Display */}
              <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gold/15 pb-6 md:pb-0">
                <span className="font-serif text-6xl md:text-7xl text-gold font-light tracking-tight">
                  {reviewSummary.averageRating}
                </span>
                <div className="flex items-center gap-1 my-2 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#C9A96E" stroke="#C9A96E" />
                  ))}
                </div>
                <span className="text-xs uppercase tracking-[0.2em] font-sans text-taupe">
                  Based on {reviewSummary.totalReviews} Verified Visits
                </span>
              </div>

              {/* Breakdown Bars */}
              <div className="md:col-span-5 space-y-2 text-xs font-sans">
                {reviewSummary.breakdown.map((row) => (
                  <div key={row.stars} className="flex items-center gap-3">
                    <span className="w-12 text-taupe flex items-center gap-1 justify-end">
                      {row.stars} <Star size={10} className="text-gold" />
                    </span>
                    <div className="flex-1 h-2 bg-ink rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full transition-all duration-500"
                        style={{ width: `${row.percentage}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-ivory-dim font-mono">
                      {row.percentage}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Recommendation rate pill */}
              <div className="md:col-span-3 flex flex-col items-center justify-center text-center pt-4 md:pt-0">
                <span className="font-serif text-3xl text-gold-light">
                  {reviewSummary.recommendationRate}
                </span>
                <span className="text-xs font-sans text-taupe uppercase tracking-widest mt-1">
                  Patron Return & Recommendation
                </span>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] text-gold/80">
                  <CheckCircle size={13} />
                  <span>100% Verified Patrons</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Before & After Split Slider */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-gold/15">
          <SectionHeading
            kicker="Atelier Transformations"
            title="The Living Metamorphosis."
            subtitle="Explore how customized placement of light and architectural scissors liberate natural form."
            className="mb-14"
          />

          <BeforeAfterSlider />
        </section>

        {/* SECTION: Masonry Review Cards */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-gold/15">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeading
              align="left"
              kicker="Guestbook Records"
              title="Words from Our Patrons."
              subtitle="Unedited expressions from our Parisian atelier register."
            />

            <Button to="/book" variant="primary" size="md">
              Book Your Appointment
            </Button>
          </div>

          {/* Masonry Columns Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredReviews.map((rev, idx) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="break-inside-avoid bg-espresso border border-gold/20 p-7 group hover:border-gold/50 transition-all duration-300 shadow-xl"
              >
                {/* Header with Avatar and Stars */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.alt}
                      className="w-11 h-11 rounded-full object-cover border border-gold/30 p-0.5"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif text-lg text-ivory">
                          {rev.name}
                        </span>
                        {rev.verified && (
                          <span title="Verified Patron Visit">
                            <CheckCircle size={13} className="text-gold" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-sans text-taupe block">
                        {rev.role} · {rev.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-gold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="#C9A96E" stroke="#C9A96E" />
                    ))}
                  </div>
                </div>

                {/* Service Tag */}
                <div className="mb-4 inline-block px-2.5 py-1 bg-ink/70 border border-gold/15 text-[10px] uppercase tracking-wider text-gold font-sans">
                  {rev.service} · {rev.stylist}
                </div>

                {/* Review Text */}
                <blockquote className="font-sans text-xs md:text-sm text-ivory-dim leading-relaxed mb-4">
                  "{rev.quote}"
                </blockquote>

                {/* Date */}
                <div className="text-[10px] uppercase tracking-widest text-taupe font-mono pt-3 border-t border-white/5">
                  {rev.date}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
