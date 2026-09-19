import { o as __toESM } from "../_runtime.mjs";
import { t as require_lib } from "../_libs/mongodb.mjs";
import fs from "node:fs";
import path from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/db-BGao4qRl.js
var import_lib = require_lib();
/** Tiny .env fallback so `vite dev` picks up MONGODB_URI without dotenv. */
function loadEnvFallback() {
	if (process.env["MONGODB_URI"]) return;
	try {
		const envPath = path.join(process.cwd(), ".env");
		if (!fs.existsSync(envPath)) return;
		for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
			const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
			if (m && m[1] && m[2] !== void 0 && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
		}
	} catch {}
}
loadEnvFallback();
var globalStore = globalThis;
async function getCollection() {
	const uri = process.env["MONGODB_URI"];
	if (!uri) throw new Error("MONGODB_URI is not set — add it to .env or your host's environment settings.");
	let client = globalStore.__wdhMongoClient;
	if (!client) {
		client = new import_lib.MongoClient(uri, { serverSelectionTimeoutMS: 8e3 });
		globalStore.__wdhMongoClient = client;
		await client.connect();
		await client.db().collection("testimonials").createIndex({
			status: 1,
			createdAt: -1
		});
	}
	return client.db().collection("testimonials");
}
function toRow(doc) {
	const status = doc.status === "approved" || doc.status === "rejected" ? doc.status : "pending";
	return {
		id: String(doc._id),
		name: String(doc.name),
		country: doc.country ?? null,
		program: doc.program ?? null,
		rating: Number(doc.rating),
		quote: String(doc.quote),
		status,
		created_at: doc.createdAt instanceof Date ? doc.createdAt.toISOString().slice(0, 19).replace("T", " ") : String(doc.createdAt ?? "")
	};
}
/** Landing page: approved reviews only, newest first. */
async function listTestimonials(onlyApproved) {
	const col = await getCollection();
	if (onlyApproved) return (await col.find({ status: "approved" }).sort({ createdAt: -1 }).toArray()).map(toRow);
	return (await col.find({}).sort({ createdAt: -1 }).toArray()).map(toRow);
}
async function createTestimonial(input) {
	const name = String(input.name).trim().slice(0, 80);
	const country = input.country ? String(input.country).trim().slice(0, 80) : null;
	const program = input.program ? String(input.program).trim().slice(0, 120) : null;
	const rating = Math.min(5, Math.max(1, Math.round(Number(input.rating))));
	const quote = String(input.quote).trim().slice(0, 1e3);
	if (!name || !quote) throw new Error("Name and review text are required");
	if (!Number.isFinite(rating)) throw new Error("Invalid rating");
	const col = await getCollection();
	const doc = {
		name,
		country,
		program,
		rating,
		quote,
		status: "pending",
		createdAt: /* @__PURE__ */ new Date()
	};
	return toRow({
		_id: (await col.insertOne(doc)).insertedId,
		...doc
	});
}
async function setTestimonialStatus(id, status) {
	const col = await getCollection();
	const { ObjectId } = await import("../_libs/mongodb.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	await col.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
}
async function deleteTestimonial(id) {
	const col = await getCollection();
	const { ObjectId } = await import("../_libs/mongodb.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	await col.deleteOne({ _id: new ObjectId(id) });
}
//#endregion
export { createTestimonial, deleteTestimonial, listTestimonials, setTestimonialStatus };
