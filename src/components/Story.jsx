import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { connect, experience, nav, profile, socials } from '../content'
import { Wordmark } from './Hero'
import { Arrow, Band, Container, PillLink, Reveal, SectionHeading } from './ui'

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 8l9 6 9-6" />
    </svg>
  )
}

const icons = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  email: MailIcon,
}

const external = (href) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})

const certLink = 'mt-auto flex w-fit cursor-pointer items-center gap-2 text-sm font-bold transition-colors hover:text-accent'

function Certifications() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!active) return
    const onKey = (event) => event.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <Reveal className="mt-14 md:mt-20">
      <h3 className="text-xl font-bold text-accent md:text-2xl">Certifications</h3>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experience.certifications.map((cert) => (
          <li key={cert.title} className="flex flex-col rounded-[30px] bg-page p-7">
            <div className="h-1 rounded-full bg-accent" />
            <p className="mt-6 text-xl leading-[1.3] font-bold tracking-[-0.02em]">{cert.title}</p>
            <p className="mt-2 mb-6 text-sm text-muted">{cert.meta}</p>
            {cert.image ? (
              <button type="button" onClick={() => setActive(cert)} className={certLink}>
                View certificate
                <Arrow className="size-4 -rotate-45 text-accent" />
              </button>
            ) : (
              <a href={cert.verify} target="_blank" rel="noopener noreferrer" className={certLink}>
                View credential
                <Arrow className="size-4 -rotate-45 text-accent" />
              </a>
            )}
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-5 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <img src={active.image} alt={`${active.title} certificate`} decoding="async" className="max-h-[85vh] max-w-full rounded-[20px]" />
          <button
            type="button"
            autoFocus
            onClick={() => setActive(null)}
            className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white text-ink"
            aria-label="Close certificate"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </Reveal>
  )
}

export function Experience() {
  return (
    <Band id="experience" bg="bg-soft" under="bg-page">
      <Container className="py-20 md:py-32">
        <SectionHeading eyebrow={experience.eyebrow} heading={experience.heading} lead={experience.lead} />

        <ol className="mt-14 md:mt-24">
          {experience.items.map((item, i) => (
            <Reveal
              key={item.title}
              as="li"
              className={`grid gap-4 rounded-[30px] px-5 py-7 md:grid-cols-[1.3fr_1fr] md:items-center md:px-10 md:py-9 ${i % 2 ? 'bg-page' : ''}`}
            >
              <div className="flex items-center gap-5 md:gap-7">
                <span className="h-14 w-1 shrink-0 rounded-full bg-accent md:h-16" />
                <span className="w-16 shrink-0 text-5xl font-extrabold tracking-[-0.02em] md:w-20 md:text-6xl">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-xl font-bold md:text-2xl">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.meta}</p>
                </div>
              </div>
              <p className="text-sm leading-[1.6] text-muted">{item.text}</p>
            </Reveal>
          ))}
        </ol>

        <Certifications />
      </Container>
    </Band>
  )
}

export function Connect() {
  return (
    <Band id="contact" bg="bg-page" under="bg-ink">
      <Container className="py-20 md:py-32">
        <Reveal className="text-center">
          <p className="text-xl font-bold text-accent md:text-3xl">{connect.eyebrow}</p>
          <h2 className="mt-4 text-4xl leading-[1.15] font-extrabold tracking-[-0.02em] md:text-6xl md:leading-[1.2]">{connect.heading}</h2>
          <p className="mx-auto mt-5 max-w-md leading-[1.8] text-muted">{connect.text}</p>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((social, i) => {
            const Icon = icons[social.icon]
            return (
              <Reveal key={social.label} as="li" delay={i * 60}>
                <a
                  href={social.href}
                  {...external(social.href)}
                  className="group flex items-center gap-5 rounded-[30px] bg-soft p-5 transition-colors duration-300 hover:bg-contrast hover:text-on-contrast md:p-6"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-[20px] bg-accent text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xl font-bold tracking-[-0.02em]">{social.label}</span>
                    <span className="block truncate text-sm text-muted">{social.handle}</span>
                  </span>
                  <Arrow className="ml-auto size-5 shrink-0 -rotate-45 text-accent transition-transform duration-300 group-hover:rotate-0" />
                </a>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </Band>
  )
}

export function Footer() {
  return (
    <footer className="overflow-clip bg-ink">
      <Container className="grid gap-12 pt-20 md:grid-cols-[2fr_1fr_1fr] md:pt-28">
        <div>
          <Wordmark />
          <p className="mt-4 text-xl font-bold text-white">{profile.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-[1.6] text-white/60">{profile.intro}</p>
          <div className="mt-7">
            <PillLink href={`mailto:${profile.email}`} tone="light">
              Get in touch
            </PillLink>
          </div>
          <p className="mt-7 text-sm text-white/60">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>

        <div>
          <p className="font-bold text-accent">Menu</p>
          <ul className="mt-5 flex flex-col gap-4">
            {[{ label: 'Home', href: '#top' }, ...nav].map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-white transition-colors hover:text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-bold text-accent">Social</p>
          <ul className="mt-5 flex flex-col gap-4">
            {socials.map((social) => {
              const Icon = icons[social.icon]
              return (
                <li key={social.label}>
                  <a href={social.href} {...external(social.href)} className="flex items-center gap-3 text-white/60 transition-colors hover:text-white">
                    <Icon className="size-4" aria-hidden="true" />
                    {social.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>

      <p className="mt-16 -mb-[0.22em] text-center text-[27vw] leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-coal select-none" aria-hidden="true">
        {profile.wordmark}
      </p>
    </footer>
  )
}
