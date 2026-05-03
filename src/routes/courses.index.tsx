import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Clock, PlayCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { courses as courseCatalog, trackLabels, type Track } from "@/data/courses";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Courses — Aksum Academy" },
      {
        name: "description",
        content:
          "Browse Aksum Academy's full catalogue — Grade 9, 10, 11 (Natural & Social Science), 12 and EUEE preparation, aligned to the Ethiopian MoE textbooks and NEAEA exam blueprint.",
      },
      { property: "og:title", content: "Courses — Aksum Academy" },
      {
        property: "og:description",
        content:
          "Full Ethiopian curriculum catalogue — Grade 9–12 textbook tracks plus NEAEA EUEE exam preparation.",
      },
    ],
  }),
  component: CoursesPage,
});

const tracks: { id: Track; label: string; desc: string }[] = [
  { id: "g9", label: trackLabels.g9, desc: "Foundation year — every MoE Grade 9 textbook subject" },
  { id: "g10", label: trackLabels.g10, desc: "MoE Grade 10 textbook coverage across all subjects" },
  {
    id: "g11-natural",
    label: trackLabels["g11-natural"],
    desc: "Math, Physics, Chemistry, Biology and English for the science stream",
  },
  {
    id: "g11-social",
    label: trackLabels["g11-social"],
    desc: "Math, Geography, History, Economics and Civics for the social stream",
  },
  {
    id: "g12-natural",
    label: trackLabels["g12-natural"],
    desc: "Final-year science textbook coverage — pre-EUEE",
  },
  {
    id: "g12-social",
    label: trackLabels["g12-social"],
    desc: "Final-year social-science textbook coverage — pre-EUEE",
  },
  {
    id: "euee",
    label: trackLabels.euee,
    desc: "Full NEAEA blueprint coverage with timed mock papers",
  },
];

function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pt-16 lg:pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div
            className="text-xs uppercase tracking-[0.25em] font-medium"
            style={{ color: "var(--emerald)" }}
          >
            Catalogue · MoE & NEAEA aligned
          </div>
          <h1 className="mt-4 font-display text-5xl lg:text-7xl font-medium leading-[1.05] text-balance text-foreground max-w-4xl">
            Choose your grade.{" "}
            <span className="italic" style={{ color: "var(--emerald)" }}>
              Walk it together.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Every course follows the Ethiopian Ministry of Education student textbook for that
            grade and subject. EUEE prep tracks are mapped to the NEAEA exam blueprint.
          </p>

          {/* Quick grade nav */}
          <div className="mt-8 flex flex-wrap gap-2">
            {tracks.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {t.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {tracks.map((t) => {
        const list = courseCatalog.filter((c) => c.track === t.id);
        if (list.length === 0) return null;
        return (
          <section key={t.id} id={t.id} className="py-12 lg:py-16 scroll-mt-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="flex items-end justify-between gap-6 mb-10">
                <div>
                  <h2 className="font-display text-3xl lg:text-4xl font-medium text-foreground">
                    {t.label}
                  </h2>
                  <p className="mt-2 text-muted-foreground">{t.desc}</p>
                </div>
                <div className="hidden sm:block text-sm text-muted-foreground">
                  {list.length} course{list.length === 1 ? "" : "s"}
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((c, i) => (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
                  >
                    <Link
                      to="/courses/$slug"
                      params={{ slug: c.slug }}
                      className="group block rounded-3xl bg-card border border-border overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1"
                    >
                      <div
                        className="aspect-[16/9] relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${c.color} 0%, oklch(0.25 0.05 45) 100%)`,
                        }}
                      >
                        <div
                          aria-hidden
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                          }}
                        />
                        <div
                          className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/30 backdrop-blur px-3 py-1 text-xs font-medium"
                          style={{ color: "var(--cream)" }}
                        >
                          {c.level}
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <PlayCircle
                            size={42}
                            style={{ color: "var(--cream)" }}
                            className="opacity-90 group-hover:scale-110 transition-transform"
                          />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">
                          {c.subject}
                        </div>
                        <h3 className="mt-2 font-display text-xl font-semibold text-foreground leading-snug">
                          {c.title}
                        </h3>
                        <div className="mt-5 flex items-center gap-5 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Clock size={13} />
                            {c.lessons} lessons
                          </div>
                        </div>
                        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all">
                          View course <ArrowRight size={14} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl font-medium text-foreground">
            Don't see your textbook unit?
          </h2>
          <p className="mt-4 text-muted-foreground">
            We add new MoE-aligned units every month. Tell us which textbook chapter you want next.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-coffee transition-colors"
          >
            Request a unit <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
