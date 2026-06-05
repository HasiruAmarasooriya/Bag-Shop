import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "luxury";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        suppressHydrationWarning
        className={cn(
          "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-foreground text-background hover:opacity-90": variant === "primary",
            "bg-surface-muted text-foreground hover:bg-border": variant === "secondary",
            "border border-gold/60 text-foreground hover:bg-gold/10 hover:border-gold":
              variant === "outline",
            "text-muted hover:text-foreground hover:bg-surface-muted": variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700": variant === "danger",
            "btn-gold uppercase tracking-widest": variant === "luxury",
            "px-4 py-2 text-sm rounded-sm": size === "sm",
            "px-6 py-2.5 text-sm rounded-sm": size === "md",
            "px-10 py-3.5 text-sm rounded-sm": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;
