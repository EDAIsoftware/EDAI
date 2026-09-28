'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, X, Lock } from 'lucide-react'
import { Logo } from '@/components/logo'
import { divisions, navItems, whatsappLink } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const prototypeLink = whatsappLink('Hola EDAI, quiero solicitar un prototipo en vivo para mi negocio.')

function DivisionSwitcher({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-white"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-primary" />
        </span>
        <span className="font-mono uppercase tracking-wider">División 1</span>
        <ChevronDown className={cn('size-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>

      {open && (
        <div className="glass absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-white/10 p-2 shadow-2xl shadow-black/50">
          <p className="px-3 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Ecosistema EDAI
          </p>
          <ul className="flex flex-col gap-1">
            {divisions.map((d) => {
              const active = d.status === 'activa'
              return (
                <li key={d.id}>
                  <div
                    aria-disabled={!active}
                    className={cn(
                      'flex items-center justify-between gap-3 rounded-lg px-3 py-2.5',
                      active ? 'bg-primary/10 ring-1 ring-primary/30' : 'opacity-60',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-accent">{d.number}</span>
                      <span className="text-sm text-white">{d.name}</span>
                    </div>
                    {active ? (
                      <span className="rounded-full bg-primary px-2 py-0.5 font-mono text-[10px] font-bold text-primary-foreground">
                        ACTIVA
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                        <Lock className="size-2.5" aria-hidden="true" />
                        PRÓXIMAMENTE
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="glass sticky top-0 z-40 border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        <div className="flex items-center gap-4">
          <Logo />
          <DivisionSwitcher className="hidden md:block" />
        </div>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={prototypeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-4px_rgba(198,255,0,0.6)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Solicitar Prototipo en Vivo
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-white xl:hidden"
          >
            {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{mobileOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Móvil" className="border-t border-white/10 px-4 pb-6 pt-4 xl:hidden">
          <DivisionSwitcher className="mb-4 md:hidden" />
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-white/5 py-3 text-base text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={prototypeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
          >
            Solicitar Prototipo en Vivo
          </a>
        </nav>
      )}
    </header>
  )
}
