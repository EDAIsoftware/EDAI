'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { demoModels } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const domainLabels: Record<string, string> = {
  gastronomia: 'bocado-callejero.bo',
  clinicas: 'aura-clinica.bo',
  moda: 'lumina-boutique.bo',
  industrial: 'ferropro-industrial.bo',
}

export function HeroVisual() {
  const [index, setIndex] = useState(0)

  // Cambia de modelo cada 4 s (si el usuario no pidió reducir animaciones)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % demoModels.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const current = demoModels[index]

  return (
    <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" aria-hidden="true">
      <div className="relative aspect-[4/5] w-full">
        <div className="absolute left-0 top-0 w-[82%] overflow-hidden rounded-xl border border-white/10 bg-surface shadow-2xl shadow-black/60">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="ml-3 truncate font-mono text-[10px] text-muted-foreground">
              {domainLabels[current.id]}
            </span>
          </div>
          <div className="grid aspect-[16/10] w-full">
            {demoModels.map((m, i) => (
              <Image
                key={m.id}
                src={m.desktopImage!}
                alt=""
                width={1333}
                height={865}
                priority={i === 0}
                className={cn(
                  'col-start-1 row-start-1 size-full object-cover object-top transition-opacity duration-700',
                  i === index ? 'opacity-100' : 'opacity-0',
                )}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 grid w-[42%] overflow-hidden rounded-[1.6rem] border-4 border-[#1f2937] bg-black shadow-2xl shadow-black/70 ring-1 ring-white/10">
          {demoModels.map((m, i) => (
            <Image
              key={m.id}
              src={m.mobileImage!}
              alt=""
              width={367}
              height={775}
              priority={i === 0}
              className={cn(
                'col-start-1 row-start-1 aspect-[9/19] h-auto w-full object-cover object-top transition-opacity duration-700',
                i === index ? 'opacity-100' : 'opacity-0',
              )}
            />
          ))}
        </div>

        <div className="glass absolute bottom-[18%] left-[4%] flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 shadow-xl">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <MessageCircle className="size-4" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Nuevo pedido vía WhatsApp</p>
            <p className="font-mono text-sm font-semibold text-white">85 BOB · QR Simple</p>
          </div>
        </div>
      </div>
    </div>
  )
}
