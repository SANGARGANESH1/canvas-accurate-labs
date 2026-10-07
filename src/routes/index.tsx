import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Menu, X, Moon, Sun, Download, ArrowRight, Mail, Phone, MapPin, Linkedin, Github,
  Instagram, Briefcase, GraduationCap, Compass, Code2, Server, Database, Brain, Wrench,
  Sparkles, Terminal, Cpu, BookOpen, Users,
} from "lucide-react";
import {
  RESUME_URL, LINKEDIN_URL, GITHUB_URL, INSTAGRAM_URL, EMAIL, PHONE, LOCATION, PHOTO_SRC,
} from "@/lib/site";

const TITLE = "Sangar Ganesh G V | MERN Stack Developer";
const DESC =
  "Portfolio of Sangar Ganesh G V, a MERN Stack Developer and B.Tech CSBS student building practical web applications, AI-powered products, and real-world digital solutions.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- helpers ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const btnPrimary = `${btnBase} bg-gradient-primary text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:brightness-110`;
const btnOutline = `${btnBase} border border-border bg-card text-foreground hover:border-primary/50 hover:text-primary hover:-translate-y-0.5`;
const btnGhost = `${btnBase} text-muted-foreground hover:text-primary`;

function Badge({ children, strong }: { children: ReactNode; strong?: boolean }) {
  return (
    <span
      className={
        strong
          ? "rounded-md bg-accent px-2.5 py-1 font-mono text-xs font-medium text-accent-foreground"
          : "rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
      }
    >
      {children}
    </span>
  );
}

function SectionHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="reveal mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">{kicker}</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

