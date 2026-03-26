const API_URL = '/api/collaborations'; // ✅ local API route

/**
 * Fetch all collaboration banners from API
 */
export const getAllCollaborationBanners = async () => {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error('Failed to fetch collaboration banners');

    const bannerData = await res.json();

    return bannerData.map(({ _id, bannerName, deskImgLink, link }) => ({
      id: _id,
      bannerName,
      deskImgLink,
      link,
    }));
  } catch (error) {
    console.error("Error fetching collaboration banners:", error);
    return [];
  }
};
