import Navbar from '@/components/Navbar'
import PortfolioFlow from '@/components/PortfolioFlow'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import TechnologyStack from '@/components/TechnologyStack'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <PortfolioFlow
        hero={<HeroSection />}
        about={<AboutSection />}
      />
      <TechnologyStack overlay={<Contact />} />
    </main>
  )
}
