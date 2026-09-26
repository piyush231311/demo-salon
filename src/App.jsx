import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { GrainOverlay } from "./components/common/GrainOverlay";
import { CustomCursor } from "./components/common/CustomCursor";
import { SmoothScroll } from "./components/common/SmoothScroll";

// Pages
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { BookingPage } from "./pages/BookingPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <div className="relative min-h-screen bg-ink text-ivory flex flex-col font-sans selection:bg-gold/30 selection:text-ivory">
          {/* Subtle Film Grain Texture */}
          <GrainOverlay />

          {/* Desktop Custom Follower Cursor */}
          <CustomCursor />

          {/* Sticky Navigation Header */}
          <Navbar />

          {/* Main Animated Page Outlet */}
          <main className="flex-grow flex flex-col">
            <AnimatedRoutes />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
