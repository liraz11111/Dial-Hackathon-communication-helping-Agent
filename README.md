# BridgeAgent — communication-helping Agent

A worldwide **communication helper** for people who can’t speak the local language (or can’t use the phone). You text BridgeAgent in *your* language; it makes the phone call for you, talks to the other side, and brings the whole conversation back to your chat — **translated, line by line**.

> Built for the Dial "My Agent Has A Phone" hackathon. This repo is the **front-end (UI) + a mock backend** so the UI runs and demos on its own. The real backend (Dial self-host + Gemini + the message-relay agent) is a drop-in replacement for one file.

## How it works

1. **You text, in your language** — tell the agent who to call and what you need.
2. **The agent makes the call** — it speaks the local language for you, live.
3. **You read & reply** — every line comes back translated; you just type back. It loops until the call is done, then sends you a summary.

## Tech

- **React + Vite** (UI)
- **Tailwind CSS** (calming indigo/teal theme, glassmorphism)
- **React Three Fiber + drei** (the 3D phone hero that follows your mouse)
- **Framer Motion** (animation)
- Mock backend lives in [`src/services/api.js`](src/services/api.js) — the single seam for the real Dial + Gemini backend.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Where the real backend plugs in

Everything the teammate builds slots into **`src/services/api.js`**:

- `provisionNumber()` → Dial `POST /api/v1/numbers` (or return one shared helper number).
- `nextTurn()` → driven by Dial `POST /api/v1/calls` (outbound instruction + language) + the live transcript, with Gemini translating between the user’s language and the local one.

The component code never changes — only that file.

## Screens

- **Landing** — 3D phone hero + value prop.
- **Onboarding** — phone-number-only sign-up + language; get your helper number; one-tap save-to-contacts (vCard) and open-in-SMS (`sms:` deep link).
- **Chats** — WhatsApp-style thread with the live translate-and-relay call loop, quick-call categories, and a new-call composer.
- **History** — searchable archive of past calls by place/category.
- **Settings** — language, helper number, saved contacts, reset.
