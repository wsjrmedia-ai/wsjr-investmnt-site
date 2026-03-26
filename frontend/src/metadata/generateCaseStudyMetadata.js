export async function generateCaseStudyMetadata() {
  try {
    const title = "Case Study | Wall Street Jr Investments";
    const description =
      "Discover how Wall Street Jr Investments delivered +2,486.39% returns between April 2023 and October 2024 through disciplined risk management, gold-focused trading, and strategic execution.";

    const fullContent = `
      This case study highlights a high-performance trading journey with Miles Capital Limited, 
      where Wall Street Jr Investments achieved cumulative gains of +2,486.39% and profits exceeding $587,000. 
      Our approach focused on gold (XAUUSD) trading, strict risk controls, and high-conviction strategies, 
      resulting in a 90.91% win rate and exponential portfolio growth. 
      Explore how disciplined execution, selective asset allocation, and market expertise turned vision into exceptional client success.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        fullContent,
        type: "website",
        url: "https://wallstreetjrinvestments.com/case-study", // update with actual Case Study URL
        siteName: "Wall Street Jr Investments",
        images: [
          {
            url: "https://wallstreetjrinvestments.com/casestudy/CapitalGrowthSection/capital-growth.png", // replace with Case Study OG image
            width: 1200,
            height: 630,
            alt: "Wall Street Jr Case Study – +2,486% Returns Through Strategic Trading",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://wallstreetjrinvestments.com/casestudy/CapitalGrowthSection/capital-growth.png"], // replace with actual Case Study OG image
      },
    };
  } catch (error) {
    console.error("Error generating metadata for Case Study page:", error);
    return {
      title: "Case Study | Wall Street Jr Investments",
      description:
        "Read our case study on achieving +2,486.39% returns through disciplined, gold-focused trading and risk management.",
    };
  }
}
