"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavActive, navLinks } from "@/lib/nav";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="hidden items-center gap-nav-gap py-[clamp(16px,2.2vw,38px)] lg:flex"
    >
      {navLinks.map((link) => {
        const isCurrent = isNavActive(link, pathname);
        return (
          <Link
            key={link.label}
            href={link.href}
            aria-current={isCurrent ? "page" : undefined}
            style={{ width: link.width }}
            className={`block text-center font-display text-title uppercase transition-colors duration-300 hover:text-paper ${
              isCurrent ? "text-paper" : "text-dim"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
