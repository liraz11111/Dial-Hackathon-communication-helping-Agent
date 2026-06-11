// Mock call scenarios. Each "turn" is what the OTHER party (the bank, clinic, etc.)
// says in the LOCAL language (English here). The agent relays it to the user, translated.
// `end: true` closes the call. Translations populated for es / he; others fall back to en.

export const CATEGORIES = [
  { key: 'bank', emoji: '🏦', defaultPlace: 'First National Bank' },
  { key: 'doctor', emoji: '🩺', defaultPlace: 'City Health Clinic' },
  { key: 'government', emoji: '🏛️', defaultPlace: 'City Hall' },
  { key: 'landlord', emoji: '🏠', defaultPlace: 'Landlord' },
  { key: 'family', emoji: '👪', defaultPlace: 'Family' },
  { key: 'other', emoji: '📞', defaultPlace: 'Phone call' },
]

const SCENARIOS = {
  bank: {
    localLang: 'en',
    turns: [
      {
        en: 'Thank you for calling First National Bank. How can I help you today?',
        es: 'Gracias por llamar a First National Bank. ¿En qué puedo ayudarle hoy?',
        he: 'תודה שהתקשרת ל‑First National Bank. כיצד אוכל לעזור לך היום?',
      },
      {
        en: 'Of course. For security, can you give me your full name and the last four digits of your account?',
        es: 'Por supuesto. Por seguridad, ¿puede darme su nombre completo y los últimos cuatro dígitos de su cuenta?',
        he: 'בוודאי. מטעמי אבטחה, תוכל למסור את שמך המלא וארבע הספרות האחרונות של החשבון?',
      },
      {
        en: 'Thank you, that’s verified. Your current balance is $2,450.18. Is there anything else?',
        es: 'Gracias, queda verificado. Su saldo actual es de $2,450.18. ¿Algo más?',
        he: 'תודה, אומת. היתרה הנוכחית שלך היא $2,450.18. משהו נוסף?',
      },
      {
        en: 'You’re all set. Have a wonderful day!',
        es: '¡Todo listo! ¡Que tenga un buen día!',
        he: 'הכול מסודר. שיהיה לך יום נפלא!',
        end: true,
      },
    ],
    summary: {
      en: 'Call finished. Your account is verified and your balance is $2,450.18.',
      es: 'Llamada finalizada. Tu cuenta está verificada y tu saldo es $2,450.18.',
      he: 'השיחה הסתיימה. החשבון שלך אומת והיתרה היא $2,450.18.',
    },
  },

  doctor: {
    localLang: 'en',
    turns: [
      {
        en: 'City Health Clinic, good morning. How can I help?',
        es: 'Clínica City Health, buenos días. ¿En qué le ayudo?',
        he: 'מרפאת City Health, בוקר טוב. כיצד אפשר לעזור?',
      },
      {
        en: 'I can book that for you. Are you an existing patient, and what day works best?',
        es: 'Puedo agendarlo. ¿Es usted paciente actual y qué día le viene mejor?',
        he: 'אני יכולה לקבוע לך תור. האם אתה מטופל קיים, ואיזה יום הכי נוח?',
      },
      {
        en: 'Great — I have Thursday at 10:30 AM with Dr. Alvarez. Shall I book it?',
        es: 'Perfecto — tengo el jueves a las 10:30 con la Dra. Álvarez. ¿La reservo?',
        he: 'מצוין — יש לי יום חמישי ב‑10:30 עם ד״ר אלברס. לקבוע?',
      },
      {
        en: 'Booked! You’ll get a text reminder. See you Thursday.',
        es: '¡Reservado! Recibirá un recordatorio por mensaje. Nos vemos el jueves.',
        he: 'נקבע! תקבל תזכורת ב‑SMS. נתראה ביום חמישי.',
        end: true,
      },
    ],
    summary: {
      en: 'Appointment booked: Thursday 10:30 AM with Dr. Alvarez.',
      es: 'Cita reservada: jueves 10:30 con la Dra. Álvarez.',
      he: 'נקבע תור: יום חמישי 10:30 עם ד״ר אלברס.',
    },
  },

  government: {
    localLang: 'en',
    turns: [
      {
        en: 'City Hall, records department. What can I do for you?',
        es: 'Ayuntamiento, departamento de registros. ¿Qué necesita?',
        he: 'עיריית העיר, מחלקת רישום. במה אוכל לעזור?',
      },
      {
        en: 'You’ll need form B‑12 and a proof of address. Would you like me to mail it or can you come in?',
        es: 'Necesitará el formulario B‑12 y un comprobante de domicilio. ¿Se lo envío por correo o puede venir?',
        he: 'תצטרך טופס B‑12 ואישור כתובת. לשלוח בדואר או שתוכל להגיע?',
      },
      {
        en: 'Perfect, I’ll mail form B‑12 today. It should arrive in 3–5 business days.',
        es: 'Perfecto, enviaré el formulario B‑12 hoy. Llegará en 3 a 5 días hábiles.',
        he: 'מצוין, אשלח את טופס B‑12 היום. הוא יגיע תוך 3–5 ימי עסקים.',
        end: true,
      },
    ],
    summary: {
      en: 'They’re mailing form B‑12 (arrives in 3–5 business days). Bring proof of address.',
      es: 'Enviarán el formulario B‑12 (llega en 3–5 días). Lleva comprobante de domicilio.',
      he: 'ישלחו את טופס B‑12 (יגיע תוך 3–5 ימים). הבא אישור כתובת.',
    },
  },

  landlord: {
    localLang: 'en',
    turns: [
      {
        en: 'Hello?',
        es: '¿Hola?',
        he: 'הלו?',
      },
      {
        en: 'Oh, about the apartment — yes, the heating issue. I can send someone tomorrow afternoon. Does that work?',
        es: 'Ah, sobre el apartamento — sí, lo de la calefacción. Puedo enviar a alguien mañana por la tarde. ¿Le va bien?',
        he: 'אה, לגבי הדירה — כן, בעיית החימום. אני יכול לשלוח מישהו מחר אחר הצהריים. זה מתאים?',
      },
      {
        en: 'Great, I’ll have the technician there around 3 PM. Thanks for letting me know.',
        es: 'Bien, el técnico estará allí sobre las 3 PM. Gracias por avisar.',
        he: 'מצוין, הטכנאי יגיע בסביבות 15:00. תודה שהודעת.',
        end: true,
      },
    ],
    summary: {
      en: 'Landlord is sending a technician tomorrow ~3 PM for the heating.',
      es: 'El casero enviará un técnico mañana ~3 PM por la calefacción.',
      he: 'בעל הדירה שולח טכנאי מחר בסביבות 15:00 לחימום.',
    },
  },

  family: {
    localLang: 'en',
    turns: [
      {
        en: 'Hi, this is Maria.',
        es: 'Hola, soy María.',
        he: 'היי, מדברת מריה.',
      },
      {
        en: 'Oh that’s wonderful to hear! We’re all doing well. When are you coming to visit?',
        es: '¡Qué bueno escucharlo! Todos estamos bien. ¿Cuándo vienes a visitarnos?',
        he: 'איזה כיף לשמוע! כולנו בסדר. מתי אתה בא לבקר?',
      },
      {
        en: 'Can’t wait to see you. Take care, talk soon!',
        es: '¡Ya quiero verte! Cuídate, hablamos pronto.',
        he: 'מחכים לראות אותך. שמור על עצמך, נדבר בקרוב!',
        end: true,
      },
    ],
    summary: {
      en: 'Call finished. Everyone’s well — they want to know when you’ll visit.',
      es: 'Llamada finalizada. Todos están bien — quieren saber cuándo los visitas.',
      he: 'השיחה הסתיימה. כולם בסדר — הם רוצים לדעת מתי תבקר.',
    },
  },

  other: {
    localLang: 'en',
    turns: [
      {
        en: 'Hello, how can I help you?',
        es: 'Hola, ¿en qué puedo ayudarle?',
        he: 'שלום, כיצד אוכל לעזור?',
      },
      {
        en: 'Sure, I can take care of that for you. Anything else?',
        es: 'Claro, me encargo de eso. ¿Algo más?',
        he: 'בטח, אני אטפל בזה בשבילך. משהו נוסף?',
      },
      {
        en: 'All done. Thank you for calling, goodbye!',
        es: 'Todo listo. Gracias por llamar, ¡adiós!',
        he: 'הכול בוצע. תודה שהתקשרת, להתראות!',
        end: true,
      },
    ],
    summary: {
      en: 'Call finished and handled.',
      es: 'Llamada finalizada y gestionada.',
      he: 'השיחה הסתיימה וטופלה.',
    },
  },
}

export function getScenario(category) {
  return SCENARIOS[category] || SCENARIOS.other
}

export function localized(obj, lang) {
  if (!obj) return ''
  return obj[lang] || obj.en || ''
}
