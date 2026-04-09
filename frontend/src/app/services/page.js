import Footer from "@/components/common/Footer";
import FreeConsultationPopup from "@/components/common/FreeConsultationPopup";
// import FAQSection from "@/components/Home/FAQSection";
import Hero from "@/components/Services/Hero";
import ServiceAbout from "@/components/Services/ServiceAbout";
import ServiceMain from "@/components/Services/ServiceMain";
import { generateServiceMetadata } from "@/metadata/generateServicesMetadata";

export async function generateMetadata() {
  return generateServiceMetadata();
}

export default function Page() {
    return (
        <div>
            <Hero />
            <ServiceMain />
            <ServiceAbout />
            {/* <FAQSection /> */}
            <FreeConsultationPopup />
        </div>
    );
}
