import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import type {
  Booking,
  PublicReview,
  Review,
  ReviewStatus,
  Vehicle,
} from "./types";
import { getDb, hasMongoUri } from "./mongodb";

const dataDir = path.join(process.cwd(), "data");
const vehiclesPath = path.join(dataDir, "vehicles.json");
const bookingsPath = path.join(dataDir, "bookings.json");
const reviewsPath = path.join(dataDir, "reviews.json");

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.slice(-10);
}

export const defaultVehicles: Vehicle[] = [
  {
    id: "v8",
    name: "Yaris",
    brand: "Toyota",
    year: 2022,
    color: "White",
    category: "economy",
    seats: 5,
    transmission: "automatic",
    fuel: "Petrol",
    pricePerDay: 10000,
    image: "/vehicles/yaris-2022-white.jpg",
    available: true,
    description:
      "2022 white Toyota Yaris — Rs 10,000 per day. Modern, fuel-efficient sedan for city driving.",
  },
  {
    id: "v1",
    name: "Civic",
    brand: "Honda",
    year: 2017,
    color: "Black",
    category: "sedan",
    seats: 5,
    transmission: "automatic",
    fuel: "Petrol",
    pricePerDay: 15000,
    image: "/vehicles/civic-2017-black.png",
    available: true,
    description:
      "2017 black Honda Civic — stylish sedan for city drives and long trips around Batkhela and KP.",
  },
  {
    id: "v9",
    name: "Yaris",
    brand: "Toyota",
    year: 2022,
    color: "Gray Graphite",
    category: "economy",
    seats: 5,
    transmission: "automatic",
    fuel: "Petrol",
    pricePerDay: 10000,
    image: "/vehicles/yaris-2022-graphite.jpg",
    available: true,
    description:
      "2022 gray graphite Toyota Yaris — Rs 10,000 per day. Sleek newer sedan with smooth automatic drive.",
  },
  {
    id: "v6",
    name: "Land Cruiser Prado",
    brand: "Toyota",
    year: 2003,
    color: "Gun Metallic",
    category: "suv",
    seats: 7,
    transmission: "automatic",
    fuel: "Petrol",
    pricePerDay: 17000,
    image: "/vehicles/prado-2003-gunmetal.png",
    available: true,
    description:
      "2003 gun metallic Toyota Prado — capable SUV for family and mountain routes.",
  },
  {
    id: "v5",
    name: "Hilux Vigo",
    brand: "Toyota",
    year: 2009,
    color: "Silver",
    category: "pickup",
    seats: 5,
    transmission: "automatic",
    fuel: "Diesel",
    pricePerDay: 17000,
    image: "/vehicles/vigo-2009-silver-hamer.png",
    images: [
      "/vehicles/hilux-vigo-2009/ai-front.png",
      "/vehicles/hilux-vigo-2009/ai-side.png",
    ],
    available: true,
    description:
      "2009 silver Toyota Hilux Vigo — upgraded with Hamer heavy-duty front bull bar (HAMER branding top and bottom), matching Hamer rear bumper, black sports bar / bed grill on the dala, side steps, and alloy wheels. Ready for hills, load work, and tough roads.",
  },
  {
    id: "v7",
    name: "Prado NCP",
    brand: "Toyota",
    year: 2005,
    color: "Black",
    category: "suv",
    seats: 7,
    transmission: "automatic",
    fuel: "Petrol",
    pricePerDay: 15000,
    image: "/vehicles/prado-2005-black.jpg",
    available: true,
    description:
      "2005 black Toyota Prado NCP — Rs 15,000 per day. Premium SUV comfort for longer journeys across KP.",
  },
  {
    id: "v2",
    name: "Civic",
    brand: "Honda",
    year: 2016,
    color: "White",
    category: "sedan",
    seats: 5,
    transmission: "automatic",
    fuel: "Petrol",
    pricePerDay: 14000,
    image: "/vehicles/civic-2016-white.png",
    available: true,
    description:
      "2016 white Honda Civic — clean, comfortable, and ready for daily rental use.",
  },
  // Budget / older cars — always listed after the main fleet
  {
    id: "v10",
    name: "Grande",
    brand: "Toyota",
    year: 2016,
    color: "Gun Metallic",
    category: "sedan",
    seats: 5,
    transmission: "automatic",
    fuel: "Petrol",
    pricePerDay: 9500,
    image: "/vehicles/grande-2016.png",
    available: true,
    description:
      "2016 gun metallic Toyota Corolla Grande — Rs 9,500 per day. Premium sedan comfort for business and family travel.",
  },
  {
    id: "v3",
    name: "Corolla GLI",
    brand: "Toyota",
    year: 2011,
    color: "White",
    category: "sedan",
    seats: 5,
    transmission: "manual",
    fuel: "Petrol",
    pricePerDay: 7000,
    image: "/vehicles/gli-2011-white.png",
    available: true,
    description:
      "2011 white Toyota Corolla GLI — trusted Pakistani favourite for reliable travel.",
  },
  {
    id: "v4",
    name: "AC Saloon",
    brand: "Toyota",
    year: 2005,
    color: "White",
    category: "economy",
    seats: 5,
    transmission: "automatic",
    fuel: "Petrol",
    pricePerDay: 6000,
    image: "/vehicles/saloon-2005-white.png",
    available: true,
    description:
      "2005 white AC Saloon — budget-friendly air-conditioned sedan for local trips.",
  },
  {
    id: "v11",
    name: "Corolla G (Japan)",
    brand: "Toyota",
    year: 2001,
    color: "Silver",
    category: "economy",
    seats: 5,
    transmission: "automatic",
    fuel: "Petrol",
    pricePerDay: 6000,
    image: "/vehicles/corolla-g-silver.jpg",
    available: true,
    description:
      "2001 silver Toyota Corolla G Japan — Rs 6,000 per day. Automatic petrol. Photos of our actual car.",
  },
];

