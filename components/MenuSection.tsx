import { menuData, menuHasPlaceholders, formatPrice, type MenuItem } from "@/data/menu";

type Locale = "fr" | "en";

function MenuItemRow({ item, locale }: { item: MenuItem; locale: Locale }) {
  return (
    <li className="border-b border-line py-5">
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="font-sans text-[1.05rem] font-semibold tracking-normal text-charcoal">{item.name[locale]}</h3>
        {item.price !== undefined && (
          <span className="tabular shrink-0 font-semibold text-charcoal">{formatPrice(item.price, locale)}</span>
        )}
      </div>
      {item.description && (
        <p className="mt-1 max-w-[48ch] text-[0.95rem] leading-relaxed text-charcoal/70">{item.description[locale]}</p>
      )}
      {item.sizes && (
        <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem]">
          {item.sizes.map((s) => (
            <div key={s.label.en} className="flex items-baseline gap-1.5">
              <dt className="text-charcoal/70">{s.label[locale]}</dt>
              <dd className="tabular font-semibold text-charcoal">{formatPrice(s.price, locale)}</dd>
            </div>
          ))}
        </dl>
      )}
    </li>
  );
}

export default function MenuSection({
  locale,
  placeholderNote,
  disclaimer,
}: {
  locale: Locale;
  placeholderNote: string;
  disclaimer: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {menuHasPlaceholders && (
        <p role="note" className="mb-12 rounded-xl bg-mint/20 px-4 py-3 text-[0.95rem] text-charcoal/80">
          {placeholderNote}
        </p>
      )}

      {menuData.map((cat) => (
        <section
          key={cat.id}
          id={cat.id}
          aria-labelledby={`${cat.id}-heading`}
          className="scroll-mt-[4.5rem] border-t border-line pb-14 pt-10 first:border-t-0 first:pt-0 last:pb-0"
        >
          <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 id={`${cat.id}-heading`} className="text-3xl font-bold text-charcoal sm:text-4xl">
              {cat.name[locale]}
            </h2>
            {cat.note && <p className="text-[0.95rem] text-charcoal/70">{cat.note[locale]}</p>}
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
            {cat.items.map((item) => (
              <MenuItemRow key={item.id} item={item} locale={locale} />
            ))}
          </ul>
        </section>
      ))}

      <p className="mt-12 text-sm text-charcoal/70">{disclaimer}</p>
    </div>
  );
}
