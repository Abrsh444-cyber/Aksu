import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Eye,
  FileText,
  FolderOpen,
  Library as LibraryIcon,
  
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Memhru Library — Aksum Academy" },
      {
        name: "description",
        content:
          "Pro members get unlimited access to the Memhru study library — lecture slides, exam papers, and reference PDFs across Database, Statistics, Econometrics, Civics, English and Medical subjects.",
      },
      { property: "og:title", content: "Memhru Library — Aksum Academy" },
      {
        property: "og:description",
        content:
          "Lecture slides, exam papers, and reference PDFs for Ethiopian university students. Unlocked with Pro lifetime access (300 ETB).",
      },
    ],
  }),
  component: LibraryPage,
});

type StorageFile = {
  name: string;
  id: string | null;
  size: number;
  mime: string;
  updatedAt: string | null;
};

const FOLDERS = [
  { id: "database", label: "Database (ADS)", color: "var(--emerald)" },
  { id: "statistics", label: "Statistics (WKU)", color: "var(--coffee)" },
  { id: "econometrics", label: "Econometrics", color: "#7c4a3a" },
  { id: "civics", label: "Civics & Moral", color: "#9a6b3f" },
  { id: "medical", label: "Medical / Hematology", color: "#a14a4a" },
  { id: "english", label: "English", color: "#4a6b9a" },
  { id: "history", label: "History", color: "#8a5a3a" },
  { id: "geography", label: "Geography", color: "#3a8a6a" },
  { id: "economics", label: "Economics & Business", color: "#6a3a8a" },
  { id: "sociology", label: "Sociology", color: "#8a3a6a" },
  { id: "global", label: "Global Trends", color: "#3a6a8a" },
  { id: "computer", label: "Computer Science", color: "#3a3a8a" },
  { id: "misc", label: "Other", color: "#6b6b6b" },
] as const;

// Buckets to scan for library files
const BUCKETS = ["memhrus", "english", "universitycourses"] as const;

// Classify a filename into one of the folder ids based on keywords
function classifyFile(name: string, existingFolder?: string): string {
  if (existingFolder && FOLDERS.some((f) => f.id === existingFolder)) {
    return existingFolder;
  }
  const n = name.toLowerCase();
  if (/\b(history|hist)\b/.test(n)) return "history";
  if (/\b(geo|geography)\b/.test(n)) return "geography";
  if (/\bcivic|\bmoral/.test(n)) return "civics";
  if (/\bsociolog/.test(n)) return "sociology";
  if (/\bglobal\s*trend|global\s*exam|gtspp|gts\b/.test(n)) return "global";
  if (/\b(computer|programming|coding)\b/.test(n)) return "computer";
  if (/\b(econometr)/.test(n)) return "econometrics";
  if (/\b(econ|cost|finance|accounting|or for agec|transport)\b/.test(n)) return "economics";
  if (/\b(stat|statistic)\b/.test(n)) return "statistics";
  if (/\b(database|ads|sql)\b/.test(n)) return "database";
  if (/\b(medical|hematolog|anemia|wbc|leuco|leco)\b/.test(n)) return "medical";
  if (/\b(english|voice|grammar|entrance)\b/.test(n)) return "english";
  return "misc";
}

const folderLabel = (id: string) =>
  FOLDERS.find((f) => f.id === id)?.label ?? id;
const folderColor = (id: string) =>
  FOLDERS.find((f) => f.id === id)?.color ?? "var(--coffee)";

function fileIcon(mime: string) {
  if (mime.includes("pdf")) return "PDF";
  if (mime.includes("presentation") || mime.includes("powerpoint")) return "PPT";
  if (mime.includes("word") || mime.includes("document")) return "DOC";
  if (mime.includes("rtf")) return "RTF";
  return "FILE";
}

function formatSize(bytes: number) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function prettyName(name: string) {
  // strip bucket prefix ("bucket::") and folder, then extension
  const afterBucket = name.includes("::") ? name.split("::")[1] : name;
  const base = afterBucket.split("/").pop() ?? afterBucket;
  const dot = base.lastIndexOf(".");
  return dot > 0 ? base.slice(0, dot) : base;
}

