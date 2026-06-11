// ─────────────────────────────────────────────────────────────────────────────
// MOCK BACKEND  (front-end only — so the UI is fully testable on its own)
//
// This file is the single seam between the UI and the REAL backend the teammate
// is building. Every function here is faked with timers + canned data. To go live,
// replace the bodies with calls to the real service:
//
//   provisionNumber()  ->  POST https://getdial.ai/api/v1/numbers   (or return the
//                          one shared "helper" number for everyone)
//   nextTurn()         ->  driven by Dial: POST /api/v1/calls (outboundInstruction +
//                          language) + the live transcript, with Gemini doing the
//                          translation between the user's language and the local one.
// The component code never changes — only this file.
// ─────────────────────────────────────────────────────────────────────────────

import { getScenario, localized } from '../lib/scripts.js'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// When VITE_API_BASE is set (frontend .env), call the REAL Dial backend in /server.
// Otherwise everything below falls back to the mock so the UI still runs standalone.
const API = (import.meta.env && import.meta.env.VITE_API_BASE) || ''
export const isLive = !!API

export const TIMING = {
  connect: 1600, // ring -> connected
  relay: 1500, // user reply -> agent relays -> other side responds
}

// The shared "helper" number everyone saves and texts.
export async function provisionNumber() {
  if (API) {
    try {
      const r = await fetch(`${API}/api/provision`, { method: 'POST' })
      const d = await r.json()
      if (d.ok && d.number) return d.number
      console.warn('provision via backend failed:', d.error || d)
    } catch (e) {
      console.warn('backend unreachable — using mock number', e)
    }
  }
  await wait(700)
  return '+1 (415) 555‑0142'
}

// Returns the next thing the OTHER party says. The agent speaks the LOCAL
// language on the call (agentLang = English or Hebrew only) and we relay it
// translated into the user's own language (userLang).
// TODO(real): comes from the live Dial call transcript + Gemini translation.
export async function nextTurn({ category, turnIndex, userLang, agentLang = 'en' }) {
  await wait(TIMING.relay)
  const scenario = getScenario(category)
  const turn = scenario.turns[turnIndex]

  if (!turn) {
    return { done: true, summary: localized(scenario.summary, userLang) }
  }

  return {
    done: !!turn.end,
    originalLang: agentLang,
    original: localized(turn, agentLang),
    translated: localized(turn, userLang),
    summary: turn.end ? localized(scenario.summary, userLang) : null,
  }
}

// Text the user's own phone (the welcome message, when they sign up on a computer).
export async function sendWelcomeSms(toPhone) {
  if (API) {
    try {
      const r = await fetch(`${API}/api/welcome-sms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: toPhone }),
      })
      const d = await r.json()
      return { ...d, live: true }
    } catch (e) {
      console.warn('welcome-sms backend unreachable — mocking', e)
    }
  }
  await wait(900)
  return { ok: true, live: false, to: toPhone }
}

// Place a real outbound call via the backend (used once you wire calls to Dial).
export async function placeCall({ to, outboundInstruction, language }) {
  if (!API) return { ok: false, error: 'No backend configured (set VITE_API_BASE).' }
  const r = await fetch(`${API}/api/call`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, outboundInstruction, language }),
  })
  return r.json()
}

export { wait }
