import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Header from './components/ui/header'
import PageIllustration from './components/page-illustration'
import Hero from './components/hero'
import Features from './components/features'
import Zigzag from './components/zigzag'
import Testimonials from './components/testimonials'
import Footer from './components/ui/footer'

export default function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow">
        <PageIllustration />
        <Hero />
        <Features />
        <Zigzag />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
