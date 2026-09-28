export const WHATSAPP_NUMBER = '59164695256'
export const PHONE_DISPLAY = '+591 64695256'
export const CONTACT_EMAIL = 'edaisoftware@gmail.com'

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Modelos & Demos', href: '#demos' },
  { label: 'Paquetes', href: '#paquetes' },
  { label: 'Metodología & Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
] as const

export const divisions = [
  {
    id: 'division-1',
    number: '01',
    name: 'Desarrollo & Tecnología',
    status: 'activa',
    href: '/',
  },
  {
    id: 'division-2',
    number: '02',
    name: 'Servicios & Cuentas Digitales',
    status: 'proximamente',
    href: null,
  },
] as const

export type DemoModel = {
  id: string
  tab: string
  modelNumber: string
  brand: string
  tagline: string
  industry: string
  features: string[]
  /** Paste the live demo URL here */
  liveUrl: string | null
  desktopImage: string | null
  mobileImage: string | null
  brandColor: string
}

export const demoModels: DemoModel[] = [
  {
    id: 'gastronomia',
    tab: 'Gastronomía',
    modelNumber: 'Modelo 01',
    brand: 'Bocado Callejero',
    tagline: 'Gastronomía & Menú Digital',
    industry: 'Restaurantes, pollerías, cafeterías y comida rápida.',
    features: [
      'Menú interactivo con categorías deslizables',
      'Pedidos calculados automáticamente en BOB',
      'Checkout directo por WhatsApp',
      'Pago con QR Simple integrado',
    ],
    liveUrl: null,
    desktopImage: '/demos/bocado-desktop.png',
    mobileImage: '/demos/bocado-mobile.png',
    brandColor: '#D9F85A',
  },
  {
    id: 'clinicas',
    tab: 'Clínicas',
    modelNumber: 'Modelo 02',
    brand: 'Aura',
    tagline: 'Clínicas & Consultorios',
    industry: 'Clínicas dentales, consultorios médicos y centros estéticos.',
    features: [
      'Agenda web interactiva',
      'Reserva de turnos en tiempo real',
      'Confirmación directa por WhatsApp',
      'Sello de valoraciones de Google (4.9)',
    ],
    liveUrl: null,
    desktopImage: '/demos/aura-desktop.png',
    mobileImage: '/demos/aura-mobile.png',
    brandColor: '#38BDF8',
  },
  {
    id: 'moda',
    tab: 'Boutiques',
    modelNumber: 'Modelo 03',
    brand: 'Lúmina',
    tagline: 'Boutiques & Moda',
    industry: 'Tiendas de ropa, calzados y accesorios.',
    features: [
      'Catálogo digital visual',
      'Selector de tallas y colores',
      'Carrito deslizante',
      'Compra ágil por WhatsApp o QR automático',
    ],
    liveUrl: null,
    desktopImage: '/demos/lumina-desktop.png',
    mobileImage: '/demos/lumina-mobile.png',
    brandColor: '#E7D8C4',
  },
  {
    id: 'industrial',
    tab: 'Ferreterías',
    modelNumber: 'Modelo 04',
    brand: 'FerroPro Industrial',
    tagline: 'Ferreterías & Industrial',
    industry: 'Ferreterías industriales, distribuidores y venta de maquinaria.',
    features: [
      'Catálogo técnico con fichas de producto',
      'Control visual de stock',
      'Solicitud rápida de cotizaciones',
      'Envío de cotización por WhatsApp',
    ],
    liveUrl: null,
    desktopImage: '/demos/ferropro-desktop.png',
    mobileImage: '/demos/ferropro-mobile.png',
    brandColor: '#F5C400',
  },
]
