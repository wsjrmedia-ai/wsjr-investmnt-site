export async function generateGalleryMetadata() {
  try {
    const title = "Gallery | Wall Street Jr Investments";
    const description =
      "Explore our visual journey from client success stories and investment seminars to strategic events shaping the future of finance. Discover Wall Street Jr Investments in action.";
    const fullContent = `
      Step inside our gallery and experience the world of Wall Street Jr Investments. 
      From exclusive financial workshops and investor meets to moments that highlight 
      innovation, integrity, and client success - our gallery captures the essence of 
      building wealth with strategy and vision. 
      Relive the events that define our commitment to empowering smart investments.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        fullContent,
        type: "website",
        url: "https://wallstreetjrinvestments.com/gallery", // update with actual URL
        siteName: "Wall Street Jr Investments",
        images: [
          {
            url: "https://wallstreetjr.s3.me-central-1.amazonaws.com/images/1757493527768-e1l51i.jpeg", // replace with actual OG image for gallery
            width: 1200,
            height: 630,
            alt: "Wall Street Jr – Gallery of Investment Events & Success Stories",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://wallstreetjr.s3.me-central-1.amazonaws.com/images/1757493527768-e1l51i.jpeg"], // replace with gallery image
      },
    };
  } catch (error) {
    console.error("Error generating metadata for Gallery page:", error);
    return {
      title: "Gallery | Wall Street Jr Investments",
      description:
        "Explore the Wall Street Jr Investments gallery highlighting success, strategy, and investor milestones.",
    };
  }
}
