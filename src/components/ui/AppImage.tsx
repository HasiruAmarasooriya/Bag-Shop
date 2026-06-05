import Image from "next/image";
import { getDisplayImageSrc, isLocalImage } from "@/lib/constants";

interface AppImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** When true, legacy external URLs render via native img (admin previews). */
  allowExternal?: boolean;
}

export default function AppImage({
  src,
  alt,
  fill,
  className,
  sizes,
  priority,
  allowExternal = false,
}: AppImageProps) {
  const resolved = allowExternal && src && !isLocalImage(src) ? src : getDisplayImageSrc(src);
  const useNative = allowExternal && src && !isLocalImage(src);

  if (useNative) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt}
        className={className}
        style={
          fill
            ? {
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }
            : undefined
        }
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
