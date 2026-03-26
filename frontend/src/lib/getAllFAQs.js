const API_URL = '/api/faq'; // ✅ local API route

export const getAllFAQs = async () => {
  try {
    const res = await fetch(API_URL, { cache: "no-store" }); // prevent caching
    if (!res.ok) throw new Error('Failed to fetch FAQs');

    const data = await res.json();
    return data[0]?.faqs || []; // assuming only first doc's faqs are needed
  } catch (error) {
    console.error(error);
    return []; // fallback empty array
  }
};
