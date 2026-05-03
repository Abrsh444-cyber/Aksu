import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookMarked, Download, ExternalLink, FileText, Filter } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  MOE_PORTAL_URL,
  streamLabels,
  textbooks,
  type Grade,
  type Stream,
} from "@/data/textbooks";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "MoE Textbook Library — Aksum Academy" },
      {
        name: "description",
        content:
          "Download official Ethiopian Ministry of Education student textbooks for Grade 9–12, Natural and Social Science streams. Direct links to elearn.moe.gov.et.",
      },
      { property: "og:title", content: "MoE Textbook Library — Aksum Academy" },
      {
        property: "og:description",
        content:
          "Free official MoE student textbooks — every grade, every subject, both streams.",
      },
    ],
  }),
  component: BooksPage,
});

const grades: { id: Grade | "all"; label: string }[] = [
  { id: "all", label: "All grades" },
  { id: "9", label: "Grade 9" },
  { id: "10", label: "Grade 10" },
  { id: "11", label: "Grade 11" },
  { id: "12", label: "Grade 12" },
];

const streams: { id: Stream | "all"; label: string }[] = [
  { id: "all", label: "All streams" },
  { id: "common", label: "Common" },
  { id: "natural", label: "Natural Science" },
  { id: "social", label: "Social Science" },
];

function BooksPage() {
  const [grade, setGrade] = useState<Grade | "all">("all");
  const [stream, setStream] = useState<Stream | "all">("all");

  const filtered = useMemo(() => {
    return textbooks.filter((b) => {
      if (grade !== "all" && b.grade !== grade) return false;
      if (stream !== "all" && b.stream !== stream) return false;
      return true;
    });
  }, [grade, stream]);

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
              "radial-gradient(circle at 18% 20%, var(--coffee) 1px, transparent 1px), radial-gradient(circle at 82% 70%, var(--emerald) 1px, transparent 1px)",
            backgroundSize: "32px 32px, 48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--emerald)" }}
          >
            <BookMarked size={13} /> MoE Textbook Library
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 font-display text-5xl lg:text-7xl font-medium leading-[1.02] text-balance text-foreground max-w-4xl"
          >
            Every Ethiopian <span className="italic" style={{ color: "var(--emerald)" }}>student textbook</span>, one click away.
          </motion.h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl text-balance">
            Direct downloads of the official Ministry of Education Grade 9–12 student textbooks — Natural Science, Social Science and shared subjects — sourced from{" "}
            <a
              href={MOE_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              elearn.moe.gov.et
            </a>
            .
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={MOE_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card text-foreground px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
            >
              Visit official MoE portal <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-border bg-secondary/40 sticky top-20 z-30 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-4 flex flex-wrap items-center gap-3 lg:gap-5">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground">
            <Filter size={13} /> Filter
          </div>
          <div className="flex flex-wrap gap-1.5">
            {grades.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGrade(g.id)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  grade === g.id
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card text-foreground border-border hover:bg-secondary"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
          <span className="hidden lg:inline text-muted-foreground">·</span>
          <div className="flex flex-wrap gap-1.5">
            {streams.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStream(s.id)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  stream === s.id
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card text-foreground border-border hover:bg-secondary"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="ml-auto text-xs text-muted-foreground tabular-nums">
            {filtered.length} {filtered.length === 1 ? "book" : "books"}
          </div>
        </div>
      </section>

      {/* Books grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground">
              No textbooks match this filter combination.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((book) => (
                <article
                  key={book.id}
                  className="group rounded-3xl border border-border bg-card overflow-hidden flex flex-col hover:shadow-elegant transition-shadow"
                >
                  <div
                    className="aspect-[3/4] relative"
                    style={{
                      background: `linear-gradient(135deg, ${book.color} 0%, oklch(0.25 0.05 45) 100%)`,
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
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/35 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium" style={{ color: "var(--cream)" }}>
                      Grade {book.grade}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="font-display text-2xl font-semibold leading-tight" style={{ color: "var(--cream)" }}>
                        {book.subject}
                      </div>
                      <div className="text-xs mt-1 opacity-80" style={{ color: "var(--cream)" }}>
                        {streamLabels[book.stream]}
                      </div>
                    </div>
                    <FileText
                      size={28}
                      className="absolute bottom-4 right-4 opacity-80"
                      style={{ color: "var(--cream)" }}
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-base font-semibold text-foreground leading-snug">
                      {book.title}
                    </h3>
                    <div className="mt-1.5 text-xs text-muted-foreground">
                      {book.publisher} · {book.edition}
                      {book.pages ? ` · ${book.pages} pages` : ""}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <a
                        href={book.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-4 py-2.5 text-xs font-medium hover:bg-coffee transition-colors"
                      >
                        <Download size={13} /> PDF
                      </a>
                      <a
                        href={book.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background text-foreground px-3 py-2.5 text-xs font-medium hover:bg-secondary transition-colors"
                        title="MoE portal page"
                      >
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer + CTA */}
      <section className="py-16 lg:py-20 border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
            About these files
          </div>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-medium text-foreground text-balance">
            Free, official, and always the latest edition.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            All textbook PDFs are hosted by the Federal Democratic Republic of Ethiopia Ministry of Education on{" "}
            <a
              href={MOE_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              elearn.moe.gov.et
            </a>
            . Aksum Academy links to the official sources so you always get the most recent edition. We do not redistribute or modify the content.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-coffee transition-colors"
            >
              See matching video courses <ArrowRight size={16} />
            </Link>
            <Link
              to="/exams"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background text-foreground px-7 py-3.5 text-sm font-medium hover:bg-secondary transition-colors"
            >
              Practice with an exam
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
