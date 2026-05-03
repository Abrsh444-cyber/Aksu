import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send, Send as Telegram } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aksum Academy" },
      {
        name: "description",
        content: "Get in touch with Aksum Academy — Addis Ababa's premium online learning home.",
      },
      { property: "og:title", content: "Contact — Aksum Academy" },
      {
        property: "og:description",
        content: "Reach the Aksum Academy team in Addis Ababa.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pt-16 lg:pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "var(--emerald)" }}>
              Get in touch
            </div>
            <h1 className="mt-4 font-display text-5xl lg:text-6xl font-medium leading-[1.05] text-balance text-foreground">
              Let's talk about <span className="italic" style={{ color: "var(--emerald)" }}>your learning.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Questions about courses, partnerships, or scholarships? Our team in Addis Ababa would love to hear from you.
            </p>

            <div className="mt-12 space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@aksum.academy", href: "mailto:hello@aksum.academy" },
                { icon: Phone, label: "Phone", value: "+251 96 670 1315", href: "tel:+251966701315" },
                { icon: Telegram, label: "Telegram", value: "@ultra207", href: "https://t.me/ultra207" },
                { icon: MapPin, label: "Office", value: "Bole, Addis Ababa, Ethiopia" },
              ].map((c) => {
                const Icon = c.icon;
                const content = (
                  <>
                    <div className="h-11 w-11 rounded-xl bg-card border border-border flex items-center justify-center" style={{ color: "var(--emerald)" }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                      <div className="mt-1 text-foreground font-medium">{c.value}</div>
                    </div>
                  </>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-start gap-4 hover:opacity-80 transition-opacity">
                    {content}
                  </a>
                ) : (
                  <div key={c.label} className="flex items-start gap-4">{content}</div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks! We'll get back to you within 24 hours.");
              }}
              className="rounded-3xl bg-card border border-border p-8 lg:p-10 shadow-elegant"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="First name" id="first" />
                <Field label="Last name" id="last" />
              </div>
              <div className="mt-5">
                <Field label="Email" id="email" type="email" />
              </div>
              <div className="mt-5">
                <Field label="Subject" id="subject" />
              </div>
              <div className="mt-5">
                <label htmlFor="msg" className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Message
                </label>
                <textarea
                  id="msg"
                  rows={5}
                  className="mt-2 w-full rounded-2xl bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-coffee transition-colors shadow-elegant"
              >
                Send message <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({ label, id, type = "text" }: { label: string; id: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="mt-2 w-full rounded-full bg-background border border-border px-5 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}
