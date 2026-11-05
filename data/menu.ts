// ─────────────────────────────────────────────────────────────────────────────
// Menu — single data file, FR/EN names + prices (CAD).
//
// ⚠️  PLACEHOLDER PRICES: every price below is a stand-in (marked // PLACEHOLDER).
// Apart from the signature items (¼ lb burger, poutines, hot dog garni, pogo,
// homemade fries), the item list is also a typical casse-croûte stand-in.
// Replace with Ti-Pit's real menu, then set `placeholder: false` (or delete the
// flag) on each confirmed item. While any item is a placeholder, the menu page
// shows a "temporary prices" note.
// ─────────────────────────────────────────────────────────────────────────────

export interface Localized {
  fr: string;
  en: string;
}

export interface SizePrice {
  label: Localized;
  price: number;
}

export interface MenuItem {
  id: string;
  name: Localized;
  description?: Localized;
  /** Single price in CAD */
  price?: number;
  /** Or several sizes */
  sizes?: SizePrice[];
  placeholder?: boolean;
}

export interface MenuCategory {
  id: string;
  name: Localized;
  note?: Localized;
  items: MenuItem[];
}

const SIZES = {
  small: { fr: "Petite", en: "Small" },
  medium: { fr: "Moyenne", en: "Medium" },
  large: { fr: "Grande", en: "Large" },
} satisfies Record<string, Localized>;

const threeSizes = (s: number, m: number, l: number): SizePrice[] => [
  { label: SIZES.small, price: s },
  { label: SIZES.medium, price: m },
  { label: SIZES.large, price: l },
];

