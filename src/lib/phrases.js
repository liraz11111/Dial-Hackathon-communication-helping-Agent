// Example phrases used by the Living Translation Bridge demo, with real
// translations across languages. The bridge translates any source -> target
// using this table (free-typed text not in the table falls back to itself).

export const VOICE_LANG = {
  en: 'en-US',
  es: 'es-ES',
  he: 'he-IL',
  ar: 'ar-SA',
  ru: 'ru-RU',
  fr: 'fr-FR',
  pt: 'pt-BR',
  uk: 'uk-UA',
  hi: 'hi-IN',
  zh: 'zh-CN',
}

export const PHRASES = [
  {
    id: 'help',
    en: 'Hello, I need some help.',
    es: 'Hola, necesito ayuda.',
    he: 'שלום, אני צריך עזרה.',
    ar: 'مرحبا، أحتاج بعض المساعدة.',
    ru: 'Здравствуйте, мне нужна помощь.',
    fr: "Bonjour, j'ai besoin d'aide.",
  },
  {
    id: 'appt',
    en: "I'd like to book an appointment.",
    es: 'Quisiera reservar una cita.',
    he: 'אני רוצה לקבוע תור.',
    ar: 'أريد حجز موعد.',
    ru: 'Я хочу записаться на приём.',
    fr: 'Je voudrais prendre rendez-vous.',
  },
  {
    id: 'balance',
    en: 'I want to check my account balance.',
    es: 'Quiero consultar el saldo de mi cuenta.',
    he: 'אני רוצה לבדוק את יתרת החשבון שלי.',
    ar: 'أريد التحقق من رصيد حسابي.',
    ru: 'Я хочу проверить баланс счёта.',
    fr: 'Je veux vérifier le solde de mon compte.',
  },
  {
    id: 'cost',
    en: 'How much does it cost?',
    es: '¿Cuánto cuesta?',
    he: 'כמה זה עולה?',
    ar: 'كم يكلف هذا؟',
    ru: 'Сколько это стоит?',
    fr: 'Combien ça coûte ?',
  },
  {
    id: 'address',
    en: 'Can you give me the address?',
    es: '¿Me puede dar la dirección?',
    he: 'תוכל לתת לי את הכתובת?',
    ar: 'هل يمكنك إعطائي العنوان؟',
    ru: 'Вы можете дать мне адрес?',
    fr: "Pouvez-vous me donner l'adresse ?",
  },
  {
    id: 'thanks',
    en: 'Thank you very much, goodbye.',
    es: 'Muchas gracias, adiós.',
    he: 'תודה רבה, להתראות.',
    ar: 'شكرا جزيلا، مع السلامة.',
    ru: 'Большое спасибо, до свидания.',
    fr: 'Merci beaucoup, au revoir.',
  },
]

// Translate by matching the source text against the table; fall back to the
// original text if we don't have a translation (free-typed input).
export function translatePhrase(text, from, to) {
  if (!text) return ''
  if (from === to) return text
  const norm = (s) => s.trim().toLowerCase().replace(/[.,!?¿;]/g, '')
  const hit = PHRASES.find((p) => norm(p[from] || '') === norm(text))
  if (hit && hit[to]) return hit[to]
  return text
}