/** Stable public fleet order (Mongo may return cars in any order). */
const FLEET_DISPLAY_ORDER = defaultVehicles.map((v) => v.id);

function sortVehiclesForDisplay(vehicles: Vehicle[]): Vehicle[] {
  const rank = new Map(FLEET_DISPLAY_ORDER.map((id, i) => [id, i]));
  return [...vehicles].sort((a, b) => {
    const ra = rank.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const rb = rank.get(b.id) ?? Number.MAX_SAFE_INTEGER;
    if (ra !== rb) return ra - rb;
    return a.name.localeCompare(b.name);
  });
}

/* ---------------- JSON fallback (local without Atlas) ---------------- */

async function ensureDataFiles() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(vehiclesPath);
  } catch {
    await fs.writeFile(vehiclesPath, JSON.stringify(defaultVehicles, null, 2));
  }
  try {
    await fs.access(bookingsPath);
  } catch {
    await fs.writeFile(bookingsPath, JSON.stringify([], null, 2));
  }
  try {
    await fs.access(reviewsPath);
  } catch {
    await fs.writeFile(reviewsPath, JSON.stringify([], null, 2));
  }
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  await ensureDataFiles();
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(filePath: string, data: T) {
  await ensureDataFiles();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

/* ---------------- MongoDB Atlas ---------------- */

async function ensureVehiclesSeeded() {
  const db = await getDb();
  const count = await db.collection("vehicles").countDocuments();
  if (count === 0) {
    await db.collection("vehicles").insertMany(defaultVehicles);
    return;
  }

  // Apply Grande catalog update (color + daily rate)
  const grande = defaultVehicles.find((v) => v.id === "v10");
  if (grande) {
    await db.collection("vehicles").updateOne(
      { id: "v10" },
      {
        $set: {
          color: grande.color,
          pricePerDay: grande.pricePerDay,
          description: grande.description,
        },
      },
      { upsert: true }
    );
  }
}

/* ---------------- Public API (same for JSON or Mongo) ---------------- */

export async function getVehicles(): Promise<Vehicle[]> {
  if (!hasMongoUri()) {
    const vehicles = await readJson<Vehicle[]>(vehiclesPath, defaultVehicles);
    return sortVehiclesForDisplay(vehicles);
  }
  try {
    await ensureVehiclesSeeded();
    const db = await getDb();
    const vehicles = await db
      .collection<Vehicle>("vehicles")
      .find({}, { projection: { _id: 0 } })
      .toArray();
    return sortVehiclesForDisplay(vehicles);
  } catch (error) {
    console.error("MongoDB getVehicles failed, using defaults:", error);
    return sortVehiclesForDisplay(defaultVehicles);
  }
}

export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  if (!hasMongoUri()) {
    const vehicles = await getVehicles();
    return vehicles.find((v) => v.id === id);
  }
  try {
    await ensureVehiclesSeeded();
    const db = await getDb();
    const vehicle = await db
      .collection<Vehicle>("vehicles")
      .findOne({ id }, { projection: { _id: 0 } });
    return vehicle ?? defaultVehicles.find((v) => v.id === id);
  } catch (error) {
    console.error("MongoDB getVehicleById failed, using defaults:", error);
    return defaultVehicles.find((v) => v.id === id);
  }
}

