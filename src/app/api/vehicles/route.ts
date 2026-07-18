import { NextResponse } from "next/server";
import { getVehicles, saveVehicle } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const vehicles = await getVehicles();
  return NextResponse.json(vehicles);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const vehicle = await saveVehicle(body);
  return NextResponse.json(vehicle, { status: 201 });
}
