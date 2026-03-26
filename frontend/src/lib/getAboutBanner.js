const API_URL = '/api/banner'; // ✅ your Next.js API route

export const getAboutBanner = async () => {
  try {
    const res = await fetch(API_URL, { cache: "no-store" }); // avoid caching in production
    if (!res.ok) throw new Error('Failed to fetch banners');

    const data = await res.json();

    // Filter for Hero Banner only
    const heroBanner = data.find(b => b.bannerName === "About Banner");

    if (heroBanner) {
      return {
        deskImgLink: heroBanner.deskImgLink,
        mobImgLink: heroBanner.mobImgLink,
        link: heroBanner.link || '/',
      };
    }

    // Fallback if no banner found
    return {
      deskImgLink: '/about/new-bg-stock.png',
      mobImgLink: '/about/new-bg-stock.png',
      link: '/',
    };
  } catch (error) {
    console.error(error);

    // Fallback in case of fetch error
    return {
      deskImgLink: '/Hero/home-desk.png',
      mobImgLink: '/Hero/new-mobile.png',
      link: '/',
    };
  }
};
