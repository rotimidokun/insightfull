import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { navLinks } from "@/lib/nav";

export function Header() {
  return (
    <header className="pt-[clamp(32px,3.5903vw,62px)]">
      {/* Figma 127:4045: logo at x60, nav frame right edge at 58px gutter */}
      <Container className="flex items-center justify-between pl-gutter pr-[clamp(20px,3.3565vw,58px)]">
        <a href="#" aria-label="Insightfull home" className="shrink-0">
          <Image
            src="/images/logo-insightfull.svg"
            alt=""
            width={306}
            height={50}
            unoptimized
            className="h-[clamp(28px,2.8935vw,50px)] w-auto"
          />
        </a>

        <nav
          aria-label="Main"
          className="hidden items-center gap-nav-gap py-[clamp(16px,2.2vw,38px)] lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.current ? "page" : undefined}
              style={{ width: link.width }}
              className={`block text-center font-display text-title uppercase transition-colors duration-300 hover:text-paper ${
                link.current ? "text-paper" : "text-dim"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <MobileNav links={navLinks} />
      </Container>
    </header>
  );
}
