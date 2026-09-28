import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/site-config'

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink('Hola EDAI, quiero información sobre sus servicios de desarrollo.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-transform hover:scale-105"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" aria-hidden="true" />
      <MessageCircle className="relative size-6" aria-hidden="true" />
      <span className="sr-only">Escríbenos por WhatsApp</span>
    </a>
  )
}
