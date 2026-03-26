const API_URL = "/api/team";

export const getTeams = async () => {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch team images");
    const data = await res.json();

    return {
      founderImageUrl: data?.founderImage?.url || "",
      teamImageUrl: data?.teamImage?.url || ""
    };
  } catch (error) {
    console.error(error);
    return {
      founderImageUrl: "",
      teamImageUrl: ""
    };
  }
};