export const menuData: MenuCategory[] = [
  // ── COMBOS ────────────────────────────────────────────────────────────────
  {
    id: "combos",
    name: { fr: "Combos", en: "Combos" },
    items: [
      {
        id: "combo-burger-poutine",
        name: { fr: "Combo hamburger garni + poutine régulière", en: "All-dressed burger + classic poutine combo" },
        description: { fr: "Notre hamburger garni et une poutine régulière.", en: "Our all-dressed burger with a classic poutine." },
        price: 15.95, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "combo-quart-frites",
        name: { fr: "Combo ¼ de livre + frites", en: "Quarter-pounder + fries combo" },
        description: { fr: "Hamburger ¼ de livre garni et frites maison.", en: "All-dressed quarter-pound burger and homemade fries." },
        price: 16.95, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "combo-hot-dogs",
        name: { fr: "Combo 2 hot dogs + frites", en: "2 hot dogs + fries combo" },
        description: { fr: "Deux hot dogs garnis et frites maison.", en: "Two all-dressed hot dogs and homemade fries." },
        price: 12.95, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "combo-pogo",
        name: { fr: "Combo pogo + frites", en: "Pogo + fries combo" },
        price: 10.95, // PLACEHOLDER
        placeholder: true,
      },
    ],
  },

  // ── BURGERS ───────────────────────────────────────────────────────────────
  {
    id: "burgers",
    name: { fr: "Burgers", en: "Burgers" },
    items: [
      {
        id: "hamburger-quart",
        name: { fr: "Hamburger ¼ de livre garni", en: "Quarter-pound burger, all dressed" },
        description: { fr: "Une galette d'un quart de livre sur un pain géant, laitue, tomates, oignons, cornichons.", en: "A quarter-pound patty on a giant bun with lettuce, tomato, onion and pickles." },
        price: 10.95, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "hamburger-garni",
        name: { fr: "Hamburger garni", en: "All-dressed burger" },
        description: { fr: "Laitue, tomates, oignons, moutarde, relish, ketchup.", en: "Lettuce, tomato, onion, mustard, relish, ketchup." },
        price: 6.95, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "cheeseburger",
        name: { fr: "Cheeseburger", en: "Cheeseburger" },
        price: 7.50, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "burger-bacon",
        name: { fr: "Hamburger bacon fromage", en: "Bacon cheeseburger" },
        price: 8.95, // PLACEHOLDER
        placeholder: true,
      },
    ],
  },

  // ── POUTINES ──────────────────────────────────────────────────────────────
  {
    id: "poutines",
    name: { fr: "Poutines", en: "Poutines" },
    note: { fr: "Frites maison, fromage en grains frais.", en: "Homemade fries, fresh cheese curds." },
    items: [
      {
        id: "poutine-reguliere",
        name: { fr: "Poutine régulière", en: "Classic poutine" },
        description: { fr: "Sauce brune.", en: "Brown gravy." },
        sizes: threeSizes(9.50, 11.95, 14.50), // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "poutine-poivre",
        name: { fr: "Poutine au poivre", en: "Pepper poutine" },
        description: { fr: "Sauce au poivre.", en: "Peppercorn sauce." },
        sizes: threeSizes(10.50, 12.95, 15.50), // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "poutine-italienne",
        name: { fr: "Poutine italienne", en: "Italian poutine" },
        description: { fr: "Sauce à spaghetti.", en: "Spaghetti sauce." },
        sizes: threeSizes(10.50, 12.95, 15.50), // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "poutine-galvaude",
        name: { fr: "Poutine galvaude", en: "Galvaude poutine" },
        description: { fr: "Poulet et petits pois.", en: "Chicken and green peas." },
        sizes: threeSizes(11.95, 14.50, 16.95), // PLACEHOLDER
        placeholder: true,
      },
    ],
  },

  // ── HOT DOGS & POGOS ──────────────────────────────────────────────────────
  {
    id: "hot-dogs-pogos",
    name: { fr: "Hot dogs & pogos", en: "Hot dogs & pogos" },
    items: [
      {
        id: "hot-dog-garni",
        name: { fr: "Hot dog garni", en: "All-dressed hot dog" },
        description: { fr: "Avec laitue et tomates.", en: "With lettuce and tomato." },
        price: 3.75, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "hot-dog-moutarde",
        name: { fr: "Hot dog moutarde-chou", en: "Mustard & coleslaw hot dog" },
        price: 3.50, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "pogo",
        name: { fr: "Pogo", en: "Pogo (corn dog)" },
        price: 3.95, // PLACEHOLDER
        placeholder: true,
      },
    ],
  },

  // ── FRITES ────────────────────────────────────────────────────────────────
  {
    id: "frites",
    name: { fr: "Frites", en: "Fries" },
    note: { fr: "Coupées sur place.", en: "Cut on site." },
    items: [
      {
        id: "frites-maison",
        name: { fr: "Frites maison", en: "Homemade fries" },
        sizes: threeSizes(4.50, 5.95, 7.50), // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "frites-sauce",
        name: { fr: "Frites sauce", en: "Fries with gravy" },
        sizes: threeSizes(5.95, 7.50, 8.95), // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "rondelles",
        name: { fr: "Rondelles d'oignon", en: "Onion rings" },
        price: 6.95, // PLACEHOLDER
        placeholder: true,
      },
    ],
  },

  // ── SANDWICHS ─────────────────────────────────────────────────────────────
  {
    id: "sandwichs",
    name: { fr: "Sandwichs", en: "Sandwiches" },
    items: [
      {
        id: "club",
        name: { fr: "Club sandwich", en: "Club sandwich" },
        description: { fr: "Poulet, bacon, laitue, tomates. Servi avec frites.", en: "Chicken, bacon, lettuce, tomato. Served with fries." },
        price: 15.95, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "grilled-cheese",
        name: { fr: "Grilled cheese", en: "Grilled cheese" },
        price: 5.95, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "blt",
        name: { fr: "BLT", en: "BLT" },
        description: { fr: "Bacon, laitue, tomates.", en: "Bacon, lettuce, tomato." },
        price: 7.95, // PLACEHOLDER
        placeholder: true,
      },
    ],
  },

  // ── EXTRAS ────────────────────────────────────────────────────────────────
  {
    id: "extras",
    name: { fr: "Extras", en: "Extras" },
    items: [
      {
        id: "extra-fromage",
        name: { fr: "Fromage en grains (extra)", en: "Extra cheese curds" },
        price: 2.50, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "extra-sauce-brune",
        name: { fr: "Sauce brune (à côté)", en: "Brown gravy (on the side)" },
        price: 2.00, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "extra-sauce-poivre",
        name: { fr: "Sauce au poivre (à côté)", en: "Peppercorn sauce (on the side)" },
        price: 2.50, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "extra-bacon",
        name: { fr: "Bacon", en: "Bacon" },
        price: 2.00, // PLACEHOLDER
        placeholder: true,
      },
    ],
  },

  // ── DESSERTS ──────────────────────────────────────────────────────────────
  {
    id: "desserts",
    name: { fr: "Desserts", en: "Desserts" },
    items: [
      {
        id: "sundae",
        name: { fr: "Sundae", en: "Sundae" },
        description: { fr: "Chocolat, caramel ou fraise.", en: "Chocolate, caramel or strawberry." },
        price: 4.95, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "tarte-sucre",
        name: { fr: "Pointe de tarte au sucre", en: "Slice of sugar pie" },
        price: 4.50, // PLACEHOLDER
        placeholder: true,
      },
    ],
  },

  // ── BOISSONS ──────────────────────────────────────────────────────────────
  {
    id: "boissons",
    name: { fr: "Boissons", en: "Drinks" },
    items: [
      {
        id: "liqueur",
        name: { fr: "Liqueur (boisson gazeuse)", en: "Soft drink" },
        price: 2.25, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "eau",
        name: { fr: "Eau", en: "Water" },
        price: 1.75, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "jus",
        name: { fr: "Jus", en: "Juice" },
        price: 2.50, // PLACEHOLDER
        placeholder: true,
      },
      {
        id: "lait",
        name: { fr: "Lait", en: "Milk" },
        price: 2.25, // PLACEHOLDER
        placeholder: true,
      },
    ],
  },
];

export const menuHasPlaceholders = menuData.some((c) => c.items.some((i) => i.placeholder));

export function formatPrice(value: number, locale: "fr" | "en"): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(value);
}
