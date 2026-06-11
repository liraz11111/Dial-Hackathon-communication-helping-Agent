// Supported languages for the user interface + the relay.
// `rtl` flips layout for Hebrew / Arabic.
export const LANGUAGES = [
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', rtl: false },
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸', rtl: false },
  { code: 'he', name: 'Hebrew', native: 'עברית', flag: '🇮🇱', rtl: true },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺', rtl: false },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', rtl: false },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇧🇷', rtl: false },
  { code: 'uk', name: 'Ukrainian', native: 'Українська', flag: '🇺🇦', rtl: false },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', rtl: false },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳', rtl: false },
  { code: 'am', name: 'Amharic', native: 'አማርኛ', flag: '🇪🇹', rtl: false },
  { code: 'tl', name: 'Tagalog', native: 'Tagalog', flag: '🇵🇭', rtl: false },
]

export const langMeta = (code) => LANGUAGES.find((l) => l.code === code) || LANGUAGES[1]
export const isRTL = (code) => !!langMeta(code).rtl

// The agent can only speak these on the call (Dial voice support).
export const AGENT_LANGS = ['en', 'he']

// Fuzzy search of the language list (by native name, English name, or code).
export function searchLanguages(query) {
  const q = (query || '').trim().toLowerCase()
  if (!q) return LANGUAGES
  return LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.native.toLowerCase().includes(q) ||
      l.code.includes(q),
  )
}

