import ContactSection from "@/components/About/ContactSection";
import CalculatorPage from "@/components/Calculator/CalculatorPage";
import Hero from "@/components/Calculator/Hero";
import CalendlyBanner from "@/components/CalendlyBanner/CalendlyBanner";




export default function Page() {
    return (
        <div>
            <Hero />
            <CalculatorPage />
            {/* <CalendlyBanner /> */}
            <ContactSection />

        </div>
    );
}
