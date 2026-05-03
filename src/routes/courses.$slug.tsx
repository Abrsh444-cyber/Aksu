import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  Clock,
  Download,
  FileText,
  Globe,
  ListChecks,
  PlayCircle,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getCourseBySlug, trackLabels, type Course } from "@/data/courses";
import { getTextbookForCourse } from "@/data/textbooks";
import { getExamForCourse } from "@/data/exams";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }): { course: Course } => {
    const course = getCourseBySlug(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    const data = loaderData as { course: Course } | undefined;
    if (!data) {
      return {
        meta: [
          { title: "Course — Aksum Academy" },
          { name: "description", content: "Course details on Aksum Academy." },
        ],
      };
    }
    const { course } = data;
    const title = `${course.title} — Aksum Academy`;
    return {
      meta: [
        { title },
        { name: "description", content: course.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: course.tagline },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
          404
        </div>
        <h1 className="mt-4 font-display text-5xl font-medium text-foreground">Course not found</h1>
        <p className="mt-4 text-muted-foreground">
          The course you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/courses"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-coffee transition-colors"
        >
          <ArrowLeft size={16} /> Browse all courses
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="font-display text-4xl text-foreground">Something went wrong</h1>
          <p className="mt-4 text-muted-foreground">{error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-coffee transition-colors"
          >
            Retry
          </button>
        </div>
        <SiteFooter />
      </div>
    );
  },
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { course } = Route.useLoaderData() as { course: Course };
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const textbook = getTextbookForCourse(course.slug);
  const exam = getExamForCourse(course.slug);

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
              "radial-gradient(circle at 20% 20%, var(--coffee) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--emerald) 1px, transparent 1px)",
            backgroundSize: "32px 32px, 48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-12 lg:pt-16 pb-16">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} /> All courses
          </Link>

          <div className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium">
                <span style={{ color: "var(--emerald)" }}>{trackLabels[course.track]}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{course.subject}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{course.level}</span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-5 font-display text-4xl lg:text-6xl font-medium leading-[1.05] text-balance text-foreground"
              >
                {course.title}
              </motion.h1>
              <p className="mt-5 text-lg lg:text-xl text-muted-foreground max-w-2xl text-balance">
                {course.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock size={15} /> {course.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={15} /> {course.language}
                </div>
              </div>
            </div>

            {/* Enroll card */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl bg-card border border-border overflow-hidden shadow-elegant lg:sticky lg:top-24"
            >
              <div
                className="aspect-[16/10] relative"
                style={{
                  background: `linear-gradient(135deg, ${course.color} 0%, oklch(0.25 0.05 45) 100%)`,
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle size={68} style={{ color: "var(--cream)" }} className="opacity-95" />
                </div>
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/30 backdrop-blur px-3 py-1 text-xs font-medium" style={{ color: "var(--cream)" }}>
                  Preview lesson available
                </div>
              </div>
              <div className="p-6 lg:p-7">
                <div className="flex items-baseline gap-2">
                  <div className="font-display text-3xl font-semibold text-foreground">ETB 300</div>
                  <div className="text-sm text-muted-foreground">· one-time</div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Pay once with <span className="font-medium text-foreground">Aksum Pro</span> — unlocks every Grade 9–12 & EUEE course forever.
                </div>
                <Link
                  to="/pricing"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:bg-coffee transition-colors"
                >
                  Unlock with Aksum Pro <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  className="mt-2.5 w-full inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background text-foreground px-6 py-3.5 text-sm font-medium hover:bg-secondary transition-colors"
                >
                  Watch free preview
                </button>

                {(textbook || exam) && (
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {textbook && (
                      <a
                        href={textbook.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card text-foreground px-3 py-2.5 text-xs font-medium hover:bg-secondary transition-colors"
                        title={`Download ${textbook.title} (MoE)`}
                      >
                        <Download size={13} /> MoE Book
                      </a>
                    )}
                    {exam && (
                      <Link
                        to="/exams/$slug"
                        params={{ slug: exam.slug }}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full text-background px-3 py-2.5 text-xs font-medium transition-opacity hover:opacity-90"
                        style={{ background: "var(--emerald)" }}
                      >
                        <ListChecks size={13} /> Take Exam
                      </Link>
                    )}
                  </div>
                )}

                {textbook && (
                  <div className="mt-3 flex items-start gap-2 text-[11px] text-muted-foreground leading-snug">
                    <FileText size={12} className="shrink-0 mt-0.5" />
                    <span>
                      Official MoE textbook · {textbook.pages ?? "—"} pages · hosted on{" "}
                      <a
                        href={textbook.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-foreground"
                      >
                        elearn.moe.gov.et
                      </a>
                    </span>
                  </div>
                )}
                <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5"><BookOpen size={14} style={{ color: "var(--emerald)" }} /> {totalLessons} on-demand lessons</li>
                  <li className="flex items-center gap-2.5"><Clock size={14} style={{ color: "var(--emerald)" }} /> {course.duration} self-paced</li>
                  <li className="flex items-center gap-2.5"><Award size={14} style={{ color: "var(--emerald)" }} /> Certificate of completion</li>
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* About + outcomes */}
      <section className="py-16 lg:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
              About this course
            </div>
            <h2 className="mt-4 font-display text-3xl lg:text-4xl font-medium text-foreground text-balance">
              {course.description}
            </h2>
          </div>
          <div className="rounded-3xl bg-secondary/60 p-7 lg:p-8 border border-border">
            <h3 className="font-display text-xl font-semibold text-foreground">What you'll achieve</h3>
            <ul className="mt-5 space-y-3.5">
              {course.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm text-foreground">
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--emerald)", color: "var(--cream)" }}
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
                Curriculum
              </div>
              <h2 className="mt-3 font-display text-3xl lg:text-5xl font-medium text-foreground">
                {course.modules.length} modules · {totalLessons} lessons
              </h2>
            </div>
          </div>

          <Accordion type="multiple" defaultValue={[`m-0`]} className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
            {course.modules.map((m, i) => (
              <AccordionItem key={m.title} value={`m-${i}`} className="border-b-0 px-5 lg:px-7">
                <AccordionTrigger className="hover:no-underline py-5 text-left">
                  <div className="flex items-center gap-4 w-full">
                    <span
                      className="font-display text-sm font-semibold w-8 h-8 rounded-full inline-flex items-center justify-center shrink-0"
                      style={{ background: "var(--secondary)", color: "var(--coffee)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="font-display text-lg lg:text-xl font-semibold text-foreground">{m.title}</div>
                      <div className="mt-0.5 text-sm text-muted-foreground font-sans font-normal">{m.summary}</div>
                    </div>
                    <div className="hidden sm:block text-xs text-muted-foreground font-sans font-normal mr-3">
                      {m.lessons.length} lessons
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <ul className="ml-12 space-y-2.5">
                    {m.lessons.map((l) => (
                      <li key={l.title} className="flex items-center gap-3 text-sm">
                        <PlayCircle size={16} className="text-muted-foreground shrink-0" />
                        <span className="flex-1 text-foreground">{l.title}</span>
                        {l.preview && (
                          <span
                            className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full"
                            style={{ background: "var(--gold)", color: "var(--gold-foreground)" }}
                          >
                            Preview
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground tabular-nums">{l.duration}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Instructor section removed — will be re-added once real teachers are onboarded. */}

      {/* Final CTA */}
      <section className="py-20 lg:py-28 border-t border-border">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-foreground text-balance">
            Ready to start <span className="italic" style={{ color: "var(--emerald)" }}>{course.title}</span>?
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Learn at your own pace with Aksum Academy.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-coffee transition-colors"
            >
              Unlock with Aksum Pro · ETB 300 <ArrowRight size={16} />
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background text-foreground px-7 py-3.5 text-sm font-medium hover:bg-secondary transition-colors"
            >
              Browse other courses
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
