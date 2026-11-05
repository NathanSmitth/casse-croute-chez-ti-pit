// Signature dishes — copy (name, blurb, alt) lives in messages/*.json under
// home.dishes.items.<id>. Images are PLACEHOLDERS: replace the file, keep the name.
export const signatureDishes: { id: string; image: string }[] = [
  { id: "burgerQuart", image: "/images/dishes/hamburger-quart-livre.jpg" },
  { id: "poutineReguliere", image: "/images/dishes/poutine-reguliere.jpg" },
  { id: "poutinePoivre", image: "/images/dishes/poutine-au-poivre.jpg" },
  { id: "hotDogGarni", image: "/images/dishes/hot-dog-garni.jpg" },
  { id: "pogo", image: "/images/dishes/pogo.jpg" },
  { id: "fritesMaison", image: "/images/dishes/frites-maison.jpg" },
];

export interface Review {
  quote: string;
  /** Original language of the review — shown untranslated on both locales */
  lang: "fr" | "en";
  /** null when Google shows no name — never invent one */
  author: string | null;
  localGuide?: boolean;
  /** Star rating from Google (1–5). Leave unset unless confirmed — stars only render when present. */
  rating?: number;
}

// Real Google reviews, kept in their original language on both locales.
export const reviews: Review[] = [
  {
    quote: "Hands down the best poutine and the staff is very friendly.",
    lang: "en",
    author: null,
  },
  {
    quote: "Tout est bon. La poutine est excellente !!! Belle terrasse pour manger au beau soleil.",
    lang: "fr",
    author: "Junior",
  },
  {
    quote:
      "The food is delicious and the place very organized and clean. The staff is friendly and welcoming.",
    lang: "en",
    author: "Dee K.",
    localGuide: true,
  },
  {
    quote: "Burger quart de lbs & poutine sauce aux poivres, c'était un délice!",
    lang: "fr",
    author: "Gibritte",
  },
  {
    quote: "This place really hit the spot. Lots of cheese. Delicious.",
    lang: "en",
    author: "Kyra M.",
    localGuide: true,
  },
];
