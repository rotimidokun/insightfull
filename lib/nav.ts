export type NavLink = {
  /** Figma `characters` value — displayed uppercase via CSS. */
  label: string;
  href: string;
  /** Fixed text-box width from Figma (autoLayout children), fluid via clamp. */
  width: string;
  current?: boolean;
};

/**
 * Nav link boxes from Figma node 127:4047 ("Frame 101", gap 49):
 * Company 191px, Work 122px, contact 155px at 1728px.
 */
export const navLinks: NavLink[] = [
  {
    label: "Company",
    href: "#",
    width: "clamp(113px, 11.053vw, 191px)",
  },
  {
    label: "Work",
    href: "#",
    width: "clamp(73px, 7.0602vw, 122px)",
    current: true,
  },
  {
    label: "contact",
    href: "#",
    width: "clamp(92px, 8.9699vw, 155px)",
  },
];
