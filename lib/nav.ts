export type NavLink = {
  /** Figma `characters` value — displayed uppercase via CSS. */
  label: string;
  href: string;
  /** Fixed text-box width from Figma (autoLayout children), fluid via clamp. */
  width: string;
};

/**
 * Nav link boxes from Figma (gap 49): Company 191px, Work 122px, contact 155px
 * at 1728px. The active link is derived from the current pathname in NavLinks /
 * MobileNav (no hardcoded "current").
 */
export const navLinks: NavLink[] = [
  { label: "Company", href: "/company", width: "clamp(113px, 11.053vw, 191px)" },
  { label: "Work", href: "/", width: "clamp(73px, 7.0602vw, 122px)" },
  { label: "contact", href: "#", width: "clamp(92px, 8.9699vw, 155px)" },
];
