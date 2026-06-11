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

export const TIMING = {
  connect: 1600, // ring -> connected
  relay: 1500, // user reply -> agent relays -> other side responds
}

// The shared "helper" number everyone saves and texts.
// TODO(real): provision/return from Dial.
export async function provisionNumber() {
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

// Mock: text the user's own phone (used when they sign up on a computer).
// TODO(real): POST https://getdial.ai/api/v1/messages from the shared helper number.
export async function sendWelcomeSms(toPhone) {
  await wait(900)
  return { ok: true, to: toPhone, body: 'Hi 👋 do you need help making a call? Just reply here.' }
}

export { wait }
