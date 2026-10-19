import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/works";

export function WorkCard({
  work,
  priority = false,
}: {
  work: Work;
  priority?: boolean;
}) {
  return (
    <li>
      <Link href={`/work/${work.slug}`} className="group block">
        <div className="relative aspect-[783/674] overflow-hidden bg-white">
          {work.contain ? (
            /* Oba Otudeko: screenshot centered on white canvas at 85.44% width */
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative aspect-[669/325] w-[85.44%] overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.alt}
                  fill
                  priority={priority}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          ) : (
            <Image
              src={work.image}
              alt={work.alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          )}
        </div>

        {/* Meta row: title box 313/783 = 39.97%, category right-aligned (Figma "Group 1000004166") */}
        <div className="mt-card-gap flex items-start justify-between gap-x-[clamp(12px,1.1574vw,20px)]">
          <h2 className="w-[39.97%] font-display text-title uppercase text-paper">
            {work.title}
          </h2>
          <p className="mt-[clamp(4px,0.4861vw,8.4px)] flex-1 text-right font-body text-label capitalize tracking-[-0.04em] text-muted">
            {work.category}
          </p>
        </div>
      </Link>
    </li>
  );
}
