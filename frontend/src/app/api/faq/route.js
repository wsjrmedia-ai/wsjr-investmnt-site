import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      return NextResponse.json(
        { error: "Configuration error: API Base URL is missing" },
        { status: 500 }
      );
    }

    const response = await fetch(`${baseUrl}/faq`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch FAQs" },
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