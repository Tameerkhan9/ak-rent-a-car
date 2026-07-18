import nodemailer from "nodemailer";
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    })
);

const user = env.GMAIL_USER.trim();
const pass = env.GMAIL_APP_PASSWORD.replace(/\s+/g, "");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
});

await transporter.sendMail({
  from: `"AK Rent A Car" <${user}>`,
  to: user,
  subject: "AK Rent A Car — Gmail test OK",
  text: "Your booking email setup is working. You will get emails when someone books a car.",
});

console.log("TEST_EMAIL_SENT_OK");
