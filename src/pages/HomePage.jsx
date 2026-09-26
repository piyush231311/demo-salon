import React from "react";
import { PageTransition } from "../components/common/PageTransition";
import { HeroCinematic } from "../components/home/HeroCinematic";
import { FounderSection } from "../components/home/FounderSection";
import { ServicesTeaser } from "../components/home/ServicesTeaser";
import { TestimonialSlider } from "../components/home/TestimonialSlider";
import { AtelierAtmosphere } from "../components/home/AtelierAtmosphere";

export function HomePage() {
  return (
    <PageTransition>
      <div className="bg-ink min-h-screen">
        {/* Full-Screen Hero */}
        <HeroCinematic />

        {/* Founder Narrative & Stats */}
        <FounderSection />

        {/* Service Teaser Rows with Hover Preview */}
        <ServicesTeaser />

        {/* Atelier Architectural Atmosphere */}
        <AtelierAtmosphere />

        {/* Press Accolades & Testimonial Carousel */}
        <TestimonialSlider />
      </div>
    </PageTransition>
  );
}
