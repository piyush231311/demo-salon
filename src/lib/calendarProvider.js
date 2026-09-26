/**
 * Maison Aurelia — Calendar Provider Adapter
 * Clean adapter exposing getAvailability and createAppointment.
 * Supports:
 * 1. Mock Provider: Instant out-of-the-box demo with realistic atelier hours (10:00 - 19:00)
 *    and localStorage persistence with double-booking prevention.
 * 2. Google Calendar Provider: Connects to serverless backend (/api/calendar) with OAuth2
 *    and freebusy verification.
 */

const STORAGE_KEY = "maison_aurelia_booked_slots";

// Read persisted bookings from localStorage
function getBookedSlotsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Save booking to localStorage
function saveBookingToStorage(booking) {
  try {
    const existing = getBookedSlotsFromStorage();
    existing.push(booking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error("Could not persist booking to storage", e);
  }
}

/**
 * Mock deterministic slot availability generator
 */
function generateMockSlots(dateStr, durationMinutes = 60, stylistId = "isabella-laurent") {
  const date = new Date(dateStr + "T00:00:00");
  const dayOfWeek = date.getDay(); // 0 is Sunday, 1 is Monday

  // Atelier is closed Sunday (0) and Monday (1)
  if (dayOfWeek === 0 || dayOfWeek === 1) {
    return {
      date: dateStr,
      isClosed: true,
      reason: "The atelier is closed on Sundays and Mondays for private buyouts and artistic research.",
      slots: [],
    };
  }

  // Check if date is in past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) {
    return {
      date: dateStr,
      isPast: true,
      reason: "This date has already passed.",
      slots: [],
    };
  }

  // Working hours: Friday 09:30 to 20:00, Saturday 09:00 to 18:30, others 10:00 to 19:00
  let openHour = 10;
  let closeHour = 19;
  let startMinutes = 0;

  if (dayOfWeek === 5) {
    // Friday
    openHour = 9;
    startMinutes = 30;
    closeHour = 20;
  } else if (dayOfWeek === 6) {
    // Saturday
    openHour = 9;
    startMinutes = 0;
    closeHour = 18;
  }

  const bookedStorage = getBookedSlotsFromStorage();
  const currentSlots = [];

  // Generate 30-minute intervals
  let currentTotalMinutes = openHour * 60 + startMinutes;
  const closeTotalMinutes = closeHour * 60;

  // Simple pseudo-random hash based on date and stylist for deterministic demo busy slots
  const hashSeed = (dateStr + stylistId).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  while (currentTotalMinutes + durationMinutes <= closeTotalMinutes) {
    const hours = Math.floor(currentTotalMinutes / 60);
    const mins = currentTotalMinutes % 60;
    const timeStr = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

    // Check if slot conflicts with any locally booked appointments
    const isLocallyBooked = bookedStorage.some((b) => {
      if (b.date !== dateStr) return false;
      if (b.stylistId && b.stylistId !== stylistId) return false;
      
      const [bH, bM] = b.time.split(":").map(Number);
      const bStart = bH * 60 + bM;
      const bEnd = bStart + (b.durationMinutes || 60);

      const slotStart = currentTotalMinutes;
      const slotEnd = slotStart + durationMinutes;

      // Overlap formula: startA < endB && endA > startB
      return slotStart < bEnd && slotEnd > bStart;
    });

    // Generate realistic busy slots (e.g. popular afternoon times 13:00, 15:30)
    const slotHash = (hashSeed + currentTotalMinutes) % 10;
    const isMockBusy = slotHash === 2 || slotHash === 6;

    const isAvailable = !isLocallyBooked && !isMockBusy;

    currentSlots.push({
      time: timeStr,
      available: isAvailable,
      period: hours < 12 ? "morning" : hours < 16 ? "afternoon" : "evening",
      reason: !isAvailable ? (isLocallyBooked ? "Reserved" : "Patron Booked") : null,
    });

    currentTotalMinutes += 30;
  }

  return {
    date: dateStr,
    isClosed: false,
    slots: currentSlots,
  };
}

/**
 * Main Calendar Provider Object
 */
export const calendarProvider = {
  /**
   * Get slot availability for given date and service duration
   * @param {string} date - "YYYY-MM-DD"
   * @param {number} durationMinutes - e.g. 75
   * @param {string} stylistId - stylist identifier
   */
  async getAvailability(date, durationMinutes = 60, stylistId = "isabella-laurent") {
    const providerMode = import.meta.env.VITE_CALENDAR_PROVIDER || "mock";

    if (providerMode === "google") {
      try {
        const response = await fetch(`/api/calendar/availability?date=${date}&duration=${durationMinutes}&stylistId=${stylistId}`);
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (err) {
        console.warn("Google Calendar API call failed, gracefully falling back to mock provider", err);
      }
    }

    // Default & Fallback Mock Provider with realistic latency
    await new Promise((resolve) => setTimeout(resolve, 280));
    return generateMockSlots(date, durationMinutes, stylistId);
  },

  /**
   * Create an appointment with double-booking safety check
   * @param {Object} details
   */
  async createAppointment(details) {
    const {
      serviceId,
      serviceName,
      stylistId,
      stylistName,
      date,
      time,
      durationMinutes = 60,
      clientName,
      clientEmail,
      clientPhone,
      specialRequests = "",
    } = details;

    if (!date || !time || !serviceName || !clientName || !clientEmail) {
      throw new Error("Missing required appointment fields.");
    }

    const providerMode = import.meta.env.VITE_CALENDAR_PROVIDER || "mock";

    // 1. Google Calendar Integration via /api/calendar
    if (providerMode === "google") {
      try {
        const response = await fetch("/api/calendar/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(details),
        });

        const result = await response.json();
        if (response.ok && result.success) {
          return result;
        } else if (result.error) {
          throw new Error(result.error);
        }
      } catch (err) {
        console.warn("Google Calendar booking request failed or backend unconfigured. Falling back to local reservation.", err);
      }
    }

    // 2. Mock Provider with Double-Booking check
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Double-booking check: verify slot hasn't been reserved right before insertion
    const booked = getBookedSlotsFromStorage();
    const [h, m] = time.split(":").map(Number);
    const slotStart = h * 60 + m;
    const slotEnd = slotStart + durationMinutes;

    const conflict = booked.find((b) => {
      if (b.date !== date) return false;
      if (b.stylistId && b.stylistId !== stylistId) return false;
      const [bH, bM] = b.time.split(":").map(Number);
      const bStart = bH * 60 + bM;
      const bEnd = bStart + (b.durationMinutes || 60);
      return slotStart < bEnd && slotEnd > bStart;
    });

    if (conflict) {
      return {
        success: false,
        error: "This reservation window has just been secured by another patron. Please select an adjacent time.",
      };
    }

    const appointmentId = `AUR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = {
      appointmentId,
      serviceId,
      serviceName,
      stylistId,
      stylistName,
      date,
      time,
      durationMinutes,
      clientName,
      clientEmail,
      clientPhone,
      specialRequests,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    saveBookingToStorage(newBooking);

    return {
      success: true,
      appointmentId,
      provider: "mock",
      details: newBooking,
      message: "Your appointment has been confirmed in the Maison Aurelia guest register.",
    };
  },
};