export async function saveVehicle(
  input: Omit<Vehicle, "id"> & { id?: string }
): Promise<Vehicle> {
  if (!hasMongoUri()) {
    const vehicles = await getVehicles();
    if (input.id) {
      const index = vehicles.findIndex((v) => v.id === input.id);
      if (index === -1) throw new Error("Vehicle not found");
      vehicles[index] = { ...vehicles[index], ...input, id: input.id };
      await writeJson(vehiclesPath, vehicles);
      return vehicles[index];
    }
    const vehicle: Vehicle = { ...input, id: uuidv4() };
    vehicles.push(vehicle);
    await writeJson(vehiclesPath, vehicles);
    return vehicle;
  }

  await ensureVehiclesSeeded();
  const db = await getDb();
  if (input.id) {
    const existing = await db.collection<Vehicle>("vehicles").findOne({ id: input.id });
    if (!existing) throw new Error("Vehicle not found");
    const vehicle: Vehicle = { ...existing, ...input, id: input.id };
    await db.collection("vehicles").updateOne({ id: input.id }, { $set: vehicle });
    return vehicle;
  }
  const vehicle: Vehicle = { ...input, id: uuidv4() };
  await db.collection("vehicles").insertOne(vehicle);
  return vehicle;
}

export async function deleteVehicle(id: string): Promise<void> {
  if (!hasMongoUri()) {
    const vehicles = await getVehicles();
    await writeJson(
      vehiclesPath,
      vehicles.filter((v) => v.id !== id)
    );
    return;
  }
  const db = await getDb();
  await db.collection("vehicles").deleteOne({ id });
}

