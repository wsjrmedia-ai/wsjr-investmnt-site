import Gallery from "@/components/Gallery/Gallery";
import Hero from "@/components/Gallery/Hero";
import { generateGalleryMetadata } from "@/metadata/generateGalleryMetadata";


export async function generateMetadata() {
    return generateGalleryMetadata();
}
export default function Page() {
    return (
        <div>
            <Hero />
            <Gallery />
        </div>
    );
}
