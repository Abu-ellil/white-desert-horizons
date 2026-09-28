import type { Collection } from "mongodb";

import { getAnyCollection } from "@/lib/db";

/**
 * Raw visit log — one row per recorded pageview (throttled per visitor+path).
 * MongoDB Atlas free tier; kept separate from testimonials via getAnyCollection.
 *
 * Identity: an HttpOnly cookie (wdh_vid) set by the tracking server function
 * marks a unique visitor. IP + a cached ipwho.is lookup carry the geography.
 * The log never leaves the admin panel — it is not a public surface.
 */

export type VisitDoc = {
  ts: Date;
  sid: string; // visitor cookie id
  path: string;
  ref: string;
  ip: string;
  country: string; // ISO-3166 alpha-2, "" when unknown
  countryName: string;
  city: string;
  device: "Mobile" | "Tablet" | "Desktop";
};

export type VisitStats = {
  totals: {
    views: number;
    visitors: number;
    countries: number;
    today: number;
    weekViews: number;
    weekVisitors: number;
  };
  byCountry: { code: string; name: string; flag: string; visitors: number; views: number }[];
  byCity: { city: string; country: string; visitors: number }[];
  byPath: { path: string; views: number }[];
  recent: {
    id: string;
    ts: string;
    path: string;
    country: string;
    countryName: string;
    flag: string;
    city: string;
    ip: string;
    ref: string;
    device: string;
  }[];
  generatedAt: string;
};

function getCollection(): Promise<Collection<VisitDoc>> {
  return getAnyCollection("visits");
}

/** ISO-3166 alpha-2 → regional-indicator flag emoji ("" → globe). */
export function flagEmoji(code: string): string {
  const cc = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return "🌐";
  return String.fromCodePoint(...[...cc].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

export async function insertVisit(doc: VisitDoc): Promise<void> {
  const col = await getCollection();
  await col.insertOne(doc);
}

export async function getVisitStats(): Promise<VisitStats> {
  const col = await getCollection();

  const dayMs = 24 * 60 * 60 * 1000;
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const weekAgo = new Date(Date.now() - 7 * dayMs);

  const [totalsAgg, byCountryAgg, byCityAgg, byPathAgg, recentDocs, today, weekViews, weekSids] =
    await Promise.all([
      col
        .aggregate([
          {
            $group: {
              _id: null,
              views: { $sum: 1 },
              sids: { $addToSet: "$sid" },
              countries: { $addToSet: "$country" },
            },
          },
          {
            $project: {
              _id: 0,
              views: 1,
              visitors: { $size: "$sids" },
              countries: {
                $size: {
                  $filter: { input: "$countries", cond: { $ne: ["$$this", ""] } },
                },
              },
            },
          },
        ])
        .toArray(),
      col
        .aggregate([
          {
            $group: {
              _id: { code: "$country", name: "$countryName" },
              visitors: { $addToSet: "$sid" },
              views: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              code: "$_id.code",
              name: "$_id.name",
              visitors: { $size: "$visitors" },
              views: 1,
            },
          },
          { $sort: { visitors: -1, views: -1 } },
          { $limit: 20 },
        ])
        .toArray(),
      col
        .aggregate([
          {
            $match: { city: { $ne: "" } },
          },
          {
            $group: {
              _id: { city: "$city", country: "$countryName" },
              visitors: { $addToSet: "$sid" },
            },
          },
          {
            $project: {
              _id: 0,
              city: "$_id.city",
              country: "$_id.country",
              visitors: { $size: "$visitors" },
            },
          },
          { $sort: { visitors: -1 } },
          { $limit: 10 },
        ])
        .toArray(),
      col
        .aggregate([
          { $group: { _id: "$path", views: { $sum: 1 } } },
          { $sort: { views: -1 } },
          { $limit: 10 },
        ])
        .toArray(),
      col.find().sort({ ts: -1 }).limit(30).toArray(),
      col.countDocuments({ ts: { $gte: startOfDay } }),
      col.countDocuments({ ts: { $gte: weekAgo } }),
      col.distinct("sid", { ts: { $gte: weekAgo } }),
    ]);

  const t = totalsAgg[0] as Record<string, number> | undefined;

  return {
    totals: {
      views: t?.["views"] ?? 0,
      visitors: t?.["visitors"] ?? 0,
      countries: t?.["countries"] ?? 0,
      today,
      weekViews,
      weekVisitors: weekSids.length,
    },
    byCountry: byCountryAgg.map((r) => ({
      code: String(r["code"] ?? ""),
      name: String(r["name"] ?? "") || "Unknown",
      flag: flagEmoji(String(r["code"] ?? "")),
      visitors: Number(r["visitors"] ?? 0),
      views: Number(r["views"] ?? 0),
    })),
    byCity: byCityAgg.map((r) => ({
      city: String(r["city"] ?? "—"),
      country: String(r["country"] ?? ""),
      visitors: Number(r["visitors"] ?? 0),
    })),
    byPath: byPathAgg.map((r) => ({
      path: String(r["_id"] ?? "/"),
      views: Number(r["views"] ?? 0),
    })),
    recent: recentDocs.map((d) => ({
      id: String(d._id),
      ts: d.ts instanceof Date ? d.ts.toISOString() : String(d.ts ?? ""),
      path: String(d.path ?? "/"),
      country: String(d.country ?? ""),
      countryName: String(d.countryName ?? "") || "Unknown",
      flag: flagEmoji(String(d.country ?? "")),
      city: String(d.city ?? ""),
      ip: String(d.ip ?? ""),
      ref: String(d.ref ?? ""),
      device: String(d.device ?? "Desktop"),
    })),
    generatedAt: new Date().toISOString(),
  };
}
