// Supported languages for the user interface + the relay.
// `rtl` flips layout for Hebrew / Arabic.
// A broad set of world languages. The most widely spoken are listed first; the
// rest follow alphabetically by English name. Searchable by native/English name
// or code. `rtl` flips layout (Arabic, Hebrew, Persian, Urdu, Pashto, …).
export const LANGUAGES = [
  // ── most widely spoken ──────────────────────────────────────────────
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸', rtl: false },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', rtl: false },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳', rtl: false },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', rtl: false },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇧🇷', rtl: false },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩', rtl: false },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺', rtl: false },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', rtl: false },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', rtl: false },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', rtl: false },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷', rtl: false },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹', rtl: false },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷', rtl: false },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳', rtl: false },
  { code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱', rtl: false },
  { code: 'uk', name: 'Ukrainian', native: 'Українська', flag: '🇺🇦', rtl: false },
  { code: 'fa', name: 'Persian', native: 'فارسی', flag: '🇮🇷', rtl: true },
  { code: 'he', name: 'Hebrew', native: 'עברית', flag: '🇮🇱', rtl: true },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱', rtl: false },
  { code: 'th', name: 'Thai', native: 'ไทย', flag: '🇹🇭', rtl: false },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩', rtl: false },
  // ── the rest, alphabetical by English name ──────────────────────────
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans', flag: '🇿🇦', rtl: false },
  { code: 'sq', name: 'Albanian', native: 'Shqip', flag: '🇦🇱', rtl: false },
  { code: 'am', name: 'Amharic', native: 'አማርኛ', flag: '🇪🇹', rtl: false },
  { code: 'hy', name: 'Armenian', native: 'Հայերեն', flag: '🇦🇲', rtl: false },
  { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan', flag: '🇦🇿', rtl: false },
  { code: 'eu', name: 'Basque', native: 'Euskara', flag: '🇪🇸', rtl: false },
  { code: 'be', name: 'Belarusian', native: 'Беларуская', flag: '🇧🇾', rtl: false },
  { code: 'bs', name: 'Bosnian', native: 'Bosanski', flag: '🇧🇦', rtl: false },
  { code: 'bg', name: 'Bulgarian', native: 'Български', flag: '🇧🇬', rtl: false },
  { code: 'my', name: 'Burmese', native: 'မြန်မာ', flag: '🇲🇲', rtl: false },
  { code: 'ca', name: 'Catalan', native: 'Català', flag: '🇪🇸', rtl: false },
  { code: 'ceb', name: 'Cebuano', native: 'Cebuano', flag: '🇵🇭', rtl: false },
  { code: 'ny', name: 'Chichewa', native: 'Chichewa', flag: '🇲🇼', rtl: false },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski', flag: '🇭🇷', rtl: false },
  { code: 'cs', name: 'Czech', native: 'Čeština', flag: '🇨🇿', rtl: false },
  { code: 'da', name: 'Danish', native: 'Dansk', flag: '🇩🇰', rtl: false },
  { code: 'et', name: 'Estonian', native: 'Eesti', flag: '🇪🇪', rtl: false },
  { code: 'fi', name: 'Finnish', native: 'Suomi', flag: '🇫🇮', rtl: false },
  { code: 'gl', name: 'Galician', native: 'Galego', flag: '🇪🇸', rtl: false },
  { code: 'ka', name: 'Georgian', native: 'ქართული', flag: '🇬🇪', rtl: false },
  { code: 'el', name: 'Greek', native: 'Ελληνικά', flag: '🇬🇷', rtl: false },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳', rtl: false },
  { code: 'ht', name: 'Haitian Creole', native: 'Kreyòl Ayisyen', flag: '🇭🇹', rtl: false },
  { code: 'ha', name: 'Hausa', native: 'Hausa', flag: '🇳🇬', rtl: false },
  { code: 'hu', name: 'Hungarian', native: 'Magyar', flag: '🇭🇺', rtl: false },
  { code: 'is', name: 'Icelandic', native: 'Íslenska', flag: '🇮🇸', rtl: false },
  { code: 'ig', name: 'Igbo', native: 'Igbo', flag: '🇳🇬', rtl: false },
  { code: 'ga', name: 'Irish', native: 'Gaeilge', flag: '🇮🇪', rtl: false },
  { code: 'jv', name: 'Javanese', native: 'Basa Jawa', flag: '🇮🇩', rtl: false },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', rtl: false },
  { code: 'kk', name: 'Kazakh', native: 'Қазақ', flag: '🇰🇿', rtl: false },
  { code: 'km', name: 'Khmer', native: 'ខ្មែរ', flag: '🇰🇭', rtl: false },
  { code: 'ku', name: 'Kurdish', native: 'Kurdî', flag: '🇮🇶', rtl: false },
  { code: 'ky', name: 'Kyrgyz', native: 'Кыргызча', flag: '🇰🇬', rtl: false },
  { code: 'lo', name: 'Lao', native: 'ລາວ', flag: '🇱🇦', rtl: false },
  { code: 'la', name: 'Latin', native: 'Latina', flag: '🏛️', rtl: false },
  { code: 'lv', name: 'Latvian', native: 'Latviešu', flag: '🇱🇻', rtl: false },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių', flag: '🇱🇹', rtl: false },
  { code: 'lb', name: 'Luxembourgish', native: 'Lëtzebuergesch', flag: '🇱🇺', rtl: false },
  { code: 'mk', name: 'Macedonian', native: 'Македонски', flag: '🇲🇰', rtl: false },
  { code: 'mg', name: 'Malagasy', native: 'Malagasy', flag: '🇲🇬', rtl: false },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', flag: '🇲🇾', rtl: false },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', rtl: false },
  { code: 'mt', name: 'Maltese', native: 'Malti', flag: '🇲🇹', rtl: false },
  { code: 'mi', name: 'Maori', native: 'Māori', flag: '🇳🇿', rtl: false },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳', rtl: false },
  { code: 'mn', name: 'Mongolian', native: 'Монгол', flag: '🇲🇳', rtl: false },
  { code: 'ne', name: 'Nepali', native: 'नेपाली', flag: '🇳🇵', rtl: false },
  { code: 'no', name: 'Norwegian', native: 'Norsk', flag: '🇳🇴', rtl: false },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳', rtl: false },
  { code: 'ps', name: 'Pashto', native: 'پښتو', flag: '🇦🇫', rtl: true },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳', rtl: false },
  { code: 'ro', name: 'Romanian', native: 'Română', flag: '🇷🇴', rtl: false },
  { code: 'sm', name: 'Samoan', native: 'Gagana Samoa', flag: '🇼🇸', rtl: false },
  { code: 'gd', name: 'Scots Gaelic', native: 'Gàidhlig', flag: '🏴', rtl: false },
  { code: 'sr', name: 'Serbian', native: 'Српски', flag: '🇷🇸', rtl: false },
  { code: 'st', name: 'Sesotho', native: 'Sesotho', flag: '🇱🇸', rtl: false },
  { code: 'sn', name: 'Shona', native: 'ChiShona', flag: '🇿🇼', rtl: false },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي', flag: '🇵🇰', rtl: true },
  { code: 'si', name: 'Sinhala', native: 'සිංහල', flag: '🇱🇰', rtl: false },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina', flag: '🇸🇰', rtl: false },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina', flag: '🇸🇮', rtl: false },
  { code: 'so', name: 'Somali', native: 'Soomaali', flag: '🇸🇴', rtl: false },
  { code: 'su', name: 'Sundanese', native: 'Basa Sunda', flag: '🇮🇩', rtl: false },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪', rtl: false },
  { code: 'sv', name: 'Swedish', native: 'Svenska', flag: '🇸🇪', rtl: false },
  { code: 'tl', name: 'Tagalog', native: 'Tagalog', flag: '🇵🇭', rtl: false },
  { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ', flag: '🇹🇯', rtl: false },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', rtl: false },
  { code: 'tt', name: 'Tatar', native: 'Татар', flag: '🇷🇺', rtl: false },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', rtl: false },
  { code: 'ug', name: 'Uyghur', native: 'ئۇيغۇرچە', flag: '🇨🇳', rtl: true },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', rtl: true },
  { code: 'uz', name: 'Uzbek', native: 'Oʻzbek', flag: '🇺🇿', rtl: false },
  { code: 'cy', name: 'Welsh', native: 'Cymraeg', flag: '🏴', rtl: false },
  { code: 'xh', name: 'Xhosa', native: 'isiXhosa', flag: '🇿🇦', rtl: false },
  { code: 'yi', name: 'Yiddish', native: 'ייִדיש', flag: '🇮🇱', rtl: true },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá', flag: '🇳🇬', rtl: false },
  { code: 'zu', name: 'Zulu', native: 'isiZulu', flag: '🇿🇦', rtl: false },
]

