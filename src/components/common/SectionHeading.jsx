import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center", // "left", "center", "right"
  className = "",
  titleClassName = "",
  size = "md", // "sm", "md", "lg", "xl"
  light = false,
}) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const sizeClasses = {
    sm: "text-3xl md:text-4xl lg:text-5xl",
    md: "text-4xl md:text-5xl lg:text-6xl",
    lg: "text-5xl md:text-6xl lg:text-7xl",
    xl: "text-6xl md:text-7xl lg:text-8xl",
  };

  return (
    <div className={cn("flex flex-col max-w-4xl", alignClasses[align], className)}>
      {/* Small Caps Editorial Kicker */}
      {kicker && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-6 h-[1px] bg-gold/60 inline-block" />
          <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase font-sans font-medium text-gold">
            {kicker}
          </span>
          <span className="w-6 h-[1px] bg-gold/60 inline-block" />
        </motion.div>
      )}

      {/* Main Masked Serif Headline */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className={cn(
            "font-serif font-light tracking-tight leading-[1.08] text-ivory",
            sizeClasses[size],
            titleClassName
          )}
        >
          {title}
        </motion.h2>
      </div>

      {/* Subtitle / Descriptive Copy */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className={cn(
            "mt-5 text-base md:text-lg font-sans font-light leading-relaxed max-w-2xl",
            light ? "text-ivory-dim" : "text-taupe"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
