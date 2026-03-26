const API_URL = '/api/banner'; // ✅ your Next.js API route

export const getGalleryBanner = async () => {
  try {
    const res = await fetch(API_URL, { cache: "no-store" }); // avoid caching in production
    if (!res.ok) throw new Error('Failed to fetch banners');

    const data = await res.json();

    // Filter for Hero Banner only
    const heroBanner = data.find(b => b.bannerName === "Gallery Banner");

    if (heroBanner) {
      return {
        deskImgLink: heroBanner.deskImgLink || '/gallery/herobg.png',
        mobImgLink: heroBanner.mobImgLink || '/gallery/herobg.png',
        link: heroBanner.link || '/',
      };
    }

    // Fallback if no banner found
    return {
      deskImgLink: '/gallery/herobg.png',
      mobImgLink: '/gallery/herobg.png',
      link: '/',
    };
  } catch (error) {
    console.error(error);

    // Fallback in case of fetch error
    return {
      deskImgLink: '/gallery/herobg.png',
      mobImgLink: '/gallery/herobg.png',
      link: '/',
    };
  }
};
