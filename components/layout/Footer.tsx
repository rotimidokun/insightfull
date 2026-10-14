import Image from "next/image";
import { Container } from "@/components/ui/Container";

/** Figma 127:4152 / 127:4153 — text boxes 208px and 172px wide, gap 42. */
const socials = [
  { label: "Instagram", href: "#", width: "clamp(133px, 12.04vw, 208px)" },
  { label: "Linkedin", href: "#", width: "clamp(100px, 9.9537vw, 172px)" },
];

export function Footer() {
  return (
    <footer className="pb-[clamp(32px,4.5718vw,79px)]">
      {/* Figma footer gutters: 64 left / 42 right */}
      <Container className="pl-[clamp(20px,3.7vw,64px)] pr-[clamp(20px,2.4306vw,42px)]">
        <ul className="flex flex-wrap items-center gap-[clamp(16px,2.4306vw,42px)]">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                style={{ width: social.width }}
                className="block font-display text-title uppercase text-paper transition-opacity duration-300 hover:opacity-70"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 127:4154 — full-width INSIGHTFULL wordmark */}
        <Image
          src="/images/insightfull-wordmark.svg"
          alt="Insightfull"
          width={1622}
          height={263.4162}
          unoptimized
          className="mt-[clamp(24px,3.2292vw,55.8px)] h-auto w-full"
        />

        {/* 127:4151 — Inter Bold 23.791px, #4e4e4e, right-aligned */}
        <p className="mt-[clamp(-25.2px,-1.4583vw,-6px)] text-right font-body text-label capitalize tracking-[-0.04em] text-muted">
          © 2017 – 2026 Insightfull Creative Company
        </p>
      </Container>
    </footer>
  );
}
