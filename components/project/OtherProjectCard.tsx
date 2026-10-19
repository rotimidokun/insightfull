import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/works";

/** Half-scale project card (Figma 127:4234/127:4240) used in "other projects". */
export function OtherProjectCard({ work }: { work: Work }) {
  return (
    <Link href={`/work/${work.slug}`} className="group block">
      <div className="relative aspect-[783/674] overflow-hidden bg-white">
        <Image
          src={work.image}
          alt={work.alt}
          fill
          sizes="(min-width: 1024px) 25vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-[clamp(8px,1.1vw,19px)] flex items-start justify-between gap-x-[clamp(8px,1.16vw,20px)]">
        <h3 className="w-[39.97%] font-display text-[clamp(11px,1.057vw,18.26px)] uppercase text-paper">
          {work.title}
        </h3>
        <p className="mt-[clamp(3px,0.486vw,4.1px)] flex-1 text-right font-body text-[clamp(8px,0.691vw,11.94px)] capitalize tracking-[-0.04em] text-muted">
          {work.category}
        </p>
      </div>
    </Link>
  );
}
