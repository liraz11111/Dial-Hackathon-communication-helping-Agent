// Example "asks" shown in the ambient home showcase. Display-only — these are
// the kinds of things a user can text their BridgeAgent number to do.
// Populated for en / es / he (the showcase falls back to en for other languages).

export const SCENARIOS_SHOWCASE = [
  {
    id: 'doctor',
    emoji: '🩺',
    en: "Book a doctor's appointment for next week",
    es: 'Reservar una cita médica para la próxima semana',
    he: 'לקבוע תור לרופא לשבוע הבא',
  },
  {
    id: 'bank',
    emoji: '🏦',
    en: 'Call my bank and check my balance',
    es: 'Llamar al banco y consultar mi saldo',
    he: 'להתקשר לבנק ולבדוק את היתרה שלי',
  },
  {
    id: 'landlord',
    emoji: '🏠',
    en: 'Ask the landlord to fix the heating',
    es: 'Pedir al casero que arregle la calefacción',
    he: 'לבקש מבעל הבית לתקן את החימום',
  },
  {
    id: 'government',
    emoji: '🏛️',
    en: 'Find out which form I need from City Hall',
    es: 'Averiguar qué formulario necesito del ayuntamiento',
    he: 'לברר איזה טופס צריך מהעירייה',
  },
  {
    id: 'delivery',
    emoji: '📦',
    en: 'Reschedule my package delivery for tomorrow',
    es: 'Reprogramar la entrega de mi paquete para mañana',
    he: 'לתאם מחדש את משלוח החבילה למחר',
  },
  {
    id: 'restaurant',
    emoji: '🍽️',
    en: 'Reserve a table for four at 8 PM',
    es: 'Reservar una mesa para cuatro a las 8 PM',
    he: 'להזמין שולחן לארבעה בשעה 20:00',
  },
  {
    id: 'pharmacy',
    emoji: '💊',
    en: 'Refill my prescription at the pharmacy',
    es: 'Renovar mi receta en la farmacia',
    he: 'לחדש מרשם בבית המרקחת',
  },
]

export const showcaseText = (item, lang) => item[lang] || item.en
