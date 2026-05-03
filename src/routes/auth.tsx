import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Phone, ShieldCheck, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Aksum Academy" },
      {
        name: "description",
        content:
          "Sign in to Aksum Academy with your Ethiopian phone number to unlock Grade 10–12 and EUEE prep courses, MoE textbooks and practice exams.",
      },
      { property: "og:title", content: "Sign in — Aksum Academy" },
      { property: "og:description", content: "Phone-number sign-in for Ethiopian students." },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "verify";

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);

  // Redirect signed-in users away
  useEffect(() => {
    if (!authLoading && user) navigate({ to: "/courses" });
  }, [user, authLoading, navigate]);

  const normalizePhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.startsWith("251")) return `+${digits}`;
    if (digits.startsWith("0")) return `+251${digits.slice(1)}`;
    if (digits.startsWith("9") || digits.startsWith("7")) return `+251${digits}`;
    return raw.startsWith("+") ? raw : `+${digits}`;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const phoneE164 = normalizePhone(phone);
    const { error } = await supabase.auth.signUp({
      phone: phoneE164,
      password,
      options: { data: { full_name: fullName } },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("We sent you a verification code.");
    setMode("verify");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const phoneE164 = normalizePhone(phone);
    const { error } = await supabase.auth.signInWithPassword({ phone: phoneE164, password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back!");
    navigate({ to: "/courses" });
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const phoneE164 = normalizePhone(phone);
    const { error } = await supabase.auth.verifyOtp({ phone: phoneE164, token: otp, type: "sms" });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Phone verified — you're signed in.");
    navigate({ to: "/courses" });
  };

  const handleGoogleSignIn = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.redirected) return; // browser is navigating to Google
    if (result.error) {
      setBusy(false);
      toast.error(result.error.message ?? "Google sign-in failed. Please try again.");
      return;
    }
    setBusy(false);
    toast.success("Welcome!");
    navigate({ to: "/courses" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, var(--emerald) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--gold) 1px, transparent 1px)",
            backgroundSize: "32px 32px, 48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10 pt-12 lg:pt-20 pb-16 grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Pitch */}
          <div className="lg:py-8">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={14} /> Back home
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 font-display text-4xl lg:text-5xl font-medium leading-[1.05] text-balance text-foreground"
            >
              Sign in with your{" "}
              <span className="italic" style={{ color: "var(--emerald)" }}>
                phone number
              </span>
              .
            </motion.h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Aksum Academy is built for Ethiopian students. Use your local phone number — no email
              needed. Free Grade 9 forever, Pro unlocks Grade 10–12 and EUEE prep.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                { icon: ShieldCheck, t: "Secure SMS verification" },
                { icon: Phone, t: "Use any Ethiopian number (+251 9... or +251 7...)" },
                { icon: KeyRound, t: "Choose your own password" },
              ].map(({ icon: Icon, t }) => (
                <li key={t} className="flex items-start gap-3 text-foreground">
                  <Icon size={16} className="mt-0.5" style={{ color: "var(--emerald)" }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form card */}
          <div className="rounded-3xl border border-border bg-card p-7 lg:p-9 shadow-elegant">
            {/* Google sign-in */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-60"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              <span>or use phone</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="flex gap-1 rounded-full bg-secondary p-1 text-xs font-medium">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2 rounded-full transition-colors ${
                    mode === m ? "bg-foreground text-background" : "text-muted-foreground"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            {mode === "verify" ? (
              <form onSubmit={handleVerify} className="mt-6 space-y-5">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Enter verification code
                </h2>
                <p className="text-sm text-muted-foreground">
                  We sent a 6-digit code to{" "}
                  <span className="text-foreground font-medium">{normalizePhone(phone)}</span>.
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-center text-2xl font-mono tracking-[0.5em] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:bg-coffee transition-colors disabled:opacity-60"
                >
                  {busy ? "Verifying..." : "Verify & sign in"} <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="w-full text-xs text-muted-foreground hover:text-foreground"
                >
                  Back to sign up
                </button>
              </form>
            ) : (
              <form
                onSubmit={mode === "signup" ? handleSignUp : handleSignIn}
                className="mt-6 space-y-4"
              >
                {mode === "signup" && (
                  <Field label="Full name">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Abebe Bekele"
                      className="auth-input"
                    />
                  </Field>
                )}
                <Field label="Phone number" hint="e.g. 0912345678 or +251912345678">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="auth-input"
                  />
                </Field>
                <Field label="Password" hint="At least 6 characters">
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="auth-input"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:bg-coffee transition-colors disabled:opacity-60"
                >
                  {busy
                    ? "Please wait..."
                    : mode === "signup"
                      ? "Create account"
                      : "Sign in"}{" "}
                  <ArrowRight size={15} />
                </button>

                <p className="text-xs text-muted-foreground text-center pt-2">
                  By continuing you agree to Aksum Academy's terms. Your number is never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        .auth-input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          padding: 0.875rem 1.25rem;
          font-size: 0.95rem;
          color: hsl(var(--foreground));
          outline: none;
          transition: box-shadow .15s, border-color .15s;
        }
        .auth-input::placeholder { color: hsl(var(--muted-foreground) / 0.6); }
        .auth-input:focus {
          border-color: hsl(var(--foreground) / 0.3);
          box-shadow: 0 0 0 3px hsl(var(--foreground) / 0.06);
        }
      `}</style>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {hint && <span className="text-[10px] text-muted-foreground/70">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.4 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.2 5.2C41 35.8 44 30.4 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  );
}
