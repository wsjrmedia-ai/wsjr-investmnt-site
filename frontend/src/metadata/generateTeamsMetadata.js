export async function generateTeamsMetadata() {
  try {
    const title = "Our Team | Wall Street Jr Investments";
    const description =
      "Meet the experts behind Wall Street Jr Investments - a global team of strategists, analysts, and advisors delivering smarter capital solutions with precision and vision.";

    const fullContent = `
      At Wall Street Jr Investments, our team brings together global expertise, institutional insight, 
      and market precision to deliver strategies that move capital smarter. 
      From founders to specialists, each member is dedicated to shaping tomorrow’s wealth today, 
      helping clients achieve sustainable growth with proven strategies and real results. 
      Explore the minds behind our mission and connect with specialists ready to guide your financial journey.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        fullContent,
        type: "website",
        url: "https://wallstreetjrinvestments.com/team", // update with actual Team page URL
        siteName: "Wall Street Jr Investments",
        images: [
          {
            url: "https://wallstreetjr.s3.me-central-1.amazonaws.com/images/1758032787900-76ks0n.png", // replace with actual OG team image
            width: 1200,
            height: 630,
            alt: "Wall Street Jr – Meet the Team Behind the Mission",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://wallstreetjr.s3.me-central-1.amazonaws.com/images/1758032787900-76ks0n.png"], // replace with actual OG team image
      },
    };
  } catch (error) {
    console.error("Error generating metadata for Team page:", error);
    return {
      title: "Our Team | Wall Street Jr Investments",
      description:
        "Meet the global experts behind Wall Street Jr Investments - strategists, advisors, and market specialists shaping smarter financial strategies.",
    };
  }
}