export const langMeta = (code) =>
  LANGUAGES.find((l) => l.code === code) || LANGUAGES.find((l) => l.code === 'en')
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
  'landing.cta': { en: 'Create my phone number', es: 'Crear mi número', he: 'צור לי מספר טלפון' },
  'landing.openApp': { en: 'Open my chats', es: 'Abrir mis chats', he: 'פתח את הצ׳אטים שלי' },
  'landing.how': { en: 'How it works', es: 'Cómo funciona', he: 'איך זה עובד' },
  'landing.f1.t': { en: 'You text, in your language', es: 'Tú escribes, en tu idioma', he: 'אתה כותב, בשפה שלך' },
  'landing.f1.d': { en: 'Tell the agent who to call and what you need.', es: 'Dile al agente a quién llamar y qué necesitas.', he: 'אומר לסוכן למי להתקשר ומה אתה צריך.' },
  'landing.f2.t': { en: 'The agent makes the call', es: 'El agente hace la llamada', he: 'הסוכן מבצע את השיחה' },
  'landing.f2.d': { en: 'It speaks the local language for you, live.', es: 'Habla el idioma local por ti, en vivo.', he: 'הוא מדבר את השפה המקומית בשבילך, בזמן אמת.' },
  'landing.f3.t': { en: 'You read & reply', es: 'Lees y respondes', he: 'אתה קורא ומשיב' },
  'landing.f3.d': { en: 'Every line comes back translated. Just type back.', es: 'Cada frase vuelve traducida. Solo responde.', he: 'כל משפט חוזר מתורגם. פשוט תקליד תשובה.' },

  'show.kicker': { en: 'You can ask me to…', es: 'Puedes pedirme…', he: 'אפשר לבקש ממני…' },

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
  'setup.ready': { en: 'Your helper chat is ready 🎉', es: 'Tu chat de ayuda está listo 🎉', he: 'צ׳אט העזרה שלך מוכן 🎉' },
  'setup.readyBody': {
    en: 'We started a conversation with your BridgeAgent — open it and make your first call.',
    es: 'Iniciamos una conversación con tu BridgeAgent: ábrela y haz tu primera llamada.',
    he: 'התחלנו שיחה עם ה‑BridgeAgent שלך — פתח אותה ובצע את השיחה הראשונה.',
  },
  'setup.smsSent': {
    en: 'It also texts {phone} through the live phone service, so you can use it without the app.',
    es: 'También envía un SMS a {phone} mediante el servicio telefónico, para que lo uses sin la app.',
    he: 'הוא גם שולח SMS ל‑{phone} דרך שירות הטלפון, כך שתוכל להשתמש בלי האפליקציה.',
  },
  'setup.connecting': { en: 'Connecting your number…', es: 'Conectando tu número…', he: 'מחבר את המספר שלך…' },

  'nav.home': { en: 'Home', es: 'Inicio', he: 'בית' },
  'nav.chats': { en: 'Chats', es: 'Chats', he: 'צ׳אטים' },
  'nav.archive': { en: 'Archive', es: 'Archivo', he: 'ארכיון' },
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
  'chat.back': { en: 'Back', es: 'Atrás', he: 'חזרה' },
  'chat.archive': { en: 'Archive', es: 'Archivar', he: 'העבר לארכיון' },
  'chat.restore': { en: 'Restore to chats', es: 'Restaurar a chats', he: 'שחזר לצ׳אטים' },
  'chat.archived': { en: 'Archived', es: 'Archivado', he: 'בארכיון' },

  'new.title': { en: 'Who should I call?', es: '¿A quién llamo?', he: 'למי להתקשר?' },
  'new.category': { en: 'Type of place', es: 'Tipo de lugar', he: 'סוג המקום' },
  'new.number': { en: 'Phone number (optional)', es: 'Número (opcional)', he: 'מספר טלפון (לא חובה)' },
  'new.contact': { en: 'Or pick a saved contact', es: 'O elige un contacto guardado', he: 'או בחר איש קשר שמור' },
  'new.request': { en: 'What do you need? (in your language)', es: '¿Qué necesitas? (en tu idioma)', he: 'מה אתה צריך? (בשפה שלך)' },
  'new.start': { en: 'Start the call', es: 'Iniciar la llamada', he: 'התחל את השיחה' },
  'new.cancel': { en: 'Cancel', es: 'Cancelar', he: 'ביטול' },

  'arch.title': { en: 'Archive', es: 'Archivo', he: 'ארכיון' },
  'arch.sub': {
    en: 'Calls you archive from your chats are kept here.',
    es: 'Las llamadas que archivas desde tus chats se guardan aquí.',
    he: 'שיחות שהעברת לארכיון מהצ׳אטים נשמרות כאן.',
  },
  'arch.empty': {
    en: 'Nothing archived yet. Archive a call from its chat to keep it here.',
    es: 'Nada archivado todavía. Archiva una llamada desde su chat para guardarla aquí.',
    he: 'אין עדיין כלום בארכיון. העבר שיחה לארכיון מתוך הצ׳אט כדי לשמור אותה כאן.',
  },
  'arch.search': { en: 'Search archive…', es: 'Buscar en archivo…', he: 'חיפוש בארכיון…' },

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
  'cat.other': { en: 'Other', es: 'Otro', he: 'אחר' },
}

export function t(key, lang = 'en') {
  const entry = STRINGS[key]
  if (!entry) return key
  return entry[lang] || entry.en || key
}
