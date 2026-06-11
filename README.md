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

## Make it real (live SMS / calls)

A minimal real backend lives in [`/server`](server) — it calls the Dial API so the
app can provision a real number, send a real SMS, and place a real call.

1. Get a Dial API key (free, $5 credit, no card) at https://getdial.ai
2. Start the backend:
   ```bash
   cd server
   cp .env.example .env        # then put your key in DIAL_API_KEY
   npm install
   npm start                   # http://localhost:8787
   ```
3. Point the frontend at it:
   ```bash
   cp .env.example .env        # in the project root; sets VITE_API_BASE=http://localhost:8787
   npm run dev                 # restart vite so it picks up .env
   ```

Now **creating a number returns a real Dial number** and the **welcome SMS really
texts your phone**. With no backend / no `VITE_API_BASE`, the app falls back to the
built-in mock so the UI always runs.

### The seam
The frontend only ever talks to **`src/services/api.js`** (`provisionNumber`,
`sendWelcomeSms`, `placeCall`, `nextTurn`). It calls the backend when `VITE_API_BASE`
is set and mocks otherwise — component code never changes. The piece still stubbed is
the live call relay (`nextTurn` → Dial `POST /calls` transcript + Gemini translation).

### Backend endpoints (`/server`)
- `POST /api/provision` → shared helper number (Dial `POST /numbers`, cached)
- `POST /api/welcome-sms { phone }` → texts the user (Dial `POST /messages`)
- `POST /api/call { to, outboundInstruction, language }` → Dial `POST /calls`
- `GET /api/call/:id` → call status + transcript

## Screens

- **Landing** — 3D phone hero + value prop.
- **Onboarding** — phone-number-only sign-up + language; get your helper number; one-tap save-to-contacts (vCard) and open-in-SMS (`sms:` deep link).
- **Chats** — WhatsApp-style thread with the live translate-and-relay call loop, quick-call categories, and a new-call composer.
- **History** — searchable archive of past calls by place/category.
- **Settings** — language, helper number, saved contacts, reset.
