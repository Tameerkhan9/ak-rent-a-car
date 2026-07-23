import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import type { Booking, Vehicle } from "./types";
import { getDb, hasMongoUri } from "./mongodb";

const dataDir = path.join(process.cwd(), "data");
const vehiclesPath = path.join(dataDir, "vehicles.json");
const bookingsPath = path.join(dataDir, "bookings.json");

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
    image: "/vehicles/vigo-2009-silver.png",
    available: true,
    description:
      "2009 silver Toyota Hilux Vigo — strong pickup for hills, cargo, and rough roads.",
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
  {
    id: "v10",
    name: "Grande",
    brand: "Toyota",
    year: 2016,
    color: "White",
    category: "sedan",
    seats: 5,
    transmission: "automatic",
    fuel: "Petrol",
    pricePerDay: 9000,
    image: "/vehicles/grande-2016.png",
    available: true,
    description:
      "2016 Toyota Corolla Grande — premium sedan comfort for business and family travel.",
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
  }
}

/* ---------------- Public API (same for JSON or Mongo) ---------------- */

export async function getVehicles(): Promise<Vehicle[]> {
  if (!hasMongoUri()) {
    return readJson<Vehicle[]>(vehiclesPath, defaultVehicles);
  }
  try {
    await ensureVehiclesSeeded();
    const db = await getDb();
    return db
      .collection<Vehicle>("vehicles")
      .find({}, { projection: { _id: 0 } })
      .toArray();
  } catch (error) {
    console.error("MongoDB getVehicles failed, using defaults:", error);
    return defaultVehicles;
  }
}

export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  if (!hasMongoUri()) {
    const vehicles = await getVehicles();
    return vehicles.find((v) => v.id === id);
  }
  await ensureVehiclesSeeded();
  const db = await getDb();
  const vehicle = await db
    .collection<Vehicle>("vehicles")
    .findOne({ id }, { projection: { _id: 0 } });
  return vehicle ?? undefined;
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

export function calcDays(pickupDate: string, returnDate: string): number {
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const ms = end.getTime() - start.getTime();
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return Math.max(days, 1);
}
