import type { Service } from "@/lib/company";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div>
      {/* Title frame: Amaranth Bold 42.36px, 1px white bottom rule (Figma py-27) */}
      <h3 className="w-fit border-b border-paper py-[clamp(16px,1.56vw,27px)] font-display text-service uppercase text-paper">
        {service.title}
      </h3>
      {/* Body: Inter Medium 28.96px (Production is 25px), whitespace-pre-wrap keeps Figma line breaks */}
      <p
        className={`mt-[clamp(16px,1.85vw,32px)] max-w-[395px] whitespace-pre-wrap font-body font-medium text-paper ${
          service.small ? "text-story" : "text-body"
        }`}
      >
        {service.body}
      </p>
    </div>
  );
}
