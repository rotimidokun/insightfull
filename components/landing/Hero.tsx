import { Container } from "@/components/ui/Container";
import { HeroRotator } from "@/components/landing/HeroRotator";

export function Hero() {
  return (
    <section className="mt-[clamp(16px,1.7174vw,29.68px)]">
      {/* Figma 127:4051 — Amaranth Bold 160.376px at x67; first phrase = "Tell stories," */}
      <Container className="pl-[clamp(20px,3.8773vw,67px)]">
        <h1 className="font-display text-hero break-words uppercase text-paper">
          <HeroRotator />
        </h1>
      </Container>
    </section>
  );
}
