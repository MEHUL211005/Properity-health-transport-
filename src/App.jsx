import { useEffect } from 'react'
import Contact from './components/sections/Contact'
import Coverage from './components/sections/Coverage'
import Hero from './components/sections/Hero'
import Portal from './components/sections/Portal'
import Services from './components/sections/Services'
import Standards from './components/sections/Standards'
import TrustStrip from './components/sections/TrustStrip'
import Footer from './components/layout/Footer'
import FloatingActions from './components/layout/FloatingActions'
import Header from './components/layout/Header'
import './App.css'

export default function App() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))
    return () => revealObserver.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Standards />
        <Coverage />
        <Portal />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
