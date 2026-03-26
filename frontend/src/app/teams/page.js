import Hero from "@/components/Teampage/Hero";
import TeamSection from "@/components/Teampage/TeamSection";
import { generateTeamsMetadata } from "@/metadata/generateTeamsMetadata";


export async function generateMetadata() {
    return generateTeamsMetadata();
}
export default function Page() {
    return (
        <div>
            <Hero />
            <TeamSection />
        </div>
    );
}
