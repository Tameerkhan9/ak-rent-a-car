import nodemailer from "nodemailer";
import type { Booking } from "./types";

function bookingContent(booking: Booking) {
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

  return { subject, text, html };
}

/** Resend uses HTTPS — works on Render Free (SMTP ports are blocked there). */
async function sendWithResend(booking: Booking) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to =
    process.env.NOTIFY_EMAIL?.trim() ||
    process.env.GMAIL_USER?.trim() ||
    process.env.RESEND_TO?.trim();

  if (!apiKey || !to) {
    return { sent: false as const, reason: "missing_resend" as const };
  }

  const { subject, text, html } = bookingContent(booking);
  const from =
    process.env.RESEND_FROM?.trim() || "AK Rent A Car <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: booking.customerEmail,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend failed (${res.status}): ${detail}`);
  }

  return { sent: true as const, provider: "resend" as const };
}

/** Gmail SMTP — works locally / paid Render. Blocked on Render Free. */
async function sendWithGmailSmtp(booking: Booking) {
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  const to = process.env.NOTIFY_EMAIL?.trim() || user;

  if (!user || !pass || !to) {
    return { sent: false as const, reason: "missing_gmail" as const };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });

  const { subject, text, html } = bookingContent(booking);

  await transporter.sendMail({
    from: `"AK Rent A Car & Tourism" <${user}>`,
    to,
    replyTo: booking.customerEmail,
    subject,
    text,
    html,
  });

  return { sent: true as const, provider: "gmail_smtp" as const };
}

export async function sendBookingEmail(booking: Booking) {
  // Prefer Resend on production hosts where SMTP is blocked (Render Free).
  if (process.env.RESEND_API_KEY?.trim()) {
    return sendWithResend(booking);
  }

  const smtp = await sendWithGmailSmtp(booking);
  if (smtp.sent || smtp.reason === "missing_gmail") {
    if (!smtp.sent) {
      console.warn(
        "Email skipped: set RESEND_API_KEY (recommended on Render Free) or GMAIL_USER + GMAIL_APP_PASSWORD"
      );
    }
    return smtp;
  }

  return smtp;
}
