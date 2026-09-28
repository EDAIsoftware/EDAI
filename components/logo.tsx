import Image from 'next/image'

export function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label="EDAI, ir al inicio">
      <Image src="/logo-edai.png" alt="" width={40} height={40} className="size-10 object-contain" priority />
      <span className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-tight text-white">
          <span className="text-primary">EDAI</span>
        </span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          División 01
        </span>
      </span>
    </a>
  )
}
