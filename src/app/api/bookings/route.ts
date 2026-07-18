import { NextResponse } from "next/server";
import {
  calcDays,
  createBooking,
  getBookings,
  getVehicleById,
} from "@/lib/data";
import { sendBookingEmail } from "@/lib/email";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const bookings = await getBookings();
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      vehicleId,
      customerName,
      customerEmail,
      customerPhone,
      pickupDate,
      returnDate,
      pickupLocation,
      notes,
    } = body;

    if (
      !vehicleId ||
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !pickupDate ||
      !returnDate ||
      !pickupLocation
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const vehicle = await getVehicleById(vehicleId);
    if (!vehicle || !vehicle.available) {
      return NextResponse.json(
        { error: "Vehicle is not available." },
        { status: 400 }
      );
    }

    const totalDays = calcDays(pickupDate, returnDate);
    const booking = await createBooking({
      vehicleId,
      vehicleName: `${vehicle.year} ${vehicle.color} ${vehicle.brand} ${vehicle.name}`,
      customerName,
      customerEmail,
      customerPhone,
      pickupDate,
      returnDate,
      pickupLocation,
      totalDays,
      totalPrice: totalDays * vehicle.pricePerDay,
      notes: notes || "",
    });

    try {
      await sendBookingEmail(booking);
    } catch (err) {
      console.error("Failed to send booking email:", err);
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not create booking." },
      { status: 500 }
    );
  }
}
