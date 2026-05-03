import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor configuration for the Aksum Academy Android app.
 *
 * Strategy: the app shell is a thin native wrapper that loads the live
 * published website. This means students always get the latest content,
 * courses, and library updates without ever needing to reinstall the APK.
 *
 * If you ever want a fully offline app, remove `server.url` and run
 * `bun run build` + `npx cap sync` so the static build is bundled inside.
 */
const config: CapacitorConfig = {
  appId: "et.aksum.academy",
  appName: "Aksum Academy",
  webDir: "dist",
  server: {
    url: "https://aksumawi.lovable.app",
    cleartext: false,
    androidScheme: "https",
  },
  android: {
    backgroundColor: "#0b3a2e",
    allowMixedContent: false,
  },
};

export default config;
