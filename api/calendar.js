/**
 * Maison Aurelia — Google Calendar API Integration Handler
 * Serverless / Express endpoint for Google Calendar OAuth2, FreeBusy query, and event creation.
 * 
 * Works out-of-the-box as a Vercel Serverless Function (/api/calendar)
 * or as a route handler in Express / Netlify Functions.
 *
 * Required Environment Variables (in .env):
 * - GOOGLE_CLIENT_ID: Your Google Cloud OAuth 2.0 Client ID
 * - GOOGLE_CLIENT_SECRET: Your Google Cloud OAuth 2.0 Client Secret
 * - GOOGLE_REFRESH_TOKEN: OAuth 2.0 Refresh Token with https://www.googleapis.com/auth/calendar scope
 * - CALENDAR_ID: Target Google Calendar ID (e.g. your primary email or dedicated salon calendar ID)
 * - TIMEZONE: Atelier timezone (default: "Europe/Paris")
 */

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3";
const DEFAULT_TIMEZONE = process.env.TIMEZONE || "Europe/Paris";

/**
 * Exchange refresh token for an active access token
 */
async function getAccessToken() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Google Calendar credentials in server environment variables.");
  }

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to refresh Google access token: ${data.error_description || data.error}`);
  }

  return data.access_token;
}

/**
 * Query FreeBusy from Google Calendar for a given date range
 */
async function queryFreeBusy(accessToken, calendarId, timeMin, timeMax) {
  const response = await fetch(`${GOOGLE_CALENDAR_API_BASE}/freeBusy`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: DEFAULT_TIMEZONE,
      items: [{ id: calendarId }],
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Google FreeBusy query error: ${data.error?.message || "Unknown error"}`);
  }

  return data.calendars?.[calendarId]?.busy || [];
}

/**
 * Insert an event into Google Calendar and send email invites
 */
async function insertCalendarEvent(accessToken, calendarId, appointmentDetails) {
  const {
    serviceName,
    stylistName,
    clientName,
    clientEmail,
    clientPhone,
    date,
    time,
    durationMinutes = 60,
    specialRequests = "",
  } = appointmentDetails;

  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  // Construct start & end ISO strings
  const startTime = new Date(Date.UTC(year, month - 1, day, hours - 2, minutes)); // Paris offset UTC+2 (adjusting dynamically or using dateTime string)
  
  // Format dateTime string without timezone ambiguity: "2026-10-15T14:00:00"
  const startDateTime = `${date}T${time}:00`;
  const endTotalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(endTotalMinutes / 60);
  const endMins = endTotalMinutes % 60;
  const endDateTime = `${date}T${String(endHours).padStart(2, "0")}:${String(endMins).padStart(2, "0")}:00`;

  const eventPayload = {
    summary: `Maison Aurelia: ${serviceName} (${clientName})`,
    description: [
      `MAISON AURELIA — HAUTE COIFFURE & BEAUTY SANCTUARY`,
      `Service: ${serviceName}`,
      `Master Stylist: ${stylistName}`,
      `Client: ${clientName} (${clientPhone})`,
      specialRequests ? `Special Requests: ${specialRequests}` : "",
      `Address: 482 Rue Vivienne, 75002 Paris`,
      `Phone: +33 (0)1 42 68 90 20`,
      `Notes: Please arrive 10 minutes prior for botanical herbal tea and consultation.`,
    ].filter(Boolean).join("\n"),
    location: "482 Rue Vivienne, 75002 Paris, France",
    start: {
      dateTime: startDateTime,
      timeZone: DEFAULT_TIMEZONE,
    },
    end: {
      dateTime: endDateTime,
      timeZone: DEFAULT_TIMEZONE,
    },
    attendees: [
      { email: clientEmail, displayName: clientName },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 }, // 1 day before
        { method: "popup", minutes: 120 },     // 2 hours before
      ],
    },
  };

  const response = await fetch(
    `${GOOGLE_CALENDAR_API_BASE}/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventPayload),
    }
  );

  const eventData = await response.json();
  if (!response.ok) {
    throw new Error(`Google Calendar Insert error: ${eventData.error?.message || "Failed to create event"}`);
  }

  return eventData;
}

/**
 * Universal Serverless Request Handler
 * Can handle both GET /api/calendar/availability and POST /api/calendar/book
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const calendarId = process.env.CALENDAR_ID || "primary";

  try {
    const accessToken = await getAccessToken();

    // 1. GET Availability: FreeBusy lookup
    if (req.method === "GET") {
      const { date, duration = "60" } = req.query;
      if (!date) {
        return res.status(400).json({ error: "Missing required query parameter: date (YYYY-MM-DD)" });
      }

      const durationMinutes = parseInt(duration, 10);
      const dayStart = new Date(`${date}T00:00:00Z`);
      const dayEnd = new Date(`${date}T23:59:59Z`);

      const busyIntervals = await queryFreeBusy(accessToken, calendarId, dayStart, dayEnd);

      // Generate 10:00 - 19:00 slot check
      const slots = [];
      for (let hour = 10; hour < 19; hour++) {
        for (let min of [0, 30]) {
          if (hour === 18 && min > 0) continue; // Cut off for 60m service
          const timeStr = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
          const slotStart = new Date(`${date}T${timeStr}:00`);
          const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60 * 1000);

          // Check if slot falls into any busy interval
          const isBusy = busyIntervals.some((b) => {
            const bStart = new Date(b.start);
            const bEnd = new Date(b.end);
            return slotStart < bEnd && slotEnd > bStart;
          });

          slots.push({
            time: timeStr,
            available: !isBusy,
            period: hour < 12 ? "morning" : hour < 16 ? "afternoon" : "evening",
            reason: isBusy ? "Reserved on Google Calendar" : null,
          });
        }
      }

      return res.status(200).json({ date, slots, provider: "google" });
    }

    // 2. POST Book Appointment: Double-Booking prevention + Insert
    if (req.method === "POST") {
      const details = req.body;
      const { date, time, durationMinutes = 60 } = details;

      if (!date || !time) {
        return res.status(400).json({ error: "Date and time are required for booking." });
      }

      // PRE-INSERT DOUBLE-BOOKING CHECK:
      // Re-verify that the requested window is still completely free right before inserting
      const slotStart = new Date(`${date}T${time}:00`);
      const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60 * 1000);

      const currentBusy = await queryFreeBusy(accessToken, calendarId, slotStart, slotEnd);
      if (currentBusy && currentBusy.length > 0) {
        return res.status(409).json({
          success: false,
          error: "Double-booking prevented: This exact window was just reserved on Google Calendar. Please choose another time.",
        });
      }

      // Safe to insert event
      const event = await insertCalendarEvent(accessToken, calendarId, details);

      return res.status(200).json({
        success: true,
        provider: "google",
        appointmentId: event.id,
        htmlLink: event.htmlLink,
        message: "Your appointment has been registered and synced directly to Google Calendar.",
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Google Calendar Serverless Error:", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred with the Google Calendar service.",
    });
  }
}
