import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { PhoneIcon } from "./icons";

// Call CTA. Red for the primary call buttons (hero, header, Find Us, mobile bar);
// repeat CTA bands use seafoam.
export default function CallButton({
  label,
  showNumber = false,
  location,
  variant = "seafoam",
  className,
}: {
  label: string;
  showNumber?: boolean;
  /** Analytics: where on the page this call button lives */
  location: string;
  variant?: "red" | "seafoam";
  className?: string;
}) {
  return (
    <a
      href={siteConfig.phone.href}
      data-track="call"
      data-track-location={location}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-[0.975rem] font-semibold text-white transition-[background-color,transform] duration-200 ease-[var(--ease-hover)] active:scale-[0.98]",
        variant === "red" ? "bg-ketchup hover:bg-ketchup-dark" : "bg-seafoam hover:bg-seafoam-dark",
        className
      )}
    >
      <PhoneIcon className="size-[1.05rem]" />
      <span>{label}</span>
      {showNumber && <span className="tabular font-medium">· {siteConfig.phone.display}</span>}
    </a>
  );
}
