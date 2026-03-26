export async function generateAboutMetadata() {
  try {
    const title = "Empowering Smart Investment Decisions";
    const description =
      "Our platform blends AI, strategy, and ethical finance to guide investors with clarity, control, and confidence. Join thousands building wealth with confidence.";
    const fullContent = `
      Turning Financial Vision Into Action with Personalized Strategy, Insight, and Real-World Experience. 
      Partner with experts who understand markets and design tailored solutions for your financial goals. 
      Unlock the power of strategic investing, real-world insights, and advanced financial tools — all designed 
      to grow, protect, and simplify your wealth journey.`;

    return {
      title,
      description,
      openGraph: {
        title,
        fullContent,
        type: "website",
        url: "https://wallstreetjrinvestments.com/about", // update this to your actual URL
        siteName: "Wall Street Jr Investments",
        images: [
          {
            url: "https://wallstreetjrinvestments.com/about/hero-bg.png", // replace with your actual OG image
            width: 1200,
            height: 630,
            alt: "Wall Street Jr Investments – Empowering Smart Investment Decisions",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://wallstreetjrinvestments.com/about/hero-bg.png"], // same here
      },
    };
  } catch (error) {
    console.error("Error generating metadata for About page:", error);
    return {
      title: "About Us",
      description:
        "Learn more about our vision, strategy, and commitment to empowering your financial journey.",
    };
  }
}
