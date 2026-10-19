"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isNavActive, navLinks } from "@/lib/nav";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[6px]"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span
          aria-hidden
          className={`block h-[2px] w-7 bg-paper transition-transform duration-300 ${
            open ? "translate-y-[8px] rotate-45" : ""
          }`}
        />
        <span
          aria-hidden
          className={`block h-[2px] w-7 bg-paper transition-opacity duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          aria-hidden
          className={`block h-[2px] w-7 bg-paper transition-transform duration-300 ${
            open ? "-translate-y-[8px] -rotate-45" : ""
          }`}
        />
      </button>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-ink transition-opacity duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav
          aria-label="Main"
          className="flex h-full flex-col items-start justify-center gap-[clamp(16px,4vw,32px)] px-gutter"
        >
          {navLinks.map((link) => {
            const isCurrent = isNavActive(link, pathname);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent ? "page" : undefined}
                className={`font-display text-[clamp(40px,11vw,72px)] uppercase leading-[1.33282] transition-colors duration-300 hover:text-paper ${
                  isCurrent ? "text-paper" : "text-dim"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
