import type { Metadata } from 'next'
import LandingEdai from '@/components/LandingEdai'

export const metadata: Metadata = {
  title: 'EDAI TECH | Páginas web, catálogos digitales y tiendas online en Santa Cruz',
  description:
    'Desarrollamos páginas web, catálogos digitales y tiendas online para negocios de Santa Cruz de la Sierra. Tus clientes eligen y el pedido te llega por WhatsApp.',
}

export default function Page() {
  return <LandingEdai />
}
