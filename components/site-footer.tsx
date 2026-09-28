import { Logo } from '@/components/logo'
import { divisions, navItems, CONTACT_EMAIL, PHONE_DISPLAY } from '@/lib/site-config'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-3 md:px-6">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Ecosistema de Desarrollo & Inteligencia Aplicada. Bolivia - Santa Cruz.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a>
            <br />
            {PHONE_DISPLAY}
          </p>
        </div>
        <nav aria-label="Pie de página">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Navegación</p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {navItems.map((i) => (
              <li key={i.href}>
                <a href={i.href} className="text-sm text-muted-foreground hover:text-white">
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Divisiones EDAI</p>
          <ul className="mt-4 flex flex-col gap-2">
            {divisions.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 text-sm">
                <span className={d.status === 'activa' ? 'text-white' : 'text-muted-foreground'}>
                  {d.number} · {d.name}
                </span>
                <span className={`font-mono text-[10px] ${d.status === 'activa' ? 'text-primary' : 'text-slate-500'}`}>
                  {d.status === 'activa' ? 'ACTIVA' : 'PRÓXIMAMENTE'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-white/5 px-4 pt-6 text-xs text-slate-500 md:px-6">
        © {new Date().getFullYear()} EDAI. Todos los derechos reservados.
      </p>
    </footer>
  )
}
