import { Container } from "@/components/ui/Container";
import { storyParagraphs } from "@/lib/company";

export function CompanyStory() {
  return (
    <section className="pt-[clamp(16px,1.27vw,22px)]">
      <Container className="px-[clamp(20px,3.24vw,56px)]">
        <div className="grid grid-cols-1 gap-y-[clamp(24px,1.85vw,32px)] lg:grid-cols-[36%_1fr]">
          {/* 127:4688 "Our story" — Inter Regular 99.54px, #9d9d9d (exact Figma hex), uppercase */}
          <h1 className="whitespace-pre-line font-body text-section font-normal uppercase text-[#9d9d9d]">
            {"Our\nstory"}
          </h1>

          {/* 127:4671 — three paragraphs, Inter Bold 25px, #ffffff */}
          <div className="max-w-[929px] space-y-[clamp(20px,1.9vw,33px)]">
            {storyParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-body text-story font-bold text-paper"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
