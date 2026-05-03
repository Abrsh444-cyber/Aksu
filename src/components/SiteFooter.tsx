import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-coffee-deep text-cream/80 mt-24" style={{ backgroundColor: "var(--coffee-deep)" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                <span className="font-display text-xl font-bold" style={{ color: "var(--coffee-deep)" }}>አ</span>
              </div>
              <div className="font-display text-2xl font-semibold text-cream" style={{ color: "var(--cream)" }}>Aksum Academy</div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Premium learning crafted for Ethiopia's next generation of scholars, scientists and leaders.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a href="tel:+251966701315" className="block hover:text-cream transition-colors">+251 96 670 1315</a>
              <a href="https://t.me/ultra207" target="_blank" rel="noreferrer" className="block hover:text-cream transition-colors">Telegram: @ultra207</a>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "var(--gold)" }}>Learn</div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/courses">Grade 9–12</Link></li>
              <li><Link to="/courses">University Prep</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "var(--gold)" }}>Company</div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "var(--gold)" }}>Newsletter</div>
            <p className="text-sm mb-4">Study tips, exam updates & scholarships.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-full bg-white/10 border border-white/15 px-4 py-2.5 text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:border-gold"
                style={{ color: "var(--cream)" }}
              />
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs">
          <div>© {new Date().getFullYear()} Aksum Academy. Made in Addis Ababa.</div>
          <div className="flex gap-6">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
