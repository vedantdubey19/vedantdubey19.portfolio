import { useEffect, useRef } from 'react'

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1400px] px-5 md:px-10 ${className}`}>{children}</div>
}

// A band with the template's big rounded bottom corners. `under` is the colour
// that shows through behind those corners (the next band's background).
export function Band({ id, bg = 'bg-page', under = 'bg-ink', className = '', children }) {
  return (
    <div className={under}>
      <section id={id} className={`${bg} rounded-b-[48px] md:rounded-b-[100px] ${className}`}>
        {children}
      </section>
    </div>
  )
}

export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

export function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

const pillTones = {
  light: 'bg-white text-ink',
  dark: 'bg-contrast text-on-contrast',
  mist: 'bg-soft text-fg',
  accent: 'bg-accent text-white',
}

export function PillLink({ href, tone = 'light', children, ...rest }) {
  const dot = tone === 'accent' ? 'bg-white text-accent' : 'bg-accent text-white'
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-4 rounded-full py-1.5 pr-1.5 pl-6 text-sm font-bold whitespace-nowrap transition-transform duration-300 hover:-translate-y-0.5 ${pillTones[tone]}`}
      {...rest}
    >
      {children}
      <span className={`grid size-9 place-items-center rounded-full ${dot}`}>
        <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </a>
  )
}

// The template's two-column section opener: orange eyebrow + big heading on
// the left, a bold lead paragraph (and optional extras) on the right.
export function SectionHeading({ eyebrow, heading, lead, dark = false, children }) {
  return (
    <Reveal className="grid gap-8 md:grid-cols-2 md:gap-16">
      <div>
        <p className="text-xl font-bold text-accent md:text-3xl">{eyebrow}</p>
        <h2 className={`mt-4 text-4xl leading-[1.15] font-extrabold tracking-[-0.02em] md:text-6xl md:leading-[1.2] ${dark ? 'text-white' : 'text-fg'}`}>
          {heading}
        </h2>
      </div>
      <div>
        <p className={`text-xl leading-[1.4] font-bold md:text-3xl md:leading-[1.4] ${dark ? 'text-white' : 'text-fg'}`}>{lead}</p>
        {children}
      </div>
    </Reveal>
  )
}
