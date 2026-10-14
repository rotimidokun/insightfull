/**
 * Full-width white rectangle — Figma 127:4692 "Frame 102": 1720x674, #ffffff,
 * clipsContent. The rectangle keeps its fixed Figma size; the projects motion
 * reel is embedded inside it (object-cover, clipped by the rectangle).
 * Sits 120px below the story text and 123px above the services (fills the
 * 917px gap exactly).
 */
export function CompanyVideo() {
  return (
    <section
      aria-label="Projects motion reel"
      className="mt-[clamp(48px,6.95vw,120px)] w-full"
    >
      <div className="mx-auto aspect-[1720/674] w-full max-w-[1720px] overflow-hidden bg-white">
        <video
          src="/Insightfull_projects_motion.MP4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
