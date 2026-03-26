const PRESS_RELEASE_API = '/api/press-realse';

export const getAllPressRealse = async () => {
  const res = await fetch(PRESS_RELEASE_API, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch press releases');

  const data = await res.json();

  return data.map(({ _id, image, title, description, link, date }) => ({
    id: _id,
    image,
    title,
    description,
    link,
    date
  }));
};
