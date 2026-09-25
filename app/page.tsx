import Image from "next/image";
import { FloatingMenuButton } from "./menu";

const notes = [
  {
    title: "Bringing Cursor to Somalia",
    description: "Giving access to the frontier tools to Somali builders",
    href: "#notes",
  },
  {
    title: "Building with ai",
    description: "tools and stacks",
    href: "#notes",
  },
  {
    title: "The best i read month",
    description: "what i learned from this week",
    href: "#notes",
  },
];

const projects = [
  {
    id: "knowledge-hub",
    title: "knowledge hub",
    description: "Save the idea before it disappears.",
    tag: "Product",
    icon: "/figma/project-icon.svg",
    href: "#knowledge-hub",
  },
  {
    id: "appliedlab",
    title: "AppliedLab.so",
    description: "practical AI solutions to business and individuals",
    tag: "AI Lab",
    icon: "/figma/appliedlab-icon.svg",
    href: "#appliedlab",
  },
  {
    id: "cursor-somalia",
    title: "Cursor Somalia",
    description: "Bringing frontier coding tools to Somali builders",
    tag: "Community",
    icon: "/figma/cursor-cube.svg",
    href: "#cursor-somalia",
  },
];

const arrowClass =
  "relative h-2.5 w-6 shrink-0 text-[#626264] transition-transform duration-200 before:absolute before:right-0 before:top-1/2 before:h-px before:w-full before:-translate-y-1/2 before:bg-current after:absolute after:right-0 after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:rotate-45 after:border-r after:border-t after:border-current group-hover:translate-x-0.5";

function Arrow() {
  return <span className={arrowClass} aria-hidden="true" />;
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-white">{title}</h2>
      <a
        className="rounded-full text-[14px] text-[#69696c] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/25"
        href={href}
        aria-label={`View all ${title.toLowerCase()}`}
      >
        view all
      </a>
    </div>
  );
}

function NoteRow({ title, description, href }: (typeof notes)[number]) {
  return (
    <a
      className="group flex min-h-16 items-center justify-between gap-5 border-b border-white/[0.09] py-4 transition duration-200 last:border-b-0 hover:-translate-y-0.5 hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/25"
      href={href}
    >
      <div className="min-w-0">
        <h3 className="text-[15px] font-normal leading-snug tracking-[-0.01em] text-white">{title}</h3>
        <p className="mt-1 text-[13px] leading-snug text-[#666668]">{description}</p>
      </div>
      <Arrow />
    </a>
  );
}

function BuildItem({ id, title, description, tag, icon, href }: (typeof projects)[number]) {
  return (
    <a
      id={id}
      className="group grid min-h-16 grid-cols-[54px_minmax(0,1fr)_auto_24px] items-center gap-3 rounded-xl transition duration-200 hover:-translate-y-0.5 hover:opacity-85 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/25 min-[390px]:gap-4"
      href={href}
    >
      <span
        className="flex size-[54px] items-center justify-center rounded-lg border border-white/[0.14] bg-white/[0.01] transition-colors duration-200 group-hover:border-white/25"
        aria-hidden="true"
      >
        <Image src={icon} alt="" width={26} height={26} className="max-h-7 w-auto object-contain" />
      </span>
      <div className="min-w-0">
        <h3 className="text-[15px] font-normal leading-snug tracking-[-0.01em] text-white">{title}</h3>
        <p className="mt-1 max-w-[145px] text-[13px] leading-[1.12] text-[#666668]">{description}</p>
      </div>
      <span className="inline-flex h-[22px] min-w-[64px] items-center justify-center rounded-full border border-white/[0.08] bg-[#171717] px-3 text-[10px] text-[#69696c]">
        {tag}
      </span>
      <Arrow />
    </a>
  );
}

function Hero() {
  return (
    <section id="about-me" className="scroll-mt-8" aria-labelledby="intro-title">
      <p className="mb-3 text-[14px] text-[#68686b]">hello world</p>
      <h1
        id="intro-title"
        className="mb-2 font-[900] text-[clamp(28px,8vw,32px)] leading-[1.08] tracking-[-0.055em] text-white"
      >
        I’m Mohamed B.
      </h1>
      <p className="max-w-full text-[16px] leading-[1.26] text-[#737377]">
        I design, build, and test to understand the world around me. This is my piece of the
        internet, where I document the journey, share what I’m building, and explore the future with
        AI.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 min-[360px]:gap-4" aria-label="Content sections">
        <a
          className="inline-flex h-10 items-center justify-center rounded-full border border-white/[0.12] bg-[#111111] px-6 text-[14px] font-bold tracking-[-0.03em] text-[#e6e6e6] transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#171717] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/25"
          href="#projects"
        >
          what I’m building
        </a>
        <a
          className="inline-flex h-10 items-center justify-center rounded-full border border-white/[0.12] bg-black px-6 text-[14px] font-bold tracking-[-0.03em] text-[#e6e6e6] transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#0b0b0b] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/25"
          href="#notes"
        >
          notes &amp; ideas
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main
      id="top"
      className="relative mx-auto min-h-svh w-full max-w-[390px] overflow-x-hidden px-5 pb-28 pt-[clamp(68px,12vw,104px)] min-[390px]:px-6"
    >
      <Hero />

      <section id="notes" className="mt-16 scroll-mt-8">
        <SectionHeader title="Recent Notes" href="#notes" />
        <div className="mt-4">
          {notes.map((note) => (
            <NoteRow key={note.title} {...note} />
          ))}
        </div>
      </section>

      <section id="projects" className="mt-12 scroll-mt-8">
        <SectionHeader title="What I’m building" href="#projects" />
        <div className="mt-5 flex flex-col gap-5">
          {projects.map((project, index) => (
            <BuildItem key={`${project.title}-${index}`} {...project} />
          ))}
        </div>
      </section>

      <FloatingMenuButton />
    </main>
  );
}
