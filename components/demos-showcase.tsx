'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, ImagePlus, Monitor, Smartphone } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { demoModels, whatsappLink, type DemoModel } from '@/lib/site-config'
import { cn } from '@/lib/utils'

function EmptySlot({ label }: { label: string }) {
  return (
    <div className="flex h-full min-h-40 w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-white/15 bg-white/[0.02] p-4 text-center">
      <ImagePlus className="size-6 text-muted-foreground" aria-hidden="true" />
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-xs text-slate-500">Espacio para captura</p>
    </div>
  )
}

function DesktopFrame({ model }: { model: DemoModel }) {
  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <Monitor className="size-3.5 text-accent" aria-hidden="true" />
        Vista Web / Laptop
      </figcaption>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-background shadow-2xl shadow-black/50">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="size-2 rounded-full bg-white/20" aria-hidden="true" />
          <span className="size-2 rounded-full bg-white/20" aria-hidden="true" />
          <span className="size-2 rounded-full bg-white/20" aria-hidden="true" />
        </div>
        <div className="aspect-[16/10] w-full">
          {model.desktopImage ? (
            <Image
              src={model.desktopImage}
              alt={`Vista de escritorio del modelo ${model.brand}`}
              width={1333}
              height={865}
              className="size-full object-cover object-top"
            />
          ) : (
            <EmptySlot label="Vista Web / Laptop" />
          )}
        </div>
      </div>
    </figure>
  )
}

function MobileFrame({ model }: { model: DemoModel }) {
  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <Smartphone className="size-3.5 text-accent" aria-hidden="true" />
        <span className="truncate">Vista Móvil</span>
      </figcaption>
      <div className="overflow-hidden rounded-[1.5rem] border-4 border-[#1f2937] bg-background shadow-2xl shadow-black/60 ring-1 ring-white/10">
        <div className="aspect-[9/19] w-full">
          {model.mobileImage ? (
            <Image
              src={model.mobileImage}
              alt={`Vista móvil del modelo ${model.brand}`}
              width={367}
              height={775}
              className="size-full object-cover object-top"
            />
          ) : (
            <EmptySlot label="Vista Móvil" />
          )}
        </div>
      </div>
    </figure>
  )
}

export function DemosShowcase() {
  const [activeId, setActiveId] = useState(demoModels[0].id)
  const [paused, setPaused] = useState(false)
  const active = demoModels.find((m) => m.id === activeId) ?? demoModels[0]

  // Rotación automática cada 6 s. Se pausa al pasar el mouse o enfocar, y se respeta prefers-reduced-motion.
  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setTimeout(() => {
      const i = demoModels.findIndex((m) => m.id === activeId)
      setActiveId(demoModels[(i + 1) % demoModels.length].id)
    }, 6000)
    return () => clearTimeout(timer)
  }, [activeId, paused])

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + demoModels.length) % demoModels.length
    setActiveId(demoModels[next].id)
    document.getElementById(`tab-${demoModels[next].id}`)?.focus()
  }

  const demoHref = active.liveUrl ?? whatsappLink(`Hola EDAI, quiero probar la demo en vivo del modelo ${active.brand}.`)

  return (
    <section
      id="demos"
      aria-labelledby="demos-title"
      className="relative py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          id="demos-title"
          eyebrow="Modelos & Demos"
          title="Prototipos reales por industria"
          description="Explora nuestros 4 modelos oficiales. Cada uno es un sistema funcional que adaptamos a tu marca en tiempo récord."
        />

        <div
          role="tablist"
          aria-label="Modelos por industria"
          className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]"
        >
          {demoModels.map((m, i) => {
            const selected = m.id === activeId
            return (
              <button
                key={m.id}
                id={`tab-${m.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${m.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(m.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={cn(
                  'flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all',
                  selected
                    ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_24px_-6px_rgba(198,255,0,0.6)]'
                    : 'border-white/10 bg-surface text-muted-foreground hover:border-accent/50 hover:text-white',
                )}
              >
                <span className={cn('font-mono text-[10px]', selected ? 'text-primary-foreground/70' : 'text-accent')}>
                  0{i + 1}
                </span>
                {m.tab}
              </button>
            )
          })}
        </div>

        <div
          key={active.id}
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          className="animate-in fade-in slide-in-from-bottom-2 duration-500 mt-6 grid gap-8 rounded-3xl border border-white/10 bg-surface/60 p-5 md:p-8 lg:grid-cols-12"
        >
          <div className="flex flex-col lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{active.modelNumber}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="size-3 rounded-full" style={{ backgroundColor: active.brandColor }} aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-white md:text-3xl">{active.brand}</h3>
            </div>
            <p className="mt-1 text-base text-slate-300">{active.tagline}</p>

            <dl className="mt-6">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Rubro</dt>
              <dd className="mt-1 text-sm leading-relaxed text-slate-300">{active.industry}</dd>
            </dl>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Funcionalidades</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {active.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 lg:mt-auto lg:self-start"
            >
              Probar Demo en Vivo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-[1fr_auto] items-end gap-4 md:gap-6 lg:col-span-8">
            <DesktopFrame model={active} />
            <div className="w-28 sm:w-40 md:w-48">
              <MobileFrame model={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
