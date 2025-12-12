import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { EmpathyStory } from '@/components/sections/EmpathyStory'
import { Concept } from '@/components/sections/Concept'
import { Features } from '@/components/sections/Features'
import { Schedule } from '@/components/sections/Schedule'
import { Target } from '@/components/sections/Target'
import { Testimonials } from '@/components/sections/Testimonials'
import { Trust } from '@/components/sections/Trust'
import { EventInfo } from '@/components/sections/EventInfo'
import { FAQ } from '@/components/sections/FAQ'
import { Closing } from '@/components/sections/Closing'
import { Footer } from '@/components/sections/Footer'
import { Sponsors } from '@/components/sections/Sponsors'
import { FloatingCTA } from '@/components/sections/FloatingCTA'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <EmpathyStory />
        <Concept />
        <Features />
        <Schedule />
        <Target />
        <Testimonials />
        <Trust />
        <EventInfo />
        <FAQ />
        <Closing />
        <Sponsors />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}

export default App
