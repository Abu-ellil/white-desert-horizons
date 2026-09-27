import { MongoClient, type Db, type Collection } from "mongodb";
import fs from "node:fs";
import path from "node:path";

/**
 * Testimonial storage — MongoDB Atlas (free M0 tier).
 * Works on Vercel / Cloudflare / any serverless platform, unlike file SQLite.
 *
 * Config: set MONGODB_URI in the environment (or in a local .env file —
 * parsed below as a zero-dependency fallback for dev).
 *   MONGODB_URI=mongodb+srv://user:pass@cluster.xxx.mongodb.net/?retryWrites=true
 *
 * Review workflow: pending → approved | rejected.
 * The landing page only shows approved. Rejected reviews are kept in the
 * admin page (restore or hard-delete) so nothing disappears by accident.
 */

export type TestimonialStatus = "pending" | "approved" | "rejected";

export type TestimonialRow = {
  id: string;
  name: string;
  country: string | null;
  program: string | null;
  rating: number;
  quote: string;
  status: TestimonialStatus;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TestimonialDoc = any;

/** Tiny .env fallback so `vite dev` picks up MONGODB_URI without dotenv. */
function loadEnvFallback(): void {
  if (process.env["MONGODB_URI"]) return;
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) return;
    for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && m[1] && m[2] !== undefined && !process.env[m[1]])
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    // ignore — env var missing will surface as a clear error below
  }
}
loadEnvFallback();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalStore = globalThis as any;

async function getCollection(): Promise<Collection<TestimonialDoc>> {
  const uri = process.env["MONGODB_URI"];
  if (!uri)
    throw new Error("MONGODB_URI is not set — add it to .env or your host's environment settings.");
  let client: MongoClient = globalStore.__wdhMongoClient;
  if (!client) {
    client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
    globalStore.__wdhMongoClient = client;
    await client.connect();
    // Indexes: created once per cold start, idempotent.
    await client.db().collection("testimonials").createIndex({ status: 1, createdAt: -1 });
  }
  return client.db().collection<TestimonialDoc>("testimonials");
}

function toRow(doc: TestimonialDoc): TestimonialRow {
  const status = doc.status === "approved" || doc.status === "rejected" ? doc.status : "pending";
  return {
    id: String(doc._id),
    name: String(doc.name),
    country: doc.country ?? null,
    program: doc.program ?? null,
    rating: Number(doc.rating),
    quote: String(doc.quote),
    status,
    created_at:
      doc.createdAt instanceof Date
        ? doc.createdAt.toISOString().slice(0, 19).replace("T", " ")
        : String(doc.createdAt ?? ""),
  };
}

/** Landing page: approved reviews only, newest first. */
export async function listTestimonials(onlyApproved: boolean): Promise<TestimonialRow[]> {
  const col = await getCollection();
  if (onlyApproved) {
    const docs = await col.find({ status: "approved" }).sort({ createdAt: -1 }).toArray();
    return docs.map(toRow);
  }
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(toRow);
}

export async function createTestimonial(input: {
  name: string;
  country?: string | null;
  program?: string | null;
  rating: number;
  quote: string;
}): Promise<TestimonialRow> {
  const name = String(input.name).trim().slice(0, 80);
  const country = input.country ? String(input.country).trim().slice(0, 80) : null;
  const program = input.program ? String(input.program).trim().slice(0, 120) : null;
  const rating = Math.min(5, Math.max(1, Math.round(Number(input.rating))));
  const quote = String(input.quote).trim().slice(0, 1000);
  if (!name || !quote) throw new Error("Name and review text are required");
  if (!Number.isFinite(rating)) throw new Error("Invalid rating");

  const col = await getCollection();
  const doc = { name, country, program, rating, quote, status: "pending", createdAt: new Date() };
  const res = await col.insertOne(doc);
  return toRow({ _id: res.insertedId, ...doc });
}

export async function setTestimonialStatus(id: string, status: TestimonialStatus): Promise<void> {
  const col = await getCollection();
  const { ObjectId } = await import("mongodb");
  await col.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
}

export async function deleteTestimonial(id: string): Promise<void> {
  const col = await getCollection();
  const { ObjectId } = await import("mongodb");
  await col.deleteOne({ _id: new ObjectId(id) });
}
