import { Container } from "@/components/ui/Container";
import { OtherProjectCard } from "@/components/project/OtherProjectCard";
import type { Work } from "@/lib/works";

export function OtherProjects({ others }: { others: Work[] }) {
  return (
    <section className="mt-[clamp(64px,10.01vw,173px)] mb-[clamp(48px,7vw,121px)]">
      <Container className="px-gutter">
        <div className="grid grid-cols-1 gap-y-[clamp(24px,1.85vw,32px)] lg:grid-cols-[1fr_1fr] lg:items-start">
          {/* 127:4182 "other projects" — Inter Regular 99.54px, #9d9d9d, uppercase */}
          <h2 className="whitespace-pre-line font-body text-section font-normal uppercase text-[#9d9d9d]">
            {"other\nprojects"}
          </h2>
          <div className="grid grid-cols-1 gap-[clamp(12px,1.27vw,22px)] sm:grid-cols-2">
            {others.map((other) => (
              <OtherProjectCard key={other.slug} work={other} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
