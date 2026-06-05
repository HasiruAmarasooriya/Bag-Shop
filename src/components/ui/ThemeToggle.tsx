"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-[60px] h-8 rounded-full bg-surface-muted border border-border",
          className
        )}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-[60px] h-8 rounded-full border transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-background overflow-hidden",
        isDark
          ? "bg-surface-muted border-border"
          : "bg-surface border-border shadow-sm",
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Sun
        className={cn(
          "absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-all duration-500",
          isDark ? "text-muted/40 scale-75" : "text-gold scale-100"
        )}
      />
      <Moon
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-all duration-500",
          isDark ? "text-gold scale-100" : "text-muted/40 scale-75"
        )}
      />
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 shadow-md",
          isDark
            ? "translate-x-[28px] bg-gradient-to-br from-gold to-gold-dark text-charcoal"
            : "translate-x-0 bg-gradient-to-br from-foreground to-charcoal text-inverse-foreground"
        )}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5" />
        ) : (
          <Sun className="w-3.5 h-3.5" />
        )}
      </span>
    </button>
  );
}
