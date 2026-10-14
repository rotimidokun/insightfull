import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NavLinks } from "@/components/layout/NavLinks";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  // pt 30px (was Figma's 62px) — client requested tighter space above logo/menu
  return (
    <header className="pt-[clamp(18px,1.7361vw,30px)]">
      <Container className="flex items-center justify-between pl-gutter pr-[clamp(20px,3.3565vw,58px)]">
        <Link href="/" aria-label="Insightfull home" className="shrink-0">
          <Image
            src="/images/logo-insightfull.svg"
            alt=""
            width={306}
            height={50}
            unoptimized
            className="h-[clamp(28px,2.8935vw,50px)] w-auto"
          />
        </Link>
        <NavLinks />
        <MobileNav />
      </Container>
    </header>
  );
}
