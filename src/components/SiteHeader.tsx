import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut, Menu, User2, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const nav = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/books", label: "Books" },
  { to: "/library", label: "Library" },
  { to: "/exams", label: "Exams" },
  { to: "/euee", label: "EUEE" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    setOpen(false);
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-emerald flex items-center justify-center shadow-warm group-hover:scale-105 transition-transform">
            <span className="font-display text-xl font-bold text-primary-foreground">አ</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl font-semibold text-foreground">Aksum</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Academy
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-20 rounded-full bg-secondary animate-pulse" />
          ) : user ? (
            <>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <User2 size={14} />
                <span className="font-medium text-foreground tabular-nums">
                  {user.phone || user.email || "Signed in"}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background text-foreground px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors"
              >
                <LogOut size={14} /> Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-coffee transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="px-6 py-6 flex flex-col gap-5">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border/60 flex flex-col gap-3">
              {user ? (
                <>
                  <div className="text-xs text-muted-foreground">
                    Signed in as {user.phone || user.email}
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background text-foreground px-5 py-3 text-sm font-medium"
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    onClick={() => setOpen(false)}
                    className="inline-flex justify-center items-center rounded-full border border-border bg-background text-foreground px-5 py-3 text-sm font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/pricing"
                    onClick={() => setOpen(false)}
                    className="inline-flex justify-center items-center rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
