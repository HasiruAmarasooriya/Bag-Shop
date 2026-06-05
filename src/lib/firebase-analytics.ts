"use client";

import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { app } from "./firebase";

let analytics: Analytics | null = null;

export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (analytics) return analytics;

  const supported = await isSupported();
  if (!supported) return null;

  analytics = getAnalytics(app);
  return analytics;
}
