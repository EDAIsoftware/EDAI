import { Check, Zap, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { whatsappLink } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const tiers = [
  {
    name: 'Paquete Esencial',
    subtitle: 'Emprendedor & Catálogo',
    description: 'Ideal para negocios locales, menús QR y comercios que inician su digitalización.',
    features: ['Menú o catálogo interactivo', 'Pedidos directos a WhatsApp', 'QR Simple integrado', 'Dominio y hosting configurados'],
    cta: 'Consultar sobre este Paquete',
    featured: false,
  },
  {
    name: 'Paquete Pro',
    subtitle: 'Web Corporativa & Agendamiento',
    description: 'Para clínicas, consultorios y empresas que necesitan captación y citas automatizadas.',
    features: ['Web corporativa multisección', 'Agenda y reservas en línea', 'Confirmaciones por WhatsApp', 'Reseñas de Google integradas', 'SEO local en Santa Cruz'],
    cta: 'Consultar sobre este Paquete',
    featured: true,
  },
  {
    name: 'Paquete Enterprise',
    subtitle: 'Software & E-Commerce a Medida',
    description: 'Para tiendas con alto catálogo, múltiples almacenes o apps móviles dedicadas.',
    features: ['E-commerce con QR y tarjeta', 'Inventario multi-almacén', 'Panel de administración', 'Apps iOS / Android', 'Integraciones a medida'],
    cta: 'Solicitar Cotización Personalizada',
    featured: false,
  },
]

export function Packages() {
  return (
    <section id="paquetes" aria-labelledby="paquetes-title" className="border-y border-white/5 bg-deep py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          id="paquetes-title"
          align="center"
          eyebrow="Paquetes de desarrollo"
          title="Estrategia primero, precio a tu medida"
          description="Sin tarifas genéricas: evaluamos tu negocio y te proponemos la solución exacta que necesitas."
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {tiers.map((t) => (
            <li
              key={t.name}
              className={cn(
                'relative flex flex-col rounded-2xl border p-7 transition-colors',
                t.featured
                  ? 'border-primary/50 bg-surface shadow-[0_0_60px_-20px_rgba(198,255,0,0.45)]'
                  : 'border-white/10 bg-surface/60 hover:border-accent/40',
              )}
            >
              {t.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  Más solicitado
                </span>
              )}
              <h3 className="text-xl font-semibold text-white">{t.name}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent">{t.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-white/10 pt-6">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink(`Hola EDAI, quiero información sobre el ${t.name} (${t.subtitle}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all',
                  t.featured
                    ? 'bg-primary text-primary-foreground hover:-translate-y-0.5'
                    : 'border border-white/15 text-white hover:border-primary hover:text-primary',
                )}
              >
                {t.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 via-surface to-primary/10 p-6 sm:flex-row sm:items-center md:p-8">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Zap className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Garantía EDAI</p>
            <p className="mt-1 text-lg font-semibold text-white md:text-xl">
              Desarrollamos tu prototipo interactivo antes de cualquier compromiso de pago.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
