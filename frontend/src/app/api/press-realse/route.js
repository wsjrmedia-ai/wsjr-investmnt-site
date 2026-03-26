import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Pull the base URL from environment variables
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      return NextResponse.json(
        { error: "Configuration Error: API Base URL is not defined" },
        { status: 500 }
      );
    }

    const response = await fetch(`${baseUrl}/newsrelease/listNews`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch news" },
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