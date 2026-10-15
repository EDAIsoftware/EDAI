'use client'

/*
  Landing EDAI TECH — Ecosistema de Desarrollo & Inteligencia Aplicada
  - Un solo componente, sin librerías extra (solo React). Estilos incluidos abajo (clases con prefijo ed- y m-).
  - Uso en Next.js (app router):  app/page.tsx →  import LandingEdai from '@/components/LandingEdai'
                                                   export default function Page() { return <LandingEdai /> }
  - Cambia los datos de contacto en las constantes de abajo.
*/

import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react'

// ---------------- datos de contacto ----------------
const WHATSAPP = '59164695256'
const WHATSAPP_VISIBLE = '+591 646 95256'
const EMAIL = 'edaisoftware@gmail.com'
const INSTAGRAM = 'https://www.instagram.com/edai_tech'
const FACEBOOK = 'https://www.facebook.com/edaitech' // ← verifica el enlace exacto de tu página "EDAI TECH"
const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`

const bs = (n: number) => 'Bs ' + (Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ','))
const dec = (n: number) => String(n).replace('.', ',')

type Ref<T> = { current: T }

// =====================================================================
//  ISOTIPO: núcleo verde + 8 brazos con nodos cian
// =====================================================================
const ARMS = [0, 45, 90, 135, 180, 225, 270, 315]
const ARM_RAD = ARMS.map((a) => (a * Math.PI) / 180)
const NODE_R = 118 // distancia del centro al nodo, en unidades del viewBox (320)

// Cuerpo "neurona" del logo: brazos rectos unidos al centro por una membrana cóncava
const ORB_BODY = (() => {
  const TIP = 74 // hasta dónde llega la membrana sobre cada brazo
  const W = 2.2 // medio ancho del brazo
  const C = 43 // radio de los puntos de control (profundidad de la curva)
  const pt = (r: number, a: number, off = 0) => `${(r * Math.cos(a) - off * Math.sin(a)).toFixed(2)} ${(r * Math.sin(a) + off * Math.cos(a)).toFixed(2)}`
  let d = `M${pt(TIP, 0, W)}`
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4
    const b = ((i + 1) * Math.PI) / 4
    d += ` C${pt(C, a + 0.05)} ${pt(C, b - 0.05)} ${pt(TIP, b, -W)} L${pt(TIP, b, W)}`
  }
  return d + 'Z'
})()

function OrbSVG({ ringRef, nodeRefs, uid = 'ed', size = 320, still }: { ringRef?: Ref<SVGGElement | null>; nodeRefs?: Ref<(SVGGElement | null)[]>; uid?: string; size?: number; still?: boolean }) {
  return (
    <svg viewBox="-160 -160 320 320" width={size} height={size} aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}Body`} cx="50%" cy="58%" r="55%">
          <stop offset="0" stopColor="#2FE6B4" />
          <stop offset="1" stopColor="#05B39F" />
        </radialGradient>
        <radialGradient id={`${uid}Core`} cx="42%" cy="40%" r="62%">
          <stop offset="0" stopColor="#A5FF7A" />
          <stop offset=".55" stopColor="#4CF726" />
          <stop offset="1" stopColor="#2CCB12" />
        </radialGradient>
        <radialGradient id={`${uid}Halo`}>
          <stop offset="0" stopColor="#2FE6B4" stopOpacity=".32" />
          <stop offset=".55" stopColor="#2FE6B4" stopOpacity=".07" />
          <stop offset="1" stopColor="#2FE6B4" stopOpacity="0" />
        </radialGradient>
      </defs>
      {!still && <circle r="158" fill={`url(#${uid}Halo)`} className="ed-halo" />}
      <g ref={ringRef}>
        <path d={ORB_BODY} fill={`url(#${uid}Body)`} />
        {ARMS.map((a, i) => (
          <g key={a} transform={`rotate(${a})`}>
            <line x1="70" y1="0" x2={NODE_R - 13} y2="0" stroke="#1FC7A8" strokeWidth="4.4" strokeLinecap="round" />
            <g transform={`translate(${NODE_R} 0)`}>
              <g
                className="ed-node"
                ref={(el) => {
                  if (nodeRefs) nodeRefs.current[i] = el
                }}
              >
                <circle r="12.5" fill="#03141A" stroke="#5CBFB1" strokeWidth="3.6" />
              </g>
            </g>
          </g>
        ))}
      </g>
      <g className={still ? undefined : 'ed-core'}>
        <circle r="31.5" fill="#0B5E57" />
        <circle r="26.5" fill={`url(#${uid}Core)`} />
        <circle cx="-8" cy="-9" r="7" fill="#fff" opacity=".22" />
      </g>
    </svg>
  )
}

// =====================================================================
//  PIEZAS PEQUEÑAS
// =====================================================================
function IconWA({ s = 20 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.6a9.4 9.4 0 0 0-8.1 14.2L2.6 21.4l4.7-1.2A9.4 9.4 0 1 0 12 2.6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.6 7.6c.3-.6.6-.6.9-.6h.6c.2 0 .4.1.5.4l.8 1.9c.1.2 0 .5-.1.6l-.6.7c-.1.1-.2.3 0 .5.6 1 1.4 1.8 2.5 2.4.2.1.4.1.5-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.3.3.6-.1.8-.8 1.8-1.8 1.9-2.6.3-6.7-3.3-6.9-6.2 0-.8.4-1.6.7-2.1z" fill="currentColor" />
    </svg>
  )
}
function IconIG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconFB() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 8H13a1 1 0 0 0-1 1v2h2.5l-.4 3H12v7H9v-7H7v-3h2V8.6A3.6 3.6 0 0 1 12.6 5h1.9z" fill="currentColor" />
    </svg>
  )
}
function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  )
}
function IconCart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h2l2.2 11h10.6L20 7H6.2" />
      <circle cx="9" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </svg>
  )
}

function Stepper({ value, label, onDec, onInc }: { value: string | number; label: string; onDec: () => void; onInc: () => void }) {
  return (
    <div className="m-step">
      <button type="button" aria-label={`Quitar ${label}`} onClick={onDec}>
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" aria-label={`Agregar ${label}`} onClick={onInc}>
        +
      </button>
    </div>
  )
}

function Phone({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className={`ed-phone${wide ? ' ed-phone-demo' : ''}`}>
      <div className="ed-phone-screen">{children}</div>
    </div>
  )
}
function Laptop({ children }: { children: ReactNode }) {
  return (
    <div className="ed-laptop">
      <div className="ed-laptop-screen">
        <Scaled w={1000} h={620}>
          {children}
        </Scaled>
      </div>
      <div className="ed-laptop-base" />
    </div>
  )
}

// QR decorativo (no es un QR real)
function FakeQR({ size = 78 }: { size?: number }) {
  const N = 21
  const cells: ReactNode[] = []
  const finder = (r: number, c: number) => {
    const inBox = (r0: number, c0: number) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7
    for (const [r0, c0] of [[0, 0], [0, 14], [14, 0]]) {
      if (inBox(r0, c0)) {
        const y = r - r0, x = c - c0
        return x === 0 || y === 0 || x === 6 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4) ? 1 : 0
      }
    }
    return -1
  }
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) {
      const f = finder(r, c)
      const on = f === -1 ? (r * 7 + c * 13 + r * c) % 5 < 2 : f === 1
      if (on) cells.push(<rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" />)
    }
  return (
    <svg width={size} height={size} viewBox="-1 -1 23 23" aria-label="Código QR de pago (ejemplo)" role="img" style={{ background: '#fff', borderRadius: 6 }}>
      <g fill="#111">{cells}</g>
    </svg>
  )
}

// =====================================================================
//  CASOS REALES — maquetas funcionales basadas en los diseños de EDAI
//  Fotos: copia la carpeta casos/ a /public/casos/ de tu proyecto
// =====================================================================
const IMG = {
  aura: '/casos/aura.jpg',
  lumina: '/casos/lumina.jpg',
  ferro: '/casos/ferro.jpg',
  bocado: '/casos/bocado.jpg',
  bocadoBacon: '/casos/bocado-bacon.jpg',
  bocadoClasica: '/casos/bocado-clasica.jpg',
  bocadoDoble: '/casos/bocado-doble.jpg',
  auraFacial: '/casos/aura-facial.jpg',
  auraSala: '/casos/aura-sala.jpg',
  chMatambre: '/casos/chavela-matambre.jpg',
  chBife: '/casos/chavela-bife.jpg',
  chMedallones: '/casos/chavela-medallones.jpg',
  chPack6: '/casos/chavela-pack6.jpg',
  chPack10: '/casos/chavela-pack10.jpg',
  luMarfil: '/casos/lumina-marfil.jpg',
  luRayas: '/casos/lumina-rayas.jpg',
  luLino: '/casos/lumina-lino.jpg',
}

// Muestra un sitio de escritorio (diseñado a w x h) escalado al ancho disponible
function Scaled({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [s, setS] = useState(0.5)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const medir = () => setS(el.clientWidth / w)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [w])
  return (
    <div ref={ref} className="ed-scaled" style={{ height: h * s }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, transform: `scale(${s})`, transformOrigin: '0 0' }}>{children}</div>
    </div>
  )
}

