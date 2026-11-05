import CallButton from "./CallButton";
import { cn } from "@/lib/utils";

// Repeat CTA band — dropped in every couple of sections and before the footer.
export default function CallCta({
  heading,
  body,
  button,
  location,
  className,
}: {
  heading: string;
  body: string;
  button: string;
  location: string;
  className?: string;
}) {
  return (
    <div data-reveal className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      <div className="flex flex-col items-start gap-6 rounded-2xl bg-mint/20 px-6 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10">
        <div>
          <h2 className="text-2xl font-bold text-charcoal sm:text-3xl">{heading}</h2>
          <p className="mt-2 max-w-[48ch] text-charcoal/75">{body}</p>
        </div>
        <CallButton label={button} showNumber location={location} className="w-full shrink-0 sm:w-auto" />
      </div>
    </div>
  );
}
