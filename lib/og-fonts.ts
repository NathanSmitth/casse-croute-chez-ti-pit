import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Static Plus Jakarta Sans / Inter (latin, incl. French accents) for next/og —
// Satori needs woff/ttf, not woff2.
export async function ogFonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [jakarta, inter500, inter600] = await Promise.all([
    readFile(join(dir, "PlusJakartaSans-700.woff")),
    readFile(join(dir, "Inter-500.woff")),
    readFile(join(dir, "Inter-600.woff")),
  ]);
  return [
    { name: "Plus Jakarta Sans", data: jakarta, weight: 700 as const, style: "normal" as const },
    { name: "Inter", data: inter500, weight: 500 as const, style: "normal" as const },
    { name: "Inter", data: inter600, weight: 600 as const, style: "normal" as const },
  ];
}
