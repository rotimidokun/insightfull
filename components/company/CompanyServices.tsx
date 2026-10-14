import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/company/ServiceCard";
import { services } from "@/lib/company";

export function CompanyServices() {
  return (
    <section className="mt-[clamp(48px,7.12vw,123px)] mb-[clamp(100px,23.15vw,400px)]">
      <Container className="px-[clamp(20px,3.24vw,56px)]">
        <div className="grid grid-cols-1 gap-x-[clamp(32px,6vw,104px)] gap-y-[clamp(48px,6.7vw,116px)] md:grid-cols-2 lg:grid-cols-3">
          {/* 127:4687 "our services" — Inter Regular 99.54px, #9d9d9d (exact Figma hex), uppercase, bottom-aligned in cell */}
          <h2 className="self-end whitespace-pre-line font-body text-section font-normal uppercase text-[#9d9d9d]">
            {"our\nservices"}
          </h2>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
