import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Access the variable from process.env
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      return NextResponse.json(
        { error: "API Base URL is not defined in environment variables" },
        { status: 500 }
      );
    }

    const response = await fetch(`${baseUrl}/collaborations/listBanners`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch collaboration banners" },
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
