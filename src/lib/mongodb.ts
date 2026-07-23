import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI?.trim();

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise() {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing. Add your Atlas connection string to .env.local"
    );
  }

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      // Avoid IPv6 DNS issues on some hosts (incl. Render)
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
  return Boolean(uri);
}
