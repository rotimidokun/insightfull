/**
 * Company page copy — Figma node 127:4661 ("Company").
 * Text is the exact Figma `characters` value (never paraphrased). The big
 * section labels and service titles render uppercase via CSS; bodies render
 * as typed with `whitespace-pre-wrap` to preserve Figma's hard line breaks.
 */

/** "Our story" body — three paragraphs (Inter Bold 25px). */
export const storyParagraphs = [
  "We are a design-led creative company built around a network of specialised studios, each with its own focus, united by a shared belief: creativity is infrastructure.",
  "Insightfull Design Agency builds brand and digital systems. Playground designs and produces experiences. Kọwé explores typography as cultural expression. Full Story develops the stories, language and narratives that give brands meaning. Together, our studios work across strategy, design, storytelling, motion and experience, bringing different disciplines together to create connected, meaningful work.",
  "We don’t operate within a single discipline. We work across them, combining perspectives and expertise to build brands, shape culture and create things that matter.",
];

export type Service = {
  /** Figma `characters` value — displayed uppercase via CSS. */
  title: string;
  /** Figma `characters` value — rendered with whitespace-pre-wrap. */
  body: string;
  /**
   * Production's body is 25px in Figma while the other cards are 28.96px —
   * reproduced exactly (it is also a verbatim copy of Visual Language's body,
   * a likely Figma placeholder). See the handoff notes.
   */
  small?: boolean;
};

/** Grid fill order (row-major): label, then these five cards. */
export const services: Service[] = [
  {
    title: "Brand Systems",
    body: "Brand strategy, \nVisual identity & systems, \nWeb design & development, Product (app) design, \nUIUX",
  },
  {
    title: "Visual Language",
    body: "Typeface design, \nCustom fonts,\nTypographic systems, Experimental typography, Cultural type research.",
  },
  {
    title: "MOTION VISUALS",
    body: "Motion graphics \n2D/3D animation Storyboarding \nCustom illustration  Editorial & commercial art\nTitle sequences \nkinetic design.",
  },
  {
    title: "Storytelling ",
    body: "Brand storytelling\nNarrative development  Verbal identity\nBrand voice \nEditorial content \nCampaign concepts Executive storytelling \nCorporate communications Thought leadership Content Creation \n",
  },
  {
    title: "Production",
    body: "Typeface design, \nCustom fonts,\nTypographic systems, Experimental typography, Cultural type research.",
    small: true,
  },
];
