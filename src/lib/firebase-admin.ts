import admin from "firebase-admin";

function loadServiceAccount(): admin.ServiceAccount {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }

  const keyPath =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "serviceAccountKey.json";

  // Dynamic require keeps this server-only (not bundled into Edge middleware)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require("fs") as typeof import("fs");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require("path") as typeof import("path");

  const resolvedPath = path.isAbsolute(keyPath)
    ? keyPath
    : path.join(/* turbopackIgnore: true */ process.cwd(), keyPath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(
      `Firebase service account not found at "${resolvedPath}". Download from Firebase Console → Project Settings → Service Accounts, or set FIREBASE_SERVICE_ACCOUNT / FIREBASE_SERVICE_ACCOUNT_PATH.`
    );
  }

  return JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
}

export function getAdminDb() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(loadServiceAccount()),
    });
  }
  return admin.firestore();
}

export { admin };
