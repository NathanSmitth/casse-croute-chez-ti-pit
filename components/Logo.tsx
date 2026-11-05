import Image from "next/image";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

// Logo slot — set `siteConfig.logo` once the file is in /public/images.
// Until then a clean two-line wordmark stands in.
export default function Logo({
  priority = false,
  tone = "light",
  className,
}: {
  priority?: boolean;
  /** light = on white/off-white · dark = on charcoal (footer) */
  tone?: "light" | "dark";
  className?: string;
}) {
  if (siteConfig.logo) {
    return (
      <Image
        src={siteConfig.logo.src}
        alt={siteConfig.name}
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
        priority={priority}
        className={cn("h-11 w-auto object-contain", className)}
      />
    );
  }

  const dark = tone === "dark";
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "text-[0.625rem] font-semibold uppercase tracking-[0.2em]",
          dark ? "text-white/70" : "text-charcoal/70"
        )}
      >
        Casse-Croûte
      </span>{" "}
      <span
        className={cn(
          "mt-1 font-heading text-[1.3rem] font-bold tracking-[-0.03em]",
          dark ? "text-white" : "text-charcoal"
        )}
      >
        chez Ti-Pit
      </span>
    </span>
  );
}
