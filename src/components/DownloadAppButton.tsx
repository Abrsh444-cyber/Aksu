import { Download, Smartphone } from "lucide-react";
import { APK_URL, APK_VERSION, APK_SIZE_MB } from "@/data/app-download";

interface DownloadAppButtonProps {
  variant?: "primary" | "outline";
  className?: string;
  showMeta?: boolean;
}

/**
 * "Download Android App" CTA. Renders a real download link when the
 * APK URL has been configured in src/data/app-download.ts, otherwise
 * shows a friendly "Coming soon" pill so the page never looks broken.
 */
export function DownloadAppButton({
  variant = "outline",
  className = "",
  showMeta = false,
}: DownloadAppButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all";
  const styles =
    variant === "primary"
      ? "bg-gradient-emerald text-primary-foreground shadow-elegant hover:opacity-95"
      : "border border-border bg-card text-foreground hover:bg-secondary";

  if (!APK_URL) {
    return (
      <span
        className={`${base} ${styles} cursor-default opacity-80 ${className}`}
        title="The Android app is being prepared — check back soon."
      >
        <Smartphone size={16} />
        Android app — coming soon
      </span>
    );
  }

  return (
    <a
      href={APK_URL}
      download="aksum-academy.apk"
      className={`${base} ${styles} ${className}`}
    >
      <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
      Download Android app
      {showMeta && (
        <span className="ml-1 text-xs opacity-75">
          v{APK_VERSION} · {APK_SIZE_MB} MB
        </span>
      )}
    </a>
  );
}
