// One-tap helpers. A browser cannot silently write to contacts or open the SMS app,
// so these are the closest real thing: a vCard download and an `sms:` deep link.

export function downloadVCard(name, number) {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    `N:${name};;;;`,
    `TEL;TYPE=CELL:${number}`,
    'NOTE:Your communication helper. Text it what you need and it makes the call for you.',
    'END:VCARD',
    '',
  ].join('\n')

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${name.replace(/\s+/g, '')}.vcf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1500)
}

// Opens the native SMS app to the helper number with a pre-filled first message.
// iOS prefers `&body=`, Android `?body=` — we include both via `?` then `&`.
export function smsHref(number, body) {
  const clean = String(number).replace(/[^\d+]/g, '')
  const text = encodeURIComponent(body || '')
  return `sms:${clean}?&body=${text}`
}
