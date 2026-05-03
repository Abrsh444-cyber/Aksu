import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Copy,
  Loader2,
  Send,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { PRICING, TELEBIRR, type PaidTier } from "@/data/pricing";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Aksum Academy" },
      {
        name: "description",
        content:
          "Two one-time Pro plans: 300 ETB lifetime for Grade 9–12 & EUEE, or 200 ETB lifetime for Ethiopian university and remedial students. Pay with Telebirr in seconds.",
      },
      { property: "og:title", content: "Pricing — Aksum Academy" },
      {
        property: "og:description",
        content:
          "Two lifetime Pro plans, paid once with Telebirr. From 200 ETB.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<PaidTier | null>(null);

  const isPro = subscription?.isPro ?? false;
  const selected = selectedTier ? PRICING[selectedTier] : null;

  const startTelebirr = (tier: PaidTier) => {
    if (!user) {
      toast.info("Please sign in first to subscribe.");
      navigate({ to: "/auth" });
      return;
    }
    if (isPro) {
      toast.info("You already have an active Pro plan.");
      return;
    }
    setSelectedTier(tier);
    setTimeout(() => {
      document.getElementById("telebirr-pay")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ""));
    toast.success(`${label} copied`);
  };

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
              "radial-gradient(circle at 18% 22%, var(--gold) 1px, transparent 1px), radial-gradient(circle at 78% 76%, var(--emerald) 1px, transparent 1px)",
            backgroundSize: "32px 32px, 48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--emerald)" }}
          >
            <CircleDollarSign size={13} /> Ethiopian Birr Pricing
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 font-display text-5xl lg:text-7xl font-medium leading-[1.02] text-balance text-foreground max-w-4xl"
          >
            Pay with{" "}
            <span className="italic" style={{ color: "var(--emerald)" }}>
              Telebirr
            </span>
            , in seconds.
          </motion.h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            One payment of <strong className="text-foreground">300 ETB</strong> — lifetime access
            to every course. No monthly bills, no renewals. Send Telebirr, paste your transaction
            reference, and we activate Pro within minutes.
          </p>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-medium text-foreground">
            <Sparkles size={13} style={{ color: "var(--gold)" }} /> One-time payment · Lifetime access
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-3 gap-6">
          {/* Free */}
          <article className="rounded-3xl border border-border bg-card p-7 lg:p-8 flex flex-col">
            <div className="text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground">
              Free forever
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">Foundation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              For Grade 9 students starting out.
            </p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-semibold text-foreground">0</span>
              <span className="text-sm text-muted-foreground">ETB / forever</span>
            </div>
            <ul className="mt-7 space-y-3 text-sm text-foreground flex-1">
              {[
                "Every Grade 9 course",
                "All MoE textbook downloads",
                "Sample practice exams",
                "Community forum access",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check size={15} className="mt-0.5 shrink-0" style={{ color: "var(--emerald)" }} />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to={user ? "/courses" : "/auth"}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background text-foreground px-6 py-3.5 text-sm font-medium hover:bg-secondary transition-colors"
            >
              {user ? "Browse free courses" : "Sign up free"} <ArrowRight size={14} />
            </Link>
          </article>

          {/* Aksum Pro — Grade 9–12 + EUEE */}
          <PlanCard
            tier="pro_lifetime"
            highlight
            features={[
              "Everything in Foundation, plus:",
              "Grade 10, 11 (Natural & Social), 12",
              "Full EUEE university entrance prep",
              "All practice exams + answer keys",
              "Downloadable study planners",
              "Priority email support",
            ]}
            isPro={isPro}
            user={!!user}
            onSelect={startTelebirr}
          />

          {/* Campus Pro — University & Remedial */}
          <PlanCard
            tier="pro_campus"
            badge="New"
            features={[
              "All upcoming University courses",
              "Remedial program prep",
              "Memhru Library (slides, PDFs, exams)",
              "Past papers across faculties",
              "Lifetime updates as we add courses",
              "Priority email support",
            ]}
            isPro={isPro}
            user={!!user}
            onSelect={startTelebirr}
          />
        </div>
      </section>

      {/* Telebirr instructions + submit */}
      {selected && selectedTier && (
        <TelebirrFlow
          tier={selectedTier}
          amount={selected.amountEtb}
          planLabel={selected.label}
          userId={user?.id ?? null}
          isPro={isPro}
          onCopy={copy}
        />
      )}

      {/* FAQ */}
      <section className="py-16 lg:py-20 border-t border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 className="font-display text-3xl lg:text-4xl font-medium text-foreground text-center">
            Common questions
          </h2>
          <div className="mt-10 space-y-5">
            {[
              {
                q: "How does Telebirr payment work here?",
                a: "Open Telebirr → Send Money → enter our merchant number and the exact ETB amount → after the SMS confirmation, paste your transaction reference (the 10–12 digit code) into our form. We activate Pro within minutes.",
              },
              {
                q: "Is Grade 9 really free?",
                a: "Yes — every Grade 9 course, every MoE textbook, and sample practice exams are free forever. You only pay if you want Grade 10–12 or EUEE prep.",
              },
              {
                q: "Is this really a one-time payment?",
                a: "Yes. Pay 300 ETB once and your account is Pro for life — no monthly bills, no renewals, no hidden fees.",
              },
              {
                q: "Do you offer student or school discounts?",
                a: "Yes — schools and tutoring centers can contact us for a multi-seat license. Individual students with financial hardship can apply for a free Pro grant.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-border bg-card p-5 lg:p-6">
                <div className="font-display text-lg font-semibold text-foreground">{q}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Telebirr instruction + transaction-reference submission             */
/* ------------------------------------------------------------------ */

function TelebirrFlow({
  tier,
  amount,
  planLabel,
  userId,
  isPro,
  onCopy,
}: {
  tier: PaidTier;
  amount: number;
  planLabel: string;
  userId: string | null;
  isPro: boolean;
  onCopy: (text: string, label: string) => void;
}) {
  const [txRef, setTxRef] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    if (!userId) {
      toast.error("Please sign in first.");
      return;
    }
    const cleaned = txRef.trim().toUpperCase();
    if (cleaned.length < 6) {
      toast.error("Please paste a valid Telebirr transaction reference.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("payments").insert([
      {
        user_id: userId,
        tier,
        amount_etb: amount,
        method: "telebirr",
        status: "pending",
        bank_name: "Telebirr",
        bank_reference: cleaned,
        notes: phone ? `Sent from ${phone}` : null,
      },
    ]);
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSubmitted(true);
    toast.success("Payment submitted — we'll activate Pro within minutes.");
  };

  return (
    <section
      id="telebirr-pay"
      className="border-t border-border"
      style={{ background: "color-mix(in oklab, var(--emerald) 6%, transparent)" }}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium" style={{ color: "var(--emerald)" }}>
          <Smartphone size={13} /> {planLabel} · Telebirr — 3 steps
        </div>
        <h2 className="mt-2 font-display text-3xl lg:text-4xl font-medium text-foreground text-balance">
          Send {amount.toLocaleString()} ETB, paste the reference, you're in.
        </h2>

        {/* Steps */}
        <ol className="mt-8 grid md:grid-cols-3 gap-4">
          <li className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs font-display font-semibold inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ background: "var(--emerald)", color: "var(--cream)" }}>
              1
            </div>
            <div className="mt-3 font-display text-lg font-semibold text-foreground">Open Telebirr</div>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Tap <strong>Send Money</strong> in your Telebirr app or dial <code className="font-mono">*127#</code>.
            </p>
          </li>
          <li className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs font-display font-semibold inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ background: "var(--emerald)", color: "var(--cream)" }}>
              2
            </div>
            <div className="mt-3 font-display text-lg font-semibold text-foreground">Send to our merchant</div>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-2 rounded-lg bg-secondary px-3 py-2">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Number</div>
                  <code className="font-mono text-foreground">{TELEBIRR.merchantNumber}</code>
                </div>
                <button
                  type="button"
                  onClick={() => onCopy(TELEBIRR.merchantNumber, "Telebirr number")}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Copy Telebirr number"
                >
                  <Copy size={14} />
                </button>
              </div>
              <div className="flex items-center justify-between gap-2 rounded-lg bg-secondary px-3 py-2">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Amount</div>
                  <code className="font-mono text-foreground">{amount} ETB</code>
                </div>
                <button
                  type="button"
                  onClick={() => onCopy(String(amount), "Amount")}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Copy amount"
                >
                  <Copy size={14} />
                </button>
              </div>
              <div className="text-[11px] text-muted-foreground">
                Recipient: <strong>{TELEBIRR.merchantName}</strong>
              </div>
            </div>
          </li>
          <li className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs font-display font-semibold inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ background: "var(--emerald)", color: "var(--cream)" }}>
              3
            </div>
            <div className="mt-3 font-display text-lg font-semibold text-foreground">Paste the reference below</div>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Telebirr will SMS you a confirmation with a transaction ID — paste it in the form.
            </p>
          </li>
        </ol>

        {/* Submission form */}
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 lg:p-8">
          {isPro ? (
            <div className="text-center text-sm text-muted-foreground">
              You're already on Pro — no payment needed.
            </div>
          ) : submitted ? (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full" style={{ background: "var(--emerald)", color: "var(--cream)" }}>
                <Check size={22} strokeWidth={3} />
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
                Payment submitted
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                We've received your Telebirr reference. Pro is usually activated within a few
                minutes — you'll see it on your{" "}
                <Link to="/courses" className="underline">
                  courses
                </Link>{" "}
                page once it's live.
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Telebirr transaction reference *
                  </span>
                  <input
                    type="text"
                    value={txRef}
                    onChange={(e) => setTxRef(e.target.value)}
                    placeholder="e.g. AB12CDEF34"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    autoComplete="off"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Phone you sent from <span className="opacity-60">(optional)</span>
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 9XX XX XX XX"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    autoComplete="tel"
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={submit}
                disabled={submitting || !txRef.trim()}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: "var(--emerald)" }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    <Send size={15} /> Submit & activate Pro
                  </>
                )}
              </button>
              <p className="mt-3 text-[11px] text-muted-foreground text-center">
                We verify each Telebirr reference manually — most activations happen within
                minutes during business hours.
              </p>
            </>
          )}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable plan card                                                  */
