export type Work = {
  slug: string;
  /** Figma `characters` value — displayed uppercase via CSS, text kept exact. */
  title: string;
  /** Figma `characters` value — displayed as typed. */
  category: string;
  image: string;
  alt: string;
  /**
   * true = source art is a screenshot centered on a white canvas (Oba Otudeko
   * card in Figma: white Frame 102 with the image placed at 85.44% width).
   */
  contain?: boolean;
};

/** Grid order matches Figma frames 104-109 (row-major, 2 columns). */
export const works: Work[] = [
  {
    slug: "karanta-kids",
    title: "Karanta Kids",
    category: "Branding,Web design",
    image: "/images/work-karanta-kids.png",
    alt: "Karanta Kids mobile app screens on an orange background",
  },
  {
    slug: "larue-projects",
    title: "LARUE PROJECTS",
    category: "Branding,Web design",
    image: "/images/work-larue-projects.png",
    alt: "Larue Projects blue geometric brand graphic",
  },
  {
    slug: "oba-otudeko",
    title: "OBA OTUDEKO",
    category: "WEBSITE DESIGN",
    image: "/images/work-oba-otudeko.png",
    alt: "Oba Otudeko website hero on a desktop screen",
    contain: true,
  },
  {
    slug: "baf-10th-anniversary",
    title: "BAF 10TH ANNIVERSARY",
    category: "EVENT DESIGN & PRODUCTION",
    image: "/images/work-baf-10th-anniversary.png",
    alt: "Education Futures conference booth for the BAF 10th Anniversary",
  },
  {
    slug: "tunji-olowolafe-foundation",
    title: "Tunji Olowolafe Foundation",
    category: "Branding,Web design",
    image: "/images/work-tunji-olowolafe.png",
    alt: "Tunji Olowolafe Foundation yellow tote bag with geometric pattern",
  },
  {
    slug: "gilgal-strategy",
    title: "GILGAL STRATEGY",
    category: "Branding,Web design",
    image: "/images/work-gilgal-strategy.png",
    alt: "Gilgal Strategy green logo stickers on a laptop",
  },
];
