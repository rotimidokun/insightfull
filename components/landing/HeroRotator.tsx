"use client";

import { Fragment, useEffect, useState } from "react";
import { heroPhrases } from "@/lib/hero-phrases";

/*
 * Motion spec from .vscode/hero-chaging-texts.mp4 (see the analysis notes):
 * - words fade in one at a time (staggered opacity, in place)
 * - the outgoing phrase crossfades out underneath the incoming one
 * - the line box never changes height (all phrases are grid-stacked)
 */
const PHRASE_DURATION_MS = 2500;
const WORD_STAGGER_MS = 350;
const FADE_MS = 600;

export function HeroRotator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (heroPhrases.length < 2) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % heroPhrases.length);
    }, PHRASE_DURATION_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="grid">
      {heroPhrases.map((phrase, phraseIndex) => {
        const isActive = phraseIndex === active;
        const words = phrase.split(" ");
        return (
          <span
            key={phrase}
            aria-hidden={!isActive}
            className="col-start-1 row-start-1"
          >
            {words.map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                <span
                  className="inline-block transition-opacity ease-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transitionDelay: isActive
                      ? `${wordIndex * WORD_STAGGER_MS}ms`
                      : "0ms",
                    transitionDuration: `${FADE_MS}ms`,
                  }}
                >
                  {word}
                </span>
                {wordIndex < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
        );
      })}
    </span>
  );
}
