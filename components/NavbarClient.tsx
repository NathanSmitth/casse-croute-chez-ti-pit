"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";
import { FacebookIcon, PhoneIcon } from "./icons";

interface NavbarClientProps {
  locale: string;
  resolvedLinks: { href: string; label: string }[];
  labels: {
    mainNav: string;
    openMenu: string;
    closeMenu: string;
    call: string;
    callAria: string;
    facebook: string;
    language: string;
  };
}

export default function NavbarClient({ locale, resolvedLinks, labels }: NavbarClientProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the drawer on route change (state reset during render, no effect needed)
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll + close on Escape while the drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const localizedPath = (href: string) => `/${locale}${href}`;
  const isActive = (href: string) => !href.startsWith("#") && pathname === `/${locale}${href}`;
  const facebook = siteConfig.social.facebook;
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-[var(--ease-hover)] ${
        solid ? "border-line bg-white/95 backdrop-blur-xl" : "border-transparent bg-white"
      }`}
    >
      <nav
        aria-label={labels.mainNav}
        className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link href={`/${locale}`} className="flex min-h-11 shrink-0 items-center rounded-md">
          <Logo priority />
        </Link>

        {/* Desktop links — centred */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {resolvedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={localizedPath(link.href)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-lg px-3.5 text-[0.95rem] font-medium transition-colors duration-200 ease-[var(--ease-hover)] ${
                  isActive(link.href) ? "text-charcoal" : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right — language · facebook · call */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <LocaleSwitcher locale={locale} label={labels.language} />
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels.facebook}
              data-track="facebook"
              data-track-location="header"
              className="inline-flex size-11 items-center justify-center rounded-full text-charcoal/70 transition-colors duration-200 hover:text-charcoal"
            >
              <FacebookIcon className="size-[1.1rem]" />
            </a>
          )}
          <a
            href={siteConfig.phone.href}
            aria-label={labels.callAria}
            data-track="call"
            data-track-location="header"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-ketchup px-4 text-[0.925rem] font-semibold text-white transition-[background-color,transform] duration-200 ease-[var(--ease-hover)] hover:bg-ketchup-dark active:scale-[0.98]"
          >
            <PhoneIcon className="size-4" />
            <span>{labels.call}</span>
            <span className="tabular hidden font-medium xl:inline">· {siteConfig.phone.display}</span>
          </a>
        </div>

        {/* Mobile — call always visible + menu toggle */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <a
            href={siteConfig.phone.href}
            aria-label={labels.callAria}
            data-track="call"
            data-track-location="header-mobile"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-ketchup px-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ketchup-dark active:scale-[0.98]"
          >
            <PhoneIcon className="size-4" />
            <span>{labels.call}</span>
          </a>
          <button
            type="button"
            className="inline-flex size-11 flex-col items-center justify-center gap-[5px] rounded-lg"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
          >
            <span
              className={`block h-0.5 w-5 rounded-full bg-charcoal transition-transform duration-300 ease-[var(--ease-out-soft)] ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-charcoal transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-charcoal transition-transform duration-300 ease-[var(--ease-out-soft)] ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — full height below the bar */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto border-t border-line bg-white transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-soft)] lg:hidden ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col px-4 pb-10 pt-2 sm:px-6">
          <ul className="flex flex-col">
            {resolvedLinks.map((link) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  href={localizedPath(link.href)}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`flex min-h-16 items-center font-heading text-3xl font-semibold tracking-[-0.03em] ${
                    isActive(link.href) ? "text-seafoam-dark" : "text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between">
            <LocaleSwitcher locale={locale} label={labels.language} />
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={labels.facebook}
                data-track="facebook"
                data-track-location="mobile-menu"
                className="inline-flex size-11 items-center justify-center rounded-full text-charcoal/70"
              >
                <FacebookIcon />
              </a>
            )}
          </div>

          <a
            href={siteConfig.phone.href}
            data-track="call"
            data-track-location="mobile-menu"
            className="mt-auto inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-seafoam px-6 text-lg font-semibold text-white active:scale-[0.98]"
          >
            <PhoneIcon />
            <span className="tabular">{siteConfig.phone.display}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
