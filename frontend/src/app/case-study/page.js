import ContactSection from "@/components/About/ContactSection";
import AnalysisReport from "@/components/CaseStudy/AnalysisReport";
import AssetFocusSection from "@/components/CaseStudy/AssetFocusSection";
import CapitalGrowthSection from "@/components/CaseStudy/CapitalGrowthSection";
import Conclusion from "@/components/CaseStudy/Conclusion";
import GrowthInfoBox from "@/components/CaseStudy/GrowthInfoBox";
import Hero from "@/components/CaseStudy/Hero";
import KeyTakeaways from "@/components/CaseStudy/KeyTakeaways";
import PerformanceSection from "@/components/CaseStudy/PerformanceSection";
import RiskDiscipline from "@/components/CaseStudy/RiskDiscipline";
import { generateCaseStudyMetadata } from "@/metadata/generateCaseStudyMetadata";


export async function generateMetadata() {
    return generateCaseStudyMetadata();
}

export default function Page() {
    return (
        <div>
            <Hero />
            <PerformanceSection />
            <AnalysisReport />
            <CapitalGrowthSection />
            <GrowthInfoBox />
            <AssetFocusSection />
            <RiskDiscipline />
            <KeyTakeaways />
            <Conclusion />
            <ContactSection />
        </div>
    );
}
