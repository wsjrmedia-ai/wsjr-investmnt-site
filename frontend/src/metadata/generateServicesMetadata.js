import servicesData from "@/data/services.json";

/**
 * Generate metadata for a single service
 */
export async function generateServiceMetadata(serviceid) {
  try {
    const { services } = servicesData;

    const service = services.find((s) => s.url === serviceid);

    if (!service) {
      return {
        title: "Service Not Found | Wall Street Jr",
        description: "Explore our range of tailored financial services.",
      };
    }

    const title = service.hero?.header || service.name;
    const description =
      service.hero?.description ||
      service.shortDesc ||
      "Explore our tailored financial services.";
    const image = service.thumbImg || "/default-og.png";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url: `https://wallstreetjrinvestments.com/services/${service.url}`,
        siteName: "Wall Street Jr Investments",
        images: [
          {
            url: `https://wallstreetjrinvestments.com${image}`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [`https://wallstreetjrinvestments.com${image}`],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for Service page:", error);
    return {
      title: "Our Services | Wall Street Jr",
      description: "Explore our comprehensive suite of services.",
    };
  }
}
