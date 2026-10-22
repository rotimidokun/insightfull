export type NavLink = {
  /** Figma `characters` value — displayed uppercase via CSS. */
  label: string;
  href: string;
  /** Fixed text-box width from Figma (autoLayout children), fluid via clamp. */
  width: string;
  /** Path prefixes where this link counts as the active page. */
  activeMatch: string[];
};

/** True when `pathname` belongs to the link's section (e.g. Work covers / and /work/*). */
export function isNavActive(link: NavLink, pathname: string): boolean {
  return link.activeMatch.some(
    (prefix) =>
      pathname === prefix || (prefix !== "/" && pathname.startsWith(prefix + "/"))
  );
}

/**
 * Nav link boxes from Figma (gap 49): Company 191px, Work 122px, contact 155px
 * at 1728px. Active state is derived from the pathname (see isNavActive).
 */
export const navLinks: NavLink[] = [
  {
    label: "Company",
    href: "/company",
    width: "clamp(113px, 11.053vw, 191px)",
    activeMatch: ["/company"],
  },
  {
    label: "Work",
    href: "/",
    width: "clamp(73px, 7.0602vw, 122px)",
    activeMatch: ["/", "/work"],
  },
  {
    label: "contact",
    href: "/contact",
    width: "clamp(92px, 8.9699vw, 155px)",
    activeMatch: ["/contact"],
  },
];
