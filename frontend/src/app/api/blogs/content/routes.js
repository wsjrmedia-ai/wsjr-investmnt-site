import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const redirectPath = searchParams.get("redirectPath");

  if (!id && !redirectPath) {
    return NextResponse.json(
      { error: 'Either "id" or "redirectPath" is required' },
      { status: 400 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { error: "Internal Configuration Error: API Base URL missing" },
      { status: 500 }
    );
  }

  // 2. Prepare the query string safely
  const queryParam = id
    ? `id=${encodeURIComponent(id)}`
    : `redirectPath=${encodeURIComponent(redirectPath)}`;

  try {
    // 3. Use the dynamic base URL
    const response = await fetch(
      `${baseUrl}/news/content-details?${queryParam}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch blog content" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}