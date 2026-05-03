import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  MapPin,
  Target,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/euee")({
  head: () => ({
    meta: [
      { title: "EUEE Exam Prep — NEAEA Format, Dates & Centers | Aksum Academy" },
      {
        name: "description",
        content:
          "Complete guide to the Ethiopian University Entrance Examination (EUEE): NEAEA exam format, subject papers, 2024/25 dates, exam centers across Ethiopia, and full prep courses.",
      },
      { property: "og:title", content: "EUEE Exam Prep — NEAEA Format, Dates & Centers" },
      {
        property: "og:description",
        content:
          "Everything Grade 12 students need to know about the NEAEA EUEE — exam structure, schedule, registration, exam centers, and Aksum Academy's prep courses.",
      },
    ],
  }),
  component: EueePage,
});

const naturalPapers = [
  { name: "English", items: 100, mins: 150 },
  { name: "Mathematics (Natural)", items: 60, mins: 150 },
  { name: "Aptitude (SAT)", items: 60, mins: 90 },
  { name: "Physics", items: 60, mins: 90 },
  { name: "Chemistry", items: 60, mins: 90 },
  { name: "Biology", items: 60, mins: 90 },
];

const socialPapers = [
  { name: "English", items: 100, mins: 150 },
  { name: "Mathematics (Social)", items: 60, mins: 150 },
  { name: "Aptitude (SAT)", items: 60, mins: 90 },
  { name: "Geography", items: 60, mins: 90 },
  { name: "History", items: 60, mins: 90 },
  { name: "Economics", items: 60, mins: 90 },
];

const timeline = [
  {
    label: "Registration opens",
    date: "April – May",
    detail: "Schools submit Grade 12 student lists to NEAEA via the regional education bureaus.",
  },
  {
    label: "Mock & model exams",
    date: "May – June",
    detail: "School-based mocks and NEAEA model papers released. Final revision window.",
  },
  {
    label: "EUEE administration",
    date: "Late June – Early July",
    detail: "Six paper-based sittings over 3–4 days at designated regional centers.",
  },
  {
    label: "Results released",
    date: "August",
    detail: "NEAEA publishes results online and via SMS. University placement follows.",
  },
];

const examCenters = [
  { region: "Addis Ababa", places: "AAU campuses, Kotebe, Addis Ababa Science & Tech University" },
  { region: "Amhara", places: "Bahir Dar, Gondar, Dessie, Debre Markos, Debre Birhan, Woldia" },
  { region: "Oromia", places: "Adama, Jimma, Ambo, Nekemte, Bishoftu, Shashemene, Robe" },
  { region: "Tigray", places: "Mekelle, Aksum, Adigrat, Shire" },
  { region: "Sidama & SNNP", places: "Hawassa, Arba Minch, Wolaita Sodo, Hosaena, Dilla" },
  { region: "Somali", places: "Jigjiga, Kebri Dahar, Degehabur" },
  { region: "Afar", places: "Semera, Dubti, Asaita" },
  { region: "Benishangul-Gumuz", places: "Assosa, Pawe, Bambasi" },
  { region: "Gambella", places: "Gambella town, Itang" },
  { region: "Harari & Dire Dawa", places: "Harar, Dire Dawa university campuses" },
];

const tips = [
  "Master the official NEAEA blueprint before drilling questions — every paper has predictable weighting.",
  "Solve at least 10 years of past papers; patterns repeat across cohorts.",
  "Sit timed full-length mocks every weekend in the final 8 weeks.",
  "English and Aptitude are the highest-leverage papers — daily 30-minute practice compounds quickly.",
  "Confirm your exam center, ID card, and arrival logistics two weeks before exam day.",
];