/* ---------- navbar ---------- */
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "bg-transparent"}`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#home" className="font-semibold tracking-tight">
          Sangar Ganesh <span className="text-primary">G V</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
          <button onClick={toggle} aria-label="Toggle theme" className="ml-2 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href={RESUME_URL} target="_blank" rel="noreferrer" className={`${btnPrimary} ml-2 px-4 py-2`}>
            Resume
          </a>
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <button onClick={toggle} aria-label="Toggle theme" className="rounded-full p-2 text-muted-foreground">
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="rounded-full p-2">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="animate-in fade-in slide-in-from-top-2 border-b border-border bg-background px-5 pb-5 md:hidden">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="block border-b border-border py-3.5 text-base">
              {n.label}
            </a>
          ))}
          <a href={RESUME_URL} target="_blank" rel="noreferrer" className={`${btnPrimary} mt-4 w-full`}>
            <Download className="h-4 w-4" /> Resume
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-[1.1fr_0.9fr] md:pb-24 md:pt-16">
        <div className="order-2 md:order-1">
          <p className="animate-rise mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> 3rd-year B.Tech CSBS student
          </p>
          <h1 className="animate-rise text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl" style={{ animationDelay: "60ms" }}>
            Sangar Ganesh G V
          </h1>
          <p className="animate-rise mt-3 text-2xl font-medium text-gradient sm:text-3xl" style={{ animationDelay: "120ms" }}>
            MERN Stack Developer
          </p>
          <p className="animate-rise mt-6 text-lg font-medium" style={{ animationDelay: "180ms" }}>
            Building practical, user-focused web applications with modern technologies.
          </p>
          <p className="animate-rise mt-4 max-w-xl leading-relaxed text-muted-foreground" style={{ animationDelay: "240ms" }}>
            B.Tech CSBS student and aspiring MERN Stack Developer passionate about building real-world web applications,
            solving practical problems, and turning ideas into functional digital products.
          </p>
          <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ animationDelay: "300ms" }}>
            <a href="#projects" className={btnPrimary}>View Projects <ArrowRight className="h-4 w-4" /></a>
            <a href="#contact" className={btnOutline}>Contact Me</a>
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className={btnGhost}>
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
          <div className="animate-rise mt-10 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground" style={{ animationDelay: "360ms" }}>
            {["MongoDB", "Express.js", "React.js", "Node.js"].map((t) => (
              <span key={t} className="rounded-md border border-border bg-card px-2 py-1">{t}</span>
            ))}
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-[300px] sm:max-w-sm md:order-2 md:max-w-none">
          <div className="animate-rise relative aspect-[4/5]" style={{ animationDelay: "150ms" }}>
            <div className="absolute inset-x-[8%] bottom-0 top-[15%] rounded-[2.5rem] bg-gradient-primary opacity-90" />
            <div className="absolute -right-4 top-[8%] h-24 w-24 rounded-full border border-primary/40" />
            <div className="absolute -left-2 top-[40%] h-3 w-3 rounded-full bg-primary-glow" />
            <div className="absolute left-[4%] top-[6%] h-16 w-16 rounded-2xl border border-border bg-card/60 backdrop-blur" />
            <div className="absolute inset-x-[8%] bottom-0 top-[15%] rounded-[2.5rem] bg-primary/40 blur-3xl" />
            {PHOTO_SRC ? (
              <img
                src={PHOTO_SRC}
                alt="Sangar Ganesh G V"
                className="relative z-10 h-full w-full object-contain object-bottom"
              />
            ) : (
              <div className="relative z-10 flex h-full items-end justify-center pb-10">
                <div className="flex flex-col items-center gap-2 text-center text-primary-foreground/90">
                  <Terminal className="h-10 w-10" />
                  <span className="font-mono text-xs">photo goes here</span>
                </div>
              </div>
            )}
            <div className="absolute -bottom-4 left-0 z-20 rounded-xl border border-border bg-card px-3 py-2 font-mono text-xs shadow-card">
              <span className="text-primary">const</span> focus = <span className="text-accent-foreground">"MERN"</span>;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- about ---------- */
const SKILLS: { title: string; icon: typeof Code2; items: string[] }[] = [
  { title: "Frontend", icon: Code2, items: ["HTML", "CSS", "JavaScript", "React.js", "Redux", "Tailwind CSS"] },
  { title: "Backend", icon: Server, items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"] },
  { title: "Programming", icon: Terminal, items: ["JavaScript", "Java", "Python", "C", "C++", "SQL"] },
  { title: "Databases", icon: Database, items: ["MongoDB", "MySQL"] },
  { title: "AI / ML", icon: Brain, items: ["Python", "Scikit-learn", "Pandas", "OpenAI API", "Gemini API"] },
  { title: "Tools & Platforms", icon: Wrench, items: ["Git", "GitHub", "VS Code", "Docker", "Firebase", "Cloud Platforms"] },
  { title: "Additional", icon: Users, items: ["UI/UX", "Adobe Photoshop", "MS Office", "Team Communication", "Project Management", "Client Coordination", "Content Creation"] },
];
const CORE = ["JavaScript", "React.js", "Node.js", "Express.js", "MongoDB"];

const BEVORD = [
  "Co-founded and worked as part of a 9-member student-led agency.",
  "Acquired and coordinated approximately 2–3 client projects.",
  "Gathered client requirements and coordinated deliverables.",
  "Communicated with clients and tracked project progress.",
  "Built and customized websites using WordPress.",
  "Contributed to UI/UX design.",
  "Contributed to graphic design and content creation.",
  "Supported digital marketing activities.",
  "Supported social media management for a client.",
  "Collaborated with developers, designers, and other team members.",
  "Translated client requirements into actionable project tasks.",
];

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8 ${className}`}>{children}</div>;
}
function CardTitle({ icon: Icon, children }: { icon: typeof Code2; children: ReactNode }) {
  return (
    <h3 className="mb-5 flex items-center gap-2.5 text-lg font-semibold">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon className="h-4 w-4" /></span>
      {children}
    </h3>
  );
}

