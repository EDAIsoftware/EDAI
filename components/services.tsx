import { Globe, UtensilsCrossed, ShoppingCart, Smartphone, ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const services = [
  {
    icon: Globe,
    title: 'Páginas Web Corporativas & Landing Pages',
    description: 'Captación de clientes y presencia institucional de alta velocidad, optimizada para Google.',
    tags: ['SEO', 'Alta velocidad', 'Formularios'],
  },
  {
    icon: UtensilsCrossed,
    title: 'Menús y Catálogos Interactivos',
    description: 'Para gastronomía y comercios: tus clientes eligen, el sistema calcula y el pedido llega a WhatsApp.',
    tags: ['Menú QR', 'Pedidos BOB', 'WhatsApp'],
  },
  {
    icon: ShoppingCart,
    title: 'Tiendas Online / E-Commerce',
    description: 'Carritos de compra completos con pasarela de pago QR Simple y tarjeta de crédito o débito.',
    tags: ['Carrito', 'QR Simple', 'Tarjeta'],
  },
  {
    icon: Smartphone,
    title: 'Software & Apps a Medida',
    description: 'Paneles de administración, plataformas SaaS y aplicaciones nativas para iOS y Android.',
    tags: ['iOS', 'Android', 'SaaS'],
  },
]

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="border-t border-white/5 bg-deep py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="servicios-title"
            eyebrow="Servicios de desarrollo"
            title="Soluciones digitales que venden por ti"
            description="Cuatro líneas de desarrollo pensadas para el comercio cruceño: rápidas, conectadas a WhatsApp y listas para cobrar."
          />
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description, tags }, i) => (
            <li
              key={title}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_40px_-12px_rgba(198,255,0,0.35)]"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                  <Icon className="size-5 text-accent transition-colors group-hover:text-primary" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-snug text-white">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Características">
                {tags.map((t) => (
                  <li key={t} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-slate-300">
                    {t}
                  </li>
                ))}
              </ul>
              <ArrowUpRight className="absolute right-6 top-20 size-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
