import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  Copy,
  FolderInput,
  Loader2,
  Pencil,
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
  setMediaCaptionFn,
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

/**
 * Strip an image extension for a friendlier default caption ("IMG_2041.jpg"
 * → "IMG 2041"). Used to pre-fill the per-photo title in the upload dialog.
 */
function friendlyName(name: string): string {
  return name
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[_-]+/g, " ")
    .trim();
}

/** A file picked for upload but not sent yet — captions are editable first. */
type StagedItem = {
  key: string;
  file: File;
  previewUrl: string;
  title: string;
  description: string;
};

/** Inline title/description editor for one photo (studio-only). */
function CaptionEditor({
  row,
  busy,
  onSave,
}: {
  row: MediaRow;
  busy: boolean;
  onSave: (title: string, description: string) => Promise<boolean>;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(row.title);
  const [description, setDescription] = useState(row.description);
  const [saving, setSaving] = useState(false);

  // Re-sync local draft state when a different photo renders into this slot.
  useEffect(() => {
    setTitle(row.title);
    setDescription(row.description);
    setOpen(false);
  }, [row.id, row.title, row.description]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
      >
        <Pencil className="h-3 w-3" />
        {row.title ? "Edit caption" : "Add caption"}
      </button>
    );
  }

  return (
    <form
      className="mt-2 space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSaving(true);
        void onSave(title, description).then((ok) => {
          setSaving(false);
          if (ok) setOpen(false);
        });
      }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title (optional)"
        maxLength={80}
        className="w-full border border-input bg-background px-2 py-1.5 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        maxLength={500}
        rows={2}
        className="w-full resize-none border border-input bg-background px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={saving || busy}
          className="inline-flex items-center gap-1 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
          Save
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

/** One editable row in the pre-upload staging list. */
function StagingRow({
  item,
  busy,
  onChange,
  onRemove,
}: {
  item: StagedItem;
  busy: boolean;
  onChange: (patch: Partial<Pick<StagedItem, "title" | "description">>) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-start gap-3 border-b border-border/60 py-2 last:border-b-0">
      <img
        src={item.previewUrl}
        alt=""
        className="h-12 w-12 shrink-0 border border-border object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="truncate text-xs font-semibold">{item.title || item.file.name}</span>
          <span className="shrink-0 text-[10px] text-muted-foreground">
            {formatBytes(item.file.size)}
          </span>
        </div>
        {open ? (
          <div className="mt-1.5 space-y-1.5">
            <input
              value={item.title}
              disabled={busy}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="Title (optional)"
              maxLength={80}
              className="w-full border border-input bg-background px-2 py-1 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
            <textarea
              value={item.description}
              disabled={busy}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Description (optional)"
              maxLength={500}
              rows={2}
              className="w-full resize-none border border-input bg-background px-2 py-1 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Done
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            disabled={busy}
            className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary disabled:opacity-50"
          >
            <Pencil className="h-3 w-3" />
            {item.title || item.description ? "Edit caption" : "Add caption"}
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={onRemove}
        disabled={busy}
        aria-label={`Remove ${item.file.name} from the upload list`}
        className="mt-1 text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Shared "you shall not pass" screen — links to the login at /admin. */
function AccessDenied() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm border border-border bg-card p-8 text-center">
        <p className="section-kicker">Admin only</p>
        <h1 className="editorial-title mt-3 text-3xl">
          Sign in <em>required.</em>
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The studio is protected. Sign in with the admin password to continue.
        </p>
        <Link
          to="/admin"
          className="mt-6 inline-flex items-center justify-center bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          Go to sign in
        </Link>
      </div>
    </main>
  );
}

function StudioPage() {
  const [authError, setAuthError] = useState(false);
  const [rows, setRows] = useState<MediaRow[] | null>(null);
  const [album, setAlbum] = useState("All");
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadAlbum, setUploadAlbum] = useState("White Desert");
  const [dragOver, setDragOver] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [staged, setStaged] = useState<StagedItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Object URLs are mutable handles — free the blob when a staged row leaves
  // the list (removed by hand or after its upload starts).
  const stageFiles = useCallback((files: File[]) => {
    const images = files.filter((f) => /^image\//.test(f.type));
    if (images.length === 0) return;
    setStaged((prev) => [
      ...prev,
      ...images.map((file, i) => ({
        key: `${Date.now()}-${prev.length + i}-${file.name}`,
        file,
        previewUrl: URL.createObjectURL(file),
        title: friendlyName(file.name),
        description: "",
      })),
    ]);
  }, []);

  const removeStaged = useCallback((key: string) => {
    setStaged((prev) => {
      const hit = prev.find((x) => x.key === key);
      if (hit) URL.revokeObjectURL(hit.previewUrl);
      return prev.filter((x) => x.key !== key);
    });
  }, []);

  // Drop blob URLs on unmount so refresh/navigation doesn't leak them.
  useEffect(
    () => () => {
      setStaged((prev) => {
        for (const x of prev) URL.revokeObjectURL(x.previewUrl);
        return prev;
      });
    },
    [],
  );

  const refresh = useCallback(async () => {
    setError("");
    try {
      const data = await getMediaLibrary({ data: { album } });
      setRows(data as unknown as MediaRow[]);
    } catch (err) {
      if (err instanceof Error && /Not authorized/.test(err.message)) {
        setAuthError(true);
        return;
      }
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

  async function saveCaption(row: MediaRow, title: string, description: string): Promise<boolean> {
    setBusyId(row.id);
    try {
      await setMediaCaptionFn({ data: { id: row.id, title, description } });
      setRows((prev) =>
        (prev ?? []).map((r) =>
          r.id === row.id
            ? {
                ...r,
                title: title.trim().slice(0, 80),
                description: description.trim().slice(0, 500),
              }
            : r,
        ),
      );
      return true;
    } catch {
      setError("Could not save the caption — try again.");
      return false;
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

  async function uploadFiles(items: StagedItem[]) {
    if (items.length === 0) return;
    setQueue((q) => [
      ...q,
      ...items.map((s) => ({
        key: s.key,
        name: s.title || s.file.name,
        file: s.file,
        status: "queued" as const,
        progress: 0,
      })),
    ]);
    setStaged([]);
    for (const s of items) URL.revokeObjectURL(s.previewUrl);
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
              title: item.title.trim().slice(0, 80),
              description: item.description.trim().slice(0, 500),
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

  if (authError) return <AccessDenied />;

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
        if (!uploading) stageFiles([...e.dataTransfer.files]);
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
              stageFiles([...(e.target.files ?? [])]);
              e.target.value = "";
            }}
          />
        </div>

        {/* Staging list — pick files, caption them, then start the upload by hand */}
        {staged.length > 0 && (
          <div className="mt-4 border border-primary/60 bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em]">
                Ready to upload — {staged.length} {staged.length === 1 ? "photo" : "photos"} →{" "}
                {uploadAlbum}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => {
                    for (const s of staged) URL.revokeObjectURL(s.previewUrl);
                    setStaged([]);
                  }}
                  className="border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-destructive hover:text-destructive disabled:opacity-50"
                >
                  Clear list
                </button>
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => void uploadFiles([...staged])}
                  className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {uploading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                  Start upload
                </button>
              </div>
            </div>
            <div className="mt-2">
              {staged.map((item) => (
                <StagingRow
                  key={item.key}
                  item={item}
                  busy={false}
                  onChange={(patch) =>
                    setStaged((prev) =>
                      prev.map((x) => (x.key === item.key ? { ...x, ...patch } : x)),
                    )
                  }
                  onRemove={() => removeStaged(item.key)}
                />
              ))}
            </div>
          </div>
        )}

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
                  {row.title || row.publicId.split("/").pop()}
                </span>
                {row.description && (
                  <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                    {row.description}
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {new Date(row.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}{" "}
                  · {row.width}×{row.height} · {formatBytes(row.bytes)}
                </span>
                <CaptionEditor
                  row={row}
                  busy={busyId === row.id}
                  onSave={(t, d) => saveCaption(row, t, d)}
                />
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