export async function getBookings(): Promise<Booking[]> {
  if (!hasMongoUri()) {
    const bookings = await readJson<Booking[]>(bookingsPath, []);
    return bookings.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  const db = await getDb();
  return db
    .collection<Booking>("bookings")
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getBookingById(id: string): Promise<Booking | undefined> {
  if (!hasMongoUri()) {
    const bookings = await getBookings();
    return bookings.find((b) => b.id === id);
  }
  const db = await getDb();
  const booking = await db
    .collection<Booking>("bookings")
    .findOne({ id }, { projection: { _id: 0 } });
  return booking ?? undefined;
}

export async function createBooking(
  input: Omit<Booking, "id" | "createdAt" | "status">
): Promise<Booking> {
  const booking: Booking = {
    ...input,
    id: uuidv4(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  if (!hasMongoUri()) {
    const bookings = await getBookings();
    bookings.unshift(booking);
    await writeJson(bookingsPath, bookings);
    return booking;
  }

  const db = await getDb();
  await db.collection("bookings").insertOne(booking);
  return booking;
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking> {
  if (!hasMongoUri()) {
    const bookings = await getBookings();
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Booking not found");
    bookings[index] = { ...bookings[index], status };
    await writeJson(bookingsPath, bookings);
    return bookings[index];
  }

  const db = await getDb();
  const result = await db.collection<Booking>("bookings").findOneAndUpdate(
    { id },
    { $set: { status } },
    { returnDocument: "after", projection: { _id: 0 } }
  );
  if (!result) throw new Error("Booking not found");
  return result;
}

export async function deleteBooking(id: string): Promise<void> {
  if (!hasMongoUri()) {
    const bookings = await getBookings();
    const next = bookings.filter((b) => b.id !== id);
    if (next.length === bookings.length) throw new Error("Booking not found");
    await writeJson(bookingsPath, next);
    return;
  }

  const db = await getDb();
  const result = await db.collection("bookings").deleteOne({ id });
  if (result.deletedCount === 0) throw new Error("Booking not found");
}

export function calcDays(pickupDate: string, returnDate: string): number {
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const ms = end.getTime() - start.getTime();
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return Math.max(days, 1);
}

/* ---------------- Reviews ---------------- */

export async function getReviews(): Promise<Review[]> {
  if (!hasMongoUri()) {
    const reviews = await readJson<Review[]>(reviewsPath, []);
    return reviews.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  const db = await getDb();
  return db
    .collection<Review>("reviews")
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
}

export function toPublicReview(review: Review): PublicReview {
  return {
    id: review.id,
    customerName: review.customerName,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
  };
}

export async function getApprovedReviews(): Promise<PublicReview[]> {
  const reviews = await getReviews();
  // Live immediately for customers — only rejected reviews stay hidden
  return reviews
    .filter((r) => r.status !== "rejected")
    .map(toPublicReview);
}

export async function getReviewByBookingId(
  bookingId: string
): Promise<Review | undefined> {
  if (!hasMongoUri()) {
    const reviews = await getReviews();
    return reviews.find((r) => r.bookingId === bookingId);
  }
  const db = await getDb();
  const review = await db
    .collection<Review>("reviews")
    .findOne({ bookingId }, { projection: { _id: 0 } });
  return review ?? undefined;
}

export async function createReview(input: {
  customerName: string;
  customerPhone: string;
  vehicleId: string;
  rating: number;
  comment: string;
}): Promise<Review> {
  const rating = Math.round(input.rating);
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }
  const comment = input.comment.trim();
  if (comment.length < 10) {
    throw new Error("Please write a short review (at least 10 characters).");
  }

  const vehicle = await getVehicleById(input.vehicleId);
  if (!vehicle) throw new Error("Vehicle not found.");

  const phoneKey = normalizePhone(input.customerPhone);
  if (phoneKey.length < 10) {
    throw new Error("Please enter a valid phone number.");
  }

  const bookings = await getBookings();
  const completed = bookings.filter(
    (b) =>
      b.status === "completed" &&
      b.vehicleId === input.vehicleId &&
      normalizePhone(b.customerPhone) === phoneKey
  );

  if (completed.length === 0) {
    throw new Error(
      "Review is only available after your booking is completed (car returned). Ask the office to mark your booking completed, then try again."
    );
  }

  const booking = completed[0];
  const existing = await getReviewByBookingId(booking.id);
  if (existing) {
    throw new Error("You already submitted a review for this booking.");
  }

  const review: Review = {
    id: uuidv4(),
    bookingId: booking.id,
    vehicleId: vehicle.id,
    vehicleName: `${vehicle.year} ${vehicle.color} ${vehicle.brand} ${vehicle.name}`,
    customerName: input.customerName.trim() || booking.customerName,
    customerPhone: input.customerPhone.trim(),
    rating,
    comment,
    status: "approved",
    createdAt: new Date().toISOString(),
  };

  if (!hasMongoUri()) {
    const reviews = await getReviews();
    reviews.unshift(review);
    await writeJson(reviewsPath, reviews);
    return review;
  }

  const db = await getDb();
  await db.collection("reviews").insertOne(review);
  return review;
}

export async function updateReviewStatus(
  id: string,
  status: ReviewStatus
): Promise<Review> {
  if (!hasMongoUri()) {
    const reviews = await getReviews();
    const index = reviews.findIndex((r) => r.id === id);
    if (index === -1) throw new Error("Review not found");
    reviews[index] = { ...reviews[index], status };
    await writeJson(reviewsPath, reviews);
    return reviews[index];
  }

  const db = await getDb();
  const result = await db.collection<Review>("reviews").findOneAndUpdate(
    { id },
    { $set: { status } },
    { returnDocument: "after", projection: { _id: 0 } }
  );
  if (!result) throw new Error("Review not found");
  return result;
}

export async function deleteReview(id: string): Promise<void> {
  if (!hasMongoUri()) {
    const reviews = await getReviews();
    await writeJson(
      reviewsPath,
      reviews.filter((r) => r.id !== id)
    );
    return;
  }
  const db = await getDb();
  await db.collection("reviews").deleteOne({ id });
}
