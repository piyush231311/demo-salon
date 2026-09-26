import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { services } from "../data/services";
import { stylists } from "../data/stylists";
import { calendarProvider } from "../lib/calendarProvider";
import { PageTransition } from "../components/common/PageTransition";
import { BookingStepper } from "../components/book/BookingStepper";
import { BookingSummarySidebar } from "../components/book/BookingSummarySidebar";
import { StepService } from "../components/book/StepService";
import { StepStylist } from "../components/book/StepStylist";
import { StepCalendar } from "../components/book/StepCalendar";
import { StepTimeSlots } from "../components/book/StepTimeSlots";
import { StepDetails } from "../components/book/StepDetails";
import { StepConfirmation } from "../components/book/StepConfirmation";
import { Button } from "../components/common/Button";
import { ArrowLeft, ArrowRight, AlertCircle, ShieldAlert } from "lucide-react";

export function BookingPage() {
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get("service");

  // Multi-step state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [guestDetails, setGuestDetails] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    beveragePreference: "herbal-infusion",
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingResult, setBookingResult] = useState(null);

  // Handle URL preselected service
  useEffect(() => {
    if (preselectedServiceId) {
      const match = services.find((s) => s.id === preselectedServiceId);
      if (match) {
        setSelectedService(match);
        // Advance to step 2 if preselected
        setCurrentStep(2);
      }
    }
  }, [preselectedServiceId]);

  const steps = [
    { id: 1, title: "Ritual" },
    { id: 2, title: "Stylist" },
    { id: 3, title: "Date" },
    { id: 4, title: "Time" },
    { id: 5, title: "Details" },
    { id: 6, title: "Confirmation" },
  ];

  // Validation rules before proceeding
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!selectedService;
      case 2:
        return !!selectedStylist;
      case 3:
        return !!selectedDate;
      case 4:
        return !!selectedTime;
      case 5:
        return (
          guestDetails.clientName?.trim().length > 1 &&
          guestDetails.clientEmail?.includes("@") &&
          guestDetails.clientPhone?.trim().length > 5
        );
      default:
        return true;
    }
  };

  const handleNext = async () => {
    setBookingError("");

    if (currentStep === 5) {
      // Execute final booking with double-booking safety check
      setIsSubmitting(true);
      try {
        const appointmentPayload = {
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          stylistId: selectedStylist.id,
          stylistName: selectedStylist.name,
          date: selectedDate,
          time: selectedTime,
          durationMinutes: selectedService.durationMinutes,
          clientName: guestDetails.clientName,
          clientEmail: guestDetails.clientEmail,
          clientPhone: guestDetails.clientPhone,
          specialRequests: guestDetails.specialRequests,
          beveragePreference: guestDetails.beveragePreference,
        };

        const result = await calendarProvider.createAppointment(appointmentPayload);

        if (result.success) {
          setBookingResult(result);
          setCurrentStep(6);
        } else {
          // Double-booking or provider rejection
          setBookingError(result.error || "Unable to reserve this slot. Please select an alternate time.");
        }
      } catch (err) {
        setBookingError(err.message || "An unexpected error occurred while securing your appointment.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setBookingError("");
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate("");
    setSelectedTime("");
    setGuestDetails({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      beveragePreference: "herbal-infusion",
      specialRequests: "",
    });
    setBookingResult(null);
    setBookingError("");
    setCurrentStep(1);
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-32 bg-ink min-h-screen text-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
          {/* Top Stepper (Hidden on final confirmation for clean celebration) */}
          {currentStep < 6 && (
            <BookingStepper
              currentStep={currentStep}
              steps={steps}
              onStepClick={(step) => setCurrentStep(step)}
            />
          )}

          {/* Error Banner (e.g. Double-booking detected) */}
          {bookingError && (
            <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-950/40 border border-red-500/40 text-red-200 text-sm font-sans flex items-start gap-3">
              <ShieldAlert size={18} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-100">Notice from Atelier Register</p>
                <p className="mt-0.5">{bookingError}</p>
              </div>
            </div>
          )}

          {/* Main Layout: Multi-Step Form (Left) & Live Summary Sidebar (Right) */}
          {currentStep === 6 ? (
            <StepConfirmation bookingResult={bookingResult} onReset={handleReset} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Form Step Workspace */}
              <div className="lg:col-span-8 bg-espresso/30 border border-gold/15 p-6 md:p-10 shadow-xl">
                {currentStep === 1 && (
                  <StepService
                    selectedService={selectedService}
                    onSelectService={(srv) => {
                      setSelectedService(srv);
                      setBookingError("");
                    }}
                  />
                )}

                {currentStep === 2 && (
                  <StepStylist
                    selectedStylist={selectedStylist}
                    onSelectStylist={(stylist) => {
                      setSelectedStylist(stylist);
                      setBookingError("");
                    }}
                  />
                )}

                {currentStep === 3 && (
                  <StepCalendar
                    selectedDate={selectedDate}
                    onSelectDate={(date) => {
                      setSelectedDate(date);
                      setSelectedTime(""); // Reset time on date change
                      setBookingError("");
                    }}
                  />
                )}

                {currentStep === 4 && (
                  <StepTimeSlots
                    selectedDate={selectedDate}
                    selectedService={selectedService}
                    selectedStylist={selectedStylist}
                    selectedTime={selectedTime}
                    onSelectTime={(time) => {
                      setSelectedTime(time);
                      setBookingError("");
                    }}
                  />
                )}

                {currentStep === 5 && (
                  <StepDetails
                    guestDetails={guestDetails}
                    onChangeDetails={setGuestDetails}
                  />
                )}

                {/* Bottom Navigation Buttons */}
                <div className="mt-12 pt-8 border-t border-gold/15 flex items-center justify-between gap-4">
                  {currentStep > 1 ? (
                    <Button
                      onClick={handleBack}
                      variant="secondary"
                      size="md"
                      icon={<ArrowLeft size={14} />}
                      iconPosition="left"
                    >
                      Previous Step
                    </Button>
                  ) : (
                    <div />
                  )}

                  <Button
                    onClick={handleNext}
                    variant="primary"
                    size="md"
                    disabled={!canProceed() || isSubmitting}
                    icon={<ArrowRight size={14} />}
                  >
                    {isSubmitting
                      ? "Confirming With Atelier..."
                      : currentStep === 5
                      ? "Complete & Confirm Reservation"
                      : "Continue"}
                  </Button>
                </div>
              </div>

              {/* Sticky Summary Sidebar */}
              <div className="lg:col-span-4 sticky top-28">
                <BookingSummarySidebar
                  selectedService={selectedService}
                  selectedStylist={selectedStylist}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  currentStep={currentStep}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