/* ------------------------------------------------------------------ */

function PlanCard({
  tier,
  features,
  isPro,
  user,
  onSelect,
  highlight = false,
  badge,
}: {
  tier: PaidTier;
  features: string[];
  isPro: boolean;
  user: boolean;
  onSelect: (tier: PaidTier) => void;
  highlight?: boolean;
  badge?: string;
}) {
  const plan = PRICING[tier];
  return (
    <article
      className={`rounded-3xl p-7 lg:p-8 flex flex-col relative overflow-hidden ${
        highlight ? "border-2" : "border border-border"
      } bg-card`}
      style={highlight ? { borderColor: "var(--emerald)" } : undefined}
    >
      {highlight && (
        <div
          aria-hidden
          className="absolute -top-20 -right-20 h-60 w-60 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, var(--emerald), transparent 70%)" }}
        />
      )}
      <div className="relative flex flex-col flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <div
            className="text-xs uppercase tracking-[0.2em] font-medium"
            style={{ color: highlight ? "var(--emerald)" : "var(--coffee)" }}
          >
            {plan.audience}
          </div>
          {highlight && (
            <div className="inline-flex items-center gap-1 rounded-full bg-foreground text-background px-2.5 py-0.5 text-[10px] font-medium">
              <Sparkles size={10} /> Most popular
            </div>
          )}
          {badge && (
            <div
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium text-background"
              style={{ background: "var(--gold)" }}
            >
              {badge}
            </div>
          )}
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">{plan.label}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
        <div className="mt-6 flex items-baseline gap-2">
          <span className="font-display text-5xl font-semibold text-foreground tabular-nums">
            {plan.amountEtb.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">ETB / {plan.period}</span>
        </div>
        <div
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium"
          style={{ color: "var(--emerald)" }}
        >
          <Sparkles size={11} /> Pay once · Lifetime access
        </div>
        <ul className="mt-6 space-y-2.5 text-sm text-foreground flex-1">
          {features.map((t, i) => (
            <li key={t} className="flex items-start gap-2.5">
              <Check
                size={15}
                className="mt-0.5 shrink-0"
                style={{ color: i === 0 ? "var(--gold)" : "var(--emerald)" }}
              />
              <span className={i === 0 ? "font-medium" : ""}>{t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 space-y-2">
          <button
            type="button"
            onClick={() => onSelect(tier)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-opacity text-background hover:opacity-90"
            style={{ background: highlight ? "var(--emerald)" : "var(--foreground)" }}
          >
            <Smartphone size={15} />
            {isPro
              ? "You're on Pro"
              : `Pay ${plan.amountEtb.toLocaleString()} ETB with Telebirr`}
          </button>
          {!user && (
            <p className="text-[11px] text-muted-foreground text-center">
              You'll be asked to sign in before checkout.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
