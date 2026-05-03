# Build the Aksum Academy Android APK

Your Lovable website is already wrapped as an Android app using Capacitor.
You just need to run the build once to get the actual `.apk` file that
students can download and install.

## Easiest way: GitHub Actions (no install, free)

1. Connect this Lovable project to GitHub:
   - In the Lovable editor, open **Connectors → GitHub → Connect project**
   - Click **Create Repository**

2. Once the repo is created, open it on github.com and click the
   **Actions** tab.

3. Find the workflow called **"Build Android APK"** in the left sidebar.

4. Click **Run workflow → Run workflow** (green button on the right).

5. Wait ~5 minutes. When the green check appears, click into the run
   and scroll to **Artifacts** at the bottom.

6. Download `aksum-academy-apk` — inside is your `aksum-academy.apk`.

## Distribute the APK to students

After you have the `.apk`, upload it to your Lovable Cloud storage so
students can download it from the website:

1. Go to **Cloud → Storage** in Lovable.
2. Open (or create) a public bucket called `app-downloads`.
3. Upload `aksum-academy.apk`.
4. Copy the public URL.
5. Paste that URL into `src/data/app-download.ts` (the `APK_URL` constant)
   so the "Download Android App" button on the homepage works.

## Updating the app

Because the APK loads `https://aksumawi.lovable.app` directly, **students
never need to reinstall**. Any changes you publish from Lovable show up
inside the installed app immediately.

You only need to rebuild a new APK when you change:
- The app name, icon, or splash screen
- The Capacitor config
- Native Android permissions

## Optional: Signed release APK for the Play Store

The current workflow builds a **debug** APK — perfect for direct download
and side-loading on Android phones. If you later want to publish on the
Google Play Store, you'll need to:

1. Generate a signing key (one-time, with `keytool`)
2. Add the keystore as a GitHub secret
3. Switch the gradle task to `assembleRelease` with signing config

Ask in Lovable when you're ready and we can add that workflow.
