import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ListChecks,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getExamBySlug, type Exam } from "@/data/exams";

export const Route = createFileRoute("/exams/$slug")({
  loader: ({ params }): { exam: Exam } => {
    const exam = getExamBySlug(params.slug);
    if (!exam) throw notFound();
    return { exam };
  },
  head: ({ loaderData }) => {
    const data = loaderData as { exam: Exam } | undefined;
    if (!data) {
      return {
        meta: [{ title: "Practice Exam — Aksum Academy" }],
      };
    }
    const title = `${data.exam.title} — Aksum Academy`;
    return {
      meta: [
        { title },
        { name: "description", content: data.exam.description },
        { property: "og:title", content: title },
        { property: "og:description", content: data.exam.description },
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
        <h1 className="mt-4 font-display text-5xl font-medium text-foreground">Exam not found</h1>
        <p className="mt-4 text-muted-foreground">The exam you're looking for doesn't exist.</p>
        <Link
          to="/exams"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-coffee transition-colors"
        >
          <ArrowLeft size={16} /> Browse all exams
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
  component: ExamPlayer,
});

function ExamPlayer() {
  const { exam } = Route.useLoaderData() as { exam: Exam };

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    let correct = 0;
    for (const q of exam.questions) {
      if (answers[q.id] === q.correctIndex) correct += 1;
    }
    return correct;
  }, [answers, exam.questions]);

  const total = exam.questions.length;
  const pct = total === 0 ? 0 : Math.round((score / total) * 100);
  const allAnswered = Object.keys(answers).length === total;

  const handleSelect = (qid: string, idx: number) => {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [qid]: idx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${exam.color} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 pt-12 lg:pt-16 pb-10">
          <Link
            to="/exams"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} /> All exams
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium">
            <span style={{ color: "var(--emerald)" }}>{exam.level}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{exam.subject}</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 font-display text-4xl lg:text-5xl font-medium text-foreground text-balance"
          >
            {exam.title}
          </motion.h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">{exam.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ListChecks size={14} /> {total} questions
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} /> {exam.durationMin} min suggested
            </span>
          </div>
        </div>
      </section>

      {/* Result panel */}
      {submitted && (
        <section className="border-b border-border bg-secondary/50">
          <div className="mx-auto max-w-4xl px-6 lg:px-10 py-10 lg:py-14">
            <div className="rounded-3xl bg-card border border-border p-7 lg:p-10">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <div
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium"
                    style={{ color: "var(--emerald)" }}
                  >
                    <Trophy size={14} /> Your result
                  </div>
                  <div className="mt-3 font-display text-5xl lg:text-6xl font-semibold text-foreground tabular-nums">
                    {score} <span className="text-muted-foreground">/ {total}</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {pct}% correct ·{" "}
                    {pct >= 80
                      ? "Excellent — exam-ready."
                      : pct >= 60
                        ? "Solid — review the explanations below."
                        : pct >= 40
                          ? "Keep practicing — focus on the missed topics."
                          : "Revisit the textbook chapters and try again."}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background text-foreground px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <RotateCcw size={14} /> Retry
                  </button>
                  <Link
                    to="/exams"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-coffee transition-colors"
                  >
                    Try another subject <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full transition-[width] duration-700"
                  style={{ width: `${pct}%`, background: exam.color }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Questions */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 space-y-5">
          {exam.questions.map((q, i) => {
            const selected = answers[q.id];
            const isCorrect = submitted && selected === q.correctIndex;
            const isWrong = submitted && selected !== undefined && selected !== q.correctIndex;

            return (
              <article
                key={q.id}
                className="rounded-3xl border border-border bg-card p-6 lg:p-7"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="font-display text-sm font-semibold w-8 h-8 rounded-full inline-flex items-center justify-center shrink-0"
                    style={{ background: "var(--secondary)", color: "var(--coffee)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h2 className="font-display text-lg lg:text-xl font-semibold text-foreground leading-snug">
                      {q.question}
                    </h2>

                    <div className="mt-5 grid gap-2.5">
                      {q.options.map((opt, idx) => {
                        const chosen = selected === idx;
                        const showCorrect = submitted && idx === q.correctIndex;
                        const showWrong = submitted && chosen && idx !== q.correctIndex;

                        let cls =
                          "border-border bg-background hover:bg-secondary text-foreground";
                        if (showCorrect) {
                          cls = "border-emerald-500/60 bg-emerald-500/10 text-foreground";
                        } else if (showWrong) {
                          cls = "border-rose-500/60 bg-rose-500/10 text-foreground";
                        } else if (chosen && !submitted) {
                          cls = "border-foreground bg-secondary text-foreground";
                        }

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelect(q.id, idx)}
                            disabled={submitted}
                            className={`w-full text-left flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors ${cls} ${
                              submitted ? "cursor-default" : "cursor-pointer"
                            }`}
                          >
                            <span
                              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold ${
                                showCorrect
                                  ? "border-emerald-500 bg-emerald-500 text-white"
                                  : showWrong
                                    ? "border-rose-500 bg-rose-500 text-white"
                                    : chosen
                                      ? "border-foreground bg-foreground text-background"
                                      : "border-border bg-background text-muted-foreground"
                              }`}
                            >
                              {showCorrect ? "✓" : showWrong ? "✕" : String.fromCharCode(65 + idx)}
                            </span>
                            <span className="flex-1">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {submitted && (
                      <div
                        className={`mt-5 rounded-2xl p-4 text-sm flex items-start gap-2.5 ${
                          isCorrect
                            ? "bg-emerald-500/10 text-foreground"
                            : isWrong
                              ? "bg-rose-500/10 text-foreground"
                              : "bg-secondary text-foreground"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-500" />
                        ) : (
                          <XCircle size={18} className="shrink-0 mt-0.5 text-rose-500" />
                        )}
                        <div>
                          <div className="font-semibold">
                            {isCorrect ? "Correct" : `Answer: ${q.options[q.correctIndex]}`}
                          </div>
                          <div className="mt-1 text-muted-foreground">{q.explanation}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          {/* Submit / progress bar */}
          <div className="sticky bottom-4 mt-6 rounded-full border border-border bg-card/95 backdrop-blur shadow-elegant flex items-center justify-between gap-3 px-5 py-3">
            <div className="text-xs lg:text-sm text-muted-foreground tabular-nums">
              {Object.keys(answers).length} / {total} answered
            </div>
            {submitted ? (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background text-foreground px-5 py-2 text-sm font-medium hover:bg-secondary transition-colors"
              >
                <RotateCcw size={14} /> Retry
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:bg-coffee transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit answers <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
