import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/landing/Hero";
import { WorkGrid } from "@/components/landing/WorkGrid";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WorkGrid />
      </main>
      <Footer />
    </>
  );
}
