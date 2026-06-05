import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  linkToHome?: boolean;
  className?: string;
}

const sizes = {
  sm: { img: 36, text: "text-base" },
  md: { img: 48, text: "text-xl" },
  lg: { img: 64, text: "text-2xl" },
};

export default function BrandLogo({
  size = "md",
  showTagline = false,
  linkToHome = true,
  className,
}: BrandLogoProps) {
  const s = sizes[size];

  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full ring-1 ring-gold/30 shadow-md shadow-gold/10",
          size === "sm" && "w-9 h-9",
          size === "md" && "w-12 h-12",
          size === "lg" && "w-16 h-16"
        )}
      >
        <Image
          src={BRAND.logo}
          alt={BRAND.logoAlt}
          width={s.img}
          height={s.img}
          className="w-full h-full object-cover scale-110"
          priority={size === "lg"}
        />
      </div>

      <div className="flex flex-col min-w-0">
        <span
          className={cn(
            "font-serif font-semibold tracking-wide leading-none",
            s.text
          )}
        >
          <span className="gold-text">{BRAND.shortName}</span>
          <span className="text-foreground"> Fashion</span>
        </span>
        {showTagline && (
          <span className="text-[9px] tracking-[0.25em] uppercase text-gold mt-1 font-medium hidden md:block">
            {BRAND.tagline}
          </span>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-flex hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
