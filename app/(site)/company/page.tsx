import type { Metadata } from "next";
import { CompanyStory } from "@/components/company/CompanyStory";
import { CompanyVideo } from "@/components/company/CompanyVideo";
import { CompanyServices } from "@/components/company/CompanyServices";

export const metadata: Metadata = {
  title: "Company — Insightfull Creative",
};

export default function CompanyPage() {
  return (
    <>
      <CompanyStory />
      <CompanyVideo />
      <CompanyServices />
    </>
  );
}
