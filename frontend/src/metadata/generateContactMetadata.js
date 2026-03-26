export async function generateContactMetadata() {
  try {
    const title = "Contact Us | Wall Street Jr Investments";
    const description =
      "Have questions or need assistance? Reach out to Wall Street Jr. Our team is here to guide your financial journey with expert support and tailored investment solutions.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url: "https://wallstreetjrinvestments.com/contact", // Replace with your actual domain
        siteName: "Wall Street Jr Investments",
        images: [
          {
            url: "https://wallstreetjrinvestments.com/about/hero-bg.png", // Replace with your actual OG image
            width: 1200,
            height: 630,
            alt: "Contact Wall Street Jr Investments – Tailored Investment Support",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://wallstreetjrinvestments.com/about/hero-bg.png"], // Same image
      },
    };
  } catch (error) {
    console.error("Error generating metadata for Contact Us page:", error);
    return {
      title: "Contact | Wall Street Jr Investments",
      description: "Get in touch with us for investment guidance and support.",
    };
  }
}
