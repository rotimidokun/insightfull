import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { GalleryRow } from "@/lib/works";

export function ProjectGallery({ gallery }: { gallery: GalleryRow[] }) {
  return (
    <section className="mt-[clamp(24px,2.4884vw,43px)]">
      <Container className="px-gutter">
        <div className="flex flex-col gap-[clamp(12px,1.157vw,20px)]">
          {gallery.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={
                row.tiles.length === 2
                  ? "grid gap-[clamp(12px,1.157vw,20px)]"
                  : undefined
              }
              style={
                row.tiles.length === 2
                  ? {
                      gridTemplateColumns: row.tiles
                        .map((tile) => `${tile.w}fr`)
                        .join(" "),
                    }
                  : undefined
              }
            >
              {row.tiles.map((tile) => (
                <Image
                  key={tile.image}
                  src={tile.image}
                  alt={tile.alt}
                  width={tile.w}
                  height={tile.h}
                  className="h-auto w-full"
                />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
