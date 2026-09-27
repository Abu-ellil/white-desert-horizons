import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  Copy,
  FolderInput,
  Loader2,
  RefreshCw,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import {
  getMediaLibrary,
  getUploadSignature,
  moveMediaToAlbum,
  registerUploadedMedia,
  removeMedia,
  toggleMediaFavorite,
  type MediaRow,
} from "@/lib/studio";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [{ title: "Media Studio | WHITE DESERT HORIZONS" }],
  }),
  component: StudioPage,
});

const FALLBACK_ALBUMS = ["White Desert", "Camps", "Rock forms", "Black Desert"];

function formatBytes(n: number): string {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  if (n >= 1024) return `${Math.round(n / 1024)} KB`;
  return `${n} B`;
}

type QueueItem = {
  key: string;
  name: string;
  file: File;
  status: "queued" | "uploading" | "done" | "error";
  progress: number;
  error?: string;
};

function StudioPage() {
  const [rows, setRows] = useState<MediaRow[] | null>(null);
  const [album, setAlbum] = useState("All");
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadAlbum, setUploadAlbum] = useState("White Desert");
  const [dragOver, setDragOver] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(async () => {
    setError("");
    try {
      const data = await getMediaLibrary({ data: { album } });
      setRows(data as unknown as MediaRow[]);
    } catch (err) {
      setError(
        err instanceof Error && /not configured|MONGODB/.test(err.message)
          ? err.message
          : "Could not load the library. Check MONGODB_URI / CLOUDINARY_URL and the connection.",
      );
    }
  }, [album]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const albums = useMemo(() => {
    const fromRows = rows?.map((r) => r.album) ?? [];
    return [...new Set([...FALLBACK_ALBUMS, ...fromRows, "All"])].sort((a, b) =>
      a === "All" ? 1 : b === "All" ? -1 : a.localeCompare(b),
    );
  }, [rows]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of rows ?? []) map.set(r.album, (map.get(r.album) ?? 0) + 1);
    return map;
  }, [rows]);

  const totalBytes = useMemo(() => (rows ?? []).reduce((s, r) => s + r.bytes, 0), [rows]);

  const shown = useMemo(
    () => (rows ?? []).filter((r) => album === "All" || r.album === album),
    [rows, album],
  );

  async function copyUrl(row: MediaRow) {
    const delivery = row.url.replace("/upload/", "/upload/f_auto,q_auto/");
    try {
      await navigator.clipboard.writeText(delivery);
      setCopiedId(row.id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setError("Clipboard is blocked by the browser — copy the URL manually.");
    }
  }

  async function toggleFavorite(row: MediaRow) {
    setBusyId(row.id);
    try {
      await toggleMediaFavorite({ data: { id: row.id, favorite: !row.favorite } });
      setRows((prev) =>
        (prev ?? []).map((r) => (r.id === row.id ? { ...r, favorite: !r.favorite } : r)),
      );
    } catch {
      setError("Could not update the favorite — try again.");
    } finally {
      setBusyId(null);
    }
  }

  async function moveAlbum(row: MediaRow, target: string) {
    setBusyId(row.id);
    try {
      await moveMediaToAlbum({ data: { id: row.id, album: target } });
      await refresh();
    } catch {
      setError("Could not move the photo — try again.");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(row: MediaRow) {
    if (!window.confirm(`Delete "${row.publicId.split("/").pop()}" from Cloudinary permanently?`))
      return;
    setBusyId(row.id);
    try {
      await removeMedia({ data: { id: row.id } });
      await refresh();
    } catch (err) {
      setError(
        err instanceof Error && /not configured/.test(err.message)
          ? err.message
          : "Could not delete from Cloudinary — the photo is kept in the library.",
      );
    } finally {
      setBusyId(null);
    }
  }

  async function uploadFiles(files: File[]) {
    const images = files.filter((f) => /^image\//.test(f.type));
    if (images.length === 0) return;
    const items: QueueItem[] = images.map((file, i) => ({
      key: `${Date.now()}-${i}-${file.name}`,
      name: file.name,
      file,
      status: "queued",
      progress: 0,
    }));
    setQueue((q) => [...q, ...items]);
    setUploading(true);

    try {
      // One signature per batch (timestamp granularity is 1s — reuse is safe and required for XHR).
      const sig = await getUploadSignature({ data: { album: uploadAlbum } });
      for (const item of items) {
        setQueue((q) => q.map((x) => (x.key === item.key ? { ...x, status: "uploading" } : x)));
        try {
          const result = await new Promise<{
            public_id: string;
            secure_url: string;
            width: number;
            height: number;
            format: string;
            bytes: number;
          }>((resolve, reject) => {
            const form = new FormData();
            form.append("file", item.file);
            form.append("api_key", sig.apiKey);
            form.append("timestamp", String(sig.timestamp));
            form.append("signature", sig.signature);
            form.append("folder", sig.folder);
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`);
            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable)
                setQueue((q) =>
                  q.map((x) =>
                    x.key === item.key
                      ? { ...x, progress: Math.round((e.loaded / e.total) * 100) }
                      : x,
                  ),
                );
            };
            xhr.onload = () => {
              try {
                const json = JSON.parse(xhr.responseText);
                if (xhr.status >= 200 && xhr.status < 300 && json.secure_url) resolve(json);
                else reject(new Error(json?.error?.message ?? `Upload failed (${xhr.status})`));
              } catch {
                reject(new Error(`Upload failed (${xhr.status})`));
              }
            };
            xhr.onerror = () => reject(new Error("Network error during upload"));
            xhr.send(form);
          });

          await registerUploadedMedia({
            data: {
              publicId: result.public_id,
              url: result.secure_url,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
              album: uploadAlbum,
              tags: [],
            },
          });
          setQueue((q) =>
            q.map((x) => (x.key === item.key ? { ...x, status: "done", progress: 100 } : x)),
          );
        } catch (err) {
          setQueue((q) =>
            q.map((x) =>
              x.key === item.key
                ? { ...x, status: "error", error: err instanceof Error ? err.message : "Failed" }
                : x,
            ),
          );
        }
      }
      await refresh();
    } finally {
      setUploading(false);
    }
  }

  return (
    <main
      className="min-h-screen bg-background px-5 py-12 sm:px-8 lg:px-12"
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (!uploading) void uploadFiles([...e.dataTransfer.files]);
      }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="section-kicker">Media Studio</p>
            <h1 className="editorial-title mt-3 text-4xl sm:text-5xl">
              The desert, <em>organized.</em>
            </h1>
          </div>
          <button
            type="button"
            onClick={refresh}
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>

        {error && (
          <p className="mt-6 border border-red-300 bg-red-50 p-4 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        {/* Album rail */}
        <div className="mt-8 flex flex-wrap gap-2">
          {albums.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAlbum(a)}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                album === a
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {a}
              {a !== "All" && counts.get(a) ? (
                <span className="ml-2 opacity-70">{counts.get(a)}</span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Upload controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3 border border-border bg-card p-4">
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Album
            <select
              value={uploadAlbum}
              onChange={(e) => setUploadAlbum(e.target.value)}
              className="ml-3 border border-input bg-background px-3 py-2 text-xs font-semibold tracking-[0.06em] text-foreground"
            >
              {albums
                .filter((a) => a !== "All")
                .map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
            </select>
          </label>
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            Upload photos
          </button>
          <span className="text-xs text-muted-foreground">
            or drag &amp; drop anywhere on the page — goes to Cloudinary /white-desert/&lt;album&gt;
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            {shown.length} photos · {formatBytes(totalBytes)} in this view
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              void uploadFiles([...(e.target.files ?? [])]);
              e.target.value = "";
            }}
          />
        </div>

        {/* Upload queue */}
        {queue.length > 0 && (
          <div className="mt-4 border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em]">Upload queue</h2>
              <button
                type="button"
                onClick={() => setQueue((q) => q.filter((x) => x.status !== "uploading"))}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Clear finished uploads"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {queue.map((q) => (
              <div key={q.key} className="mt-3 flex items-center gap-3 text-xs">
                <span className="w-56 truncate font-semibold">{q.name}</span>
                <div className="h-0.5 flex-1 bg-muted">
                  <div
                    className={`h-full transition-all ${q.status === "error" ? "bg-destructive" : "bg-primary"}`}
                    style={{ width: `${q.status === "done" ? 100 : q.progress}%` }}
                  />
                </div>
                <span className="w-40 text-right uppercase tracking-[0.08em] text-muted-foreground">
                  {q.status === "done" && <span className="text-primary">Uploaded ✓</span>}
                  {q.status === "uploading" && `${q.progress}%`}
                  {q.status === "queued" && "Queued"}
                  {q.status === "error" && (
                    <span className="text-destructive" title={q.error}>
                      Failed
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Grid */}
        {rows === null && !error && <p className="mt-10 text-sm text-muted-foreground">Loading…</p>}

        {rows !== null && shown.length === 0 && (
          <div
            className={`mt-10 border border-dashed p-12 text-center transition-colors ${
              dragOver ? "border-primary bg-surface-warm/40" : "border-border"
            }`}
          >
            <p className="text-sm text-muted-foreground">
              No photographs here yet — drop images anywhere on this page or press{" "}
              <span className="font-semibold text-foreground">Upload photos</span>.
            </p>
          </div>
        )}

        <div className="mt-8 columns-2 gap-4 md:columns-3 xl:columns-4 [&>*]:mb-4">
          {shown.map((row) => (
            <figure
              key={row.id}
              className={`group relative break-inside-avoid border bg-card transition-opacity ${
                busyId === row.id ? "opacity-50" : ""
              } ${dragOver ? "ring-1 ring-primary" : ""}`}
            >
              <div className="overflow-hidden">
                <img
                  src={row.url.replace("/upload/", "/upload/f_auto,q_auto,w_640/")}
                  alt={row.album}
                  loading="lazy"
                  className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="border-t border-border px-3 py-2">
                <span className="block truncate text-xs font-semibold">
                  {row.publicId.split("/").pop()}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {new Date(row.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}{" "}
                  · {row.width}×{row.height} · {formatBytes(row.bytes)}
                </span>
              </figcaption>

              {/* Hover actions */}
              <div className="absolute inset-x-0 top-2 flex justify-end gap-1 px-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => void toggleFavorite(row)}
                  aria-label="Toggle favorite"
                  className={`flex h-8 w-8 items-center justify-center backdrop-blur transition-colors ${
                    row.favorite
                      ? "bg-primary text-primary-foreground opacity-100"
                      : "bg-black/40 text-white hover:bg-black/60"
                  }`}
                >
                  <Star className={`h-3.5 w-3.5 ${row.favorite ? "fill-current" : ""}`} />
                </button>
                <button
                  type="button"
                  onClick={() => void copyUrl(row)}
                  aria-label="Copy delivery URL"
                  className="flex h-8 w-8 items-center justify-center bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
                >
                  {copiedId === row.id ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => void remove(row)}
                  aria-label="Delete from Cloudinary"
                  className="flex h-8 w-8 items-center justify-center bg-black/40 text-white backdrop-blur transition-colors hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="absolute inset-x-0 bottom-9 flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
                  <FolderInput className="h-3 w-3" />
                  <select
                    value={row.album}
                    onChange={(e) => void moveAlbum(row, e.target.value)}
                    className="bg-transparent font-semibold text-white outline-none [&>option]:text-foreground"
                  >
                    {albums
                      .filter((a) => a !== "All")
                      .map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                  </select>
                </span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
