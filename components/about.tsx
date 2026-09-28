import { MapPin, Timer, Compass, KeyRound } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const steps = [
  { n: '01', title: 'Diagnóstico', text: 'Entendemos tu negocio, tus clientes y cómo vendes hoy.' },
  { n: '02', title: 'Prototipo en vivo', text: 'Te mostramos tu sistema funcionando antes de pagar.' },
  { n: '03', title: 'Desarrollo & ajustes', text: 'Afinamos diseño, contenido e integraciones con pagos.' },
  { n: '04', title: 'Lanzamiento', text: 'Publicamos, capacitamos y te entregamos el control total.' },
]

const pillars = [
  { icon: MapPin, value: 'Santa Cruz', label: 'Firma tecnológica local, en tu zona horaria' },
  { icon: Timer, value: '48–72h', label: 'Entregas rápidas de prototipos funcionales' },
  { icon: Compass, value: 'Integral', label: 'Asesoramiento estratégico en cada etapa' },
  { icon: KeyRound, value: '100%', label: 'Propiedad del cliente sobre código y dominio' },
]

export function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="nosotros-title"
            eyebrow="Metodología & Nosotros"
            title="Tecnología hecha en Santa Cruz, para vender en Bolivia"
            description="EDAI (Ecosistema de Desarrollo & Inteligencia Aplicada) es un estudio de software cruceño. Combinamos diseño, desarrollo y estrategia comercial para que tu inversión digital se traduzca en ventas."
          />
          <dl className="mt-10 grid grid-cols-2 gap-4">
            {pillars.map(({ icon: Icon, value, label }) => (
              <div key={value} className="rounded-2xl border border-white/10 bg-surface p-5">
                <Icon className="size-5 text-accent" aria-hidden="true" />
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="mt-4 block text-2xl font-semibold text-white">{value}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="relative flex flex-col gap-4 lg:pt-8">
          <span className="absolute bottom-6 left-[27px] top-14 w-px bg-gradient-to-b from-primary via-accent to-transparent" aria-hidden="true" />
          {steps.map((s) => (
            <li key={s.n} className="relative flex gap-5 rounded-2xl border border-white/10 bg-surface/60 p-5">
              <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-background font-mono text-xs text-primary">
                {s.n}
              </span>
              <div>
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
