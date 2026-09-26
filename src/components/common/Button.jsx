import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useMagnetic } from "../../hooks/useMagnetic";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  magnetic = true,
  to,
  href,
  onClick,
  disabled = false,
  type = "button",
  icon,
  iconPosition = "right",
  ...props
}) {
  const magneticRef = useMagnetic(magnetic && !disabled ? 0.35 : 0);

  const baseStyles =
    "relative inline-flex items-center justify-center font-sans tracking-widest text-xs uppercase font-medium transition-all duration-300 select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-[11px] gap-1.5",
    md: "px-6 py-3.5 text-xs gap-2.5",
    lg: "px-8 py-4 text-xs tracking-[0.2em] gap-3",
  };

  const variantStyles = {
    primary:
      "bg-gold text-ink border border-gold hover:bg-gold-light hover:shadow-gold-glow hover:text-ink active:scale-[0.98]",
    secondary:
      "bg-transparent text-ivory border border-gold/40 hover:border-gold hover:bg-gold/10 hover:shadow-gold-glow active:scale-[0.98]",
    dark:
      "bg-espresso-light text-ivory border border-white/10 hover:border-gold/50 hover:bg-espresso active:scale-[0.98]",
    ghost:
      "bg-transparent text-ivory-muted hover:text-gold border border-transparent hover:border-gold/20",
    goldUnderline:
      "bg-transparent text-gold hover:text-gold-light px-0 py-1 border-b border-gold/40 hover:border-gold tracking-widest",
  };

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
      )}
    </>
  );

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (to) {
    return (
      <Link ref={magneticRef} to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={magneticRef}
        href={href}
        className={combinedClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={magneticRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
