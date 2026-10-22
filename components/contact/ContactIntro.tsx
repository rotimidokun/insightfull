import { Container } from "@/components/ui/Container";

/**
 * Figma 127:4646 "Contact" — the intro block: "Got an idea / a new project?"
 * row (Amaranth Bold 58px, "/" in #9d9d9d, spread with justify-between like the
 * Figma x-positions 60/797/1172–1603), "Get in touch" (Inter Regular 245.1px,
 * #9d9d9d, -6% tracking, box at x35), and the underlined phone/email block
 * (Amaranth Bold 76.9px, 107% leading). All text uppercase via CSS per Figma.
 */
export function ContactIntro() {
  return (
    <section className="pt-[clamp(80px,11.5vw,198.7px)]">
      <Container className="pl-[clamp(20px,3.4722vw,60px)] pr-[clamp(20px,7.2338vw,125px)]">
        {/* 127:4658 "Got an idea " / 127:4659 "/" / 127:4660 "a new project?" */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-[clamp(12px,2vw,34px)] font-display text-[clamp(18px,3.3566vw,58px)] font-bold uppercase leading-[1.3328]">
          <span className="text-paper">Got an idea </span>
          <span className="text-[#9d9d9d]">/</span>
          <span className="text-paper">a new project?</span>
        </div>

        {/* 127:4657 "Get in touch" — Inter Regular 245.1px, #9d9d9d, ls -6%. */}
        <h1 className="-ml-[clamp(8px,1.4468vw,25px)] font-body text-[clamp(30px,14.184vw,245.1px)] font-normal uppercase leading-[1.3328] tracking-[-0.06em] text-[#9d9d9d]">
          Get in touch
        </h1>

        {/* 127:4652 phone + email — Amaranth Bold 76.9px, white, underlined. */}
        <div className="mt-[clamp(8px,1.294vw,22px)] mb-[clamp(36px,5.347vw,92px)] font-display text-[clamp(22px,4.45vw,76.9px)] font-bold uppercase leading-[1.07]">
          <a
            href="tel:08039131468"
            className="block text-paper underline transition-opacity duration-300 hover:opacity-80"
          >
            08039131468
          </a>
          <a
            href="mailto:ola@insightfull.company"
            className="block text-paper underline transition-opacity duration-300 hover:opacity-80"
          >
            ola@insightfull.company
          </a>
        </div>
      </Container>
    </section>
  );
}
