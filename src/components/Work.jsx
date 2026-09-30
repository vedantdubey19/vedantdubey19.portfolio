import { FaGithub } from 'react-icons/fa6'
import { moreProjects, projects, skills } from '../content'
import { Arrow, Container, PillLink, Reveal, SectionHeading } from './ui'
import Visual from './Visual'

const newTab = { target: '_blank', rel: 'noopener noreferrer' }

function Tags({ items, dark = false }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className={`rounded-full px-3 py-1 text-xs font-bold ${dark ? 'bg-contrast text-on-contrast' : 'bg-page text-fg'}`}>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function Projects() {
  return (
    <Container className="border-b border-soft py-20 md:py-32">
      <div id="work" className="scroll-mt-10">
        <SectionHeading
          eyebrow="Featured Projects"
          heading="AI Systems I've Built and Deployed"
          lead="LLM, RAG and machine learning projects, each with its code and most with a live demo."
        />
      </div>

      <div className="mt-14 flex flex-col gap-10 md:mt-24 md:gap-16">
        {projects.map((project, i) => (
          <Reveal key={project.title} as="article" className="grid items-end gap-6 md:grid-cols-12 md:gap-16">
            <div className={`aspect-[16/9] overflow-hidden rounded-[30px] bg-ink md:col-span-8 ${i % 2 ? 'md:order-2' : ''}`}>
              <Visual variant={project.visual} image={project.image} alt={`${project.title} screenshot`} className="object-top" />
            </div>
            <div className="border-t-4 border-accent pt-6 md:col-span-4 md:pb-6">
              <h3 className="text-3xl font-extrabold tracking-[-0.02em] md:text-[40px] md:leading-[1.1]">{project.title}</h3>
              <p className="mt-4 text-sm leading-[1.6] text-muted">{project.summary}</p>
              <div className="mt-5">
                <Tags items={project.tags} dark />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <PillLink href={project.live || project.repo} tone="mist" {...newTab}>
                  {project.live ? 'Live demo' : 'View code'}
                </PillLink>
                {project.live && (
                  <a href={project.repo} {...newTab} className="flex items-center gap-2 text-sm font-bold transition-colors hover:text-accent">
                    <FaGithub className="size-4" aria-hidden="true" />
                    Code
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  )
}

export function MoreProjects() {
  return (
    <Container className="border-b border-soft py-20 md:py-32">
      <Reveal className="text-center">
        <p className="text-xl font-bold text-accent md:text-3xl">{moreProjects.eyebrow}</p>
        <h2 className="mt-4 text-4xl leading-[1.15] font-extrabold tracking-[-0.02em] md:text-6xl md:leading-[1.2]">{moreProjects.heading}</h2>
        <p className="mx-auto mt-5 max-w-md leading-[1.8] text-muted">{moreProjects.text}</p>
        <div className="mt-8">
          <PillLink href={moreProjects.allUrl} tone="dark" {...newTab}>
            Browse all on GitHub
          </PillLink>
        </div>
      </Reveal>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {moreProjects.items.map((item, i) => (
          <Reveal key={item.title} as="li" delay={(i % 4) * 80}>
            <a
              href={item.href}
              {...newTab}
              className="group flex h-full flex-col rounded-[30px] bg-soft p-7 transition-colors duration-300 hover:bg-contrast hover:text-on-contrast md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{item.title}</h3>
                <Arrow className="size-5 shrink-0 -rotate-45 text-accent transition-transform duration-300 group-hover:rotate-0" />
              </div>
              <p className="mt-3 mb-6 text-sm leading-[1.6] text-muted">{item.text}</p>
              <div className="mt-auto">
                <Tags items={item.tags} />
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
    </Container>
  )
}

export function Skills() {
  return (
    <Container className="py-20 md:py-32">
      <div id="skills" className="scroll-mt-10">
        <SectionHeading eyebrow={skills.eyebrow} heading={skills.heading} lead={skills.lead}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
            <p className="text-muted">Want the full picture?</p>
            <PillLink href="#experience" tone="accent">
              See experience
            </PillLink>
          </div>
        </SectionHeading>
      </div>

      <div className="mt-14 grid gap-4 md:mt-24 md:grid-cols-3">
        {skills.groups.map((group, i) => (
          <Reveal key={group.title} delay={i * 100} className="flex min-h-[380px] flex-col rounded-[30px] bg-soft p-7 md:p-10">
            <div className="h-1 rounded-full bg-accent" />
            <div className="mt-auto pt-16">
              <p className="text-xl font-bold tracking-[-0.02em] text-accent">{group.kicker}</p>
              <h3 className="mt-3 text-3xl leading-[1.2] font-extrabold">{group.title}</h3>
              <p className="mt-3 text-sm leading-[1.6] text-muted">{group.text}</p>
              <div className="mt-6">
                <Tags items={group.items} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  )
}
