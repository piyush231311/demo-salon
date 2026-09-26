import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { beforeAfterTransformations } from "../../data/gallery";
import { Sparkles, MoveHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";

export function BeforeAfterSlider() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeCase = beforeAfterTransformations[activeCaseIndex];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Transformation Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {beforeAfterTransformations.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveCaseIndex(idx);
              setSliderPos(50);
            }}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300",
              activeCaseIndex === idx
                ? "bg-gold text-ink font-medium shadow-gold-glow"
                : "bg-espresso/60 text-taupe border border-gold/20 hover:text-ivory hover:border-gold"
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Main Interactive Split Container */}
      <div className="max-w-4xl mx-auto w-full">
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full select-none overflow-hidden border border-gold/30 bg-espresso shadow-2xl cursor-ew-resize group"
          data-cursor="DRAG"
        >
          {/* AFTER Image (Full background) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={activeCase.afterImage}
              alt={activeCase.afterAlt}
              className="w-full h-full object-cover object-center"
              draggable="false"
            />
            {/* After Tag */}
            <div className="absolute top-4 right-4 bg-espresso/90 backdrop-blur-md px-3.5 py-1.5 border border-gold/40 shadow-lg pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium flex items-center gap-1.5">
                <Sparkles size={11} className="text-gold" />
                After Aurelia
              </span>
            </div>
          </div>

          {/* BEFORE Image (Clipped Left Side) */}
          <div
            className="absolute inset-0 h-full overflow-hidden pointer-events-none"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={activeCase.beforeImage}
              alt={activeCase.beforeAlt}
              className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%",
                height: "100%",
              }}
              draggable="false"
            />
            {/* Before Tag */}
            <div className="absolute top-4 left-4 bg-ink/90 backdrop-blur-md px-3.5 py-1.5 border border-white/20 shadow-lg pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.25em] text-ivory-dim font-sans font-medium">
                Initial State
              </span>
            </div>
          </div>

          {/* Splitter Line & Draggable Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-gold pointer-events-none shadow-[0_0_12px_#C9A96E]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-espresso border border-gold flex items-center justify-center text-gold shadow-gold-glow pointer-events-auto">
              <MoveHorizontal size={16} />
            </div>
          </div>
        </div>

        {/* Transformation Case Details Footer */}
        <div className="mt-6 p-6 bg-espresso/60 border border-gold/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1 text-xs font-sans text-taupe">
              <span className="text-gold font-medium">{activeCase.category}</span>
              <span>·</span>
              <span>Master Stylist: {activeCase.stylist}</span>
              <span>·</span>
              <span>Session: {activeCase.duration}</span>
            </div>
            <h4 className="font-serif text-2xl text-ivory">
              {activeCase.title}
            </h4>
            <p className="text-xs md:text-sm font-sans text-taupe mt-1 max-w-2xl leading-relaxed">
              {activeCase.description}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest text-taupe font-sans">
              Drag bar to compare
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
