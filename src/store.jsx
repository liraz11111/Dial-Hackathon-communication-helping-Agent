import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { provisionNumber, nextTurn, TIMING } from './services/api.js'
import { CATEGORIES } from './lib/scripts.js'
import { t } from './lib/languages.js'

const StoreContext = createContext(null)
const LS_KEY = 'bridgeagent_state_v1'

const uid = (p = 'id') => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`

const DEFAULT_CONTACTS = [
  { id: 'k1', name: 'City Health Clinic', number: '+1 (415) 555‑0190', category: 'doctor' },
  { id: 'k2', name: 'First National Bank', number: '+1 (800) 555‑2100', category: 'bank' },
]

function load() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || null
  } catch {
    return null
  }
}

export function StoreProvider({ children }) {
  const persisted = load()
  const [user, setUser] = useState(persisted?.user || null)
  const [conversations, setConversations] = useState(persisted?.conversations || [])
  const [contacts, setContacts] = useState(persisted?.contacts || DEFAULT_CONTACTS)

  const convosRef = useRef(conversations)
  convosRef.current = conversations

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ user, conversations, contacts }))
  }, [user, conversations, contacts])

  // userLang = the language the USER speaks (full list).
  // agentLang = the language the AGENT speaks on the call (English or Hebrew only).
  const userLang = user?.language || 'en'
  const agentLang = user?.agentLang || 'en'

  const updateConv = useCallback((id, fn) => {
    setConversations((prev) => prev.map((c) => (c.id === id ? fn(c) : c)))
  }, [])

  const addMessage = useCallback(
    (id, msg) => {
      updateConv(id, (c) => ({
        ...c,
        messages: [...c.messages, { id: uid('m'), ts: Date.now(), ...msg }],
      }))
    },
    [updateConv],
  )

  // Create the user, the helper number, and the first welcome conversation.
  // Returns the welcome conversation id so the caller can navigate straight into it.
  const signUp = useCallback(async ({ phone, language, number, agentLang: a }) => {
    const finalNumber = number || (await provisionNumber())
    setUser({ phone, language, number: finalNumber, name: 'BridgeAgent', agentLang: a || 'en' })

    const existing = convosRef.current
    if (existing.length) return existing[0].id

    const welcomeId = uid('c')
    const welcome = {
      id: welcomeId,
      category: 'other',
      title: 'BridgeAgent',
      emoji: '✨',
      number: finalNumber,
      contactName: '',
      language,
      agentLang: a || 'en',
      status: 'welcome',
      turnIndex: 0,
      awaitingUser: false,
      relaying: false,
      archived: false,
      createdAt: Date.now(),
      messages: [
        {
          id: uid('m'),
          ts: Date.now(),
          role: 'agent',
          kind: 'welcome',
          text: `${t('chat.home.hi', language)} ${t('chat.home.body', language)}`,
        },
      ],
    }
    setConversations([welcome])
    return welcomeId
  }, [])

  const setLanguage = useCallback((language) => setUser((u) => (u ? { ...u, language } : u)), [])
  const setAgentLang = useCallback(
    (a) => setUser((u) => (u ? { ...u, agentLang: a === 'he' ? 'he' : 'en' } : u)),
    [],
  )

  const reset = useCallback(() => {
    localStorage.removeItem(LS_KEY)
    setUser(null)
    setConversations([])
    setContacts(DEFAULT_CONTACTS)
  }, [])

  const addContact = useCallback((contact) => {
    setContacts((prev) => [{ id: uid('k'), ...contact }, ...prev])
  }, [])

  // Archive / restore — the relationship between live Chats and the Archive view.
  const archiveConversation = useCallback(
    (id) => updateConv(id, (c) => ({ ...c, archived: true })),
    [updateConv],
  )
  const unarchiveConversation = useCallback(
    (id) => updateConv(id, (c) => ({ ...c, archived: false })),
    [updateConv],
  )

  // Deliver the other party's next line: spoken in agentLang, translated to userLang.
  const deliverTurn = useCallback(
    async (id, category, turnIndex, uLang, aLang) => {
      updateConv(id, (c) => ({ ...c, relaying: true }))
      const res = await nextTurn({ category, turnIndex, userLang: uLang, agentLang: aLang })
      updateConv(id, (c) => ({ ...c, relaying: false }))

      if (res.done && !res.original) {
        updateConv(id, (c) => ({ ...c, status: 'ended', awaitingUser: false }))
        if (res.summary) addMessage(id, { role: 'agent', kind: 'summary', text: res.summary })
        return
      }

      addMessage(id, {
        role: 'them',
        text: res.translated,
        original: res.original,
        originalLang: res.originalLang,
      })

      if (res.done) {
        updateConv(id, (c) => ({ ...c, status: 'ended', awaitingUser: false, turnIndex: turnIndex + 1 }))
        if (res.summary) addMessage(id, { role: 'agent', kind: 'summary', text: res.summary })
      } else {
        updateConv(id, (c) => ({ ...c, status: 'live', awaitingUser: true, turnIndex: turnIndex + 1 }))
      }
    },
    [updateConv, addMessage],
  )

  // Start a new call. Returns the new conversation id so the caller can open it.
  const startConversation = useCallback(
    ({ category, place, number, contactName, request }) => {
      const cat = CATEGORIES.find((c) => c.key === category) || CATEGORIES.find((c) => c.key === 'other')
      const title = contactName || place || cat.defaultPlace
      const id = uid('c')
      const messages = []
      if (request && request.trim()) {
        messages.push({ id: uid('m'), ts: Date.now(), role: 'user', text: request.trim() })
      }
      messages.push({ id: uid('m'), ts: Date.now() + 1, role: 'agent', kind: 'calling', text: title })

      const conv = {
        id,
        category,
        title,
        emoji: cat.emoji,
        number: number || '',
        contactName: contactName || '',
        language: userLang,
        agentLang,
        status: 'connecting',
        turnIndex: 0,
        awaitingUser: false,
        relaying: false,
        archived: false,
        createdAt: Date.now(),
        messages,
      }
      setConversations((prev) => [conv, ...prev])

      setTimeout(() => {
        updateConv(id, (c) => ({ ...c, status: 'live' }))
        addMessage(id, { role: 'agent', kind: 'connected', text: '' })
        deliverTurn(id, category, 0, conv.language, conv.agentLang)
      }, TIMING.connect)

      return id
    },
    [userLang, agentLang, updateConv, addMessage, deliverTurn],
  )

  const userReply = useCallback(
    (id, text) => {
      const conv = convosRef.current.find((c) => c.id === id)
      if (!conv || conv.status !== 'live' || !conv.awaitingUser || conv.relaying) return
      addMessage(id, { role: 'user', text })
      updateConv(id, (c) => ({ ...c, awaitingUser: false }))
      deliverTurn(id, conv.category, conv.turnIndex, conv.language, conv.agentLang)
    },
    [addMessage, updateConv, deliverTurn],
  )

  const value = {
    user,
    lang: userLang,
    agentLang,
    conversations,
    contacts,
    actions: {
      signUp,
      setLanguage,
      setAgentLang,
      reset,
      startConversation,
      userReply,
      addContact,
      archiveConversation,
      unarchiveConversation,
    },
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
