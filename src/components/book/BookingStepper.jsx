import React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

export function BookingStepper({ currentStep, steps, onStepClick }) {
  return (
    <div className="w-full mb-10 overflow-x-auto pb-4 scrollbar-none">
      <div className="flex items-center justify-between min-w-[620px] max-w-4xl mx-auto px-4">
        {steps.map((step, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isClickable = stepNumber < currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle & Label */}
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(stepNumber)}
                className={cn(
                  "flex items-center gap-3 transition-all duration-300 focus:outline-none group",
                  isClickable ? "cursor-pointer" : "cursor-default"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif transition-all duration-300",
                    isCompleted
                      ? "bg-gold text-ink font-semibold"
                      : isCurrent
                      ? "border-2 border-gold text-gold bg-gold/10 shadow-gold-glow"
                      : "border border-white/20 text-taupe bg-ink"
                  )}
                >
                  {isCompleted ? <Check size={14} strokeWidth={2.5} /> : stepNumber}
                </div>

                <div className="text-left">
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-[0.2em] font-sans block leading-none transition-colors",
                      isCurrent
                        ? "text-gold font-medium"
                        : isCompleted
                        ? "text-ivory group-hover:text-gold"
                        : "text-taupe"
                    )}
                  >
                    Step 0{stepNumber}
                  </span>
                  <span
                    className={cn(
                      "font-serif text-sm tracking-wide transition-colors",
                      isCurrent
                        ? "text-ivory font-medium"
                        : isCompleted
                        ? "text-ivory-dim"
                        : "text-taupe/70"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              </button>

              {/* Connecting Line between steps */}
              {idx < steps.length - 1 && (
                <div className="flex-1 mx-4 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent">
                  <div
                    className={cn(
                      "h-full bg-gold transition-all duration-500",
                      stepNumber < currentStep ? "w-full" : "w-0"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
