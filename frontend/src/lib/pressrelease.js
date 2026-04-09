const PRESS_RELEASE_API = '/api/press-release';

export const getAllPressRelease = async () => {
  const res = await fetch(PRESS_RELEASE_API, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch press releases');

  const data = await res.json();

  return data.map(({ id, imageLink, title, description, link, date }) => ({
    id,
    image: imageLink,
    title,
    description,
    link,
    date
  }));
};
