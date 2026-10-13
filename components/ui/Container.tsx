import type { ReactNode } from "react";

/**
 * Page content wrapper — the Figma frame is 1728px wide; content is capped and
 * centered on wider viewports. Sections apply their own exact gutters.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1728px] ${className}`}>{children}</div>
  );
}
