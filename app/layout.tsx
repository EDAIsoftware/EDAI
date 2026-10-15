import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL('https://edaisoftware.com'),
  title: 'EDAI TECH | Páginas web, catálogos digitales y tiendas online en Santa Cruz',
  description:
    'Desarrollamos páginas web, catálogos digitales y tiendas online para negocios de Santa Cruz de la Sierra. Tus clientes eligen y el pedido te llega por WhatsApp.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#03141A',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" style={{ scrollBehavior: 'smooth', background: '#03141A' }}>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