function About() {
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="about" className="border-t border-border bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead kicker="01 — About" title="A developer who likes building useful things." />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardTitle icon={Sparkles}>About Me</CardTitle>
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>I am a B.Tech Computer Science and Business Systems student with a strong interest in full-stack web development, particularly the MERN stack.</p>
              <p>I enjoy turning ideas into functional digital products and exploring how technology can solve practical problems. My current technical focus is JavaScript-based full-stack development using React, Node.js, Express.js, and MongoDB.</p>
              <p>I have worked on projects involving social discovery, student resource sharing, AI-powered hardware simulation, and application development. I have also gained practical exposure through a student-led digital agency, where I worked across website development, UI/UX, client coordination, content, and digital activities.</p>
              <p>Alongside development, I am interested in technology, business, startups, product building, and AI. My long-term goal is to become a strong full-stack developer capable of contributing to and building useful technology products.</p>
            </div>
          </Card>
          <div className="grid gap-6">
            <Card>
              <CardTitle icon={GraduationCap}>Education</CardTitle>
              <p className="font-medium">Syed Ammal Engineering College</p>
              <p className="mt-1 text-sm text-muted-foreground">B.Tech — Computer Science and Business Systems (CSBS)</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge strong>CGPA 8.52 / 10</Badge>
                <Badge>Expected 2028</Badge>
              </div>
              <div className="mt-4 flex gap-6 border-t border-border pt-4 text-sm text-muted-foreground">
                <span>10th — <span className="text-foreground">71%</span></span>
                <span>12th — <span className="text-foreground">67%</span></span>
              </div>
            </Card>
            <Card>
              <CardTitle icon={Compass}>Career Interests</CardTitle>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Primary focus</p>
              <p className="mt-1 font-medium text-primary">MERN Stack / Full Stack Development</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Web application development", "Product development", "AI-powered applications", "Startups", "Technology and business", "Building useful digital products"].map((i) => (
                  <Badge key={i}>{i}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Skills */}
        <Card className="mt-6">
          <CardTitle icon={Code2}>Skills</CardTitle>
          <div className="mb-8 rounded-xl border border-primary/30 bg-accent/50 p-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent-foreground">Main stack</p>
            <div className="flex flex-wrap items-center gap-2">
              {CORE.map((c, i) => (
                <span key={c} className="flex items-center gap-2">
                  <span className="rounded-lg bg-card px-3 py-1.5 text-sm font-medium shadow-card">{c}</span>
                  {i < CORE.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-primary" />}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map(({ title, icon: Icon, items }) => (
              <div key={title}>
                <p className="mb-2.5 flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4 text-primary" />{title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((s) => <Badge key={s} strong={CORE.includes(s)}>{s}</Badge>)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Experience */}
        <Card className="mt-6">
          <CardTitle icon={Briefcase}>Experience</CardTitle>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="text-lg font-semibold">Bevord Agency</p>
            <Badge>Student-Led Digital Agency</Badge>
          </div>
          <p className="mt-1 text-sm font-medium text-primary">Co-Founder & Partner</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Bevord was a student-led digital agency created and operated by a 9-member founding team, working across development, design, digital marketing, and client management.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {(showAll ? BEVORD : BEVORD.slice(0, 6)).map((b) => (
              <li key={b} className="flex gap-2.5"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{b}</li>
            ))}
          </ul>
          <button onClick={() => setShowAll(!showAll)} className="mt-4 text-sm font-medium text-primary hover:underline">
            {showAll ? "Show less" : `Show all ${BEVORD.length} responsibilities`}
          </button>
        </Card>
      </div>
    </section>
  );
}

/* ---------- projects ---------- */
type Project = {
  name: string; tagline: string; icon: typeof Code2; desc: string; tech: string[]; highlights: string[];
  details: { label: string; body: ReactNode }[]; featured?: boolean;
};

const List = ({ items }: { items: string[] }) => (
  <ul className="grid gap-1.5 sm:grid-cols-2">
    {items.map((i) => <li key={i} className="flex gap-2.5 text-sm text-muted-foreground"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{i}</li>)}
  </ul>
);

const PROJECTS: Project[] = [
  {
    name: "AI-Powered PC Simulation & Performance Evaluation Platform",
    tagline: "Virtual PC Configuration, Compatibility & Performance Analysis",
    icon: Cpu,
    featured: true,
    desc: "An AI-powered virtual PC simulation platform to configure components, analyze compatibility, evaluate expected performance, and compare builds.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Python", "Scikit-learn", "OpenAI API", "Gemini API"],
    highlights: ["Compatibility analysis", "Bottleneck detection", "Workload evaluation", "AI upgrade recommendations"],
    details: [
      { label: "Overview", body: "An AI-powered virtual PC simulation platform that allows users to configure computer components, analyze hardware compatibility, evaluate expected system performance, and compare multiple PC configurations." },
      { label: "Problem", body: "Choosing compatible computer components and predicting the performance of a complete PC build can be difficult because individual component specifications do not always clearly indicate how the complete system will perform together." },
      { label: "Features", body: <List items={["Virtual PC configuration", "CPU, GPU, motherboard, RAM, storage & PSU selection", "Hardware compatibility analysis", "Bottleneck detection", "Gaming workload evaluation", "Development workload evaluation", "Productivity workload evaluation", "AI/ML workload evaluation", "Multiple PC configuration comparison", "Performance comparison", "Cost comparison", "AI-based component upgrade recommendations", "PC build optimization recommendations"]} /> },
      { label: "Technology", body: (
        <dl className="grid gap-2 text-sm">
          {[["Frontend", "React.js, HTML, CSS, JavaScript"], ["Backend", "Node.js, Express.js"], ["Database", "MongoDB"], ["AI/ML", "Python, Scikit-learn, Pandas"], ["AI Integration", "OpenAI API, Gemini API"], ["Tools", "Git, GitHub, VS Code"]].map(([k, v]) => (
            <div key={k} className="flex gap-3"><dt className="w-28 shrink-0 text-muted-foreground">{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      ) },
    ],
  },
  {
    name: "EduCycle",
    tagline: "Student Resource Sharing Platform",
    icon: BookOpen,
    desc: "A college-focused platform for direct student-to-student donation and exchange of used academic books and notes.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    highlights: ["Student-to-student sharing", "Institution-specific", "No fees or intermediaries"],
    details: [
      { label: "Overview", body: "EduCycle is a college-focused platform that enables direct student-to-student donation and exchange of used academic books and notes." },
      { label: "Problem", body: "Students often have unused books and notes after completing academic semesters, while other students may need the same resources and have difficulty accessing them affordably." },
      { label: "Features", body: <List items={["Direct student-to-student resource sharing", "Donation and exchange of academic books and notes", "Institution-specific resource sharing", "Connecting students who have resources with students who need them", "Academic resource reuse"]} /> },
      { label: "Designed without", body: <div className="flex flex-wrap gap-2">{["Commission", "Platform fees", "Intermediaries"].map((t) => <Badge key={t}>{t}</Badge>)}</div> },
      { label: "Goal", body: "Promote academic resource reuse, improve access to learning materials, and reduce students' academic expenses." },
    ],
  },
  {
    name: "DROPS",
    tagline: "Interest-Driven Social Discovery Platform",
    icon: Users,
    desc: "A social discovery platform that helps users find and connect with people based on shared interests.",
    tech: ["Flutter", "Dart"],
    highlights: ["Interest-based discovery", "Messaging", "Connection requests"],
    details: [
      { label: "Overview", body: "DROPS is an interest-driven social discovery platform designed to help users discover and connect with people based on shared interests." },
      { label: "Features", body: <List items={["User profiles", "Interest-based discovery", "Social feeds", "Connection requests", "Messaging", "Notifications", "Navigation", "Structured dummy data", "Testing", "Android build preparation"]} /> },
      { label: "Role", body: <><p className="font-medium">Individual Project</p><p className="mt-1 text-muted-foreground">Handled application development, UI, navigation, functionality, testing, and build preparation.</p></> },
    ],
  },
];

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-sm animate-in fade-in sm:items-center sm:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-label={p.name}>
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-border bg-card p-6 shadow-card animate-in slide-in-from-bottom-4 sm:rounded-2xl sm:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-primary">{p.tagline}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{p.name}</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">{p.tech.map((t) => <Badge key={t} strong>{t}</Badge>)}</div>
        <div className="mt-6 space-y-6">
          {p.details.map((d) => (
            <div key={d.label}>
              <h4 className="mb-2 text-sm font-semibold">{d.label}</h4>
              <div className="text-sm leading-relaxed text-muted-foreground">{d.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const featured = PROJECTS[0]!;
  const rest = PROJECTS.slice(1);
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead kicker="02 — Projects" title="Things I've built" sub="Full-stack products, AI experiments, and apps built to solve real problems." />

        {/* featured */}
        <article className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-primary opacity-15 blur-3xl transition-opacity group-hover:opacity-25" />
          <div className="relative grid gap-8 md:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><featured.icon className="h-5 w-5" /></span>
                <Badge strong>Featured · Full Stack + AI</Badge>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{featured.name}</h3>
              <p className="mt-2 text-sm text-primary">{featured.tagline}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{featured.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">{featured.tech.map((t) => <Badge key={t}>{t}</Badge>)}</div>
              <button onClick={() => setActive(featured)} className={`${btnPrimary} mt-7 w-full sm:w-auto`}>View Details <ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="rounded-xl border border-border bg-muted/60 p-5 font-mono text-xs">
              <p className="mb-3 text-muted-foreground">// key capabilities</p>
              {featured.highlights.map((h, i) => (
                <p key={h} className="py-1.5"><span className="text-primary">{String(i + 1).padStart(2, "0")}</span>  {h}</p>
              ))}
            </div>
          </div>
        </article>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <article key={p.name} className="reveal group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 sm:p-8">
              <span className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground"><p.icon className="h-5 w-5" /></span>
              <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-1 text-sm text-primary">{p.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {p.highlights.map((h) => <li key={h} className="flex gap-2.5"><span className="mt-2 h-1 w-1 rounded-full bg-primary" />{h}</li>)}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5">{p.tech.map((t) => <Badge key={t}>{t}</Badge>)}</div>
              <button onClick={() => setActive(p)} className={`${btnOutline} mt-auto w-full translate-y-0 sm:w-auto sm:self-start`} style={{ marginTop: "1.75rem" }}>
                View Details <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
      {active && <ProjectModal p={active} onClose={() => setActive(null)} />}
    </section>
  );
}

/* ---------- contact ---------- */
type Form = { name: string; email: string; subject: string; message: string };
const empty: Form = { name: "", email: "", subject: "", message: "" };

function validate(f: Form) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email.";
  if (f.subject.trim().length < 3) e.subject = "Please add a subject.";
  if (f.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}

// Replace this with a real email service / API call later.
async function submitContact(f: Form) {
  const body = `${f.message}\n\n— ${f.name} (${f.email})`;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
}

function Contact() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [note, setNote] = useState("");

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;
    await submitContact(form);
    setNote("Your email app should open with the message ready to send.");
  };

  const field = (k: keyof Form, label: string, type = "text") => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {k === "message" ? (
        <textarea rows={5} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} aria-invalid={!!errors[k]}
          className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30" />
      ) : (
        <input type={type} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} aria-invalid={!!errors[k]}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30" />
      )}
      {errors[k] && <span className="mt-1 block text-xs text-destructive">{errors[k]}</span>}
    </label>
  );

  const info = [
    { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: "Phone", value: PHONE, href: `tel:+91${PHONE}` },
    { icon: MapPin, label: "Location", value: LOCATION },
    { icon: Linkedin, label: "LinkedIn", value: "sangar-ganesh-g-v", href: LINKEDIN_URL },
    { icon: Github, label: "GitHub", value: "SANGARGANESH1", href: GITHUB_URL },
  ];

  return (
    <section id="contact" className="border-t border-border bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead kicker="03 — Contact" title="Let's Build Something Useful" sub="Have an idea, opportunity, or project in mind? Let's connect." />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="reveal space-y-3">
            {info.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon className="h-4 w-4" /></span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{label}</span>
                    <span className="block truncate text-sm font-medium">{value}</span>
                  </span>
                </>
              );
              const cls = "flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card transition-colors";
              return href ? (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`${cls} hover:border-primary/40`}>{inner}</a>
              ) : <div key={label} className={cls}>{inner}</div>;
            })}
          </div>
          <form onSubmit={onSubmit} noValidate className="reveal space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {field("name", "Name")}
              {field("email", "Email", "email")}
            </div>
            {field("subject", "Subject")}
            {field("message", "Message")}
            <button type="submit" className={`${btnPrimary} w-full sm:w-auto`}>Send Message <ArrowRight className="h-4 w-4" /></button>
            <p className="text-xs text-muted-foreground">
              {note || "This opens your email app with the message filled in."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-semibold">Sangar Ganesh G V</p>
          <p className="text-sm text-muted-foreground">MERN Stack Developer</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"><Linkedin className="h-4 w-4" /></a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"><Github className="h-4 w-4" /></a>
          {INSTAGRAM_URL ? (
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram — SASH technology" className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"><Instagram className="h-4 w-4" /></a>
          ) : (
            <span title="SASH technology — link coming soon" className="rounded-full p-2.5 text-muted-foreground/50"><Instagram className="h-4 w-4" /></span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">© 2026 Sangar Ganesh G V. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
