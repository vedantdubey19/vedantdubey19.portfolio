import { useEffect, useRef, useState } from 'react'
import { focusAreas, nav, profile, stack } from '../content'
import { Band, Container, PillLink } from './ui'

export function Wordmark({ className = '' }) {
  return (
    <a href="#top" className={`text-2xl font-bold tracking-[-0.02em] text-white ${className}`}>
      {profile.wordmark}
      <span className="text-accent">.</span>
    </a>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${scrolled || open ? 'bg-ink/85 backdrop-blur-md' : ''}`}>
      <Container className={`flex items-center justify-between transition-[padding] duration-300 ${scrolled ? 'py-3' : 'py-6'}`}>
        <Wordmark />

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-white transition-colors hover:text-accent">
              {item.label}
            </a>
          ))}
          <PillLink href="#contact">Get in touch</PillLink>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full bg-white/10 text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </Container>

      {open && (
        <nav className="mx-5 mb-5 flex flex-col gap-1 rounded-[30px] bg-coal p-6 md:hidden" aria-label="Mobile">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-2 text-xl font-bold text-white">
              {item.label}
            </a>
          ))}
          <div className="pt-4">
            <PillLink href="#contact" onClick={() => setOpen(false)}>
              Get in touch
            </PillLink>
          </div>
        </nav>
      )}
    </header>
  )
}

// Full-bleed portrait behind the hero text: the photo is turned monochrome,
// then tinted blue with an orange glow rising from the bottom.
const photoClass =
  'absolute top-0 left-1/2 h-[1080px] w-auto max-w-none -translate-x-[52%] brightness-75 contrast-125 grayscale [mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)] md:top-[-6%] md:h-[165%] md:-translate-x-[53%]'

function Photo({ className = '', priority = false }) {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={profile.photoMobile} type="image/webp" />
      <img src={profile.photo} alt="" fetchPriority={priority ? 'high' : 'auto'} decoding="async" className={`${photoClass} ${className}`} />
    </picture>
  )
}

// Focus reveal: on devices with a mouse the photo is blurred, and a sharp copy shows through
// a soft circle that eases after the cursor (see .hero-focus in index.css). When the cursor
// leaves the hero, the focus drifts back to the face. Touch screens just get the sharp photo.
function useFocusFollow(stage) {
  useEffect(() => {
    const el = stage.current
    const hero = el?.closest('section')
    if (!el || !hero || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const home = () => {
      const r = hero.getBoundingClientRect()
      return { x: r.width * 0.52, y: Math.min(r.height * 0.2, 240) }
    }
    let target = home()
    let pos = { ...target }
    let frame = 0

    const paint = () => {
      pos.x += (target.x - pos.x) * 0.12
      pos.y += (target.y - pos.y) * 0.12
      el.style.setProperty('--fx', `${pos.x}px`)
      el.style.setProperty('--fy', `${pos.y}px`)
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5 ? requestAnimationFrame(paint) : 0
    }
    const aim = (next) => {
      target = next
      if (still) {
        pos = { ...next }
        el.style.setProperty('--fx', `${pos.x}px`)
        el.style.setProperty('--fy', `${pos.y}px`)
      } else if (!frame) {
        frame = requestAnimationFrame(paint)
      }
    }

    const onMove = (event) => {
      const r = hero.getBoundingClientRect()
      aim({ x: event.clientX - r.left, y: event.clientY - r.top })
    }
    const onLeave = () => aim(home())

    aim(home())
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
    }
  }, [stage])
}

function Backdrop() {
  const stage = useRef(null)
  useFocusFollow(stage)

  return (
    <div ref={stage} className="hero-focus pointer-events-none absolute inset-0" aria-hidden="true">
      {profile.photo && (
        <>
          <Photo priority className="hero-focus-blur" />
          <div className="hero-focus-sharp absolute inset-0">
            <Photo />
          </div>
        </>
      )}
      <div className="absolute inset-0 bg-linear-to-b from-transparent from-25% to-[#080e28]/80 to-45% md:hidden" />
      <div
        className="absolute inset-0 mix-blend-color"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 48% 100%, #ff5e00 35%, transparent 75%), #1a3f9e' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(255,94,0,0.45), transparent 45%), linear-gradient(to right, rgba(8,14,40,0.85), rgba(8,14,40,0.15) 45%, rgba(8,14,40,0.15) 55%, rgba(8,14,40,0.85) 80%), linear-gradient(to bottom, rgba(8,14,40,0.7), transparent 30%)',
        }}
      />
    </div>
  )
}

export default function Hero() {
  return (
    <Band id="top" bg="bg-[#0a1230]" under="bg-page" className="relative overflow-clip">
      <Backdrop />
      <Nav />

      <Container className="relative flex min-h-svh flex-col justify-end pt-72 pb-14 md:pt-32 md:pb-16">
        <div className="grid items-end gap-10 md:grid-cols-[1.8fr_1fr] md:gap-16">
          <div>
            <p className="text-xl font-bold text-accent md:text-3xl">{profile.greeting}</p>
            <h1 className="mt-3 text-[clamp(4rem,11vw,8.5rem)] leading-[0.98] font-extrabold tracking-[-0.03em] text-white">
              {profile.role.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <div className="md:pb-4">
            <p className="text-2xl leading-[1.35] font-bold text-white md:text-3xl md:leading-[1.4]">{profile.tagline}</p>
            <p className="mt-4 max-w-md leading-[1.8] text-white/75">{profile.intro}</p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <PillLink href="#work">View my work</PillLink>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-white underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent"
              >
                Download résumé
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-20 md:grid-cols-4">
          {focusAreas.map((area, i) => (
            <li key={area}>
              <p className="font-bold text-white">
                <span className="text-accent">#</span>
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-3 text-white">{area}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Band>
  )
}

export function StackMarquee() {
  // The list is rendered twice so the -50% translate loops seamlessly.
  const loop = [...stack, ...stack]
  return (
    <Container className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:gap-16 md:py-16">
      <p className="shrink-0 text-sm font-bold text-fg md:w-40">Tools I build with every day</p>
      <div className="min-w-0 overflow-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center" aria-label="Tech stack">
          {loop.map((tool, i) => (
            <li key={i} aria-hidden={i >= stack.length} className="flex items-center gap-3 pr-14 text-2xl font-bold tracking-[-0.02em] whitespace-nowrap text-fg">
              <span className="size-3 rounded-full bg-accent" />
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
