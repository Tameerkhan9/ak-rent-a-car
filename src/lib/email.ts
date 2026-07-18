import nodemailer from "nodemailer";
import type { Booking } from "./types";

export async function sendBookingEmail(booking: Booking) {
  const user = process.env.GMAIL_USER?.trim();
  // App passwords are often pasted with spaces — Gmail accepts both, strip to be safe
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  const to = process.env.NOTIFY_EMAIL?.trim() || user;

  if (!user || !pass || !to) {
    console.warn(
      "Email skipped: set GMAIL_USER, GMAIL_APP_PASSWORD, and optionally NOTIFY_EMAIL in .env.local"
    );
    return { sent: false as const, reason: "missing_credentials" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const subject = `New booking: ${booking.vehicleName} — ${booking.customerName}`;
  const text = `
New vehicle booking received

Vehicle: ${booking.vehicleName}
Customer: ${booking.customerName}
Email: ${booking.customerEmail}
Phone: ${booking.customerPhone}
Pickup: ${booking.pickupDate}
Return: ${booking.returnDate}
Location: ${booking.pickupLocation}
Days: ${booking.totalDays}
Total: Rs ${booking.totalPrice}
Status: ${booking.status}
Notes: ${booking.notes || "—"}
Booking ID: ${booking.id}
  `.trim();

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      <h2 style="margin:0 0 8px;color:#0f172a">New vehicle booking</h2>
      <p style="margin:0 0 20px;color:#64748b">Someone booked a car on your website.</p>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0"><strong>Vehicle</strong></td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0">${booking.vehicleName}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0"><strong>Customer</strong></td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0">${booking.customerName}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0"><strong>Email</strong></td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0">${booking.customerEmail}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0"><strong>Phone</strong></td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0">${booking.customerPhone}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0"><strong>Pickup</strong></td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0">${booking.pickupDate}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0"><strong>Return</strong></td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0">${booking.returnDate}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0"><strong>Location</strong></td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0">${booking.pickupLocation}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0"><strong>Days</strong></td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0">${booking.totalDays}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0"><strong>Total</strong></td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0"><strong>Rs ${booking.totalPrice.toLocaleString("en-PK")}</strong></td></tr>
      </table>
      <p style="margin:20px 0 0;color:#64748b;font-size:13px">Booking ID: ${booking.id}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"AK Rent A Car & Tourism" <${user}>`,
    to,
    replyTo: booking.customerEmail,
    subject,
    text,
    html,
  });

  return { sent: true as const };
}