// UI strings. Fully populated for en / es / he; other languages fall back to English.
const STRINGS = {
  'app.name': { en: 'BridgeAgent', es: 'BridgeAgent', he: 'BridgeAgent' },
  'landing.kicker': { en: 'Your voice in any language', es: 'Tu voz en cualquier idioma', he: 'הקול שלך בכל שפה' },
  'landing.title': {
    en: 'Call anyone.\nEven if you don’t speak the language.',
    es: 'Llama a quien sea.\nAunque no hables el idioma.',
    he: 'להתקשר לכל אחד.\nגם אם אתה לא דובר את השפה.',
  },
  'landing.sub': {
    en: 'Text BridgeAgent what you need. It makes the call for you, talks to the other side, and brings the whole conversation back to your chat — translated.',
    es: 'Escríbele a BridgeAgent lo que necesitas. Hace la llamada por ti, habla con la otra persona y te trae toda la conversación al chat — traducida.',
    he: 'כתוב ל‑BridgeAgent מה אתה צריך. הוא יתקשר בשבילך, ידבר עם הצד השני, ויחזיר את כל השיחה לצ׳אט שלך — מתורגמת.',
  },
  'landing.cta': { en: 'Get my number', es: 'Obtener mi número', he: 'קבל את המספר שלי' },
  'landing.how': { en: 'How it works', es: 'Cómo funciona', he: 'איך זה עובד' },
  'landing.f1.t': { en: 'You text, in your language', es: 'Tú escribes, en tu idioma', he: 'אתה כותב, בשפה שלך' },
  'landing.f1.d': { en: 'Tell the agent who to call and what you need.', es: 'Dile al agente a quién llamar y qué necesitas.', he: 'אומר לסוכן למי להתקשר ומה אתה צריך.' },
  'landing.f2.t': { en: 'The agent makes the call', es: 'El agente hace la llamada', he: 'הסוכן מבצע את השיחה' },
  'landing.f2.d': { en: 'It speaks the local language for you, live.', es: 'Habla el idioma local por ti, en vivo.', he: 'הוא מדבר את השפה המקומית בשבילך, בזמן אמת.' },
  'landing.f3.t': { en: 'You read & reply', es: 'Lees y respondes', he: 'אתה קורא ומשיב' },
  'landing.f3.d': { en: 'Every line comes back translated. Just type back.', es: 'Cada frase vuelve traducida. Solo responde.', he: 'כל משפט חוזר מתורגם. פשוט תקליד תשובה.' },

  'onb.title': { en: 'Get your helper number', es: 'Obtén tu número de ayuda', he: 'קבל את מספר העזרה שלך' },
  'onb.sub': { en: 'No app, no password. Just your phone number.', es: 'Sin app, sin contraseña. Solo tu número.', he: 'בלי אפליקציה, בלי סיסמה. רק מספר הטלפון שלך.' },
  'onb.phone': { en: 'Your phone number', es: 'Tu número de teléfono', he: 'מספר הטלפון שלך' },
  'onb.lang': { en: 'I understand best in…', es: 'Entiendo mejor en…', he: 'אני מבין הכי טוב ב…' },
  'onb.continue': { en: 'Continue', es: 'Continuar', he: 'המשך' },
  'onb.google': { en: 'Continue with Google', es: 'Continuar con Google', he: 'המשך עם Google' },
  'onb.or': { en: 'or', es: 'o', he: 'או' },
  'onb.note': { en: 'We only use your number to send you the chat. Nothing else.', es: 'Solo usamos tu número para enviarte el chat. Nada más.', he: 'אנחנו משתמשים במספר רק כדי לשלוח לך את הצ׳אט. שום דבר אחר.' },

  'setup.title': { en: 'Meet BridgeAgent', es: 'Te presentamos a BridgeAgent', he: 'הכירו את BridgeAgent' },
  'setup.body': { en: 'Save this number so you can always reach your helper, and we’ll open your chat.', es: 'Guarda este número para tener siempre a tu ayudante, y abriremos tu chat.', he: 'שמור את המספר כדי שתמיד תוכל להגיע לעוזר שלך, ואנחנו נפתח את הצ׳אט.' },
  'setup.save': { en: 'Save to contacts', es: 'Guardar en contactos', he: 'שמור באנשי קשר' },
  'setup.sms': { en: 'Open in SMS', es: 'Abrir en SMS', he: 'פתח ב‑SMS' },
  'setup.start': { en: 'Start chatting', es: 'Empezar a chatear', he: 'התחל לשוחח' },

  'nav.chats': { en: 'Chats', es: 'Chats', he: 'צ׳אטים' },
  'nav.history': { en: 'History', es: 'Historial', he: 'היסטוריה' },
  'nav.settings': { en: 'Settings', es: 'Ajustes', he: 'הגדרות' },

  'chat.home.hi': { en: 'Hi! I’m your BridgeAgent.', es: '¡Hola! Soy tu BridgeAgent.', he: 'היי! אני ה‑BridgeAgent שלך.' },
  'chat.home.body': { en: 'Who would you like me to call? Pick a place below, or start a new call.', es: '¿A quién quieres que llame? Elige un lugar abajo o inicia una llamada.', he: 'למי תרצה שאתקשר? בחר מקום למטה, או התחל שיחה חדשה.' },
  'chat.new': { en: 'New call', es: 'Nueva llamada', he: 'שיחה חדשה' },
  'chat.recent': { en: 'Recent', es: 'Recientes', he: 'אחרונים' },
  'chat.empty': { en: 'Pick a chat or start a new call.', es: 'Elige un chat o inicia una nueva llamada.', he: 'בחר צ׳אט או התחל שיחה חדשה.' },
  'chat.reply': { en: 'Type your reply…', es: 'Escribe tu respuesta…', he: 'הקלד את תשובתך…' },
  'chat.send': { en: 'Send', es: 'Enviar', he: 'שלח' },
  'chat.connecting': { en: 'Connecting…', es: 'Conectando…', he: 'מתחבר…' },
  'chat.live': { en: 'On the call', es: 'En la llamada', he: 'בשיחה' },
  'chat.ended': { en: 'Call ended', es: 'Llamada finalizada', he: 'השיחה הסתיימה' },
  'chat.translating': { en: 'Translating & speaking for you…', es: 'Traduciendo y hablando por ti…', he: 'מתרגם ומדבר בשבילך…' },
  'chat.original': { en: 'original', es: 'original', he: 'מקור' },
  'chat.you': { en: 'You', es: 'Tú', he: 'אתה' },

  'new.title': { en: 'Who should I call?', es: '¿A quién llamo?', he: 'למי להתקשר?' },
  'new.category': { en: 'Type of place', es: 'Tipo de lugar', he: 'סוג המקום' },
  'new.number': { en: 'Phone number (optional)', es: 'Número (opcional)', he: 'מספר טלפון (לא חובה)' },
  'new.contact': { en: 'Or pick a saved contact', es: 'O elige un contacto guardado', he: 'או בחר איש קשר שמור' },
  'new.request': { en: 'What do you need? (in your language)', es: '¿Qué necesitas? (en tu idioma)', he: 'מה אתה צריך? (בשפה שלך)' },
  'new.start': { en: 'Start the call', es: 'Iniciar la llamada', he: 'התחל את השיחה' },
  'new.cancel': { en: 'Cancel', es: 'Cancelar', he: 'ביטול' },

  'hist.title': { en: 'Your calls', es: 'Tus llamadas', he: 'השיחות שלך' },
  'hist.empty': { en: 'No calls yet. Your call history will live here.', es: 'Aún no hay llamadas. Tu historial aparecerá aquí.', he: 'אין שיחות עדיין. ההיסטוריה שלך תופיע כאן.' },
  'hist.search': { en: 'Search calls…', es: 'Buscar llamadas…', he: 'חיפוש שיחות…' },

  'set.title': { en: 'Settings', es: 'Ajustes', he: 'הגדרות' },
  'set.lang': { en: 'My language (what I speak)', es: 'Mi idioma (lo que hablo)', he: 'השפה שלי (מה שאני מדבר)' },
  'set.agent': { en: 'Agent speaks on the call', es: 'El agente habla en la llamada', he: 'הסוכן מדבר בשיחה' },
  'set.agentNote': {
    en: 'The language the agent uses to talk to the other side.',
    es: 'El idioma que el agente usa para hablar con la otra parte.',
    he: 'השפה שבה הסוכן מדבר עם הצד השני.',
  },
  'set.number': { en: 'My helper number', es: 'Mi número de ayuda', he: 'מספר העזרה שלי' },
  'set.contacts': { en: 'Saved contacts', es: 'Contactos guardados', he: 'אנשי קשר שמורים' },
  'set.save': { en: 'Save BridgeAgent to contacts', es: 'Guardar BridgeAgent en contactos', he: 'שמור את BridgeAgent באנשי קשר' },
  'set.reset': { en: 'Reset (start over)', es: 'Reiniciar (empezar de nuevo)', he: 'איפוס (להתחיל מחדש)' },

  'cat.bank': { en: 'Bank', es: 'Banco', he: 'בנק' },
  'cat.doctor': { en: 'Doctor', es: 'Médico', he: 'רופא' },
  'cat.government': { en: 'Government', es: 'Gobierno', he: 'ממשלה' },
  'cat.landlord': { en: 'Landlord', es: 'Casero', he: 'בעל דירה' },
  'cat.family': { en: 'Family', es: 'Familia', he: 'משפחה' },
  'cat.other': { en: 'Other', es: 'Otro', he: 'אחר' },
}

export function t(key, lang = 'en') {
  const entry = STRINGS[key]
  if (!entry) return key
  return entry[lang] || entry.en || key
}
