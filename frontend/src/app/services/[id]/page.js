import ContactSection from "@/components/About/ContactSection";
import Footer from "@/components/common/Footer";
import RiskDisclosure from "@/components/common/RiskDisclosure";
import Hero from "@/components/InvestmentServices/Hero";
import HeroTwo from "@/components/InvestmentServices/HeroTwo";
import ProcessSection from "@/components/InvestmentServices/ProcessSection";
import ProcessSectionThird from "@/components/InvestmentServices/ProcessSectionThird";
import ProcessSectionTwo from "@/components/InvestmentServices/ProcessSectionTwo";
import TextWithImage from "@/components/InvestmentServices/TextWithImage";
import TextWithImageThird from "@/components/InvestmentServices/TextWithImageThird";
import TextWithImageTwo from "@/components/InvestmentServices/TextWithImageTwo";
import WhyUsSection from "@/components/InvestmentServices/WhyUsSection";
import { getImageWithTextTemplateByServiceName, getProcessTemplateName, getHeroTemplateName } from "@/lib/services";
import { generateServiceMetadata } from "@/metadata/generateServicesMetadata";
import { notFound } from "next/navigation";



export async function generateMetadata({ params }) {
  const { id } = await params
  return generateServiceMetadata(id);
}


export default async function Page({ params }) {



    const { id } = await params

    const serviceid = decodeURIComponent(id);
    const align = serviceid === 'risk-management-asset-restructuring' ? 'right' : 'contain';
    const processtemplate = getProcessTemplateName(serviceid);
    const imagetexttemplate = getImageWithTextTemplateByServiceName(serviceid);
    const herotemplate = getHeroTemplateName(serviceid);

    if (!imagetexttemplate || !processtemplate) {
        notFound(); // automatically shows app/not-found.tsx
    }
    // console.log(imagetexttemplate);
    //   console.log(JSON.stringify(details));

    return (
        <div>

            {herotemplate === 'template2' && <HeroTwo id={serviceid} align={align} />}
            {herotemplate === 'template1' && <Hero id={serviceid} align={align} />}
            {/* <Hero id={serviceid} align={align} /> */}
            {imagetexttemplate === 'template1' && <TextWithImage id={serviceid} />}
            {imagetexttemplate === 'template2' && <TextWithImageTwo id={serviceid} />}
            {imagetexttemplate === 'template3' && <TextWithImageThird id={serviceid} />}

            {processtemplate === 'template1' && <ProcessSection id={serviceid} />}
            {processtemplate === 'template2' && <ProcessSectionTwo id={serviceid} />}
            {processtemplate === 'template3' && <ProcessSectionThird id={serviceid} />}
            <WhyUsSection id={serviceid} />
                    <RiskDisclosure />
            
            <ContactSection />
        </div>
    );
}
