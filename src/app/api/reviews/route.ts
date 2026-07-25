import { NextResponse } from "next/server";
import {
  createReview,
  getApprovedReviews,
  getReviews,
} from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";

  if (all) {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(await getReviews());
  }

  return NextResponse.json(await getApprovedReviews());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, vehicleId, rating, comment } = body;

    if (!customerName || !customerPhone || !vehicleId || !rating || !comment) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const review = await createReview({
      customerName: String(customerName),
      customerPhone: String(customerPhone),
      vehicleId: String(vehicleId),
      rating: Number(rating),
      comment: String(comment),
    });

    return NextResponse.json(
      {
        review,
        message:
          "Thanks! Your review was submitted and will appear after approval.",
      },
      { status: 201 }
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not submit review.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
