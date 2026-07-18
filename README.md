# AK Rent A Car Website

Public booking site + admin dashboard for AK Rent A Car (Batkhela, KP).

## Quick start

```bash
npm install
npm run dev
```

Open:
- Public site: http://localhost:3000
- Admin: http://localhost:3000/admin

Default admin password: `admin123` (change in `.env.local`)

## Gmail booking emails

1. Turn on [2-Step Verification](https://myaccount.google.com/security) for your Google account.
2. Create an [App Password](https://myaccount.google.com/apppasswords) (choose Mail / Other).
3. Copy `.env.example` to `.env.local` and fill in:

```
GMAIL_USER=yourname@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
NOTIFY_EMAIL=yourname@gmail.com
ADMIN_PASSWORD=your-secure-password
```

Use the App Password, not your normal Gmail password.

## What you get

| Area | Features |
|------|----------|
| Public site | Home, fleet, online booking form |
| Admin dashboard | Overview stats, bookings list, confirm/cancel, add/edit vehicles |
| Email | New booking alert to your Gmail |

Bookings and vehicles are stored in the `data/` folder as JSON files.
