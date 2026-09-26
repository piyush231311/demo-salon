/**
 * RFC 5545 iCalendar (.ics) Generator
 * Creates standard calendar invites compatible with Apple Calendar, Google Calendar, Outlook, and mobile devices.
 */

export function generateIcsFile({
  appointmentId = `AURELIA-${Date.now()}`,
  serviceName,
  stylistName,
  dateStr, // "YYYY-MM-DD"
  timeStr, // "HH:MM"
  durationMinutes = 60,
  salonName = "Maison Aurelia",
  address = "482 Rue Vivienne, 75002 Paris, France",
  clientName,
  clientEmail,
  notes = "",
}) {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hours, minutes] = timeStr.split(":").map(Number);

    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

    const formatIcsDate = (date) => {
      return date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
    };

    const startFormatted = formatIcsDate(startDate);
    const endFormatted = formatIcsDate(endDate);
    const nowFormatted = formatIcsDate(new Date());

    const descriptionText = [
      `Appointment at ${salonName}`,
      `Service: ${serviceName}`,
      `Master Stylist: ${stylistName}`,
      `Guest: ${clientName}`,
      notes ? `Special Notes: ${notes}` : "",
      `Address: ${address}`,
      `Phone: +33 1 42 68 90 20`,
      `Please arrive 10 minutes prior to begin your sensory welcome ritual.`,
    ]
      .filter(Boolean)
      .join("\\n");

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Maison Aurelia//Haute Coiffure Booking//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      `UID:${appointmentId}@maison-aurelia.luxury`,
      `DTSTAMP:${nowFormatted}`,
      `DTSTART:${startFormatted}`,
      `DTEND:${endFormatted}`,
      `SUMMARY:${salonName} — ${serviceName} with ${stylistName}`,
      `DESCRIPTION:${descriptionText}`,
      `LOCATION:${address}`,
      "STATUS:CONFIRMED",
      "TRANSP:OPAQUE",
      "BEGIN:VALARM",
      "TRIGGER:-PT2H",
      "ACTION:DISPLAY",
      `DESCRIPTION:Reminder: Your ${salonName} experience is in 2 hours.`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `maison-aurelia-${dateStr}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Failed to generate .ics file", error);
    return false;
  }
}
