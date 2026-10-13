import { Container } from "@/components/ui/Container";
import { WorkCard } from "@/components/landing/WorkCard";
import { works } from "@/lib/works";

export function WorkGrid() {
  return (
    <section
      aria-label="Selected work"
      className="mt-[clamp(24px,2.4884vw,43px)]"
    >
      {/* Figma grid: 2 columns of 783px, gap 32x67, gutters 60 left / 70 right */}
      <Container className="pl-gutter pr-[clamp(20px,4.0509vw,70px)]">
        <ul className="grid grid-cols-1 gap-x-grid-x gap-y-grid-y lg:grid-cols-2">
          {works.map((work, index) => (
            <WorkCard key={work.slug} work={work} priority={index === 0} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
