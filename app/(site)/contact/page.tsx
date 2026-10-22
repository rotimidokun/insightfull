import type { Metadata } from "next";
import { ContactIntro } from "@/components/contact/ContactIntro";

export const metadata: Metadata = {
  title: "Contact — Insightfull Creative",
};

export default function ContactPage() {
  return <ContactIntro />;
}
