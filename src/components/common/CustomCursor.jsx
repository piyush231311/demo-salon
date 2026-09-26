import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState("default"); // default, hover, text, drag
  const [cursorLabel, setCursorLabel] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor physics
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch screens or reduced motion
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check target element
      const target = e.target.closest("button, a, [data-cursor], input, select, textarea");
      if (target) {
        const customText = target.getAttribute("data-cursor");
        if (customText) {
          setCursorType("custom");
          setCursorLabel(customText);
        } else {
          setCursorType("hover");
          setCursorLabel("");
        }
      } else {
        setCursorType("default");
        setCursorLabel("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Follower Ring */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-gold/60 flex items-center justify-center text-[10px] tracking-widest uppercase font-serif text-ivory backdrop-blur-[1px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "custom" ? 64 : cursorType === "hover" ? 48 : 28,
          height: cursorType === "custom" ? 64 : cursorType === "hover" ? 48 : 28,
          backgroundColor:
            cursorType === "custom"
              ? "rgba(201, 169, 110, 0.25)"
              : cursorType === "hover"
              ? "rgba(201, 169, 110, 0.15)"
              : "rgba(201, 169, 110, 0.03)",
          borderColor: cursorType === "hover" || cursorType === "custom" ? "rgba(201, 169, 110, 0.9)" : "rgba(201, 169, 110, 0.4)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      >
        {cursorLabel && <span className="select-none font-medium text-gold-light scale-90">{cursorLabel}</span>}
      </motion.div>

      {/* Tiny Gold Center Dot */}
      <motion.div
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_#C9A96E]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: cursorType === "custom" ? 0 : 1,
          scale: cursorType === "hover" ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
