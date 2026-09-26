import React from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "../components/common/PageTransition";
import { Button } from "../components/common/Button";
import { ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center bg-ink text-ivory px-6 text-center">
        <div className="max-w-md">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans font-medium block mb-3">
            Error 404
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-ivory mb-4">
            Sanctuary Not Found
          </h1>
          <p className="text-sm font-sans text-taupe leading-relaxed mb-8">
            The page you are seeking is beyond the atelier doors or has been moved.
          </p>
          <Button to="/" variant="primary" size="md" icon={<ArrowLeft size={14} />} iconPosition="left">
            Return to Sanctuary
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