function EueePage() {
  const eueeCourses = courses.filter((c) => c.track === "euee");

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
              "radial-gradient(circle at 15% 20%, var(--emerald) 1px, transparent 1px), radial-gradient(circle at 85% 70%, var(--coffee) 1px, transparent 1px)",
            backgroundSize: "32px 32px, 48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-16 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em]" style={{ color: "var(--emerald)" }}>
            <GraduationCap size={13} /> NEAEA · EUEE 2024/25
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 font-display text-5xl lg:text-7xl font-medium leading-[1.02] text-balance text-foreground max-w-4xl"
          >
            Pass the <span className="italic" style={{ color: "var(--emerald)" }}>Ethiopian University Entrance</span> Exam with confidence.
          </motion.h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl text-balance">
            Everything Grade 12 students need to understand the NEAEA EUEE — paper structure, exam dates, centers across Ethiopia, and a full library of prep courses for both Natural and Social Science streams.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#prep-courses"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-coffee transition-colors"
            >
              Browse EUEE prep courses <ArrowRight size={16} />
            </a>
            <a
              href="#format"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background text-foreground px-7 py-3.5 text-sm font-medium hover:bg-secondary transition-colors"
            >
              Understand the format
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl">
            {[
              { icon: FileText, label: "6 papers", sub: "per stream" },
              { icon: Clock, label: "3–4 days", sub: "exam window" },
              { icon: MapPin, label: "60+ centers", sub: "nationwide" },
              { icon: Target, label: `${eueeCourses.length} courses`, sub: "on Aksum" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="rounded-2xl border border-border bg-card p-5">
                <Icon size={18} style={{ color: "var(--emerald)" }} />
                <div className="mt-3 font-display text-2xl font-semibold text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Format */}
      <section id="format" className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
                Exam format
              </div>
              <h2 className="mt-4 font-display text-3xl lg:text-5xl font-medium text-foreground text-balance">
                Six papers, two streams, one shot at university.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                The NEAEA EUEE is a paper-based, multiple-choice exam administered to all Grade 12 students. You sit six subject papers based on your stream — Natural Science or Social Science — plus shared English and Aptitude papers.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Total raw score is converted to a composite out of 700. University placement uses your composite score, stream, and preferences.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { title: "Natural Science stream", papers: naturalPapers, color: "var(--emerald)" },
                { title: "Social Science stream", papers: socialPapers, color: "var(--gold)" },
              ].map((stream) => (
                <div key={stream.title} className="rounded-3xl border border-border bg-card p-6 lg:p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: stream.color }} />
                    <h3 className="font-display text-lg font-semibold text-foreground">{stream.title}</h3>
                  </div>
                  <ul className="mt-5 divide-y divide-border">
                    {stream.papers.map((p) => (
                      <li key={p.name} className="py-3 flex items-center justify-between gap-3 text-sm">
                        <span className="text-foreground">{p.name}</span>
                        <span className="text-muted-foreground tabular-nums text-xs">
                          {p.items} items · {p.mins} min
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
            2024/25 timeline
          </div>
          <h2 className="mt-4 font-display text-3xl lg:text-5xl font-medium text-foreground text-balance max-w-3xl">
            Key NEAEA dates for this year's cohort.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-2xl">
            Indicative dates based on prior NEAEA schedules. Always confirm exact dates with your school registrar and the official NEAEA announcement.
          </p>

          <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {timeline.map((t, i) => (
              <li key={t.label} className="rounded-2xl border border-border bg-card p-6 relative">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground">
                  <Calendar size={13} /> Step {i + 1}
                </div>
                <div className="mt-4 font-display text-xl font-semibold text-foreground">{t.label}</div>
                <div className="mt-1 text-sm font-medium" style={{ color: "var(--emerald)" }}>
                  {t.date}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Centers */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
                Exam centers
              </div>
              <h2 className="mt-4 font-display text-3xl lg:text-5xl font-medium text-foreground text-balance">
                Sit the EUEE close to home.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                NEAEA designates exam centers in every region of Ethiopia, mostly hosted at public universities and Grade 11–12 secondary schools. Your school registrar assigns your exact center about 2–3 weeks before exam day.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Bring your school ID, photo, and the admission slip issued by NEAEA. Plan to arrive at least 60 minutes before each session.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {examCenters.map((c) => (
                <div key={c.region} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} style={{ color: "var(--emerald)" }} />
                    <div className="font-display text-base font-semibold text-foreground">{c.region}</div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.places}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 lg:py-20 border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
            How to prepare
          </div>
          <h2 className="mt-4 font-display text-3xl lg:text-4xl font-medium text-foreground text-balance">
            Five habits of every top scorer.
          </h2>
          <ul className="mt-8 space-y-4">
            {tips.map((t) => (
              <li key={t} className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-5">
                <CheckCircle2 size={20} style={{ color: "var(--emerald)" }} className="shrink-0 mt-0.5" />
                <span className="text-sm lg:text-base text-foreground leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prep courses */}
      <section id="prep-courses" className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
                Prep library
              </div>
              <h2 className="mt-3 font-display text-3xl lg:text-5xl font-medium text-foreground text-balance">
                {eueeCourses.length} EUEE courses, every paper covered.
              </h2>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-coffee transition-colors"
            >
              All courses <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {eueeCourses.map((course) => {
              const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
              return (
                <Link
                  key={course.slug}
                  to="/courses/$slug"
                  params={{ slug: course.slug }}
                  className="group rounded-3xl border border-border bg-card overflow-hidden hover:shadow-elegant transition-shadow flex flex-col"
                >
                  <div
                    className="aspect-[16/9] relative"
                    style={{
                      background: `linear-gradient(135deg, ${course.color} 0%, oklch(0.25 0.05 45) 100%)`,
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
                      className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/35 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium"
                      style={{ color: "var(--cream)" }}
                    >
                      {course.subject}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-coffee transition-colors">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                      {course.tagline}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen size={12} /> {totalLessons} lessons
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={12} /> {course.duration}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 border-t border-border">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-foreground text-balance">
            Your <span className="italic" style={{ color: "var(--emerald)" }}>EUEE</span> starts the moment you commit.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Pick a paper, open the first lesson, and start building the score that opens your university door.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#prep-courses"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-coffee transition-colors"
            >
              Choose your prep course <ArrowRight size={16} />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background text-foreground px-7 py-3.5 text-sm font-medium hover:bg-secondary transition-colors"
            >
              Talk to an advisor
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
