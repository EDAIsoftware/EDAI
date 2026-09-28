import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { DemosShowcase } from '@/components/demos-showcase'
import { Packages } from '@/components/packages'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <DemosShowcase />
        <Packages />
        <About />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  )
}
