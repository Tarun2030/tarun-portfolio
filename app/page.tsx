import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Tools from '@/components/Tools'
import Writing from '@/components/Writing'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 28px' }}>
        <Hero />
        <hr className="section-divider" />
        <About />
        <hr className="section-divider" />
        <Projects />
        <hr className="section-divider" />
        <Tools />
        <hr className="section-divider" />
        <Writing />
        <hr className="section-divider" />
        <Footer />
      </div>
    </main>
  )
}
