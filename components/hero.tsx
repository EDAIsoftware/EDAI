import { ArrowRight, CalendarCheck, Zap, MessageCircle, QrCode, Rocket } from 'lucide-react'
import { whatsappLink } from '@/lib/site-config'
import { HeroVisual } from '@/components/hero-visual'

const badges = [
  { icon: Zap, label: 'Prototipo funcional antes de pagar' },
  { icon: MessageCircle, label: '100% optimizado para WhatsApp' },
  { icon: QrCode, label: 'Integración QR Simple / Banred' },
  { icon: Rocket, label: 'Cero costos mensuales ocultos' },
]

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
      <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" aria-hidden="true" />
      <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 md:px-6 md:pt-20 lg:grid-cols-12 lg:pb-24">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            Bolivia - Santa Cruz
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Desarrollamos Páginas Web y Aplicaciones que{' '}
            <span className="text-primary">Automatizan tus Ventas</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Creamos sistemas web interactivos, menús digitales, tiendas online y aplicaciones a medida conectadas
            directamente a WhatsApp y pagos con QR Simple en Santa Cruz.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#demos"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_32px_-6px_rgba(198,255,0,0.7)] transition-transform hover:-translate-y-0.5"
            >
              Explorar Modelos en Vivo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href={whatsappLink('Hola EDAI, quiero agendar una demostración.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/60 px-6 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
            >
              <CalendarCheck className="size-4" aria-hidden="true" />
              Agendar Demostración
            </a>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {badges.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
