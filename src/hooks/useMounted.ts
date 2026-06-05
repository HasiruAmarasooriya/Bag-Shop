"use client";

import { useEffect, useState } from "react";

/** True only after client hydration — avoids SSR/extension attribute mismatches. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
