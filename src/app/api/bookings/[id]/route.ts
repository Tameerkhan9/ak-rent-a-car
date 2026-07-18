import { NextResponse } from "next/server";
import { updateBookingStatus } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";
import type { BookingStatus } from "@/lib/types";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const status = body.status as BookingStatus;
  const booking = await updateBookingStatus(id, status);
  return NextResponse.json(booking);
}
