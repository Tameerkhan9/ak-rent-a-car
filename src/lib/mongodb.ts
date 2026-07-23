import { MongoClient, Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Prefer MONGODB_USER + MONGODB_PASSWORD so special characters
 * (like @ in the password) are encoded correctly.
 */
export function resolveMongoUri(): string | undefined {
  const user = process.env.MONGODB_USER?.trim();
  const password = process.env.MONGODB_PASSWORD;
  const host =
    process.env.MONGODB_HOST?.trim() || "cluster0.foxy10h.mongodb.net";

  if (user && password != null && String(password).length > 0) {
    return `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(String(password))}@${host}/?retryWrites=true&w=majority&appName=AKRentACar`;
  }

  return process.env.MONGODB_URI?.trim() || undefined;
}

function getClientPromise() {
  const uri = resolveMongoUri();
  if (!uri) {
    throw new Error(
      "MongoDB is not configured. Set MONGODB_USER + MONGODB_PASSWORD (or MONGODB_URI)."
    );
  }

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      family: 4,
    });
    global._mongoClientPromise = client.connect().catch((error) => {
      global._mongoClientPromise = undefined;
      throw error;
    });
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB || "ak_rent_a_car");
}

export function hasMongoUri() {
  return Boolean(resolveMongoUri());
}
