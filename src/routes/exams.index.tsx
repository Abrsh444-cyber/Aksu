import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, GraduationCap, ListChecks } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { exams } from "@/data/exams";

export const Route = createFileRoute("/exams/")({
  head: () => ({
    meta: [
      { title: "Practice Exams — Aksum Academy" },
      {
        name: "description",
        content:
          "Free practice exams for every Ethiopian school subject — Mathematics, Physics, Chemistry, Biology, English, Geography, History, Economics, Civics and Amharic. NEAEA EUEE style multiple-choice questions.",
      },
      { property: "og:title", content: "Practice Exams — Aksum Academy" },
      {
        property: "og:description",
        content:
          "Test your knowledge with NEAEA-style MCQs across every MoE subject — instant scoring and explanations.",
      },
    ],
  }),
  component: ExamsPage,
});

function ExamsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, var(--gold) 1px, transparent 1px), radial-gradient(circle at 85% 75%, var(--emerald) 1px, transparent 1px)",
            backgroundSize: "32px 32px, 48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12 lg:pb-16">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--emerald)" }}
          >
            <ListChecks size={13} /> Practice Exams
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 font-display text-5xl lg:text-7xl font-medium leading-[1.02] text-balance text-foreground max-w-4xl"
          >
            Test what you know — <span className="italic" style={{ color: "var(--emerald)" }}>NEAEA-style</span> MCQs.
          </motion.h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl text-balance">
            Free multiple-choice practice exams across every MoE subject. Instant scoring, explanations on every question, and unlimited retries.
          </p>

          <div className="mt-9 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-3xl">
            {[
              { icon: GraduationCap, label: `${exams.length} subjects`, sub: "covered" },
              { icon: ListChecks, label: `${exams.reduce((s, e) => s + e.questions.length, 0)} questions`, sub: "in the bank" },
              { icon: Clock, label: "12–15 min", sub: "per attempt" },
              { icon: BookOpen, label: "100% free", sub: "no signup" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="rounded-2xl border border-border bg-card p-5">
                <Icon size={18} style={{ color: "var(--emerald)" }} />
                <div className="mt-3 font-display text-xl font-semibold text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam grid */}
      <section className="py-12 lg:py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {exams.map((exam) => (
              <Link
                key={exam.slug}
                to="/exams/$slug"
                params={{ slug: exam.slug }}
                className="group rounded-3xl border border-border bg-card overflow-hidden hover:shadow-elegant transition-shadow flex flex-col"
              >
                <div
                  className="aspect-[16/9] relative"
                  style={{
                    background: `linear-gradient(135deg, ${exam.color} 0%, oklch(0.25 0.05 45) 100%)`,
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div
                    className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/35 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium"
                    style={{ color: "var(--cream)" }}
                  >
                    {exam.level}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div
                      className="font-display text-2xl font-semibold leading-tight"
                      style={{ color: "var(--cream)" }}
                    >
                      {exam.subject}
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-base font-semibold text-foreground group-hover:text-coffee transition-colors">
                    {exam.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                    {exam.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5">
                        <ListChecks size={12} /> {exam.questions.length} Q
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={12} /> {exam.durationMin} min
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-foreground font-medium group-hover:gap-2 transition-all">
                      Start <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
