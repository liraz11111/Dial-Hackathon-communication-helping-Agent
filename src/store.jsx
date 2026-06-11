import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { provisionNumber, nextTurn, TIMING } from './services/api.js'
import { CATEGORIES } from './lib/scripts.js'

const StoreContext = createContext(null)
const LS_KEY = 'bridgeagent_state_v1'

const uid = (p = 'id') => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`

const DEFAULT_CONTACTS = [
  { id: 'k1', name: 'City Health Clinic', number: '+1 (415) 555‑0190', category: 'doctor' },
  { id: 'k2', name: 'First National Bank', number: '+1 (800) 555‑2100', category: 'bank' },
  { id: 'k3', name: 'Mom', number: '+34 612 345 678', category: 'family' },
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
  const [screen, setScreen] = useState(persisted?.user ? 'app' : 'landing')
  const [tab, setTab] = useState('chats')
  const [conversations, setConversations] = useState(persisted?.conversations || [])
  const [contacts, setContacts] = useState(persisted?.contacts || DEFAULT_CONTACTS)
  const [activeId, setActiveId] = useState(null)

  const convosRef = useRef(conversations)
  convosRef.current = conversations

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ user, conversations, contacts }))
  }, [user, conversations, contacts])

  const lang = user?.language || 'en'

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

  const goScreen = useCallback((s) => setScreen(s), [])

  const signUp = useCallback(async ({ phone, language, number }) => {
    const finalNumber = number || (await provisionNumber())
    setUser({ phone, language, number: finalNumber, name: 'BridgeAgent' })
    setActiveId(null)
    setTab('chats')
    setScreen('app')
  }, [])

  const setLanguage = useCallback((language) => setUser((u) => (u ? { ...u, language } : u)), [])

  const reset = useCallback(() => {
    localStorage.removeItem(LS_KEY)
    setUser(null)
    setConversations([])
    setContacts(DEFAULT_CONTACTS)
    setActiveId(null)
    setTab('chats')
    setScreen('landing')
  }, [])

  const openConversation = useCallback((id) => setActiveId(id), [])
  const closeConversation = useCallback(() => setActiveId(null), [])

  const addContact = useCallback((contact) => {
    setContacts((prev) => [{ id: uid('k'), ...contact }, ...prev])
  }, [])

  // Deliver the other party's next line (translated), then either await the user or end.
  const deliverTurn = useCallback(
    async (id, category, turnIndex, language) => {
      updateConv(id, (c) => ({ ...c, relaying: true }))
      const res = await nextTurn({ category, turnIndex, language })
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
        language: lang,
        status: 'connecting',
        turnIndex: 0,
        awaitingUser: false,
        relaying: false,
        createdAt: Date.now(),
        messages,
      }
      setConversations((prev) => [conv, ...prev])
      setActiveId(id)
      setTab('chats')

      setTimeout(() => {
        updateConv(id, (c) => ({ ...c, status: 'live' }))
        addMessage(id, { role: 'agent', kind: 'connected', text: '' })
        deliverTurn(id, category, 0, conv.language)
      }, TIMING.connect)

      return id
    },
    [lang, updateConv, addMessage, deliverTurn],
  )

  const userReply = useCallback(
    (id, text) => {
      const conv = convosRef.current.find((c) => c.id === id)
      if (!conv || conv.status !== 'live' || !conv.awaitingUser || conv.relaying) return
      addMessage(id, { role: 'user', text })
      updateConv(id, (c) => ({ ...c, awaitingUser: false }))
      deliverTurn(id, conv.category, conv.turnIndex, conv.language)
    },
    [addMessage, updateConv, deliverTurn],
  )

  const value = {
    user,
    lang,
    screen,
    tab,
    conversations,
    contacts,
    activeId,
    actions: {
      goScreen,
      setTab,
      signUp,
      setLanguage,
      reset,
      startConversation,
      userReply,
      openConversation,
      closeConversation,
      addContact,
    },
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
