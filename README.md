# Casse-Croûte chez Ti-Pit

Bilingual site (French by default, English at /en) for Casse-Croûte chez Ti-Pit, 163, 3e Avenue, Val-d'Or, QC.
Built with Next.js 16 (App Router), Tailwind v4, next-intl and Vercel Analytics.

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /fr
npm run build
```

## Where things live

| What | File |
| --- | --- |
| Hours, phone, address, socials, payment (cash-only flag), logo, domain | `data/site.ts` |
| Menu (FR/EN names + prices) | `data/menu.ts` |
| All page copy (FR / EN) | `messages/fr.json`, `messages/en.json` |
| Reviews + signature dish list | `data/content.ts` |
| Colours, fonts, motion | `app/globals.css` (`@theme`) |
| Per-review star ratings (optional, shown only when set) | `data/content.ts` |

## Before launch — TODO

- [ ] **Hours** are a placeholder (Mon closed, Tue–Sat 11:00–19:00, Sun closed). Confirm them with the owner in `data/site.ts`, then set `hoursConfirmed: true`.
      That publishes the hours in the JSON-LD and replaces the "à confirmer" note with a live "Ouvert en ce moment".
- [ ] **Logo**: add the file to `/public/images/` and set `logo: { src, width, height }` in `data/site.ts`.
      You can also swap `app/icon.tsx` / `app/apple-icon.tsx` for the real mark.
- [ ] **Photos**: replace the placeholders but keep the same filenames:
      `public/images/exterior.jpg` (3:2, hero) and `public/images/dishes/*.jpg` (4:5).
      To regenerate the placeholders: `npm run placeholders`.
- [ ] **Menu**: every price in `data/menu.ts` is a placeholder. Most items besides the signature ones are typical casse-croûte stand-ins too.
      Replace them and remove `placeholder: true`. The "prix temporaires" note disappears once no placeholders remain.
- [ ] **Payment**: cash only for now. If they add debit, set `payment.cashOnly: false` and update `payment.accepted`.
      That removes the note from the call card, hours board, menu header and footer, and updates the schema.
- [ ] **Domain**: confirm `url` in `data/site.ts`. It's used for the canonical URL, hreflang, sitemap and OG image.

## Lead tracking

Every `tel:` link fires `call_click`. Maps links fire `directions_click` and Facebook links fire `facebook_click`.
Each event carries a `location` (hero, header, sticky-bar, find-us, footer…).
You can see them in Vercel → Analytics → Events once the site is deployed.
