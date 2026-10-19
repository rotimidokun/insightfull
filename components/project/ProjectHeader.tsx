import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function ProjectHeader({ title }: { title: string }) {
  return (
    <section className="pt-[clamp(16px,1.27vw,22px)]">
      {/* Figma 127:4162 title at x67, 127:4227 button at right (y302) */}
      <Container className="pl-[clamp(20px,3.8773vw,67px)] pr-[clamp(20px,3.3565vw,58px)]">
        <div className="flex flex-col items-start gap-[clamp(16px,2vw,32px)] lg:flex-row lg:items-center lg:justify-between">
          <h1 className="font-display text-hero uppercase text-paper">{title}</h1>

          {/* 127:4227 "ABOUT THE PROJECT" + vector — Inter Regular 24px, #000000 on #d9d9d9 */}
          <button
            type="button"
            className="flex shrink-0 items-center gap-[clamp(6px,0.52vw,9px)] bg-[#d9d9d9] px-[clamp(16px,1.62vw,28px)] py-[clamp(8px,0.637vw,11px)] transition-colors duration-300 hover:bg-paper"
          >
            <span className="font-body text-[clamp(13px,1.39vw,24px)] font-normal tracking-[-0.06em] text-ink">
              ABOUT THE PROJECT
            </span>
            <Image
              src="/images/about-plus.svg"
              alt=""
              width={19.2188}
              height={19.2188}
              unoptimized
              className="h-[clamp(11px,1.11vw,19.2px)] w-[clamp(11px,1.11vw,19.2px)]"
            />
          </button>
        </div>
      </Container>
    </section>
  );
}
