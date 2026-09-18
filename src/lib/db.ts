import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

/**
 * SQLite via node:sqlite (built into Node 22+, no dependency).
 * The database file lives outside `src/` at data/testimonials.db so Vite
 * never tries to bundle it. Dev and prod both resolve it relative to the
 * project root (process.cwd() when running `vite dev` / the built server).
 */

let db: DatabaseSync | null = null;

export type TestimonialRow = {
  id: number;
  name: string;
  country: string | null;
  program: string | null;
  rating: number;
  quote: string;
  approved: number;
  created_at: string;
};

export function getDb(): DatabaseSync {
  if (db) return db;
  const dataDir = path.join(process.cwd(), "data");
  fs.mkdirSync(dataDir, { recursive: true });
  db = new DatabaseSync(path.join(dataDir, "testimonials.db"));
  db.exec(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      country TEXT,
      program TEXT,
      rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      quote TEXT NOT NULL,
      approved INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

export function listTestimonials(onlyApproved: boolean): TestimonialRow[] {
  const stmt = getDb().prepare(
    onlyApproved
      ? "SELECT * FROM testimonials WHERE approved = 1 ORDER BY created_at DESC"
      : "SELECT * FROM testimonials ORDER BY approved ASC, created_at DESC",
  );
  return stmt.all() as unknown as TestimonialRow[];
}

export function createTestimonial(input: {
  name: string;
  country?: string | null;
  program?: string | null;
  rating: number;
  quote: string;
}): TestimonialRow {
  const name = String(input.name).trim().slice(0, 80);
  const country = input.country ? String(input.country).trim().slice(0, 80) : null;
  const program = input.program ? String(input.program).trim().slice(0, 120) : null;
  const rating = Math.min(5, Math.max(1, Math.round(Number(input.rating))));
  const quote = String(input.quote).trim().slice(0, 1000);
  if (!name || !quote) throw new Error("Name and review text are required");
  if (!Number.isFinite(rating)) throw new Error("Invalid rating");
  const stmt = getDb().prepare(
    "INSERT INTO testimonials (name, country, program, rating, quote) VALUES (?, ?, ?, ?, ?)",
  );
  const res = stmt.run(name, country, program, rating, quote);
  const inserted = getDb()
    .prepare("SELECT * FROM testimonials WHERE id = ?")
    .get(res.lastInsertRowid) as unknown as TestimonialRow;
  return inserted;
}

export function setTestimonialApproval(id: number, approved: boolean): void {
  getDb().prepare("UPDATE testimonials SET approved = ? WHERE id = ?").run(approved ? 1 : 0, id);
}

export function deleteTestimonial(id: number): void {
  getDb().prepare("DELETE FROM testimonials WHERE id = ?").run(id);
}
