'use client'

import { useState } from 'react'
import { Send, MapPin, Clock, MessageCircle, Phone, Mail } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { whatsappLink, PHONE_DISPLAY, CONTACT_EMAIL } from '@/lib/site-config'

const projectTypes = [
  'Página web corporativa / Landing',
  'Menú o catálogo interactivo',
  'Tienda online / E-commerce',
  'Software o app a medida',
  'Aún no lo sé',
]

const fieldClass =
  'w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30'

export function Contact() {
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim().slice(0, 80)
    const business = String(data.get('business') ?? '').trim().slice(0, 80)
    const type = String(data.get('type') ?? '')
    const message = String(data.get('message') ?? '').trim().slice(0, 600)

    if (!name || !type) {
      setError('Por favor completa tu nombre y el tipo de proyecto.')
      return
    }
    setError(null)

    const text = [
      'Hola EDAI, quiero una cotización.',
      `Nombre: ${name}`,
      business && `Negocio: ${business}`,
      `Proyecto: ${type}`,
      message && `Detalle: ${message}`,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="border-t border-white/5 bg-deep py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contacto-title"
            eyebrow="Contacto"
            title="Cuéntanos tu idea. Te mostramos el prototipo."
            description="Completa el formulario y te respondemos por WhatsApp con una propuesta clara y sin compromiso."
          />
          <ul className="mt-10 flex flex-col gap-4 text-sm text-slate-300">
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-accent" aria-hidden="true" />
              <a href={whatsappLink('Hola EDAI')} target="_blank" rel="noopener noreferrer" className="hover:text-white">{PHONE_DISPLAY}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-accent" aria-hidden="true" />
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              Bolivia - Santa Cruz
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-4 text-accent" aria-hidden="true" />
              Lunes a sábado · 08:00 – 19:00
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="size-4 text-accent" aria-hidden="true" />
              Respuesta por WhatsApp en menos de 2 horas
            </li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-surface p-6 md:p-8 lg:col-span-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-white">
                Nombre completo
              </label>
              <input id="name" name="name" required maxLength={80} autoComplete="name" placeholder="Ej. María Suárez" className={fieldClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="business" className="text-sm font-medium text-white">
                Nombre de tu negocio
              </label>
              <input id="business" name="business" maxLength={80} autoComplete="organization" placeholder="Ej. Pollería El Cruceño" className={fieldClass} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="type" className="text-sm font-medium text-white">
              Tipo de proyecto
            </label>
            <select id="type" name="type" required defaultValue="" className={fieldClass}>
              <option value="" disabled>
                Selecciona una opción
              </option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-white">
              ¿Qué necesitas lograr?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={600}
              placeholder="Ej. Quiero recibir pedidos por WhatsApp y cobrar con QR."
              className={`${fieldClass} resize-none`}
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_28px_-8px_rgba(198,255,0,0.7)] transition-transform hover:-translate-y-0.5"
          >
            <Send className="size-4" aria-hidden="true" />
            Enviar solicitud por WhatsApp
          </button>
        </form>
      </div>
    </section>
  )
}
