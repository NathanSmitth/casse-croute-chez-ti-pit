import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { PhoneIcon } from "./icons";

// Fixed bottom call bar on mobile — usually the single highest-converting
// element, so it carries the red main-CTA colour.
export default async function MobileCallBar() {
  const t = await getTranslations("callBar");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/85 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden">
      <a
        href={siteConfig.phone.href}
        data-track="call"
        data-track-location="sticky-bar"
        className="flex min-h-13 items-center justify-center gap-2.5 rounded-xl bg-ketchup px-4 text-[1.05rem] font-semibold text-white active:scale-[0.98]"
      >
        <PhoneIcon />
        <span>{t("label")}</span>
        <span className="tabular font-medium">{siteConfig.phone.display}</span>
      </a>
    </div>
  );
}