function LibraryPage() {
  const { user, loading: authLoading } = useAuth();
  const { subscription, loading: subLoading } = useSubscription();
  const isPro = !!subscription?.isPro;

  const [filesByFolder, setFilesByFolder] = useState<Record<string, StorageFile[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeFolder, setActiveFolder] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [downloadingPath, setDownloadingPath] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const grouped: Record<string, StorageFile[]> = {};
      for (const folder of FOLDERS) grouped[folder.id] = [];

      type RawFile = { name: string; id: string | null; metadata: Record<string, unknown> | null; updated_at: string | null };

      const collect = async (bucket: string, prefix: string): Promise<void> => {
        const { data, error } = await supabase.storage
          .from(bucket)
          .list(prefix, { limit: 500, sortBy: { column: "name", order: "asc" } });
        if (error || !data) return;
        for (const item of data as RawFile[]) {
          if (!item.name || item.name === ".lovkeep") continue;
          const fullPath = prefix ? `${prefix}/${item.name}` : item.name;
          // Folders have id === null and no metadata
          if (item.id === null && !item.metadata) {
            await collect(bucket, fullPath);
            continue;
          }
          const folderHint = prefix.split("/")[0] || undefined;
          const folder = classifyFile(item.name, folderHint);
          grouped[folder] = grouped[folder] ?? [];
          grouped[folder].push({
            name: `${bucket}::${fullPath}`,
            id: item.id,
            size: Number(item.metadata?.size ?? 0),
            mime: (item.metadata?.mimetype as string) ?? "application/octet-stream",
            updatedAt: item.updated_at ?? null,
          });
        }
      };

      for (const bucket of BUCKETS) {
        await collect(bucket, "");
        if (cancelled) return;
      }

      if (!cancelled) {
        setFilesByFolder(grouped);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const allFiles = useMemo(
    () => Object.values(filesByFolder).flat(),
    [filesByFolder],
  );

  const totalCount = allFiles.length;

  const visible = useMemo(() => {
    let list = allFiles;
    if (activeFolder !== "all") {
      list = (filesByFolder[activeFolder] ?? []).slice();
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((f) => f.name.toLowerCase().includes(q));
    }
    return list;
  }, [allFiles, filesByFolder, activeFolder, query]);

  const [previewFile, setPreviewFile] = useState<{ path: string; url: string; mime: string } | null>(null);
  const [previewLoading, setPreviewLoading] = useState<string | null>(null);

  // path is "bucket::path/in/bucket"
  const splitPath = (p: string): { bucket: string; path: string } => {
    const idx = p.indexOf("::");
    if (idx === -1) return { bucket: "memhrus", path: p };
    return { bucket: p.slice(0, idx), path: p.slice(idx + 2) };
  };

  const handleDownload = async (key: string) => {
    setDownloadingPath(key);
    const { bucket, path } = splitPath(key);
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, 60 * 5);
    setDownloadingPath(null);
    if (error || !data?.signedUrl) {
      toast.error(error?.message ?? "Could not generate download link.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const handlePreview = async (key: string, mime: string) => {
    setPreviewLoading(key);
    const { bucket, path } = splitPath(key);
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, 60 * 30);
    setPreviewLoading(null);
    if (error || !data?.signedUrl) {
      toast.error(error?.message ?? "Could not open file.");
      return;
    }
    const isViewable = mime.includes("pdf") || mime.startsWith("image/");
    if (!isViewable) {
      const officeUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(data.signedUrl)}`;
      window.open(officeUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setPreviewFile({ path: key, url: data.signedUrl, mime });
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
              "radial-gradient(circle at 20% 30%, var(--emerald) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--coffee) 1px, transparent 1px)",
            backgroundSize: "32px 32px, 48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-10">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--emerald)" }}
          >
            <LibraryIcon size={13} /> Memhru Library
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 font-display text-5xl lg:text-7xl font-medium leading-[1.02] text-balance text-foreground max-w-4xl"
          >
            Lecture slides, exam papers, <span className="italic" style={{ color: "var(--emerald)" }}>all in one place</span>.
          </motion.h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl text-balance">
            Curated study material from Ethiopian universities — Database systems, Statistics, Econometrics, Civics, Medical and more. Unlocked once with the 300 ETB Pro plan.
          </p>

          {!authLoading && !subLoading && !isPro && (
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--gradient-emerald, var(--emerald))" }}
              >
                <Sparkles size={18} className="text-primary-foreground" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">
                  {user ? "Unlock the full library" : "Sign in & unlock"}
                </div>
                <div className="text-muted-foreground">
                  300 ETB one-time · lifetime access
                </div>
              </div>
              <Link
                to="/pricing"
                className="ml-2 inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-coffee transition-colors"
              >
                Get Pro
              </Link>
            </div>
          )}

          {!authLoading && !subLoading && isPro && (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--emerald)" }}
              />
              <span className="text-foreground font-medium">Pro active</span>
              <span className="text-muted-foreground">— full library unlocked.</span>
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-border bg-secondary/40 sticky top-20 z-30 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-4 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5">
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveFolder("all")}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                activeFolder === "all"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-foreground border-border hover:bg-secondary"
              }`}
            >
              All ({totalCount})
            </button>
            {FOLDERS.map((f) => {
              const count = filesByFolder[f.id]?.length ?? 0;
              if (!count) return null;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFolder(f.id)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    activeFolder === f.id
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-foreground border-border hover:bg-secondary"
                  }`}
                >
                  {f.label} ({count})
                </button>
              );
            })}
          </div>
          <div className="lg:ml-auto relative w-full lg:w-72">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search files…"
              className="w-full rounded-full border border-border bg-card pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </section>

      {/* Files */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-2xl bg-secondary/60 animate-pulse"
                />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground">
              {query ? "No files match your search." : "This folder is empty."}
            </div>
          ) : activeFolder === "all" ? (
            // grouped view
            <div className="space-y-12">
              {FOLDERS.map((folder) => {
                const list = (filesByFolder[folder.id] ?? []).filter((f) =>
                  query
                    ? f.name.toLowerCase().includes(query.toLowerCase())
                    : true,
                );
                if (!list.length) return null;
                return (
                  <div key={folder.id}>
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="h-9 w-9 rounded-xl flex items-center justify-center"
                        style={{ background: folder.color }}
                      >
                        <FolderOpen size={16} className="text-primary-foreground" />
                      </div>
                      <h2 className="font-display text-2xl font-semibold text-foreground">
                        {folder.label}
                      </h2>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {list.length} {list.length === 1 ? "file" : "files"}
                      </span>
                    </div>
                    <FileGrid
                      files={list}
                      onDownload={handleDownload}
                      onPreview={handlePreview}
                      downloadingPath={downloadingPath}
                      previewLoading={previewLoading}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <FileGrid
              files={visible}
              onDownload={handleDownload}
              onPreview={handlePreview}
              downloadingPath={downloadingPath}
              previewLoading={previewLoading}
            />
          )}
        </div>
      </section>

      <SiteFooter />

      {previewFile && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-sm"
          onClick={() => setPreviewFile(null)}
        >
          <div className="flex items-center justify-between gap-3 px-4 lg:px-6 py-3 text-white">
            <div className="min-w-0 truncate text-sm font-medium">
              {prettyName(previewFile.path)}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={previewFile.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium"
              >
                <Download size={13} /> Download
              </a>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewFile(null);
                }}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Close preview"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div
            className="flex-1 min-h-0 px-2 lg:px-6 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {previewFile.mime.startsWith("image/") ? (
              <div className="h-full w-full flex items-center justify-center">
                <img
                  src={previewFile.url}
                  alt={prettyName(previewFile.path)}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>
            ) : (
              <iframe
                src={previewFile.url}
                title={prettyName(previewFile.path)}
                className="h-full w-full rounded-lg bg-white"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FileGrid({
  files,
  onDownload,
  onPreview,
  downloadingPath,
  previewLoading,
}: {
  files: StorageFile[];
  onDownload: (path: string) => void;
  onPreview: (path: string, mime: string) => void;
  downloadingPath: string | null;
  previewLoading: string | null;
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {files.map((file) => {
        const folder = classifyFile(prettyName(file.name));
        const tag = fileIcon(file.mime);
        const canPreviewInline =
          file.mime.includes("pdf") || file.mime.startsWith("image/");
        return (
          <article
            key={file.name}
            className="group rounded-2xl border border-border bg-card p-5 flex flex-col gap-3 hover:shadow-elegant transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center text-[10px] font-bold tracking-wider text-primary-foreground shrink-0"
                style={{ background: folderColor(folder) }}
              >
                {tag}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm text-foreground leading-snug line-clamp-2">
                  {prettyName(file.name)}
                </h3>
                <div className="mt-1 text-[11px] text-muted-foreground tabular-nums">
                  {folderLabel(folder)} · {formatSize(file.size)}
                </div>
              </div>
            </div>
            <div className="mt-1 flex gap-2">
              <button
                type="button"
                onClick={() => onPreview(file.name, file.mime)}
                disabled={previewLoading === file.name}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background hover:bg-coffee px-4 py-2.5 text-xs font-medium transition-colors disabled:opacity-60"
              >
                {previewLoading === file.name ? (
                  "Opening…"
                ) : (
                  <>
                    <Eye size={13} /> {canPreviewInline ? "View" : "Open"}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => onDownload(file.name)}
                disabled={downloadingPath === file.name}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background hover:bg-secondary text-foreground px-4 py-2.5 text-xs font-medium transition-colors disabled:opacity-60"
                aria-label="Download"
              >
                {downloadingPath === file.name ? (
                  "…"
                ) : (
                  <Download size={13} />
                )}
              </button>
            </div>
          </article>
        );
      })}
      {!files.length && (
        <div className="col-span-full rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          <FileText size={20} className="inline mr-2" /> Nothing here yet.
        </div>
      )}
    </div>
  );
}
