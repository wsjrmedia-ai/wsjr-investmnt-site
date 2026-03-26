import Footer from "@/components/common/Footer";
import MapSection from "@/components/common/MapSection";
import BottomImage from "@/components/ContactUs/BottomImage";
import Hero from "@/components/ContactUs/Hero";
import FAQSection from "@/components/Home/FAQSection";
import TextWithImage from "@/components/InvestmentServices/TextWithImage";
import { generateContactMetadata } from "@/metadata/generateContactMetadata";

export async function generateMetadata() {
  return generateContactMetadata();
}

export default function Page() {

    return (
        <div>
            <Hero />
            <MapSection />
            <FAQSection />
            <BottomImage />
        </div>
    );
}
