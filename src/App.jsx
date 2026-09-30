import Hero, { StackMarquee } from './components/Hero'
import { Connect, Experience, Footer } from './components/Story'
import { Band } from './components/ui'
import { MoreProjects, Projects, Skills } from './components/Work'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-white px-5 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
      >
        Skip to content
      </a>
      <main id="main">
        <Hero />
        <Band bg="bg-page" under="bg-soft">
          <StackMarquee />
          <Projects />
          <MoreProjects />
          <Skills />
        </Band>
        <Experience />
        <Connect />
      </main>
      <Footer />
    </>
  )
}
