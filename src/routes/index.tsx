import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  BookOpen,
  Trophy,
  Users,
  Calculator,
  Atom,
  FlaskConical,
  Leaf,
  Languages,
  Globe2,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DownloadAppButton } from "@/components/DownloadAppButton";
import heroImg from "@/assets/hero-student.jpg";
import collabImg from "@/assets/students-collab.jpg";
import teacherImg from "@/assets/teacher.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aksum Academy — Premium Learning for Ethiopian Students" },
      {
        name: "description",
        content:
          "Ethiopia's premium online academy for Grade 9–12 and university entrance prep. Learn Math, Physics, Chemistry, Biology, English & Amharic from the country's best teachers.",
      },
      { property: "og:title", content: "Aksum Academy — Premium Learning for Ethiopian Students" },
      {
        property: "og:description",
        content: "Master high-school and university entrance subjects with Ethiopia's leading online academy.",
      },
    ],
  }),
  component: HomePage,
});

const subjects = [
  { icon: Calculator, name: "Mathematics", desc: "Algebra · Calculus · Geometry", tone: "emerald" },
  { icon: Atom, name: "Physics", desc: "Mechanics · Waves · Modern Physics", tone: "gold" },
  { icon: FlaskConical, name: "Chemistry", desc: "Organic · Inorganic · Analytical", tone: "terracotta" },
  { icon: Leaf, name: "Biology", desc: "Cells · Genetics · Ecology", tone: "emerald" },
  { icon: Languages, name: "English", desc: "Grammar · Reading · Writing", tone: "gold" },
  { icon: Globe2, name: "Amharic", desc: "ሰዋስው · ሥነ-ጽሑፍ · ግጥም", tone: "terracotta" },
] as const;

const stats = [
  { value: "25k+", label: "Students learning" },
  { value: "120+", label: "Expert teachers" },
  { value: "94%", label: "EUEE pass rate" },
  { value: "9–12", label: "Grades + Prep" },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, var(--emerald) 0px, transparent 1px), radial-gradient(circle at 80% 60%, var(--gold) 0px, transparent 1px)",
            backgroundSize: "40px 40px, 60px 60px",
          }}
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-20 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <Sparkles size={12} className="text-accent" />
                Built for Ethiopia's curriculum
              </div>

              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.02] text-balance text-foreground">
                Learn boldly.
                <br />
                <span className="italic" style={{ color: "var(--emerald)" }}>
                  Rise{" "}
                </span>
                gracefully.
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-balance">
                A premium learning home for Ethiopian students — from Grade 9 through the university
                entrance exam. Crafted lessons, master teachers, and a community that believes in you.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/courses"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-coffee transition-all shadow-elegant"
                >
                  Start learning free
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Explore courses
                </Link>
                <DownloadAppButton variant="outline" />
              </div>

              {/* Social proof block removed — will return when we have real student counts and ratings. */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
                <img
                  src={heroImg}
                  alt="Ethiopian student studying"
                  width={1536}
                  height={1536}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, oklch(0.18 0.04 35 / 0.5) 100%)",
                  }}
                />
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -left-6 top-12 hidden sm:flex bg-card rounded-2xl shadow-elegant px-5 py-4 items-center gap-3 border border-border"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-emerald flex items-center justify-center">
                  <Trophy size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">EUEE Score</div>
                  <div className="font-display text-lg font-semibold">580 / 700</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -right-4 bottom-16 hidden sm:flex bg-card rounded-2xl shadow-elegant px-5 py-4 items-center gap-3 border border-border"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <BookOpen size={18} style={{ color: "var(--coffee-deep)" }} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Active streak</div>
                  <div className="font-display text-lg font-semibold">42 days 🔥</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl lg:text-5xl font-semibold text-foreground">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
              Subjects
            </div>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl font-medium text-foreground text-balance">
              Every subject. Mastered with care.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From foundational concepts to advanced exam preparation — taught by Ethiopia's most
              celebrated educators.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjects.map((s, i) => {
              const Icon = s.icon;
              const bg =
                s.tone === "emerald"
                  ? "var(--emerald)"
                  : s.tone === "gold"
                    ? "var(--gold)"
                    : "var(--terracotta)";
              return (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative rounded-3xl bg-card border border-border p-7 hover:shadow-elegant transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <div
                    className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon size={22} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all">
                    Explore
                    <ArrowRight size={14} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURE — Teacher */}
      <section className="py-24 lg:py-32 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] max-w-md rounded-3xl overflow-hidden shadow-elegant">
              <img
                src={teacherImg}
                alt="Ethiopian teacher"
                loading="lazy"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
              Master teachers
            </div>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl font-medium text-foreground text-balance">
              Taught by Ethiopia's most loved educators.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Every lesson is crafted by award-winning teachers from Addis Ababa, Mekelle, Bahir Dar
              and beyond — with one mission: help you understand deeply, not just memorize.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {[
                { icon: GraduationCap, title: "Masters & PhDs", desc: "Hand-picked subject experts" },
                { icon: Users, title: "Live Q&A", desc: "Weekly sessions with teachers" },
                { icon: BookOpen, title: "Bilingual", desc: "English & Amharic explanations" },
                { icon: Trophy, title: "Exam-ready", desc: "Built around EUEE & matric" },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex gap-3">
                    <div className="shrink-0 h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center" style={{ color: "var(--emerald)" }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{f.title}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
                Stories
              </div>
              <blockquote className="mt-5 font-display text-3xl lg:text-4xl font-medium leading-tight text-foreground text-balance">
                "Aksum gave me the confidence to score 612 on the EUEE. The teachers explain hard
                topics in Amharic when I need it — that changed everything."
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-emerald" />
                <div>
                  <div className="font-medium text-foreground">Hanna Tadesse</div>
                  <div className="text-sm text-muted-foreground">Now studying Medicine, AAU</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden shadow-elegant aspect-square">
                <img
                  src={collabImg}
                  alt="Students collaborating"
                  loading="lazy"
                  width={1280}
                  height={1024}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-hero grain p-12 lg:p-20 text-center">
            <div
              aria-hidden
              className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
              style={{ background: "var(--gold)" }}
            />
            <div
              aria-hidden
              className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
              style={{ background: "var(--emerald)" }}
            />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--gold)" }}>
                Begin today
              </div>
              <h2
                className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight text-balance"
                style={{ color: "var(--cream)" }}
              >
                Your future is worth
                <br />
                <span className="italic" style={{ color: "var(--gold)" }}>
                  the very best.
                </span>
              </h2>
              <p className="mt-6 max-w-xl mx-auto text-lg" style={{ color: "oklch(0.9 0.02 85 / 0.8)" }}>
                Built for Ethiopian students. Free to start — Grade 9 is fully unlocked, no credit card needed.
              </p>
              <div className="mt-10">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-base font-semibold shadow-glow hover:scale-[1.02] transition-transform"
                  style={{ color: "var(--coffee-deep)" }}
                >
                  Create your free account
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
