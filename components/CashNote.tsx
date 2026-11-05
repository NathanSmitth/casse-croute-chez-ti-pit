import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { BanknoteIcon } from "./icons";

// "Argent comptant seulement — guichet automatique sur place" as a neutral
// info row (icon + text), not a warning. Renders nothing once
// siteConfig.payment.cashOnly is switched off.
export default async function CashNote({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!siteConfig.payment.cashOnly) return null;
  const t = await getTranslations("payment");
  const dark = tone === "dark";

  return (
    <p className={cn("flex items-start gap-2.5 text-[0.95rem] leading-snug", dark ? "text-white" : "text-charcoal/80", className)}>
      <BanknoteIcon className={cn("mt-px size-[1.15rem] shrink-0", dark ? "text-mint" : "text-seafoam-dark")} />
      <span>
        <span className={cn("font-semibold", dark ? "text-white" : "text-charcoal")}>{t("cashOnly")}</span>
        {" — "}
        {t("atm")}
      </span>
    </p>
  );
}
