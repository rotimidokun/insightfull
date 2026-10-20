export type GalleryTile = {
  image: string;
  /** Figma tile width (for aspect + 2-col column ratios). */
  w: number;
  h: number;
  alt: string;
};

export type GalleryRow = {
  /** One tile = full-width; two tiles = a 2-column row. */
  tiles: GalleryTile[];
};

export type Work = {
  slug: string;
  /** Figma `characters` value — displayed uppercase via CSS. */
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
  /** Project-detail case-study gallery (row by row). */
  gallery?: GalleryRow[];
  /** Slugs shown in the "other projects" section of the project page. */
  otherSlugs?: string[];
};

/** Grid fill order (row-major): label, then these five cards. */
export const works: Work[] = [
  {
    slug: "karanta-kids",
    title: "Karanta Kids",
    category: "Branding,Web design",
    image: "/images/work-karanta-kids.png",
    alt: "Karanta Kids mobile app screens on an orange background",
    otherSlugs: ["larue-projects", "baf-10th-anniversary"],
    gallery: [
      {
        tiles: [
          {
            image: "/images/project-karanta-hero.png",
            w: 1610,
            h: 674,
            alt: "Karanta Kids website shown on a laptop",
          },
        ],
      },
      {
        tiles: [
          {
            image: "/images/project-karanta-logo.png",
            w: 782,
            h: 674,
            alt: "Karanta Kids logo on an orange background",
          },
          {
            image: "/images/project-karanta-iphone.png",
            w: 808,
            h: 674,
            alt: "iPhone home screen with the Karanta Kids app",
          },
        ],
      },
      {
        tiles: [
          {
            image: "/images/project-karanta-wall.png",
            w: 1610,
            h: 674,
            alt: "Children drawing on a wall at a Karanta Kids event",
          },
        ],
      },
      {
        tiles: [
          {
            image: "/images/project-karanta-cards.png",
            w: 1608,
            h: 674,
            alt: "Karanta Kids Foundation social media cards",
          },
        ],
      },
      {
        tiles: [
          {
            image: "/images/project-karanta-app.png",
            w: 782,
            h: 674,
            alt: "Karanta Kids app screen on a phone",
          },
          {
            image: "/images/project-karanta-badge.png",
            w: 808,
            h: 674,
            alt: "Karanta Kids ID badge",
          },
        ],
      },
      {
        tiles: [
          {
            image: "/images/project-karanta-phone.png",
            w: 782,
            h: 674,
            alt: "Karanta Kids website on a phone in an orange pocket",
          },
          {
            image: "/images/project-karanta-bag.png",
            w: 808,
            h: 674,
            alt: "Karanta Kids orange drawstring bag",
          },
        ],
      },
      {
        tiles: [
          {
            image: "/images/project-karanta-stage.png",
            w: 1610,
            h: 674,
            alt: "Karanta Kids Foundation stage backdrop",
          },
        ],
      },
      {
        tiles: [
          {
            image: "/images/project-karanta-poster.png",
            w: 782,
            h: 674,
            alt: "Karanta Kids illustrated posters",
          },
          {
            image: "/images/project-karanta-event.png",
            w: 808,
            h: 674,
            alt: "Karanta Kids event space",
          },
        ],
      },
    ],
  },
  {
    slug: "larue-projects",
    title: "LARUE PROJECTS",
    category: "Branding,Web design",
    image: "/images/work-larue-projects.png",
    alt: "Larue Projects blue geometric brand graphic",
    // Figma 127:4306 shows Larue + BAF under "other projects" (including the
    // current page — a template placeholder). "Other projects" excludes the
    // current page, so Karanta stands in for the self-referential card.
    otherSlugs: ["karanta-kids", "baf-10th-anniversary"],
    gallery: [
      {
        tiles: [
          {
            image: "/images/project-larue-logos.png",
            w: 1610,
            h: 674,
            alt: "Larue Projects logo variations",
          },
        ],
      },
      {
        tiles: [
          {
            image: "/images/project-larue-geo.png",
            w: 782,
            h: 674,
            alt: "Larue Projects geometric brand pattern",
          },
          {
            image: "/images/project-larue-arcs.png",
            w: 808,
            h: 674,
            alt: "Larue Projects blue arc pattern",
          },
        ],
      },
      {
        tiles: [
          {
            image: "/images/project-larue-slides.png",
            w: 1610,
            h: 674,
            alt: "Larue Projects presentation slides",
          },
        ],
      },
      {
        tiles: [
          {
            image: "/images/project-larue-signature.png",
            w: 1608,
            h: 674,
            alt: "Larue Projects email signature and business card",
          },
        ],
      },
      {
        tiles: [
          {
            image: "/images/project-larue-cards.png",
            w: 782,
            h: 674,
            alt: "Larue Projects business card mockup",
          },
          {
            image: "/images/project-larue-badge.png",
            w: 808,
            h: 674,
            alt: "Larue Projects ID badge",
          },
        ],
      },
      {
        tiles: [
          {
            image: "/images/project-larue-browser.png",
            w: 1608,
            h: 674,
            alt: "Larue Projects website shown in a browser",
          },
        ],
      },
    ],
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
