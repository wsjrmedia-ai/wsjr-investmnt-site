import AboutPage from "@/components/About/AboutPage";
import ContactSection from "@/components/About/ContactSection";
import Discover from "@/components/About/Discover";
import FounderMessage from "@/components/About/FounderMessage";
import GlobalImpactSection from "@/components/About/GlobalImpactSection";
import Hero from "@/components/About/Hero";
import ImageSlider from "@/components/About/ImageSlider";
import InfrastructureSection from "@/components/About/InfrastructureSection";
import JourneySection from "@/components/About/JourneySection";
import MentorToStrategist from "@/components/About/MentorToStrategist";
import MilestoneSection from "@/components/About/MilestoneSection";
import OtherVentures from "@/components/About/OtherVentures";
import Footer from "@/components/common/Footer";
import MediaBanner from "@/components/Home/MediaBanner";
import { generateAboutMetadata } from "@/metadata/generateAboutMetadata";

export async function generateMetadata() {
    return generateAboutMetadata();
}

export default function Page() {
    return (
        <div>
            <Hero />
            {/* <MediaBanner /> */}
            <FounderMessage />
            <MentorToStrategist />
            <InfrastructureSection />
            <GlobalImpactSection />
            <JourneySection />
            <MilestoneSection />
            <OtherVentures />
            <ImageSlider />
            <ContactSection />
        </div>
    );
}