function IconBag({ s = 16 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1 12H6z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}

// ---------------- Bocado Callejero ----------------
const BOCADO_CATS = ['Combos', 'Hamburguesas', 'Bebidas']
const BOCADO_ITEMS = [
  { id: 'crispy', cat: 'Combos', n: 'Combo Crispy', d: 'Burger crispy, papas sazonadas y bebida fría.', p: 42, pos: '50% 50%', z: 1 },
  { id: 'smash', cat: 'Combos', n: 'Combo Doble Smash', d: 'Doble carne, doble cheddar, cebolla caramelizada y papas.', p: 48, pos: '50% 55%', z: 1, img: IMG.bocadoDoble },
  { id: 'bbq', cat: 'Hamburguesas', n: 'Bacon Cheddar', d: 'Carne a la parrilla, cheddar fundido y tocino crocante.', p: 32, pos: '50% 50%', z: 1, img: IMG.bocadoBacon },
  { id: 'clasica', cat: 'Hamburguesas', n: 'Clásica con queso', d: 'Carne 150 g, cheddar, tomate, cebolla y lechuga.', p: 26, pos: '50% 50%', z: 1, img: IMG.bocadoClasica },
  { id: 'papas', cat: 'Hamburguesas', n: 'Papas sazonadas', d: 'Porción grande para compartir.', p: 14, pos: '64% 40%', z: 2.4 },
  { id: 'refresco', cat: 'Bebidas', n: 'Refresco 500 ml', d: 'Coca-Cola, Fanta o Sprite.', p: 8, pos: '95% 45%', z: 2.8 },
  { id: 'limonada', cat: 'Bebidas', n: 'Limonada frozen', d: 'Con hierbabuena.', p: 12, pos: '95% 45%', z: 2.8, f: 'hue-rotate(70deg) saturate(.5) brightness(1.6)' },
]
function BocadoMock() {
  const [cat, setCat] = useState('Combos')
  const [q, setQ] = useState<Record<string, number>>({ crispy: 1, smash: 0, bbq: 0, clasica: 0, papas: 0, refresco: 1, limonada: 0 })
  const [vista, setVista] = useState<'menu' | 'pedido' | 'enviado'>('menu')
  const [pago, setPago] = useState<'QR Simple' | 'Banred'>('QR Simple')
  const enPedido = BOCADO_ITEMS.filter((i) => q[i.id] > 0)
  const unidades = enPedido.reduce((a, i) => a + q[i.id], 0)
  const total = enPedido.reduce((a, i) => a + q[i.id] * i.p, 0)
  const set = (id: string, d: number) => setQ((s) => ({ ...s, [id]: Math.max(0, Math.min(9, s[id] + d)) }))
  const msg = `Hola Bocado Callejero, mi pedido:\n${enPedido.map((i) => `${q[i.id]}x ${i.n}`).join('\n')}\nTotal: ${total} BOB\nPago: ${pago}`

  if (vista === 'enviado')
    return (
      <div className="m bc">
        <div className="bc-top bc-top-sm">
          <button type="button" className="bc-back" onClick={() => setVista('menu')} aria-label="Volver al menú">
            ←
          </button>
          <strong>Pedido enviado</strong>
        </div>
        <div className="m-body bc-chat">
          <div className="m-bubble">{msg}</div>
          {pago === 'QR Simple' ? (
            <div className="bc-qr">
              <FakeQR size={70} />
              <div>
                <strong>Escanea con tu banco</strong>
                <span>Tu pedido sale apenas confirmemos el pago.</span>
              </div>
            </div>
          ) : (
            <div className="bc-qr">
              <div>
                <strong>Transferencia Banred</strong>
                <span>Te enviamos los datos de la cuenta por este chat.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )

  if (vista === 'pedido')
    return (
      <div className="m bc">
        <div className="bc-top bc-top-sm">
          <button type="button" className="bc-back" onClick={() => setVista('menu')} aria-label="Seguir pidiendo">
            ←
          </button>
          <strong>Mi pedido</strong>
        </div>
        <div className="m-body">
          {enPedido.length === 0 && <p className="m-muted">Tu pedido está vacío.</p>}
          {enPedido.map((i) => (
            <div key={i.id} className="bc-line">
              <div className="bc-ph bc-thumb">
                <img src={i.img ?? IMG.bocado} alt="" style={{ objectPosition: i.pos, transform: `scale(${i.z})`, transformOrigin: i.pos, filter: i.f }} />
              </div>
              <div className="m-grow">
                <div className="bc-name">{i.n}</div>
                <div className="bc-price-sm">{i.p * q[i.id]} BOB</div>
              </div>
              <Stepper value={q[i.id]} label={i.n} onDec={() => set(i.id, -1)} onInc={() => set(i.id, 1)} />
            </div>
          ))}
          <div className="bc-label">Forma de pago</div>
          <div className="bc-pay" role="group" aria-label="Forma de pago">
            {(['QR Simple', 'Banred'] as const).map((p) => (
              <button type="button" key={p} aria-pressed={pago === p} className={pago === p ? 'on' : ''} onClick={() => setPago(p)}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="bc-foot">
          <div className="m-total">
            <span>Total</span>
            <strong>{total} BOB</strong>
          </div>
          <button type="button" className="bc-cta" disabled={!unidades} onClick={() => setVista('enviado')}>
            Enviar pedido por WhatsApp
          </button>
        </div>
      </div>
    )

  return (
    <div className="m bc">
      <div className="bc-top">
        <div className="bc-id">
          <span className="bc-logo">BC</span>
          <div>
            <strong>Bocado Callejero</strong>
            <span>Santa Cruz</span>
          </div>
        </div>
        <span className="bc-open">Abierto</span>
      </div>
      <div className="bc-hours">
        <span>Hoy 11:30 a 23:00</span>
        <strong>Delivery</strong>
      </div>
      <div className="bc-cats" role="tablist" aria-label="Categorías">
        {BOCADO_CATS.map((c) => (
          <button type="button" role="tab" key={c} aria-selected={cat === c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="m-body bc-body">
        <div className="bc-kicker">Lo más pedido</div>
        <div className="bc-h">{cat}</div>
        {BOCADO_ITEMS.filter((i) => i.cat === cat).map((i, k) => (
          <div key={i.id} className={`bc-card${k ? ' row' : ''}`}>
            <div className="bc-ph">
              <img src={i.img ?? IMG.bocado} alt={i.n} style={{ objectPosition: i.pos, transform: `scale(${i.z})`, transformOrigin: i.pos, filter: i.f }} />
            </div>
            <div className="bc-card-in">
              <div className="m-grow">
                <div className="bc-name">{i.n}</div>
                <div className="bc-desc">{i.d}</div>
                <div className="bc-price">
                  {i.p} <small>BOB</small>
                </div>
              </div>
              <button type="button" className="bc-plus" aria-label={`Agregar ${i.n}`} onClick={() => set(i.id, 1)}>
                {q[i.id] ? q[i.id] : '+'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="bc-bar" onClick={() => setVista('pedido')}>
        <span className="bc-bar-ic">
          <IconBag />
        </span>
        <span className="m-grow">
          <strong>Ver mi pedido</strong>
          <small>
            {unidades} productos, {total} BOB
          </small>
        </span>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}

// ---------------- Lúmina ----------------
const LUMINA = [
  { n: 'Conjunto Marfil', p: 390, img: IMG.luMarfil, pos: '50% 28%', colores: [{ c: 'Marfil', h: '#EDE6DA', f: 'none' }, { c: 'Arena', h: '#CDB79A', f: 'sepia(.45) saturate(.95)' }], agot: ['XS'] },
  { n: 'Camisa Rayas', p: 245, img: IMG.luRayas, pos: '50% 26%', colores: [{ c: 'Azul', h: '#7F9CC4', f: 'none' }, { c: 'Celeste', h: '#B9CDE3', f: 'saturate(.55) brightness(1.08)' }], agot: [] as string[] },
  { n: 'Pantalón Lino', p: 280, img: IMG.luLino, pos: '50% 55%', colores: [{ c: 'Lino', h: '#E2D8C6', f: 'none' }, { c: 'Oliva', h: '#7C7F5A', f: 'sepia(.6) hue-rotate(35deg) saturate(.9) brightness(.8)' }], agot: ['L'] },
]
const TALLAS = ['XS', 'S', 'M', 'L']
function LuminaMock() {
  const [idx, setIdx] = useState(0)
  const [color, setColor] = useState(0)
  const [talla, setTalla] = useState<string | null>(null)
  const [cant, setCant] = useState(1)
  const [cart, setCart] = useState<{ n: string; t: string; c: string; k: number; p: number; pos: string; f: string; img: string }[]>([])
  const [verCarrito, setVerCarrito] = useState(false)
  const [ok, setOk] = useState(false)
  const prod = LUMINA[idx]
  const unidades = cart.reduce((a, i) => a + i.k, 0)
  const total = cart.reduce((a, i) => a + i.k * i.p, 0)
  const add = () => {
    if (!talla) return
    setCart((c) => [...c, { n: prod.n, t: talla, c: prod.colores[color].c, k: cant, p: prod.p, pos: prod.pos, f: prod.colores[color].f, img: prod.img }])
    setOk(true)
    window.setTimeout(() => setOk(false), 1100)
  }

  return (
    <div className="m lu">
      <div className="lu-nav">
        <span className="lu-logo">
          LÚMINA<i>.</i>
        </span>
        <button type="button" className="lu-cart" aria-label={`Carrito, ${unidades} productos`} onClick={() => setVerCarrito((v) => !v)}>
          <IconBag s={15} />
          <span className="lu-count">{unidades}</span>
        </button>
      </div>
      {!verCarrito ? (
        <>
          <div className="m-body lu-body">
            <div className="lu-hero">
              <img key={`${idx}-${color}`} src={prod.img} alt={`${prod.n}, color ${prod.colores[color].c}`} style={{ objectPosition: prod.pos, filter: prod.colores[color].f }} />
              <span className="lu-hero-tag">Envíos a todo Santa Cruz</span>
              <div className="lu-hero-t">
                Nueva
                <br />
                colección<i>.</i>
              </div>
            </div>
            <div className="lu-kicker">Selección de temporada</div>
            <div className="lu-prods" role="group" aria-label="Prendas">
              {LUMINA.map((p, i) => (
                <button
                  type="button"
                  key={p.n}
                  aria-pressed={i === idx}
                  className={i === idx ? 'on' : ''}
                  onClick={() => {
                    setIdx(i)
                    setColor(0)
                    setTalla(null)
                  }}
                >
                  {p.n}
                </button>
              ))}
            </div>
            <div className="lu-row">
              <span className="lu-sub">Color: {prod.colores[color].c}</span>
              <span className="lu-dots">
                {prod.colores.map((c, i) => (
                  <button type="button" key={c.c} aria-label={c.c} aria-pressed={i === color} className={i === color ? 'on' : ''} style={{ background: c.h }} onClick={() => setColor(i)} />
                ))}
              </span>
            </div>
            <div className="lu-sizes" role="group" aria-label="Talla">
              {TALLAS.map((t) => (
                <button type="button" key={t} disabled={prod.agot.includes(t)} aria-pressed={talla === t} className={talla === t ? 'on' : ''} onClick={() => setTalla(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="lu-bar">
            <div className="lu-bar-t">
              <i />
              {prod.n} · Bs. {prod.p}
            </div>
            <div className="lu-bar-r">
              <div className="lu-qty">
                <button type="button" aria-label="Quitar uno" onClick={() => setCant((c) => Math.max(1, c - 1))}>
                  −
                </button>
                <span>{cant}</span>
                <button type="button" aria-label="Agregar uno" onClick={() => setCant((c) => Math.min(9, c + 1))}>
                  +
                </button>
              </div>
              <button type="button" className="lu-add" onClick={add} disabled={!talla}>
                <IconBag s={13} /> {ok ? 'Añadido' : 'Añadir'}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="m-body lu-body">
            <div className="lu-kicker">Tu carrito</div>
            {cart.length === 0 && <p className="m-muted">Aún no agregaste prendas.</p>}
            {cart.map((i, k) => (
              <div className="lu-line" key={k}>
                <img src={i.img} alt="" style={{ objectPosition: i.pos, filter: i.f }} />
                <div className="m-grow">
                  <div className="lu-name">{i.n}</div>
                  <div className="m-muted">
                    {i.c}, talla {i.t}, {i.k} u.
                  </div>
                </div>
                <strong>Bs. {i.p * i.k}</strong>
              </div>
            ))}
          </div>
          <div className="lu-foot">
            <div className="m-total">
              <span>Total</span>
              <strong>Bs. {total}</strong>
            </div>
            <button type="button" className="lu-add lu-add-full" disabled={!cart.length}>
              Finalizar por WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ---------------- Chavela ----------------
const CORTES = [
  { id: 'matambre', n: 'Matambre', u: 'kg', p: 85, step: 0.5, img: IMG.chMatambre },
  { id: 'bife', n: 'Ojo de bife', u: 'kg', p: 115, step: 0.5, img: IMG.chBife },
  { id: 'medallon', n: 'Medallones de res', u: 'pack', p: 38, step: 1, img: IMG.chMedallones },
]
const PACKS = [
  { id: 'p6', n: 'Pack Parrillero x6', d: 'Bife ancho, costilla y medallones, todo al vacío', p: 365, img: IMG.chPack6 },
  { id: 'p10', n: 'Pack Familiar x10', d: 'Cortes surtidos, carré y medallones al vacío', p: 590, img: IMG.chPack10 },
]
// Foto del producto; si el archivo no existe muestra una placa con el estilo de la marca
function FotoProducto({ src, alt, className }: { src: string; alt: string; className: string }) {
  const ref = useRef<HTMLImageElement | null>(null)
  const [falla, setFalla] = useState(false)
  useEffect(() => {
    const im = ref.current
    if (im && im.complete && im.naturalWidth === 0) setFalla(true)
  }, [])
  if (falla)
    return (
      <span className={`${className} ch-ph-empty`} aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#C9A24A" strokeWidth="1.3" strokeLinejoin="round">
          <path d="M6 13c1.5-5.5 9-8.5 15-6s7.5 9.5 3.5 13.5S12 27 8 24s-3-7-2-11z" />
          <path d="M11 13c2-2 6-2.5 8-1M10.5 18c2.5 1 6 1 8.5-.5" opacity=".6" />
          <circle cx="21" cy="17" r="2.2" />
        </svg>
      </span>
    )
  return <img ref={ref} className={className} src={src} alt={alt} onError={() => setFalla(true)} />
}

function ChavelaMock() {
  const [tab, setTab] = useState<'cortes' | 'packs'>('cortes')
  const [q, setQ] = useState<Record<string, number>>({ matambre: 1.5, bife: 0, medallon: 2 })
  const [packs, setPacks] = useState<string[]>([])
  const [listo, setListo] = useState(false)
  const set = (id: string, step: number, d: number) => setQ((s) => ({ ...s, [id]: Math.max(0, Math.min(20, +(s[id] + d * step).toFixed(1))) }))
  const total = CORTES.reduce((a, c) => a + q[c.id] * c.p, 0) + PACKS.filter((p) => packs.includes(p.id)).reduce((a, p) => a + p.p, 0)

  return (
    <div className="m ch">
      <div className="ch-head">
        <strong className="ch-brand">CHAVELA</strong>
        <span>Carnicería boutique desde 1998</span>
      </div>
      <div className="ch-tabs" role="tablist" aria-label="Catálogo Chavela">
        <button type="button" role="tab" aria-selected={tab === 'cortes'} className={tab === 'cortes' ? 'on' : ''} onClick={() => setTab('cortes')}>
          Cortes
        </button>
        <button type="button" role="tab" aria-selected={tab === 'packs'} className={tab === 'packs' ? 'on' : ''} onClick={() => setTab('packs')}>
          Packs parrilleros
        </button>
      </div>
      <div className="m-body">
        {tab === 'cortes'
          ? CORTES.map((c) => (
              <div key={c.id} className="ch-item">
                <FotoProducto className="ch-thumb" src={c.img} alt={c.n} />
                <div className="m-grow">
                  <div className="ch-name">{c.n}</div>
                  <div className="ch-price">
                    Bs {c.p}/{c.u}
                  </div>
                </div>
                <Stepper value={c.u === 'kg' ? `${dec(q[c.id])} kg` : q[c.id]} label={c.n} onDec={() => set(c.id, c.step, -1)} onInc={() => set(c.id, c.step, 1)} />
              </div>
            ))
          : PACKS.map((p) => {
              const on = packs.includes(p.id)
              return (
                <button type="button" key={p.id} aria-pressed={on} className={`ch-pack${on ? ' on' : ''}`} onClick={() => setPacks((s) => (on ? s.filter((x) => x !== p.id) : [...s, p.id]))}>
                  <FotoProducto className="ch-banner" src={p.img} alt={p.n} />
                  <span className="ch-name">{p.n}</span>
                  <span className="m-muted">{p.d}</span>
                  <span className="ch-price">
                    Bs {p.p}
                    {on ? ', en tu pedido' : ''}
                  </span>
                </button>
              )
            })}
      </div>
      <div className="ch-foot">
        <div className="m-total">
          <span>Total estimado</span>
          <strong>Bs {dec(total)}</strong>
        </div>
        <button type="button" className="ch-cta" disabled={!total} onClick={() => setListo((v) => !v)}>
          {listo ? 'Pedido armado, abriendo WhatsApp' : 'Pedir por WhatsApp'}
        </button>
      </div>
    </div>
  )
}

// ---------------- Aura ----------------
const AURA_SERV = ['Valoración facial', 'Toxina botulínica', 'Limpieza profunda']
const AURA_FOTO = [
  { src: IMG.auraFacial, pos: '50% 40%' },
  { src: IMG.auraFacial, pos: '20% 30%' },
  { src: IMG.auraSala, pos: '50% 70%' },
]
const AURA_DIAS = [
  { d: 'Lun', n: 19 },
  { d: 'Mar', n: 20 },
  { d: 'Mié', n: 21 },
  { d: 'Jue', n: 22 },
  { d: 'Vie', n: 23 },
  { d: 'Sáb', n: 24 },
]
const AURA_HORAS = ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '15:00', '15:30', '16:00', '16:30']
function AuraMock() {
  const [abierto, setAbierto] = useState(false)
  const [serv, setServ] = useState(0)
  const [dia, setDia] = useState(3)
  const [hora, setHora] = useState<string | null>(null)
  const [hecho, setHecho] = useState(false)
  const ocupada = (h: number) => (dia * 3 + h + serv) % 4 === 0

  return (
    <div className="au">
      <div className="au-nav">
        <span className="au-logo">
          <span className="au-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 3l1.8 5.2L17 10l-5.2 1.8L10 17l-1.8-5.2L3 10l5.2-1.8z" />
              <path d="M18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z" />
            </svg>
          </span>
          aura<i>.</i>
        </span>
        <span className="au-links">
          <span>Servicios</span>
          <span>Sobre nosotros</span>
          <span>Opiniones</span>
        </span>
        <span className="au-pill-dark">Contáctanos</span>
      </div>
      <div className="au-hero">
        <div className="au-left">
          <span className="au-tag">Medicina estética consciente</span>
          <h4 className="au-h">
            Tu mejor versión,
            <br />
            <em>con naturalidad.</em>
          </h4>
          <p className="au-p">Cuidamos de ti con ciencia, sensibilidad y resultados que se sienten tan bien como se ven.</p>
          <div className="au-btns">
            <button
              type="button"
              className="au-btn"
              onClick={() => {
                setAbierto(true)
                setHecho(false)
              }}
            >
              <IconWA s={18} /> Agendar cita
            </button>
            <span className="au-btn-o">Conoce nuestros servicios ↗</span>
          </div>
          <div className="au-proof">
            <span className="au-av" style={{ background: '#D9A88E' }}>MV</span>
            <span className="au-av" style={{ background: '#6E93A6' }}>AM</span>
            <span className="au-av" style={{ background: '#B98673' }}>CR</span>
            <span>
              <strong>+2,000</strong> personas ya confiaron en Aura
            </span>
          </div>
        </div>
        <div className="au-right">
          <div className="au-photo">
            <img src={IMG.aura} alt="" />
          </div>
          <div className="au-badge">
            <span className="au-check">✓</span>
            <span>
              <small>Atención personalizada</small>
              <strong>Siempre cerca de ti</strong>
            </span>
          </div>
          <div className="au-rating">
            <strong>4.9</strong>
            <span>
              <i>★★★★★</i>
              Google Reviews
            </span>
          </div>
          {abierto && (
            <div className="au-book" role="dialog" aria-label="Agendar cita en Aura">
              <button type="button" className="au-x" aria-label="Cerrar" onClick={() => setAbierto(false)}>
                ×
              </button>
              {!hecho ? (
                <>
                  <img className="au-book-img" key={serv} src={AURA_FOTO[serv].src} alt={AURA_SERV[serv]} style={{ objectPosition: AURA_FOTO[serv].pos }} />
                  <div className="au-book-t">Agenda tu cita</div>
                  <div className="au-servs" role="group" aria-label="Tratamiento">
                    {AURA_SERV.map((s, i) => (
                      <button
                        type="button"
                        key={s}
                        aria-pressed={i === serv}
                        className={i === serv ? 'on' : ''}
                        onClick={() => {
                          setServ(i)
                          setHora(null)
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="au-days" role="group" aria-label="Día">
                    {AURA_DIAS.map((d, i) => (
                      <button
                        type="button"
                        key={d.n}
                        aria-pressed={i === dia}
                        className={i === dia ? 'on' : ''}
                        onClick={() => {
                          setDia(i)
                          setHora(null)
                        }}
                      >
                        <span>{d.d}</span>
                        <strong>{d.n}</strong>
                      </button>
                    ))}
                  </div>
                  <div className="au-slots" role="group" aria-label="Horario">
                    {AURA_HORAS.map((h, i) => (
                      <button type="button" key={h} disabled={ocupada(i)} aria-pressed={hora === h} className={hora === h ? 'on' : ''} onClick={() => setHora(h)}>
                        {h}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="au-btn au-btn-full" disabled={!hora} onClick={() => setHecho(true)}>
                    {hora ? `Confirmar ${AURA_DIAS[dia].d} ${AURA_DIAS[dia].n}, ${hora}` : 'Elige un horario libre'}
                  </button>
                </>
              ) : (
                <div className="au-done">
                  <span className="au-check au-check-lg">✓</span>
                  <div className="au-book-t">Cita reservada</div>
                  <p>
                    {AURA_SERV[serv]}, {AURA_DIAS[dia].d} {AURA_DIAS[dia].n} a las {hora}. Te enviamos el recordatorio por WhatsApp un día antes.
                  </p>
                  <button type="button" className="au-btn-o au-btn-link" onClick={() => setHecho(false)}>
                    Cambiar horario
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------- FerroPro Industrial ----------------
const FERRO = [
  { c: 'FP-1021', n: 'Taladro percutor 18V con batería', cat: 'Herramientas', s: 12 },
  { c: 'FP-2210', n: 'Rodamiento 6205 2RS', cat: 'Repuestos', s: 48 },
  { c: 'FP-3307', n: 'Correa en V A-42', cat: 'Repuestos', s: 15 },
  { c: 'FP-4415', n: 'Perno hexagonal 1/2" x 2" (caja 50)', cat: 'Fijaciones', s: 31 },
  { c: 'FP-5120', n: 'Disco de corte 4 1/2"', cat: 'Abrasivos', s: 120 },
  { c: 'FP-6602', n: 'Manguera hidráulica 1/2" (metro)', cat: 'Hidráulica', s: 64 },
  { c: 'FP-7018', n: 'Electrodo E6013 1/8" (kg)', cat: 'Soldadura', s: 0 },
]
function FerroMock() {
  const [vista, setVista] = useState<'inicio' | 'catalogo'>('inicio')
  const [busca, setBusca] = useState('')
  const [cot, setCot] = useState<Record<string, number>>({})
  const [enviada, setEnviada] = useState(false)
  const t = busca.trim().toLowerCase()
  const filas = FERRO.filter((f) => !t || f.n.toLowerCase().includes(t) || f.c.toLowerCase().includes(t))
  const items = FERRO.filter((f) => cot[f.c])
  const nItems = items.reduce((a, f) => a + cot[f.c], 0)
  const add = (c: string, d: number) => {
    setEnviada(false)
    setCot((s) => {
      const n = Math.max(0, (s[c] || 0) + d)
      const x = { ...s }
      if (n) x[c] = n
      else delete x[c]
      return x
    })
  }
  const bolt = (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2L5 14h6l-1 8 8-12h-6z" fill="#1E2023" />
    </svg>
  )

  return (
    <div className="fp">
      <div className="fp-top">
        <span>Santa Cruz de la Sierra, Bolivia</span>
        <span className="fp-y">Envíos e instalación en todo Santa Cruz</span>
        <span>Atención: Lun a Sáb, 08:00 a 18:00</span>
      </div>
      <div className="fp-nav">
        <button type="button" className="fp-logo" onClick={() => setVista('inicio')} aria-label="FerroPro, inicio">
          <span className="fp-mark">{bolt}</span>
          <span>
            <b>
              FERRO<i>PRO</i>
            </b>
            <small>INDUSTRIAL</small>
          </span>
        </button>
        <span className="fp-links">
          <button type="button" onClick={() => setVista('catalogo')}>
            Catálogo
          </button>
          <span>Servicios</span>
          <span>Nosotros</span>
          <span>Contacto</span>
        </span>
        <button type="button" className="fp-quote-btn" onClick={() => setVista('catalogo')}>
          Cotización {nItems > 0 && <span>{nItems}</span>}
        </button>
      </div>
      {vista === 'inicio' ? (
        <>
          <div className="fp-hero">
            <div className="fp-left">
              <span className="fp-tag">Equipamiento profesional para tus proyectos</span>
              <h4 className="fp-h">
                Potencia tu
                <br />
                trabajo.
                <br />
                <em>
                  Construye
                  <br />
                  mejor.
                </em>
              </h4>
              <p>Herramientas, maquinaria y soluciones industriales para profesionales que no se detienen.</p>
              <div className="fp-btns">
                <button type="button" className="fp-btn" onClick={() => setVista('catalogo')}>
                  Ver catálogo →
                </button>
                <span className="fp-btn-o">Hablar con un especialista</span>
              </div>
            </div>
            <div className="fp-right">
              <div className="fp-yellow" />
              <div className="fp-photo">
                <img src={IMG.ferro} alt="" />
              </div>
            </div>
          </div>
          <div className="fp-strip">
            <span>
              <b>Entrega rápida</b>En Santa Cruz y alrededores
            </span>
            <span>
              <b>Garantía oficial</b>De fábrica y servicio técnico
            </span>
            <span>
              <b>Asesoría experta</b>Te ayudamos a elegir mejor
            </span>
            <span>
              <b>Compra segura</b>QR y transferencias bancarias
            </span>
          </div>
        </>
      ) : (
        <div className="fp-cat">
          <div className="fp-cat-main">
            <div className="fp-cat-head">
              <h4>Catálogo técnico</h4>
              <input aria-label="Buscar repuesto por nombre o código" placeholder="Buscar por nombre o código" value={busca} onChange={(e) => setBusca(e.target.value)} />
            </div>
            <div className="fp-table" role="table" aria-label="Repuestos">
              {filas.length === 0 && <p className="fp-empty">No hay productos con “{busca}”. Prueba con otro código.</p>}
              {filas.map((f) => (
                <div className="fp-tr" role="row" key={f.c}>
                  <span className="fp-code" role="cell">
                    {f.c}
                  </span>
                  <span className="fp-n" role="cell">
                    {f.n}
                    <small>{f.cat}</small>
                  </span>
                  <span className={`fp-stock${f.s ? '' : ' out'}`} role="cell">
                    {f.s ? `${f.s} en stock` : 'A pedido'}
                  </span>
                  <button type="button" className="fp-add" aria-label={`Agregar ${f.n} a la cotización`} onClick={() => add(f.c, 1)}>
                    {cot[f.c] ? `Agregado (${cot[f.c]})` : 'Agregar'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="fp-side">
            <h4>Tu cotización</h4>
            {items.length === 0 && <p className="fp-empty">Agrega productos del catálogo y te enviamos precios y disponibilidad.</p>}
            {items.map((f) => (
              <div className="fp-qrow" key={f.c}>
                <span>
                  <b>{f.c}</b>
                  {f.n}
                </span>
                <Stepper value={cot[f.c]} label={f.n} onDec={() => add(f.c, -1)} onInc={() => add(f.c, 1)} />
              </div>
            ))}
            <button type="button" className="fp-btn fp-btn-full" disabled={!items.length} onClick={() => setEnviada(true)}>
              {enviada ? 'Cotización enviada por WhatsApp' : 'Pedir cotización'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const CASOS = [
  { id: 'bocado', rubro: 'Gastronomía', nombre: 'Bocado Callejero', txt: 'Menú por categorías con combos y pedido en bolivianos. El cliente paga con QR Simple o Banred y el pedido llega a WhatsApp.', Mock: BocadoMock, laptop: false },
  { id: 'lumina', rubro: 'Moda y boutiques', nombre: 'Lúmina', txt: 'Tienda editorial con colores, tallas agotadas marcadas y carrito que se cierra por WhatsApp.', Mock: LuminaMock, laptop: false },
  { id: 'chavela', rubro: 'Carnicería boutique', nombre: 'Chavela', txt: 'Cortes por kilo o por pieza y packs parrilleros armados, con el total calculado al instante.', Mock: ChavelaMock, laptop: false },
  { id: 'aura', rubro: 'Clínicas y estética', nombre: 'Aura', txt: 'Sitio de clínica con agenda en línea: el paciente elige tratamiento, día y horario libre, y recibe su recordatorio. Prueba el botón Agendar cita.', Mock: AuraMock, laptop: true },
  { id: 'ferro', rubro: 'Ferreterías e industria', nombre: 'FerroPro Industrial', txt: 'Catálogo técnico con códigos y stock. El cliente arma su lista y pide cotización en segundos. Entra a Ver catálogo.', Mock: FerroMock, laptop: true },
]

// =====================================================================
//  DEMO: el agente recorre la tienda Lúmina
// =====================================================================
const DEMO_PRODS = [
  { n: 'Conjunto Marfil', p: 390, img: IMG.luMarfil, pos: '50% 25%', f: 'none' },
  { n: 'Pantalón Lino', p: 280, img: IMG.luLino, pos: '50% 45%', f: 'none' },
  { n: 'Vestido Aura', p: 420, img: IMG.lumina, pos: '45% 25%', f: 'none' },
  { n: 'Camisa Rayas', p: 245, img: IMG.luRayas, pos: '50% 22%', f: 'none' },
  { n: 'Conjunto Arena', p: 390, img: IMG.luMarfil, pos: '50% 25%', f: 'sepia(.45) saturate(.95)' },
  { n: 'Pantalón Oliva', p: 280, img: IMG.luLino, pos: '50% 45%', f: 'sepia(.6) hue-rotate(35deg) saturate(.9) brightness(.8)' },
]
// posiciones del cursor en px dentro de la pantalla (248 x 500)
const DEMO = [
  { t: 'Abre tu catálogo desde un link o un QR', x: 124, y: 150, ms: 1700 },
  { t: 'Recorre los productos', x: 124, y: 330, ms: 1700 },
  { t: 'Elige el que le gusta', x: 183, y: 174, ms: 1500, tap: true },
  { t: 'Selecciona su talla', x: 152, y: 325, ms: 1600, tap: true },
  { t: 'Lo agrega al carrito', x: 124, y: 462, ms: 1600, tap: true },
  { t: 'Revisa su pedido', x: 124, y: 462, ms: 1800, tap: true },
  { t: 'Te llega listo por WhatsApp', x: 222, y: 474, ms: 3400 },
]

function Foto({ src, pos, f, className }: { src: string; pos: string; f: string; className: string }) {
  return <div className={className} style={{ backgroundImage: `url(${src})`, backgroundPosition: pos, filter: f }} />
}

function DemoIA({ sectionRef, anchorRef, cursorRef }: { sectionRef: Ref<HTMLElement | null>; anchorRef: Ref<HTMLDivElement | null>; cursorRef: Ref<HTMLDivElement | null> }) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [sectionRef])

  useEffect(() => {
    if (!playing || !inView) return
    const id = window.setTimeout(() => setStep((s) => (s + 1) % DEMO.length), DEMO[step].ms)
    return () => window.clearTimeout(id)
  }, [step, playing, inView])

  const view = step <= 2 ? 'list' : step <= 4 ? 'detail' : step === 5 ? 'checkout' : 'chat'
  const elegido = DEMO_PRODS[3]
  const cur = DEMO[step]

  return (
    <div className="ed-demo">
      <div>
        <h2 className="ed-h2">Así compra tu cliente, en menos de un minuto</h2>
        <p className="ed-lede">El agente de EDAI recorre una tienda real tal como lo haría alguien desde su celular: busca, elige la talla y deja el pedido listo en tu WhatsApp. Sin apps que descargar ni cuentas que crear.</p>
        <ol className="ed-steps">
          {DEMO.map((d, i) => (
            <li key={d.t} className={i === step ? 'on' : i < step ? 'done' : ''}>
              <button
                type="button"
                aria-current={i === step ? 'step' : undefined}
                onClick={() => {
                  setStep(i)
                  setPlaying(false)
                }}
              >
                <span className="ed-steps-n">{i + 1}</span>
                {d.t}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="ed-btn ed-btn-ghost ed-btn-sm" onClick={() => setPlaying((p) => !p)}>
          {playing ? 'Pausar demostración' : 'Reproducir demostración'}
        </button>
      </div>

      <div className="ed-demo-stage">
        <div ref={anchorRef} className="ed-demo-anchor" aria-hidden="true" />
        <Phone wide>
          <div className="m lu d-screen">
            {view === 'list' && (
              <>
                <div className="d-head">
                  <span className="lu-logo">
                    LÚMINA<i>.</i>
                  </span>
                  <span className="lu-cart">
                    <IconBag s={15} />
                    <span className="lu-count">0</span>
                  </span>
                </div>
                <div className="d-cats">
                  <span className="on">Todo</span>
                  <span>Vestidos</span>
                  <span>Faldas</span>
                </div>
                <div className="d-grid" style={{ transform: `translateY(${step >= 1 ? -150 : 0}px)` }}>
                  {DEMO_PRODS.map((p, i) => (
                    <div key={p.n} className={`d-card${step === 2 && i === 3 ? ' press' : ''}`}>
                      <Foto className="d-img" src={p.img} pos={p.pos} f={p.f} />
                      <div className="d-name">{p.n}</div>
                      <div className="d-price">Bs. {p.p}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {view === 'detail' && (
              <>
                <div className="d-photo">
                  <Foto className="d-photo-img" src={elegido.img} pos="50% 20%" f={elegido.f} />
                  <span className="lu-cart d-cart-float">
                    <IconBag s={15} />
                    <span className="lu-count">{step >= 4 ? 1 : 0}</span>
                  </span>
                </div>
                <div className="d-info">
                  <div className="lu-name lu-name-lg">{elegido.n}</div>
                  <div className="d-price">Bs. {elegido.p}</div>
                  <div className="d-label">Talla</div>
                </div>
                <div className="d-sizes lu-sizes">
                  {TALLAS.map((t) => (
                    <span key={t} className={t === 'M' && step >= 3 ? 'on' : ''}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="d-cta lu-add">
                  <IconBag s={13} /> {step >= 4 ? 'Añadido al carrito' : 'Añadir'}
                </div>
              </>
            )}
            {view === 'checkout' && (
              <>
                <div className="d-head">
                  <span className="lu-logo">Tu carrito</span>
                </div>
                <div className="d-line">
                  <Foto className="d-thumb" src={elegido.img} pos="50% 20%" f={elegido.f} />
                  <div className="m-grow">
                    <div className="lu-name">{elegido.n}</div>
                    <div className="m-muted">Talla M, 1 unidad</div>
                  </div>
                  <strong>Bs. {elegido.p}</strong>
                </div>
                <div className="d-sum">
                  <div>
                    <span>Envío</span>
                    <span>Se coordina por chat</span>
                  </div>
                  <div className="m-total">
                    <span>Total</span>
                    <strong>Bs. {elegido.p}</strong>
                  </div>
                </div>
                <div className="d-cta lu-add">Pedir por WhatsApp</div>
              </>
            )}
            {view === 'chat' && (
              <div className="d-chat">
                <div className="d-chathead">
                  <span className="d-avatar">L</span>
                  <div>
                    <strong>Lúmina</strong>
                    <div>en línea</div>
                  </div>
                </div>
                <div className="d-chatbody">
                  <div className="m-bubble d-bubble">
                    {`Hola Lúmina, quiero pedir:\n1x ${elegido.n}, talla M\nTotal: Bs. ${elegido.p}\n¿Me confirman el envío?`}
                    <span className="d-time">10:24 ✓✓</span>
                  </div>
                </div>
                <div className="d-input">
                  <span>Mensaje</span>
                  <span className="d-send">➤</span>
                </div>
              </div>
            )}
            <div ref={cursorRef} className="ed-cursor" style={{ left: cur.x, top: cur.y }} aria-hidden="true">
              {cur.tap && <span key={step} className="ed-tap" />}
            </div>
          </div>
        </Phone>
        <p className="ed-demo-cap" aria-live="polite">
          {cur.t}
        </p>
      </div>
    </div>
  )
}

// =====================================================================
//  PROCESO
// =====================================================================
const PROCESO = [
  { t: 'Entendemos tu negocio', d: 'Conversamos por WhatsApp o en una llamada corta: qué vendes, cómo te piden hoy tus clientes y qué te quita tiempo. Con eso definimos alcance y plazo.' },
  { t: 'Diseñamos la experiencia', d: 'Te mostramos una primera versión con tu marca, tus productos y tus fotos, pensada para el celular. La ajustamos contigo antes de programar.' },
  { t: 'Construimos y conectamos', d: 'Programamos el sitio, cargamos tu catálogo y conectamos WhatsApp, pagos con QR y tu dominio propio.' },
  { t: 'Lanzamos contigo', d: 'Publicamos, te enseñamos a subir productos desde tu panel y te acompañamos las primeras semanas para que todo funcione.' },
]
function Proceso() {
  const [abierto, setAbierto] = useState<number | null>(null)
  return (
    <div className="ed-proc">
      <div>
        <p className="ed-proc-label">El proceso</p>
        <h2 className="ed-proc-h">
          Del primer
          <span>mensaje al lanzamiento.</span>
        </h2>
      </div>
      <ol className="ed-proc-list">
        {PROCESO.map((p, i) => {
          const open = abierto === i
          return (
            <li key={p.t} className={`ed-proc-item${open ? ' open' : ''}`} data-laser>
              <button type="button" className="ed-proc-btn" aria-expanded={open} aria-controls={`ed-proc-${i}`} onClick={() => setAbierto(open ? null : i)}>
                <span className="ed-proc-n">{String(i + 1).padStart(2, '0')}</span>
                <span>{p.t}</span>
                <svg className="ed-proc-ar" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </button>
              <div className="ed-proc-body" id={`ed-proc-${i}`}>
                <div>
                  <p>{p.d}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

// =====================================================================
//  PAQUETES Y SERVICIOS (sin precios)
// =====================================================================
type Servicio = { n: string; meta: string; txt: string; alcance: string[]; cta: string }
const DESARROLLO: Servicio[] = [
  { n: 'Catálogo Digital para Negocios', meta: 'Entrega en 3 a 4 días', txt: 'Tu menú o catálogo en un link propio, listo para compartir en redes y en el local con un QR.', alcance: ['Categorías, fotos y descripciones', 'Pedido directo a WhatsApp', 'QR para mostrador y redes', 'Pensado primero para celular'], cta: 'Solicitar Demo' },
  { n: 'Emprendedor Start & Grow', meta: 'Entrega en 2 a 3 días hábiles', txt: 'Tu primera presencia profesional en internet para empezar a recibir clientes desde hoy.', alcance: ['Página de presentación de tu marca', 'Botón de WhatsApp y redes sociales', 'Ubicación en el mapa', 'Productos o servicios destacados'], cta: 'Iniciar Proyecto' },
  { n: 'Tienda Online E-commerce', meta: 'Entrega en 7 a 14 días', txt: 'Una tienda completa con carrito, variantes y un panel para que subas tus productos sin depender de nadie.', alcance: ['Carrito, tallas, colores y stock', 'Panel para administrar productos', 'Pagos con QR y pedidos por WhatsApp', 'Capacitación para tu equipo'], cta: 'Iniciar Proyecto' },
  { n: 'E-commerce Empresa', meta: 'Plazo según el alcance', txt: 'Para negocios con varias sucursales, catálogos grandes o equipos de venta.', alcance: ['Varias sucursales y usuarios con roles', 'Reportes de ventas e inventario', 'Integración con tus sistemas', 'Acompañamiento en el lanzamiento'], cta: 'Cotizar' },
  { n: 'Software a Medida', meta: 'Plazo según el alcance', txt: 'Sistemas internos hechos para tu forma de trabajar, con automatización e inteligencia aplicada.', alcance: ['Inventarios, flotas y control operativo', 'CRM y seguimiento de clientes', 'Automatizaciones con IA', 'Paneles con tus métricas'], cta: 'Cotizar' },
]
const CONTINUOS: Servicio[] = [
  { n: 'E-commerce Emprendedor', meta: 'Hasta 80 productos', txt: 'Tu tienda funcionando cada mes, con todo lo técnico resuelto por EDAI.', alcance: ['Tienda con tu marca y dominio', 'Panel propio para tus productos', 'Hosting y certificado de seguridad', 'Actualizaciones incluidas'], cta: 'Solicitar Demo' },
  { n: 'E-commerce Negocio', meta: 'Hasta 400 productos', txt: 'Para negocios que ya venden en línea y necesitan más catálogo y control.', alcance: ['Todo lo del plan Emprendedor', 'Varios usuarios en el panel', 'Reportes de pedidos y productos', 'Soporte prioritario'], cta: 'Solicitar Demo' },
  { n: 'Mantenimiento & Infraestructura Cloud', meta: 'Servicio mensual', txt: 'Tu web o sistema siempre en línea, rápido y respaldado.', alcance: ['Respaldos automáticos', 'Hosting de alta velocidad', 'Soporte técnico por WhatsApp', 'Monitoreo y actualizaciones de seguridad'], cta: 'Cotizar' },
]

function Servicios() {
  const [tab, setTab] = useState(0)
  const tabs = ['Soluciones de desarrollo', 'Servicios continuos']
  const lista = tab === 0 ? DESARROLLO : CONTINUOS
  const onKey = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const n = tab === 0 ? 1 : 0
      setTab(n)
      document.getElementById(`ed-tab-${n}`)?.focus()
    }
  }
  return (
    <>
      <div className="ed-tabs" role="tablist" aria-label="Tipo de servicio" onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button key={t} id={`ed-tab-${i}`} type="button" role="tab" aria-selected={tab === i} aria-controls="ed-panel" tabIndex={tab === i ? 0 : -1} className={tab === i ? 'on' : ''} onClick={() => setTab(i)}>
            {t}
          </button>
        ))}
      </div>
      <p className="ed-tabnote">{tab === 0 ? 'Proyectos que se entregan una vez y quedan funcionando para tu negocio.' : 'Servicio web mensual: nosotros mantenemos todo en línea mientras tú vendes.'}</p>
      <div className="ed-svc-list" id="ed-panel" role="tabpanel" aria-labelledby={`ed-tab-${tab}`}>
        {lista.map((s) => (
          <article key={s.n} className="ed-svc" data-laser>
            <div>
              <h3 className="ed-h3">{s.n}</h3>
              <span className="ed-meta">
                <IconClock /> {s.meta}
              </span>
            </div>
            <div>
              <p className="ed-svc-txt">{s.txt}</p>
              <ul className="ed-scope">
                {s.alcance.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <a className={`ed-btn ${s.cta === 'Cotizar' ? 'ed-btn-ghost' : 'ed-btn-primary'}`} href={wa(`Hola EDAI, quiero ${s.cta === 'Cotizar' ? 'cotizar' : s.cta === 'Solicitar Demo' ? 'ver una demo de' : 'iniciar el proyecto'} "${s.n}". Mi negocio es: `)} target="_blank" rel="noopener noreferrer">
              {s.cta}
            </a>
          </article>
        ))}
      </div>
    </>
  )
}

// =====================================================================
//  PÁGINA
// =====================================================================
const TEMAS = ['Catálogo digital', 'Tienda online', 'Software a medida', 'Mantenimiento y hosting', 'Todavía no lo sé']

export default function LandingEdai() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const slotRef = useRef<HTMLDivElement | null>(null)
  const orbRef = useRef<HTMLDivElement | null>(null)
  const orbBtnRef = useRef<HTMLButtonElement | null>(null)
  const tagRef = useRef<HTMLSpanElement | null>(null)
  const ringRef = useRef<SVGGElement | null>(null)
  const nodeRefs = useRef<(SVGGElement | null)[]>([])
  const laserRef = useRef<SVGGElement | null>(null)
  const gradRef = useRef<SVGLinearGradientElement | null>(null)
  const beamRef = useRef<SVGLineElement | null>(null)
  const hitRef = useRef<SVGCircleElement | null>(null)
  const demoRef = useRef<HTMLElement | null>(null)
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)

  const [ask, setAsk] = useState(false)
  const [tema, setTema] = useState(TEMAS[0])
  const [nota, setNota] = useState('')
  const askRef = useRef<HTMLDivElement | null>(null)

  // ---------- el núcleo acompañante: posición, rotación y láser ----------
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const st = { x: 0, y: 0, box: 0, ring: 0, laser: 0, init: false }
    let raf = 0
    let last = performance.now()
    let hover: Element | null = null
    let lit: Element | null = null
    let litNode = -1
    const angDiff = (a: number, b: number) => Math.atan2(Math.sin(a - b), Math.cos(a - b))
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null
      hover = t && t.closest ? t.closest('[data-laser]') : null
    }
    document.addEventListener('pointerover', onOver)

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(64, now - last)
      last = now
      const slot = slotRef.current
      const orb = orbRef.current
      if (!slot || !orb) return
      const vw = window.innerWidth
      const vh = window.innerHeight
      const mobile = vw < 768

      // 1) del centro del hero al costado derecho
      const hr = slot.getBoundingClientRect()
      const heroBox = hr.width
      const hx = hr.left + hr.width / 2
      const hy = hr.top + hr.height / 2
      const libre = (vw - 1028) / 2
      const dockBox = mobile ? 96 : Math.max(100, Math.min(heroBox * 0.65, (libre - 30) / 0.82))
      const VIS = 0.41 // radio visible del isotipo respecto a su caja
      const dx = vw - (mobile ? 12 : 24) - dockBox * VIS
      const dy = mobile ? vh - 12 - dockBox * VIS : vh / 2
      const p = Math.min(1, Math.max(0, window.scrollY / (vh * 0.6)))
      const e = p * p * (3 - 2 * p)
      let tx = hx + (dx - hx) * e
      let ty = hy + (dy - hy) * e
      let tb = heroBox + (dockBox - heroBox) * e

      // 2) en la demo, el núcleo se posa junto al celular
      let target: Element | null = null
      let inDemo = false
      const demo = demoRef.current
      const anchor = anchorRef.current
      if (demo && anchor) {
        const r = demo.getBoundingClientRect()
        const a = anchor.getBoundingClientRect()
        if (r.top < vh * 0.45 && r.bottom > vh * 0.55 && a.width > 0 && a.top > 60 && a.bottom < vh - 40) {
          inDemo = true
          tx = a.left + a.width / 2
          ty = a.top + a.height / 2
          tb = a.width / 0.82
          target = cursorRef.current
        }
      }

      // 3) en Casos y Servicios, apunta a la tarjeta activa
      const docked = e > 0.97 && !inDemo
      if (docked && !mobile && rootRef.current) {
        const enVista = (el: Element) => {
          const r = el.getBoundingClientRect()
          return r.bottom > 80 && r.top < vh - 40 && r.right < dx - dockBox * VIS
        }
        if (hover && enVista(hover)) target = hover
        else {
          // la tarjeta más cercana al núcleo (sin cruzar otras); al pasar el mouse, la que señales
          let best = Infinity
          rootRef.current.querySelectorAll('[data-laser]').forEach((el) => {
            const r = el.getBoundingClientRect()
            const cy = r.top + r.height / 2
            if (Math.abs(cy - vh / 2) > vh * 0.32 && !(r.top < vh / 2 && r.bottom > vh / 2)) return
            const ex = Math.max(0, st.x - r.right)
            const ey = Math.max(0, r.top - st.y, st.y - r.bottom)
            const d = Math.hypot(ex, ey) + Math.abs(cy - vh / 2) * 0.25
            if (d < best && enVista(el)) {
              best = d
              target = el
            }
          })
        }
      }

      const k = st.init && !reduce.matches ? 1 - Math.exp(-dt / 110) : 1
      st.x += (tx - st.x) * k
      st.y += (ty - st.y) * k
      st.box += (tb - st.box) * k
      st.init = true
      const sc = st.box / 320
      orb.style.transform = `translate3d(${st.x - 160}px, ${st.y - 160}px, 0) scale(${sc})`
      orb.style.opacity = '1'
      if (tagRef.current) tagRef.current.style.opacity = !mobile && !inDemo ? String(Math.max(0, e * 1.4 - 0.4)) : '0'

      // 4) giro de los nodos y alineación con el objetivo
      let aim = -1
      let px = 0
      let py = 0
      let want = 0
      if (target) {
        const r = (target as Element).getBoundingClientRect()
        if (inDemo) {
          px = r.left + r.width / 2
          py = r.top + r.height / 2
        } else {
          px = Math.min(Math.max(st.x, r.left), r.right)
          py = Math.min(Math.max(st.y, r.top + 16), r.bottom - 16)
        }
        const th = Math.atan2(py - st.y, px - st.x)
        let bd = 9
        ARM_RAD.forEach((a, i) => {
          const d = Math.abs(angDiff(a + st.ring, th))
          if (d < bd) {
            bd = d
            aim = i
          }
        })
        st.ring += angDiff(th - ARM_RAD[aim], st.ring) * (reduce.matches ? 1 : 1 - Math.exp(-dt / 140))
        want = Math.abs(angDiff(ARM_RAD[aim] + st.ring, th)) < 0.2 ? 1 : 0
      } else if (!reduce.matches) {
        st.ring += dt * 0.00011
      }
      st.laser += (want - st.laser) * (1 - Math.exp(-dt / 90))
      ringRef.current?.setAttribute('transform', `rotate(${(st.ring * 180) / Math.PI})`)

      if (aim !== litNode) {
        nodeRefs.current[litNode]?.classList.remove('on')
        nodeRefs.current[aim]?.classList.add('on')
        litNode = aim
      }
      const litTarget = target && !inDemo ? target : null
      if (litTarget !== lit) {
        lit?.classList.remove('is-lit')
        ;(litTarget as Element | null)?.classList.add('is-lit')
        lit = litTarget
      }

      // 5) el haz de luz
      const g = laserRef.current
      if (g) {
        g.style.opacity = st.laser.toFixed(3)
        if (aim >= 0) {
          const ang = ARM_RAD[aim] + st.ring
          const nx = st.x + Math.cos(ang) * NODE_R * sc
          const ny = st.y + Math.sin(ang) * NODE_R * sc
          for (const el of [beamRef.current, gradRef.current]) {
            if (!el) continue
            el.setAttribute('x1', nx.toFixed(1))
            el.setAttribute('y1', ny.toFixed(1))
            el.setAttribute('x2', px.toFixed(1))
            el.setAttribute('y2', py.toFixed(1))
          }
          hitRef.current?.setAttribute('cx', px.toFixed(1))
          hitRef.current?.setAttribute('cy', py.toFixed(1))
        }
      }
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('pointerover', onOver)
      lit?.classList.remove('is-lit')
    }
  }, [])

  // ---------- ventana rápida del núcleo ----------
  useEffect(() => {
    if (!ask) return
    const first = askRef.current?.querySelector('button.ed-pill') as HTMLButtonElement | null
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAsk(false)
        orbBtnRef.current?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (askRef.current && !askRef.current.contains(t) && !orbBtnRef.current?.contains(t)) setAsk(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [ask])

  const msgAsk = `Hola EDAI, quiero asesoría sobre: ${tema}.${nota.trim() ? ` ${nota.trim()}` : ''}`

  return (
    <div className="edai" ref={rootRef}>
      <style>{CSS}</style>

      {/* haz de luz + núcleo acompañante (fijos) */}
      <svg className="ed-laser" aria-hidden="true">
        <defs>
          <linearGradient id="edBeamG" ref={gradRef} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3DF0C8" stopOpacity=".95" />
            <stop offset="1" stopColor="#3DF0C8" stopOpacity=".15" />
          </linearGradient>
        </defs>
        <g ref={laserRef} style={{ opacity: 0 }}>
          <line ref={beamRef} stroke="url(#edBeamG)" strokeWidth="1.25" strokeLinecap="round" />
          <circle ref={hitRef} r="2.5" fill="#3DF0C8" opacity=".75" />
        </g>
      </svg>
      <div className="ed-orb" ref={orbRef}>
        <OrbSVG ringRef={ringRef} nodeRefs={nodeRefs} />
        <span className="ed-orb-tag" ref={tagRef} aria-hidden="true">
          Agente EDAI
        </span>
        <button ref={orbBtnRef} type="button" className="ed-orb-btn" aria-label="Hablar con un asesor de EDAI" aria-expanded={ask} aria-controls="ed-ask" onClick={() => setAsk((v) => !v)} />
      </div>

      {ask && (
        <div className="ed-ask" id="ed-ask" ref={askRef} role="dialog" aria-modal="false" aria-labelledby="ed-ask-t">
          <button type="button" className="ed-ask-x" aria-label="Cerrar" onClick={() => setAsk(false)}>
            ×
          </button>
          <p className="ed-ask-t" id="ed-ask-t">
            ¿En qué proyecto o solución técnica podemos asesorarte?
          </p>
          <div className="ed-pills" role="group" aria-label="Tema">
            {TEMAS.map((t) => (
              <button type="button" key={t} className={`ed-pill${tema === t ? ' on' : ''}`} aria-pressed={tema === t} onClick={() => setTema(t)}>
                {t}
              </button>
            ))}
          </div>
          <label className="ed-ask-l">
            Cuéntanos de tu negocio (opcional)
            <textarea rows={2} value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Ej.: tengo una pollería en el 4to anillo" />
          </label>
          <a className="ed-btn ed-btn-primary ed-btn-block" href={wa(msgAsk)} target="_blank" rel="noopener noreferrer">
            <IconWA /> Continuar en WhatsApp
          </a>
        </div>
      )}

      {/* NAV */}
      <header className="ed-nav">
        <div className="ed-wrap ed-nav-in">
          <a href="#inicio" className="ed-logo" aria-label="EDAI TECH, inicio">
            <OrbSVG uid="nav" size={34} still />
            <span className="ed-logo-word">EDAI</span>
            <span className="ed-logo-tech">TECH</span>
          </a>
          <nav aria-label="Principal" className="ed-links">
            <a href="#casos">Casos reales</a>
            <a href="#demo">Demo</a>
            <a href="#proceso">Proceso</a>
            <a href="#servicios">Servicios</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a className="ed-btn ed-btn-primary ed-btn-sm" href={wa('Hola EDAI, quiero información para mi negocio.')} target="_blank" rel="noopener noreferrer">
            <IconWA s={18} /> WhatsApp
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="inicio" className="ed-hero">
          <div className="ed-wrap">
            <p className="ed-kicker">Desarrollo web e inteligencia aplicada en Santa Cruz de la Sierra</p>
            <div className="ed-slot" ref={slotRef} />
            <h1 className="ed-h1">Tu negocio, listo para vender desde el celular de tus clientes</h1>
            <p className="ed-lede ed-center">Páginas web, catálogos digitales y tiendas online para negocios locales. Tus clientes eligen, y el pedido te llega armado por WhatsApp.</p>
            <div className="ed-ctas">
              <a className="ed-btn ed-btn-primary" href={wa('Hola EDAI, quiero una página o tienda para mi negocio.')} target="_blank" rel="noopener noreferrer">
                <IconWA /> Escríbenos por WhatsApp
              </a>
              <a className="ed-btn ed-btn-ghost" href="#casos">
                Ver casos reales
              </a>
            </div>
            <p className="ed-hint">Toca el núcleo en cualquier momento para hablar con nosotros.</p>
          </div>
        </section>

        {/* CASOS */}
        <section id="casos" className="ed-sec">
          <div className="ed-wrap">
            <h2 className="ed-h2">Casos reales y demos para negocios de aquí</h2>
            <p className="ed-lede">Toca, elige y arma un pedido. Así funcionan las interfaces que desarrollamos para gastronomía, moda, salud, industria y carnicerías.</p>
            <div className="ed-cases">
              {CASOS.map(({ id, rubro, nombre, txt, Mock, laptop }) => (
                <article key={id} className={`ed-case${laptop ? ' wide' : ''}`} data-laser>
                  <div>
                    <span className="ed-rubro">{rubro}</span>
                    <h3 className="ed-h3">{nombre}</h3>
                    <p className="ed-case-txt">{txt}</p>
                  </div>
                  <div className="ed-stage">
                    {laptop ? (
                      <Laptop>
                        <Mock />
                      </Laptop>
                    ) : (
                      <Phone>
                        <Mock />
                      </Phone>
                    )}
                  </div>
                  <a className="ed-case-cta" href={wa(`Hola EDAI, vi el caso ${nombre} (${rubro.toLowerCase()}) y quiero algo así para mi negocio.`)} target="_blank" rel="noopener noreferrer">
                    Quiero algo así para mi negocio
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DEMO */}
        <section id="demo" className="ed-sec ed-sec-demo" ref={demoRef}>
          <div className="ed-wrap">
            <DemoIA sectionRef={demoRef} anchorRef={anchorRef} cursorRef={cursorRef} />
          </div>
        </section>

        {/* PROCESO */}
        <section id="proceso" className="ed-sec">
          <div className="ed-wrap">
            <Proceso />
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="ed-sec">
          <div className="ed-wrap">
            <h2 className="ed-h2">Soluciones para cada etapa de tu negocio</h2>
            <p className="ed-lede">Cotizamos según lo que de verdad necesitas. Aquí ves los tiempos de entrega y qué incluye cada opción.</p>
            <Servicios />
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="ed-sec ed-contact">
          <div className="ed-wrap ed-contact-in">
            <div>
              <h2 className="ed-h2">Cuéntanos qué vende tu negocio y te mostramos cómo se vería en línea</h2>
              <p className="ed-lede">Respondemos por WhatsApp el mismo día, de lunes a sábado.</p>
              <div className="ed-ctas ed-ctas-left">
                <a className="ed-btn ed-btn-primary" href={wa('Hola EDAI, quiero contarles sobre mi negocio.')} target="_blank" rel="noopener noreferrer">
                  <IconWA /> {WHATSAPP_VISIBLE}
                </a>
                <a className="ed-btn ed-btn-ghost" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </div>
            </div>
            <dl className="ed-dl">
              <div>
                <dt>Ubicación</dt>
                <dd>Santa Cruz de la Sierra, Bolivia</dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>
                  <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="ed-social">
                    <IconIG /> @edai_tech
                  </a>
                </dd>
              </div>
              <div>
                <dt>Facebook</dt>
                <dd>
                  <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="ed-social">
                    <IconFB /> EDAI TECH
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="ed-foot">
        <div className="ed-wrap">EDAI TECH, Ecosistema de Desarrollo & Inteligencia Aplicada. Santa Cruz de la Sierra, Bolivia.</div>
      </footer>
    </div>
  )
}

// =====================================================================
//  ESTILOS
// =====================================================================
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Unbounded:wght@500;700&family=Instrument+Serif:ital@0;1&family=Cormorant+Garamond:wght@500;600&family=Archivo:wght@800;900&display=swap');
.edai{--ink:#03141A;--ink-2:#062029;--panel:#0B2A35;--line:#174552;--text:#E3F4EF;--muted:#8DB3AB;--green:#00FF88;--cyan:#00D2FF;
  --display:'Unbounded',ui-sans-serif,system-ui,sans-serif;--body:'Figtree',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  background:var(--ink);color:var(--text);font-family:var(--body);font-size:17px;line-height:1.6;min-height:100vh;overflow-x:clip;color-scheme:dark;-webkit-font-smoothing:antialiased}
.edai *,.edai *::before,.edai *::after{box-sizing:border-box}
.edai a{color:inherit}
.edai :focus-visible{outline:2px solid var(--cyan);outline-offset:3px}
.edai section{scroll-margin-top:72px}
.ed-wrap{max-width:1028px;margin:0 auto;padding:0 24px}
.ed-h1{font-family:var(--display);font-weight:700;font-size:clamp(1.9rem,4.4vw,3.4rem);line-height:1.08;letter-spacing:-.025em;max-width:19ch;margin:0 auto}
.ed-h2{font-family:var(--display);font-weight:700;font-size:clamp(1.5rem,3vw,2.3rem);line-height:1.15;letter-spacing:-.02em;max-width:22ch;margin:0 0 16px}
.ed-h3{font-family:var(--display);font-weight:500;font-size:1.08rem;line-height:1.3;margin:4px 0 6px;letter-spacing:-.01em}
.ed-lede{color:var(--muted);font-size:1.08rem;max-width:58ch;margin:0}
.ed-center{margin:20px auto 0}
.ed-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:13px 22px;border-radius:999px;font:inherit;font-weight:600;font-size:1rem;text-decoration:none;border:1px solid transparent;cursor:pointer;transition:background .2s,border-color .2s,color .2s;white-space:nowrap}
.ed-btn-primary{background:var(--green);color:#022317}
.ed-btn-primary:hover{background:#6BFFBA}
.ed-btn-ghost{border-color:var(--line);color:var(--text);background:transparent}
.ed-btn-ghost:hover{border-color:var(--cyan);color:#fff}
.ed-btn-sm{padding:9px 16px;font-size:.92rem}
.ed-btn-block{width:100%}

/* núcleo */
.ed-orb{position:fixed;left:0;top:0;width:320px;height:320px;z-index:50;pointer-events:none;opacity:0;transform-origin:50% 50%;will-change:transform;transition:opacity .4s}
.ed-orb svg{position:absolute;inset:0;overflow:visible}
.ed-orb-btn{position:absolute;left:28%;top:28%;width:44%;height:44%;border-radius:50%;border:0;background:transparent;cursor:pointer;pointer-events:auto}
.ed-orb-btn:focus-visible{outline:6px solid var(--cyan);outline-offset:8px;border-radius:50%}
.ed-core{transform-box:fill-box;transform-origin:center;animation:edPulse 3.4s ease-in-out infinite}
.ed-halo{animation:edHalo 3.4s ease-in-out infinite}
.ed-node{transform-box:fill-box;transform-origin:center;transition:transform .35s cubic-bezier(.3,1.6,.5,1)}
.ed-node.on{transform:scale(1.35)}
.ed-node circle{transition:stroke .3s,fill .3s}
.ed-node.on circle{stroke:#3DF0C8;fill:#0A3A35}
.ed-orb-tag{position:absolute;left:0;right:0;top:298px;text-align:center;font:600 22px/1 var(--display);letter-spacing:.22em;text-transform:uppercase;color:#2FE6B4;opacity:0;white-space:nowrap}
@keyframes edPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@keyframes edHalo{0%,100%{opacity:.6}50%{opacity:1}}
.ed-laser{position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:49;overflow:visible}

/* ventana del núcleo */
.ed-ask{position:fixed;z-index:60;right:200px;top:50%;transform:translateY(-50%);width:min(370px,calc(100vw - 24px));background:var(--ink-2);border:1px solid var(--line);border-radius:22px;padding:24px;box-shadow:0 30px 90px -20px rgba(0,0,0,.8),0 0 50px -20px rgba(0,255,136,.35);animation:edIn .22s ease-out}
@keyframes edIn{from{opacity:0;transform:translateY(-50%) scale(.96)}}
.ed-ask-t{font-family:var(--display);font-weight:500;font-size:1.05rem;line-height:1.35;margin:0 28px 16px 0}
.ed-ask-x{position:absolute;right:12px;top:10px;width:34px;height:34px;border-radius:50%;border:0;background:transparent;color:var(--muted);font-size:24px;line-height:1;cursor:pointer}
.ed-ask-x:hover{color:#fff;background:var(--panel)}
.ed-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.ed-pill{border:1px solid var(--line);background:transparent;color:var(--text);border-radius:999px;padding:7px 13px;font:inherit;font-size:.9rem;cursor:pointer}
.ed-pill.on{border-color:var(--green);background:rgba(0,255,136,.12);color:#fff}
.ed-ask-l{display:block;font-size:.88rem;color:var(--muted);margin-bottom:16px}
.ed-ask-l textarea{display:block;width:100%;margin-top:6px;background:var(--ink);border:1px solid var(--line);border-radius:12px;color:var(--text);font:inherit;font-size:.95rem;padding:10px 12px;resize:vertical}

/* nav */
.ed-nav{position:sticky;top:0;z-index:40;background:rgba(3,20,26,.78);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(23,69,82,.6)}
.ed-nav-in{display:flex;align-items:center;gap:24px;height:64px}
.ed-logo{display:inline-flex;align-items:center;gap:10px;text-decoration:none}
.ed-logo svg{flex:none}
.ed-logo-word{font-family:var(--display);font-weight:500;font-size:1.25rem;letter-spacing:.14em;color:transparent;-webkit-text-stroke:1.1px #E3F4EF}
.ed-logo-tech{font-family:var(--display);font-weight:500;font-size:.72rem;letter-spacing:.2em;color:#2FE6B4;margin-left:-2px}
.ed-links{display:flex;gap:26px;margin-left:auto;font-size:.95rem}
.ed-links a{text-decoration:none;color:var(--muted)}
.ed-links a:hover{color:var(--text)}

/* hero */
.ed-hero{position:relative;padding:40px 0 104px;text-align:center}
.ed-hero::before{content:"";position:absolute;left:50%;top:0;width:min(900px,140vw);height:640px;transform:translateX(-50%);background:radial-gradient(closest-side,rgba(0,255,136,.11),rgba(0,210,255,.04) 55%,transparent);pointer-events:none}
.ed-kicker{color:var(--muted);font-size:.95rem;margin:0}
.ed-slot{width:clamp(220px,30vw,320px);aspect-ratio:1;margin:4px auto 4px}
.ed-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:32px}
.ed-ctas-left{justify-content:flex-start}
.ed-hint{color:var(--muted);font-size:.88rem;margin:22px 0 0}

/* secciones */
.ed-sec{padding:104px 0;border-top:1px solid rgba(23,69,82,.55);position:relative}
.ed-cases{display:grid;grid-template-columns:repeat(6,1fr);gap:20px;margin-top:48px}
.ed-case{grid-column:span 2;display:flex;flex-direction:column;gap:20px;padding:22px;background:var(--ink-2);border:1px solid var(--line);border-radius:24px;transition:border-color .35s,box-shadow .35s}
.ed-case.wide{grid-column:span 6;display:grid;grid-template-columns:260px minmax(0,1fr);column-gap:40px;row-gap:16px;align-items:center}
.ed-case.wide>div:first-child{align-self:end}
.ed-case.wide .ed-stage{grid-column:2;grid-row:1 / span 2}
.ed-case.wide .ed-case-cta{align-self:start}
.ed-case.is-lit{border-color:rgba(0,210,255,.45)}
.ed-rubro{font-size:.86rem;color:var(--cyan);font-weight:600}
.ed-case-txt{color:var(--muted);font-size:.95rem;margin:0}
.ed-stage{min-width:0;flex:1;display:flex;justify-content:center;align-items:flex-start}
.ed-case-cta{font-weight:600;font-size:.95rem;color:var(--green)!important;text-underline-offset:4px}

/* marcos */
.ed-phone{width:236px;flex:none;padding:9px;border-radius:36px;background:#0C1013;border:1px solid #2A343B;box-shadow:0 24px 50px -24px rgba(0,0,0,.9)}
.ed-phone-screen{position:relative;height:440px;border-radius:28px;overflow:hidden}
.ed-phone-demo{width:272px;padding:12px;border-radius:42px}
.ed-phone-demo .ed-phone-screen{width:248px;height:500px;border-radius:32px}
.ed-laptop{width:100%;min-width:0}
.ed-laptop-screen{border:10px solid #0C1013;border-bottom-width:16px;border-radius:14px 14px 4px 4px;overflow:hidden;background:#0C1013}
.ed-laptop-base{height:12px;margin:0 -7%;border-radius:0 0 14px 14px;background:linear-gradient(#2E383F,#131A1F)}

/* demo */
.ed-sec-demo{background:linear-gradient(180deg,transparent,rgba(0,210,255,.04) 40%,transparent)}
.ed-demo{display:grid;grid-template-columns:1fr auto;gap:72px;align-items:center}
.ed-steps{list-style:none;padding:0;margin:28px 0 24px;display:grid;gap:2px}
.ed-steps button{display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:9px 12px;border:0;border-radius:12px;background:transparent;color:var(--muted);font:inherit;font-size:.98rem;cursor:pointer}
.ed-steps button:hover{background:rgba(255,255,255,.03)}
.ed-steps-n{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%;border:1px solid var(--line);font-size:.8rem;font-weight:600;flex:none}
.ed-steps li.done .ed-steps-n{border-color:rgba(0,255,136,.5);color:var(--green)}
.ed-steps li.on button{color:#fff;background:rgba(0,210,255,.08)}
.ed-steps li.on .ed-steps-n{background:var(--cyan);border-color:var(--cyan);color:#022330}
.ed-demo-stage{position:relative;display:flex;flex-direction:column;align-items:center}
.ed-demo-anchor{position:absolute;left:-118px;top:70px;width:108px;height:108px;pointer-events:none}
.ed-demo-cap{margin:18px 0 0;color:var(--muted);font-size:.92rem;min-height:1.5em}
.ed-cursor{position:absolute;width:20px;height:20px;margin:-10px 0 0 -10px;border-radius:50%;background:radial-gradient(circle,#03141A 0 30%,#5CBFB1 34% 52%,rgba(61,240,200,.18) 60%);box-shadow:0 0 14px rgba(61,240,200,.8);z-index:5;pointer-events:none;transition:left .7s cubic-bezier(.5,0,.2,1),top .7s cubic-bezier(.5,0,.2,1)}
.ed-tap{position:absolute;inset:-6px;border-radius:50%;border:2px solid #3DF0C8;opacity:0;animation:edTap .6s .75s ease-out}
@keyframes edTap{0%{transform:scale(.4);opacity:1}100%{transform:scale(2.2);opacity:0}}

/* proceso */
.ed-proc{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.2fr);gap:64px;align-items:start}
.ed-proc-label{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--green);font-size:.8rem;letter-spacing:.2em;text-transform:uppercase;margin:0 0 18px}
.ed-proc-h{font-family:var(--display);font-weight:700;font-size:clamp(2rem,4vw,3.1rem);line-height:1.04;letter-spacing:-.035em;margin:0;max-width:12ch}
.ed-proc-h span{display:block;color:#56696C}
.ed-proc-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.ed-proc-item{border-bottom:1px solid var(--line);transition:background .35s}
.ed-proc-item.is-lit{background:rgba(61,240,200,.035)}
.ed-proc-btn{width:100%;display:grid;grid-template-columns:48px 1fr 24px;align-items:center;gap:6px;padding:26px 10px;border:0;background:transparent;color:var(--text);font:inherit;font-size:1.18rem;text-align:left;cursor:pointer}
.ed-proc-n{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--green);font-size:.78rem}
.ed-proc-ar{color:var(--muted);transition:transform .3s,color .3s}
.ed-proc-btn:hover .ed-proc-ar{color:var(--text)}
.ed-proc-item.open .ed-proc-ar{transform:rotate(90deg);color:var(--green)}
.ed-proc-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s ease}
.ed-proc-item.open .ed-proc-body{grid-template-rows:1fr}
.ed-proc-body>div{overflow:hidden}
.ed-proc-body p{margin:0;padding:0 10px 26px 64px;color:var(--muted);max-width:56ch}

/* servicios */
.ed-tabs{display:inline-flex;gap:4px;padding:5px;margin:36px 0 14px;background:var(--ink-2);border:1px solid var(--line);border-radius:999px}
.ed-tabs button{border:0;border-radius:999px;padding:10px 18px;background:transparent;color:var(--muted);font:inherit;font-weight:600;font-size:.95rem;cursor:pointer}
.ed-tabs button.on{background:var(--panel);color:#fff;box-shadow:inset 0 0 0 1px rgba(0,255,136,.35)}
.ed-tabnote{color:var(--muted);font-size:.95rem;margin:0 0 24px}
.ed-svc-list{border:1px solid var(--line);border-radius:24px;overflow:hidden;background:var(--ink-2)}
.ed-svc{display:grid;grid-template-columns:minmax(200px,.9fr) 1.6fr auto;gap:32px;align-items:start;padding:28px 30px;border-top:1px solid var(--line);position:relative;transition:background .35s}
.ed-svc:first-child{border-top:0}
.ed-svc::before{content:"";position:absolute;left:0;top:18px;bottom:18px;width:3px;border-radius:3px;background:var(--cyan);opacity:0;transition:opacity .35s}
.ed-svc.is-lit{background:rgba(0,210,255,.05)}
.ed-svc.is-lit::before{opacity:1}
.ed-meta{display:inline-flex;align-items:center;gap:7px;color:var(--green);font-weight:600;font-size:.9rem}
.ed-svc-txt{margin:0 0 12px;max-width:52ch}
.ed-scope{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:6px 22px;color:var(--muted);font-size:.93rem}
.ed-scope li{position:relative;padding-left:16px}
.ed-scope li::before{content:"";position:absolute;left:0;top:.62em;width:6px;height:6px;border-radius:50%;background:var(--cyan)}

/* contacto */
.ed-contact-in{display:grid;grid-template-columns:1.5fr 1fr;gap:56px;align-items:end}
.ed-dl{margin:0;display:grid;gap:20px}
.ed-dl dt{color:var(--muted);font-size:.86rem}
.ed-dl dd{margin:2px 0 0;font-weight:600}
.ed-social{display:inline-flex;align-items:center;gap:8px;text-decoration:none}
.ed-social:hover{color:var(--green)}
.ed-foot{border-top:1px solid rgba(23,69,82,.55);padding:28px 0 40px;color:var(--muted);font-size:.88rem}

/* ===== maquetas de clientes ===== */
.m{height:100%;display:flex;flex-direction:column;background:var(--m-bg);color:var(--m-fg);font-family:var(--body);font-size:12px;line-height:1.35;text-align:left;position:relative}
.m button{font-family:inherit;color:inherit}
.m-body{flex:1;overflow:auto;padding:10px 12px;display:flex;flex-direction:column;gap:8px;scrollbar-width:none}
.m-grow{flex:1;min-width:0}
.m-muted{opacity:.6;font-size:11px}
.m-total{display:flex;justify-content:space-between;align-items:baseline;font-size:12px}
.m-total strong{font-size:15px}
.m-step{display:inline-flex;align-items:center;border:1px solid var(--m-line);border-radius:999px;flex:none}
.m-step button{width:26px;height:26px;border:0;background:transparent;color:inherit;font-size:15px;font-weight:700;cursor:pointer}
.m-step span{min-width:22px;text-align:center;font-weight:700;font-size:11.5px;padding:0 2px}
.m-bubble{white-space:pre-line;background:#DCF8C6;color:#111;padding:9px 10px;border-radius:12px 12px 3px 12px;align-self:flex-end;max-width:92%;font-size:11.5px;box-shadow:0 1px 1px rgba(0,0,0,.1)}
.ed-scaled{position:relative;width:100%;overflow:hidden}

/* Bocado Callejero */
.bc{--m-bg:#121412;--m-fg:#F2F4EE;--m-line:#2A2E2A;--lime:#D9F35A}
.bc-top{padding:30px 12px 10px;display:flex;align-items:center;justify-content:space-between;gap:8px}
.bc-top-sm{justify-content:flex-start;font-size:13px}
.bc-back{border:0;background:#1E211E;width:28px;height:28px;border-radius:50%;cursor:pointer}
.bc-id{display:flex;align-items:center;gap:8px}
.bc-id strong{display:block;font-size:13px;font-weight:800}
.bc-id div span{display:block;font-size:10px;opacity:.6}
.bc-logo{width:32px;height:32px;border-radius:10px;background:var(--lime);color:#111;display:grid;place-items:center;font-weight:800;font-size:12px;flex:none}
.bc-open{font-size:9.5px;font-weight:700;color:var(--lime);background:#1E2A12;border-radius:999px;padding:4px 8px;white-space:nowrap}
.bc-open::before{content:"";display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--lime);margin-right:5px;vertical-align:middle}
.bc-hours{margin:0 12px;padding:7px 10px;border:1px solid var(--m-line);border-radius:10px;background:#181B18;display:flex;justify-content:space-between;font-size:10px}
.bc-hours span{opacity:.7}
.bc-cats{display:flex;gap:5px;padding:10px 12px;border-bottom:1px solid var(--m-line)}
.bc-cats button{border:0;border-radius:999px;padding:6px 10px;background:#232623;font-size:10.5px;font-weight:700;cursor:pointer}
.bc-cats button.on{background:var(--lime);color:#111}
.bc-body{padding-bottom:70px}
.bc-kicker{color:var(--lime);font-size:9px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
.bc-h{font-size:17px;font-weight:800;margin-top:-6px}
.bc-card{border:1px solid var(--m-line);border-radius:14px;overflow:hidden;background:#181B18;flex:none}
.bc-ph{height:92px;overflow:hidden}
.bc-ph img{display:block;width:100%;height:100%;object-fit:cover}
.bc-card.row{display:flex;align-items:center}
.bc-card.row .bc-ph{width:62px;height:62px;flex:none;border-radius:10px;margin:8px 0 8px 8px}
.bc-card.row .bc-card-in{flex:1;min-width:0;align-items:center}
.bc-card-in{display:flex;align-items:flex-end;gap:8px;padding:9px 10px}
.bc-name{font-weight:800;font-size:12px}
.bc-desc{font-size:10px;opacity:.6;margin:2px 0 4px}
.bc-price{font-size:15px;font-weight:800;color:var(--lime)}
.bc-price small{font-size:9px;color:var(--m-fg);opacity:.6}
.m .bc-plus{width:30px;height:30px;border:0;border-radius:10px;background:var(--lime);color:#111;font-weight:800;font-size:14px;cursor:pointer;flex:none}
.m .bc-bar{position:absolute;left:8px;right:8px;bottom:8px;display:flex;align-items:center;gap:8px;border:0;border-radius:14px;background:var(--lime);color:#111;padding:8px 12px 8px 8px;text-align:left;cursor:pointer;font-size:11.5px}
.bc-bar strong{display:block;font-size:12px}
.bc-bar small{font-size:9.5px;opacity:.7}
.bc-bar-ic{width:28px;height:28px;border-radius:8px;background:rgba(0,0,0,.08);display:grid;place-items:center}
.bc-line{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--m-line)}
.bc-thumb{width:38px;height:38px;border-radius:8px;flex:none}
.bc-price-sm{color:var(--lime);font-weight:700;font-size:11px}
.bc-label{font-size:10px;opacity:.6;margin-top:6px}
.bc-pay{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.bc-pay button{border:1px solid var(--m-line);background:transparent;border-radius:10px;padding:8px;font-weight:700;font-size:11px;cursor:pointer}
.m .bc-pay button.on{border-color:var(--lime);color:var(--lime)}
.bc-foot{padding:10px 12px 12px;border-top:1px solid var(--m-line);display:grid;gap:8px}
.m .bc-cta{border:0;border-radius:12px;background:var(--lime);color:#111;font-weight:800;padding:11px;cursor:pointer;font-size:12px}
.bc-cta:disabled{opacity:.4;cursor:not-allowed}
.bc-chat{background:#0B141A}
.bc-qr{display:flex;gap:10px;align-items:center;background:#1E211E;border-radius:12px;padding:10px;font-size:10.5px}
.bc-qr strong{display:block;font-size:11.5px}
.bc-qr span{opacity:.7}

/* Lúmina */
.lu{--m-bg:#F4F2EE;--m-fg:#23211F;--m-line:#E2DDD5;--terra:#A8674A;--serif:'Cormorant Garamond','Times New Roman',serif}
.lu-nav{padding:28px 14px 8px;display:flex;justify-content:space-between;align-items:center}
.lu-logo{font-family:var(--serif);font-weight:600;font-size:18px;letter-spacing:.03em}
.lu-logo i{color:var(--terra);font-style:normal}
.lu-cart{display:inline-flex;align-items:center;gap:5px;border:0;background:transparent;cursor:pointer;font-size:10px;padding:0}
.lu-count{width:16px;height:16px;border-radius:50%;background:#23211F;color:#F4F2EE;display:grid;place-items:center;font-size:9px;font-weight:700}
.lu-body{padding:0 10px 8px;gap:9px}
.lu-hero{position:relative;height:178px;overflow:hidden;flex:none}
.lu-hero img{width:100%;height:100%;object-fit:cover;display:block;animation:edIn2 .35s ease-out}
.lu-hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.45))}
.lu-hero-t{position:absolute;left:12px;bottom:10px;z-index:1;color:#fff;font-family:var(--serif);font-size:25px;line-height:.95}
.lu-hero-t i{color:#E9B79C;font-style:normal}
.lu-hero-tag{position:absolute;right:8px;top:8px;z-index:1;color:#fff;font-size:7.5px;letter-spacing:.12em;text-transform:uppercase}
.lu-kicker{color:var(--terra);font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:600}
.lu-prods{display:flex;gap:12px;border-bottom:1px solid var(--m-line);margin-top:-4px}
.lu-prods button{border:0;background:transparent;padding:3px 0 5px;font-family:var(--serif);font-size:13.5px;font-weight:600;cursor:pointer;border-bottom:1.5px solid transparent;margin-bottom:-1px;opacity:.5;white-space:nowrap}
.lu-prods button.on{opacity:1;border-color:#23211F}
.lu-row{display:flex;justify-content:space-between;align-items:center}
.lu-sub{font-size:10.5px;opacity:.7}
.lu-dots{display:flex;gap:7px}
.lu-dots button{width:15px;height:15px;border-radius:50%;border:1px solid rgba(0,0,0,.15);cursor:pointer;padding:0}
.lu-dots button.on{box-shadow:0 0 0 2px #F4F2EE,0 0 0 3px #23211F}
.lu-sizes{display:flex;gap:6px}
.lu-sizes button,.lu-sizes span{flex:1;height:30px;display:grid;place-items:center;border:1px solid #D6CFC5;background:transparent;font-size:10.5px;letter-spacing:.06em;cursor:pointer;padding:0}
.m .lu-sizes .on{background:#23211F;color:#F4F2EE;border-color:#23211F}
.lu-sizes button:disabled{opacity:.3;text-decoration:line-through;cursor:not-allowed}
.lu-bar{margin:0 8px 8px;background:#FBFAF8;border-radius:16px;box-shadow:0 6px 20px rgba(0,0,0,.12);padding:8px 8px 8px 12px;display:grid;gap:4px}
.lu-bar-t{font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;display:flex;align-items:center;gap:6px}
.lu-bar-t i{width:6px;height:6px;border-radius:50%;background:var(--terra)}
.lu-bar-r{display:flex;align-items:center;gap:8px;justify-content:space-between}
.lu-qty{display:flex;align-items:center;gap:4px}
.lu-qty button{border:0;background:transparent;font-size:14px;width:22px;height:22px;cursor:pointer}
.lu-qty span{font-size:11px;min-width:10px;text-align:center}
.m .lu-add{white-space:nowrap;border:0;border-radius:999px;background:#23211F;color:#F4F2EE;font-size:9.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:9px 16px;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer}
.lu-add:disabled{opacity:.45;cursor:not-allowed}
.lu-add-full{width:100%}
.lu-line{display:flex;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid var(--m-line)}
.lu-line img{width:40px;height:50px;object-fit:cover}
.lu-name{font-family:var(--serif);font-size:14px;font-weight:600}
.lu-name-lg{font-size:21px;line-height:1.1}
.lu-foot{padding:10px 12px 12px;border-top:1px solid var(--m-line);display:grid;gap:8px}

/* Chavela */
.ch{--m-bg:#1C1A19;--m-fg:#F3EDE4;--m-line:#3A3431;--gold:#C9A24A;--red:#B3261E}
.ch-head{padding:30px 14px 10px;border-bottom:1px solid var(--m-line);display:grid;gap:1px}
.ch-brand{font-family:'Cormorant Garamond',serif;font-size:21px;letter-spacing:.24em;color:var(--gold);font-weight:600}
.ch-head span{font-size:10px;opacity:.6}
.ch-tabs{display:flex;padding:6px 12px 0}
.ch-tabs button{flex:1;border:0;border-bottom:2px solid transparent;background:transparent;padding:8px 4px;font-size:11.5px;font-weight:700;opacity:.55;cursor:pointer}
.m .ch-tabs button.on{opacity:1;border-color:var(--gold);color:var(--gold)}
.ch-item{display:flex;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid var(--m-line)}
.ch-name{font-weight:700;font-size:12.5px}
.ch-price{color:var(--gold);font-weight:600;font-size:11px}
.ch-pack{display:grid;gap:3px;text-align:left;border:1px solid var(--m-line);border-radius:12px;padding:10px;background:transparent;cursor:pointer}
.ch-thumb{width:44px;height:44px;border-radius:10px;object-fit:cover;flex:none;display:block}
.ch-banner{width:100%;height:84px;border-radius:8px;object-fit:cover;display:block;margin-bottom:4px}
.ch-ph-empty{display:grid;place-items:center;background:linear-gradient(135deg,#2B2523,#211D1B);border:1px solid #3A3431}
.ch-pack.on{border-color:var(--gold);background:rgba(201,162,74,.1)}
.ch-foot{padding:10px 12px 12px;border-top:1px solid var(--m-line);display:grid;gap:8px}
.m .ch-cta{border:0;border-radius:12px;background:var(--red);color:#fff;font-weight:700;padding:11px;font-size:12px;cursor:pointer}
.ch-cta:disabled{opacity:.4}

/* Aura (diseño a 1000 x 620) */
.au{width:1000px;height:620px;position:relative;overflow:hidden;background:radial-gradient(600px 420px at 85% 15%,#D6EAF4,transparent),#EEF5FA;color:#12305A;font-family:var(--body);font-size:15px;line-height:1.4;text-align:left}
.au button{font-family:inherit}
.au-nav{display:flex;align-items:center;padding:24px 48px}
.au-logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:19px}
.au-logo i{color:#0E7C9A;font-style:normal}
.au-mark{width:36px;height:36px;border-radius:10px;background:#0E6E9A;display:grid;place-items:center;box-shadow:0 6px 14px rgba(14,110,154,.3)}
.au-links{margin-left:auto;display:flex;gap:30px;font-size:14px;color:#3B5675}
.au-pill-dark{margin-left:30px;background:#12305A;color:#fff;border-radius:999px;padding:11px 20px;font-size:14px;font-weight:600}
.au-hero{display:grid;grid-template-columns:1fr 440px;padding:6px 48px 0;gap:30px}
.au-left{padding-top:44px}
.au-tag{display:inline-block;border:1px solid #BFD8E4;border-radius:999px;padding:7px 15px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#0E6E9A;font-weight:700;background:rgba(255,255,255,.5)}
.au-tag::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#0E7C9A;margin-right:8px;vertical-align:middle}
.au-h{font-size:52px;line-height:1.02;letter-spacing:-.035em;font-weight:800;margin:22px 0 18px}
.au-h em{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-style:italic;color:#0E7C9A;font-size:64px;letter-spacing:-.01em}
.au-p{color:#5A7088;font-size:16px;line-height:1.6;max-width:400px;margin:0 0 26px}
.au-btns{display:flex;gap:12px;align-items:center}
.au-btn{display:inline-flex;align-items:center;gap:9px;border:0;border-radius:999px;background:#0E6E9A;color:#fff;font-weight:700;font-size:14.5px;padding:15px 24px;cursor:pointer;box-shadow:0 10px 24px rgba(14,110,154,.3)}
.au-btn:hover{background:#0B5E85}
.au-btn:disabled{opacity:.45;cursor:not-allowed;box-shadow:none}
.au-btn-o{border:1px solid #C7D6E2;border-radius:999px;padding:14px 22px;font-weight:600;font-size:14.5px;background:rgba(255,255,255,.6)}
.au-btn-link{cursor:pointer;color:#12305A}
.au-btn-full{width:100%;justify-content:center;margin-top:4px}
.au-proof{display:flex;align-items:center;margin-top:34px;font-size:13.5px;color:#5A7088}
.au-av{width:32px;height:32px;border-radius:50%;border:2px solid #EEF5FA;color:#fff;font-size:11px;font-weight:700;display:grid;place-items:center;margin-right:-8px}
.au-proof>span:last-child{margin-left:22px}
.au-proof strong{color:#12305A}
.au-right{position:relative;height:520px}
.au-photo{position:absolute;inset:6px 0 40px 20px;border-radius:36px;overflow:hidden;border:10px solid #fff;box-shadow:0 30px 60px -20px rgba(18,48,90,.35)}
.au-photo img{width:100%;height:100%;object-fit:cover;display:block}
.au-badge{position:absolute;left:0;bottom:70px;background:#fff;border-radius:16px;padding:12px 18px 12px 12px;display:flex;align-items:center;gap:12px;box-shadow:0 14px 30px rgba(18,48,90,.15)}
.au-badge small{display:block;font-size:11.5px;color:#7A8CA0}
.au-badge strong{font-size:15px}
.au-check{width:34px;height:34px;border-radius:50%;background:#E3F1F6;color:#0E7C9A;display:grid;place-items:center;font-weight:700;flex:none}
.au-check-lg{width:54px;height:54px;font-size:22px;background:#0E7C9A;color:#fff}
.au-rating{position:absolute;right:20px;bottom:18px;background:#12305A;color:#fff;border-radius:16px;padding:12px 18px;display:flex;align-items:center;gap:12px}
.au-rating strong{font-size:24px}
.au-rating span{font-size:11.5px;display:grid}
.au-rating i{color:#F5C451;font-style:normal;letter-spacing:2px}
.au-book{position:absolute;inset:6px 0 18px 20px;background:#fff;border-radius:30px;padding:20px 22px;box-shadow:0 30px 60px -20px rgba(18,48,90,.4);display:flex;flex-direction:column;gap:11px;z-index:2;animation:edIn2 .3s ease-out}
.au-book-img{width:100%;height:96px;object-fit:cover;border-radius:16px;display:block;flex:none;animation:edIn2 .3s ease-out}
.au-x{z-index:1;position:absolute;right:16px;top:14px;width:34px;height:34px;border:0;border-radius:50%;background:#EEF5FA;color:#12305A;font-size:22px;cursor:pointer}
.au-book-t{font-family:'Instrument Serif',Georgia,serif;font-size:32px;line-height:1}
.au-servs{display:flex;flex-wrap:wrap;gap:6px}
.au-servs button{border:1px solid #D3E1EB;background:#fff;color:#12305A;border-radius:999px;padding:8px 13px;font-size:13px;font-weight:600;cursor:pointer}
.au-servs button.on{background:#12305A;border-color:#12305A;color:#fff}
.au-days{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}
.au-days button{border:1px solid #D3E1EB;border-radius:12px;background:#fff;color:#12305A;padding:7px 0;display:grid;cursor:pointer;font-size:12px}
.au-days strong{font-size:17px}
.au-days button.on{background:#0E6E9A;border-color:#0E6E9A;color:#fff}
.au-slots{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
.au-slots button{border:1px solid #D3E1EB;border-radius:10px;background:#fff;color:#12305A;padding:8px 0;font-size:13px;font-weight:600;cursor:pointer}
.au-slots button.on{background:#0E7C9A;border-color:#0E7C9A;color:#fff}
.au-slots button:disabled{opacity:.35;text-decoration:line-through;cursor:not-allowed}
.au-done{margin:auto;text-align:center;display:grid;justify-items:center;gap:12px;max-width:320px}
.au-done p{margin:0;color:#5A7088;font-size:15px;line-height:1.5}

/* FerroPro (diseño a 1000 x 620) */
.fp{--m-line:#D5D5D5;width:1000px;height:620px;overflow:hidden;background:#fff;color:#1E2023;font-family:var(--body);line-height:1.4;text-align:left;display:flex;flex-direction:column}
.fp button{font-family:inherit;cursor:pointer}
.fp-top{height:30px;flex:none;background:#1E2023;color:#C9CDD1;font-size:10.5px;display:flex;align-items:center;justify-content:space-between;padding:0 28px;text-transform:uppercase;letter-spacing:.04em}
.fp-y{color:#F2B705}
.fp-nav{height:66px;flex:none;display:flex;align-items:center;gap:44px;padding:0 48px;border-bottom:1px solid #ECECEC}
.fp-logo{display:flex;align-items:center;gap:9px;border:0;background:transparent;padding:0;text-align:left}
.fp-mark{width:34px;height:30px;background:#F2B705;display:grid;place-items:center;transform:skewX(-10deg)}
.fp-logo b{display:block;font-family:'Archivo',var(--body);font-weight:900;font-size:20px;line-height:1;letter-spacing:-.01em;color:#1E2023}
.fp-logo b i{font-style:normal;color:#E0A800}
.fp-logo small{display:block;font-size:7.5px;letter-spacing:.32em;color:#666;margin-top:2px}
.fp-links{display:flex;gap:28px;font-size:13.5px;font-weight:600;color:#33373B}
.fp-links button{border:0;background:transparent;font:inherit;font-weight:600;color:inherit;padding:0}
.fp-links button:hover{color:#C99700}
.fp-quote-btn{margin-left:auto;border:1px solid #DADADA;background:#fff;padding:10px 16px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:8px;color:#1E2023}
.fp-quote-btn span{background:#F2B705;border-radius:999px;min-width:20px;height:20px;display:grid;place-items:center;font-size:11px}
.fp-hero{flex:1;display:grid;grid-template-columns:52% 48%;min-height:0}
.fp-left{padding:40px 40px 0 48px}
.fp-tag{display:flex;align-items:center;gap:12px;font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:#888;font-weight:700}
.fp-tag::before{content:"";width:28px;height:2px;background:#F2B705}
.fp-h{font-family:'Archivo','Arial Black',var(--body);font-weight:900;font-size:56px;line-height:.98;letter-spacing:-.04em;margin:18px 0 16px}
.fp-h em{font-style:normal;color:#E8AF00}
.fp-left p{color:#6A6F74;font-size:14.5px;line-height:1.55;max-width:380px;margin:0 0 20px}
.fp-btns{display:flex;gap:10px}
.fp-btn{border:0;background:#F2B705;color:#1E2023;font-weight:800;font-size:12px;letter-spacing:.06em;text-transform:uppercase;padding:15px 22px}
.fp-btn:hover{background:#FFC80A}
.fp-btn:disabled{opacity:.4;cursor:not-allowed}
.fp-btn-full{width:100%;margin-top:auto}
.fp-btn-o{border:1px solid #CFCFCF;padding:14px 18px;font-weight:800;font-size:12px;letter-spacing:.06em;text-transform:uppercase}
.fp-right{position:relative;background:#2B2E31;overflow:hidden}
.fp-yellow{position:absolute;inset:0;background:#F2C200;clip-path:polygon(66% 0,100% 0,100% 100%,40% 100%)}
.fp-photo{position:absolute;left:13%;top:7%;width:68%;height:86%;border:9px solid #fff;transform:rotate(2.5deg);box-shadow:0 30px 50px rgba(0,0,0,.45)}
.fp-photo img{width:100%;height:100%;object-fit:cover;display:block}
.fp-strip{height:64px;flex:none;background:#24272A;display:grid;grid-template-columns:repeat(4,1fr);align-items:center;padding:0 28px;font-size:11px;color:#A8ADB2}
.fp-strip span{padding:0 18px;border-left:1px solid #3A3E42}
.fp-strip span:first-child{border:0}
.fp-strip b{display:block;color:#fff;font-size:12.5px}
.fp-cat{flex:1;display:grid;grid-template-columns:1fr 290px;min-height:0}
.fp-cat-main{padding:26px 32px 20px 48px;display:flex;flex-direction:column;min-height:0}
.fp-cat-head{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:14px}
.fp h4{font-family:'Archivo',var(--body);font-weight:900;font-size:24px;letter-spacing:-.02em;margin:0}
.fp-cat-head input{width:280px;border:1px solid #D5D5D5;padding:10px 12px;font:inherit;font-size:13px;color:#1E2023;background:#fff}
.fp-table{overflow:auto;border-top:2px solid #1E2023}
.fp-tr{display:grid;grid-template-columns:76px 1fr 90px 118px;gap:14px;align-items:center;padding:9px 0;border-bottom:1px solid #ECECEC;font-size:13.5px}
.fp-code{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#B58A00;font-weight:700}
.fp-n small{display:block;font-size:11px;color:#8A8F94}
.fp-stock{font-size:12px;color:#3C8D4E;font-weight:600}
.fp-stock.out{color:#C2581E}
.fp-add{border:1px solid #1E2023;background:#fff;color:#1E2023;font-size:12px;font-weight:700;padding:8px 10px}
.fp-add:hover{background:#F2B705;border-color:#F2B705}
.fp-side{background:#F6F6F4;border-left:1px solid #ECECEC;padding:26px 24px 24px;display:flex;flex-direction:column;gap:12px;min-height:0;overflow:auto}
.fp-qrow{display:flex;align-items:center;gap:10px;font-size:12px;padding-bottom:10px;border-bottom:1px solid #E4E4E0}
.fp-qrow>span{flex:1}
.fp-qrow b{display:block;font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#B58A00}
.fp .m-step button{color:#1E2023}
.fp-empty{color:#7A7F84;font-size:13px;margin:0}

/* demo Lúmina */
.d-screen{position:relative;overflow:hidden}
.d-head{height:52px;padding:18px 14px 0;display:flex;justify-content:space-between;align-items:center}
.d-head,.d-cats{position:relative;z-index:2;background:var(--m-bg)}
.d-cats{height:44px;padding:0 14px;display:flex;gap:16px;align-items:center;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid var(--m-line)}
.d-cats span{opacity:.5;padding:6px 0}
.d-cats .on{opacity:1;border-bottom:1.5px solid #23211F}
.d-grid{position:absolute;left:10px;right:10px;top:104px;display:grid;grid-template-columns:1fr 1fr;gap:8px;transition:transform .9s cubic-bezier(.5,0,.2,1)}
.d-card{height:142px;display:flex;flex-direction:column;transition:transform .2s}
.d-card.press{transform:scale(.95)}
.d-img{height:104px;background-size:cover;background-color:#E8E2D8}
.d-name{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:13px;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-price{font-size:10px;letter-spacing:.06em}
.d-photo{position:relative;height:230px}
.d-photo-img{position:absolute;inset:0;background-size:cover}
.d-cart-float{position:absolute;right:12px;top:22px;background:#F4F2EE;border-radius:999px;padding:5px 8px}
.d-info{position:absolute;top:240px;left:14px;right:14px}
.d-label{margin-top:12px;font-size:9px;letter-spacing:.16em;text-transform:uppercase;opacity:.6}
.d-sizes{position:absolute;top:310px;left:14px;right:14px}
.d-cta{position:absolute;left:14px;right:14px;top:440px;height:44px}
.d-line{display:flex;align-items:center;gap:10px;padding:8px 14px 12px;border-bottom:1px solid var(--m-line)}
.d-thumb{width:52px;height:64px;background-size:cover;flex:none}
.d-sum{padding:12px 14px;display:grid;gap:8px}
.d-sum>div:first-child{display:flex;justify-content:space-between;opacity:.7}
.d-chat{position:absolute;inset:0;display:flex;flex-direction:column;background:#ECE5DD;color:#111}
.d-chathead{height:62px;padding:22px 12px 8px;background:#075E54;color:#fff;display:flex;gap:9px;align-items:center;font-size:11px}
.d-avatar{width:30px;height:30px;border-radius:50%;background:#F4F2EE;color:#23211F;display:grid;place-items:center;font-weight:700;font-family:'Cormorant Garamond',serif;font-size:16px}
.d-chatbody{flex:1;padding:16px 10px;display:flex;flex-direction:column}
.d-bubble{animation:edIn2 .4s ease-out}
@keyframes edIn2{from{opacity:0;transform:translateY(8px)}}
.d-time{display:block;text-align:right;font-size:9.5px;opacity:.55;margin-top:3px}
.d-input{position:absolute;left:8px;right:8px;top:456px;height:36px;display:flex;align-items:center;justify-content:space-between;padding:0 4px 0 14px;background:#fff;border-radius:18px;color:#888}
.d-send{width:30px;height:30px;border-radius:50%;background:#25D366;color:#fff;display:grid;place-items:center;font-size:12px}

/* responsivo */
@media (max-width:1023px){
  .ed-cases{grid-template-columns:repeat(2,1fr)}
  .ed-case{grid-column:span 1}.ed-case.wide{grid-column:span 2;grid-template-columns:minmax(0,1fr)}
  .ed-case.wide .ed-stage{grid-column:auto;grid-row:auto}
  .ed-svc{grid-template-columns:1fr;gap:14px}
  .ed-svc .ed-btn{justify-self:start}
  .ed-demo{grid-template-columns:1fr;gap:48px}
  .ed-demo-anchor{left:auto;right:-14px;top:-62px;width:76px;height:76px}
  .ed-contact-in{grid-template-columns:1fr;gap:36px}
  .ed-proc{grid-template-columns:1fr;gap:32px}
}
@media (max-width:767px){
  .ed-links{display:none}
  .ed-nav-in .ed-btn{margin-left:auto}
  .ed-ask{right:12px;left:12px;top:auto;bottom:116px;transform:none;width:auto;animation:none}
  .ed-sec{padding:80px 0}
  .ed-demo-stage{margin-top:40px}
}
@media (max-width:640px){
  .ed-cases{grid-template-columns:1fr}
  .ed-case,.ed-case.wide{grid-column:auto}
  .ed-scope{grid-template-columns:1fr}
  .ed-proc-body p{padding-left:10px}
  .ed-proc-btn{grid-template-columns:40px 1fr 20px;font-size:1.05rem}
  .m-side{width:96px}
  .m-quote{width:128px}
  .m-slots{grid-template-columns:repeat(4,1fr)}
}
@media (prefers-reduced-motion:reduce){
  .ed-core,.ed-halo,.ed-tap,.lu-hero img,.d-bubble,.ed-ask{animation:none}
  .ed-cursor,.d-grid{transition:none}
}
`
