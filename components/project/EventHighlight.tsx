import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * Figma 127:4640 "EVENT highlight" + 127:4641 play icon — Amaranth Bold 57.85px,
 * white, underlined, uppercase render; #4e4e4e 42px play circle; right-aligned
 * block ending 24px short of the content edge (x1106–1646). The mb lands the
 * footer at Figma's 339px gap below the link (the shared layout already
 * contributes ~316px below page content).
 */
export function EventHighlight() {
  return (
    <section className="mt-[clamp(29px,2.8357vw,49px)] mb-[clamp(14px,1.331vw,23px)]">
      <Container className="flex justify-end pl-[clamp(20px,3.8773vw,67px)] pr-[clamp(20px,4.7454vw,82px)]">
        <button
          type="button"
          className="flex items-center gap-[clamp(9px,0.8681vw,15px)] transition-opacity duration-300 hover:opacity-80"
        >
          <Image
            src="/images/project-baf-play.svg"
            alt=""
            width={42}
            height={42}
            unoptimized
            className="h-[clamp(25px,2.4306vw,42px)] w-[clamp(25px,2.4306vw,42px)]"
          />
          <span className="font-display text-[clamp(35px,3.348vw,57.85px)] font-bold uppercase leading-[1.07] text-paper underline">
            EVENT highlight
          </span>
        </button>
      </Container>
    </section>
  );
}
