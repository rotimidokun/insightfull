import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="mt-[clamp(16px,1.7174vw,29.68px)]">
      {/* Figma 127:4051 "Tell stories," — Amaranth Bold 160.376px at x67 */}
      <Container className="pl-[clamp(20px,3.8773vw,67px)]">
        <h1 className="font-display text-hero uppercase text-paper">
          Tell stories,
        </h1>
      </Container>
    </section>
  );
}
