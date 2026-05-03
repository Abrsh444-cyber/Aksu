import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 font-display text-2xl text-foreground">Page not found</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-coffee transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aksum— Premium Learning for Ethiopian Students" },
      {
        name: "description",
        content:
          "Master Grade 9–12 and university entrance subjects with Ethiopia's leading online academy. Math, Physics, Chemistry, Biology, English & Amharic.",
      },
      { name: "author", content: "Aksum Academy" },
      { property: "og:title", content: "Aksum— Premium Learning for Ethiopian Students" },
      { name: "twitter:title", content: "Aksum— Premium Learning for Ethiopian Students" },
      { name: "description", content: "በወልቂጤ ዩኒቨርሰቲ ተማሪዎች የተዘጋጀ ነፃ የተማሪዎች ፕላትፎርም" },
      { property: "og:description", content: "በወልቂጤ ዩኒቨርሰቲ ተማሪዎች የተዘጋጀ ነፃ የተማሪዎች ፕላትፎርም" },
      { name: "twitter:description", content: "በወልቂጤ ዩኒቨርሰቲ ተማሪዎች የተዘጋጀ ነፃ የተማሪዎች ፕላትፎርም" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/S7kDZcLCp0Ns7bmpSY6fzBlyF0H3/social-images/social-1777104722777-ChatGPT_Image_Apr_25,_2026,_11_11_52_AM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/S7kDZcLCp0Ns7bmpSY6fzBlyF0H3/social-images/social-1777104722777-ChatGPT_Image_Apr_25,_2026,_11_11_52_AM.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Outfit:wght@300;400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
      <Toaster />
    </AuthProvider>
  );
}
