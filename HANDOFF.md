# BridgeAgent — Project Handoff

A worldwide **communication helper** for the Dial "My Agent Has A Phone" hackathon.
A person who can't speak the local language (or can't use the phone) **texts the agent
in their own language**; the agent **makes the phone call for them** in the local
language and **relays the conversation back, translated**.

- **Repo:** github.com/liraz11111/Dial-Hackathon-communication-helping-Agent (private)
- **Local path:** `C:\Users\sarie\Desktop\Dial-Hackathon-communication-helping-Agent`
- **Run:** `npm install && npm run dev` → http://localhost:5173 (UI runs standalone on a mock)

## Tech stack
- **Frontend:** React 18 + Vite, Tailwind CSS, React Three Fiber + drei (3D), Framer Motion.
- **Backend (optional, real):** Node/Express in `/server`, calls the Dial REST API.
- **Fonts:** Space Grotesk (headings), Inter (body), JetBrains Mono (split-flap).

## The core idea / data flow
1. User signs up with just a **phone number + the language THEY speak** (searchable list).
2. They get a shared **helper number** (everyone uses the same one; identified by their phone).
3. In use: user texts the agent → agent calls the business in **English or Hebrew** (the only
   two languages the agent speaks) → the other side's words come back **translated into the
   user's language**; the user types a reply → loop → call ends with a summary.

## Two-language model (IMPORTANT — don't confuse them)
- **userLang** = the language the **user** speaks. Full list, chosen via a searchable scroller
  (onboarding + Settings). Drives the UI and what they read/type. `user.language` in the store.
- **agentLang** = the language the **agent speaks on the call**. **Only English or Hebrew**
  (Dial voice limitation). Toggled **top-right** in the app header and in Settings.
  `user.agentLang` in the store.
- In the relay, the other party's line is shown in **agentLang (original)** + **userLang
  (translation)**.

## What's REAL vs MOCKED
- **Real once a Dial key is added** (`/server`): provisioning the number, the **welcome SMS to
  the user's phone**, and placing outbound calls.
- **Mocked / stubbed:** the in-app call *conversation* (the bank/clinic dialogue) is canned data
  in `src/lib/scripts.js` with timers — it does NOT place a real call yet. Free-typed text in the
  Bridge that isn't a preset phrase isn't truly translated (no live translator on the frontend).
- **The single seam:** the frontend only talks to **`src/services/api.js`**. It calls the backend
  when `VITE_API_BASE` is set, else falls back to the mock. To make calls real, wire `nextTurn()`
  there to Dial `POST /calls` + transcript + a translator (Gemini).

## File map
```
src/
  main.jsx              entry
  App.jsx               screen router (landing | onboarding | app) + <Backdrop/>
  index.css             global styles: fonts, aurora+grain bg, glass, split-flap CSS
  store.jsx             global state (React Context) + the mock call-loop orchestration:
                          user, conversations, contacts, screen/tab; actions: signUp,
                          startConversation, userReply, setLanguage, setAgentLang, reset…
  services/api.js       THE SEAM: provisionNumber, sendWelcomeSms, placeCall, nextTurn
                          (calls /server if VITE_API_BASE set, else mock)
  lib/
    languages.js        LANGUAGES list, t() UI strings (en/es/he full; others fall back),
                          AGENT_LANGS=['en','he'], searchLanguages, langMeta, isRTL
    scripts.js          CATEGORIES + mock call SCENARIOS (bank/doctor/gov/landlord/family/other)
                          with en/es/he translations per line
    phrases.js          Bridge example phrases + translations + translatePhrase + VOICE_LANG
    speech.js           Web Speech API wrappers: listen() (mic-in), speak() (voice-out)
    vcard.js            downloadVCard() + smsHref() (sms: deep link)
    device.js           isMobile()
  components/
    Backdrop.jsx        fixed aurora blobs + film grain background
    Landing.jsx         landing: header + Translation Bridge hero + value prop + features
    TranslationBridge.jsx  ⭐ the "Living Translation Bridge": a 3D canvas (two phones +
                          glowing particle stream that crosses) + an airport split-flap board
                          that flips source→target + mic-in/voice-out + idle auto-demo.
                          "You speak" = searchable scroller; "They hear" = EN/HE toggle.
    SplitFlap.jsx       the airport split-flap board (per-letter scramble→settle)
    three/Phone3D.jsx   premium 3D phone mesh (glossy glass screen, reflections)
    Onboarding.jsx      phone + language signup; device-aware success:
                          computer → success box + welcome SMS + opens a welcome chat;
                          phone → saves contact (vCard) + opens SMS app
    AppShell.jsx        app layout: header (logo + EN/HE agent toggle) + side/bottom nav + tabs
    Chat.jsx            chat list + thread + the live translate/relay call loop UI + home
                          (quick-call categories). Handles the 'welcome' conversation.
    NewCallSheet.jsx    "new call" composer modal (category, number, contact, request)
    History.jsx         searchable call history
    Settings.jsx        my-language scroller, agent EN/HE toggle, contacts, save vCard, reset
    LanguagePicker.jsx  searchable language scroller (type to filter, scroll, pick)
    ui/Button.jsx, ui/Icons.jsx
server/
  index.js              Express: /api/provision, /api/welcome-sms, /api/call, /api/call/:id,
                          /api/health — all call the real Dial API with DIAL_API_KEY
  .env.example          DIAL_API_KEY, PORT
.env.example            VITE_API_BASE (point frontend at the backend)
```

## How to run live (real SMS/calls)
1. Dial key (free $5) at getdial.ai.
2. `cd server` → put key in `server/.env` (`DIAL_API_KEY=…`) → `npm install` → `npm start` (:8787).
3. Root `.env` with `VITE_API_BASE=http://localhost:8787` → restart `npm run dev`.

## Known gaps / things to improve next
- Make the in-app call conversation REAL (wire `nextTurn` → Dial calls + live translation).
- Add full UI-string + scenario translations beyond en/es/he (currently others fall back to English).
- Mic-in (SpeechRecognition) is Chrome/Edge only; Hebrew/Arabic TTS depends on the OS voices.
- A browser can't silently save a contact or open SMS — those are one-tap by design (OS security).

## Recent change log (latest first)
- Added a minimal **real Dial backend** in `/server`; wired `api.js` to use it (mock fallback).
- **Premium redesign:** Space Grotesk/JetBrains Mono, aurora+grain backdrop, glossy reflective
  3D phones (replaced flat cartoon-colored screens), refined glass.
- **Bridge fixes:** removed in-app text input/send; "You speak" is the full searchable scroller;
  split-flap is slower + visible + auto-repeats; language toggles now re-flip the board; mic feedback.
- **Number flow:** creating a number opens a real welcome conversation; honest desktop copy;
  device-aware (computer texts the phone / phone opens SMS + saves contact).
- Verified core flows in a real browser (Playwright smoke test, 8/8, no runtime errors).
