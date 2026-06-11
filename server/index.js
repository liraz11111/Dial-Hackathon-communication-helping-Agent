// Minimal REAL backend for BridgeAgent.
// Talks to the Dial API so the frontend can: get a real number, send a real SMS,
// and place a real call. Put your key in server/.env  ->  DIAL_API_KEY=sk_live_...
import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const PORT = process.env.PORT || 8787
const KEY = process.env.DIAL_API_KEY || ''
const BASE = process.env.DIAL_API_BASE || 'https://getdial.ai/api/v1'

const app = express()
app.use(cors())
app.use(express.json())

async function dial(path, { method = 'GET', body } = {}) {
  if (!KEY) throw Object.assign(new Error('DIAL_API_KEY is not set (add it to server/.env)'), { status: 503 })
  const res = await fetch(BASE + path, {
    method,
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    data = { raw: text }
  }
  if (!res.ok) throw Object.assign(new Error(`Dial API ${res.status}`), { status: res.status, data })
  return data
}

// One shared "helper" number for everyone — provisioned once, then cached.
let cached = null
async function ensureNumber() {
  if (cached) return cached
  const list = await dial('/numbers')
  const nums = list.numbers || list.data || (Array.isArray(list) ? list : [])
  if (nums.length) {
    const n = nums[0]
    cached = { id: n.id, number: n.number || n.phoneNumber }
    return cached
  }
  const created = await dial('/numbers', { method: 'POST', body: { country: 'US' } })
  const n = created.number || created
  cached = { id: created.id || n.id, number: n.number || n }
  return cached
}

const fail = (res, e) => res.status(e.status || 500).json({ ok: false, error: e.message, detail: e.data })

app.get('/api/health', (req, res) => res.json({ ok: true, hasKey: !!KEY, base: BASE }))

// Return the shared helper number (provisioning it the first time).
app.post('/api/provision', async (req, res) => {
  try {
    const n = await ensureNumber()
    res.json({ ok: true, number: n.number, fromNumberId: n.id })
  } catch (e) {
    fail(res, e)
  }
})

// Text the user's own phone (the "do you need help calling?" welcome message).
app.post('/api/welcome-sms', async (req, res) => {
  try {
    const { phone, body } = req.body || {}
    if (!phone) return res.status(400).json({ ok: false, error: 'phone is required' })
    const n = await ensureNumber()
    const message = await dial('/messages', {
      method: 'POST',
      body: {
        to: phone,
        fromNumberId: n.id,
        body: body || 'Hi 👋 This is BridgeAgent. Do you need help making a call? Just reply here and tell me who to call.',
      },
    })
    res.json({ ok: true, message })
  } catch (e) {
    fail(res, e)
  }
})

// Place a real outbound call (agent speaks `language`, driven by `outboundInstruction`).
app.post('/api/call', async (req, res) => {
  try {
    const { to, outboundInstruction, language = 'en-US' } = req.body || {}
    if (!to || !outboundInstruction)
      return res.status(400).json({ ok: false, error: 'to and outboundInstruction are required' })
    const n = await ensureNumber()
    const call = await dial('/calls', {
      method: 'POST',
      body: { to, fromNumberId: n.id, outboundInstruction, language },
    })
    res.json({ ok: true, callId: call.id || call.call?.id, call })
  } catch (e) {
    fail(res, e)
  }
})

// Fetch a call (status + transcript once it ends).
app.get('/api/call/:id', async (req, res) => {
  try {
    const call = await dial('/calls/' + encodeURIComponent(req.params.id))
    res.json({ ok: true, call })
  } catch (e) {
    fail(res, e)
  }
})

app.listen(PORT, () => {
  console.log(`BridgeAgent server  ->  http://localhost:${PORT}`)
  console.log(`Dial API key: ${KEY ? 'set ✓' : 'MISSING — add DIAL_API_KEY to server/.env'}`)
})
