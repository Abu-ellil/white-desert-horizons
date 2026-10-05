import { useState } from "react";
import { Camera, Check, Loader2, ShieldCheck, Upload } from "lucide-react";

import { compressImage } from "@/lib/image-compress";

/**
 * Public photo submission form — a visitor sends a photo, the owner approves it
 * in /studio before it appears anywhere. Same lifecycle as testimonials.
 *
 * The upload itself goes straight to Cloudinary with a short-lived signature
 * (the bytes never touch this server), then only the metadata is posted to
 * `submitPhoto`, which re-validates everything and stores it as `pending`.
 *
 * Client-side compression runs first — a 12 MB phone photo becomes ~300 KB
 * before it leaves the visitor's device.
 */

type Phase = "idle" | "compressing" | "uploading" | "registering" | "done";

const MAX_BYTES = 25 * 1024 * 1024; // refuse absurd files before compressing

/**
 * Mirrors `findLinkIssues` in @/lib/submissions. The server is authoritative;
 * this only avoids a pointless round-trip and explains the refusal up front.
 */
const LINK_PATTERNS: RegExp[] = [
  /\b(?:https?|ftp|ftps|mailto|tel|sms|news|irc|gemini|magnet|bitcoin|wallet)\s*:/i,
  /\bwww\.[a-z0-9-]+\.[a-z]{2,}/i,
  /\b[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9-]+){1,4}\/(?:[^\s]*)/i,
  /(^|\s)@[a-z0-9._-]{2,}/i,
  /\b(?:t\.me|telegram\.me|wa\.me|whatsapp\.com|chat\.whatsapp\.com|viber\.com|invite\.?)/i,
  /\b(?:bit\.ly|tinyurl\.com|shorturl|ow\.ly|t\.co|is\.gd|cutt\.ly|rebrand\.ly|linktr\.ee|linkvertise|lnk\.to|soo\.gd|shorturl\.com|adf\.ly|shorte\.st)\b/i,
  /h\s*t\s*t\s*p/i,
  /\(\s*(?:\.|dot|at)\s*(?:com|net|org|io|co|me|ru|xyz|shop|site)\s*\)/i,
  /[a-z0-9-]+\s*(?:\.|dot|\[\.\])\s*(?:com|net|org|io|co|ru|xyz|shop|site|app|link)\b/i,
];

function hasLink(text: string): boolean {
  return LINK_PATTERNS.some((re) => re.test(text));
}

export function SubmitPhoto() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [author, setAuthor] = useState("");
  const [caption, setCaption] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const busy = phase === "compressing" || phase === "uploading" || phase === "registering";
  const linkInInput = hasLink(author) || hasLink(caption);
  const canSubmit = Boolean(file) && author.trim().length >= 2 && !linkInInput && !busy;

  function pick(next: File | null) {
    setError("");
    if (!next) return;
    if (!/^image\//.test(next.type)) {
      setError("That file isn't an image.");
      return;
    }
    if (next.size > MAX_BYTES) {
      setError("That photo is over 25 MB — please pick a smaller one.");
      return;
    }
    setFile(next);
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(next);
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !canSubmit) return;
    setError("");

    try {
      setPhase("compressing");
      const { file: prepared } = await compressImage(file);

      setPhase("uploading");
      const { getSubmissionUploadSignature } = await import("@/lib/submissions");
      const sig = await getSubmissionUploadSignature();

      const uploaded = await new Promise<{
        public_id: string;
        secure_url: string;
        width: number;
        height: number;
        format: string;
        bytes: number;
      }>((resolve, reject) => {
        const form = new FormData();
        form.append("file", prepared);
        form.append("api_key", sig.apiKey);
        form.append("timestamp", String(sig.timestamp));
        form.append("signature", sig.signature);
        form.append("folder", sig.folder);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`);
        xhr.onload = () => {
          try {
            const json = JSON.parse(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300 && json.secure_url) resolve(json);
            else reject(new Error(json?.error?.message ?? `Upload failed (${xhr.status})`));
          } catch {
            reject(new Error(`Upload failed (${xhr.status})`));
          }
        };
        xhr.onerror = () => reject(new Error("Network error during upload."));
        xhr.send(form);
      });

      setPhase("registering");
      const { submitPhoto } = await import("@/lib/submissions");
      await submitPhoto({
        data: {
          publicId: uploaded.public_id,
          url: uploaded.secure_url,
          width: uploaded.width,
          height: uploaded.height,
          format: uploaded.format,
          bytes: uploaded.bytes,
          author: author.trim(),
          caption: caption.trim(),
        },
      });

      setPhase("done");
    } catch (err) {
      setPhase("idle");
      const message = err instanceof Error ? err.message : "Upload failed — try again.";
      setError(
        /link/i.test(message)
          ? "Links aren't allowed — keep it about the journey."
          : message.length > 160
            ? "Upload failed — try again."
            : message,
      );
    }
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    setAuthor("");
    setCaption("");
    setPhase("idle");
    setError("");
  }

  if (phase === "done") {
    return (
      <div className="border border-primary/30 bg-primary/5 p-8 text-center">
        <Check className="mx-auto h-8 w-8 text-primary" />
        <p className="mt-4 font-serif text-xl">Thank you — your photo is with our team.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We review every submission before it goes on the site. You&apos;ll see it in the gallery
          once it&apos;s approved.
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-6 text-xs uppercase tracking-[0.14em] text-primary underline underline-offset-4"
        >
          Close
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border border-primary/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <Camera className="h-3.5 w-3.5" />
        Share your desert photo
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="w-full max-w-lg border border-line bg-card p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-serif text-2xl">Share your moment</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Been to the White Desert? Send a photo — we review every submission before it appears.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            reset();
            setOpen(false);
          }}
          aria-label="Close"
          className="-mr-1 -mt-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          ✕
        </button>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          pick(e.dataTransfer.files?.[0] ?? null);
        }}
        className={`mt-6 border border-dashed p-6 text-center transition-colors ${
          dragging ? "border-primary bg-primary/5" : "border-line"
        }`}
      >
        {preview ? (
          <div className="space-y-3">
            <img
              src={preview}
              alt="Your selected photo"
              className="mx-auto max-h-48 object-contain"
            />
            <button
              type="button"
              onClick={reset}
              className="text-xs uppercase tracking-[0.12em] text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Choose a different photo
            </button>
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              Drag a photo here, or{" "}
              <label className="cursor-pointer text-primary underline underline-offset-4">
                browse
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => pick(e.target.files?.[0] ?? null)}
                />
              </label>
            </p>
            <p className="mt-2 text-xs text-muted-foreground/70">
              JPG or PNG · we compress it for you
            </p>
          </>
        )}
      </div>

      {/* Fields */}
      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="submit-author" className="text-xs uppercase tracking-[0.12em]">
            Your name
          </label>
          <input
            id="submit-author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={60}
            placeholder="How should we credit you?"
            aria-invalid={hasLink(author)}
            className={`mt-2 w-full border bg-background px-3 py-2 text-sm outline-none transition-colors ${
              hasLink(author) ? "border-red-400/60" : "border-line focus:border-primary"
            }`}
          />
        </div>
        <div>
          <label htmlFor="submit-caption" className="text-xs uppercase tracking-[0.12em]">
            Caption <span className="normal-case text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="submit-caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength={220}
            rows={3}
            placeholder="Tell us about the moment — no links, please."
            aria-invalid={linkInInput}
            className={`mt-2 w-full resize-none border bg-background px-3 py-2 text-sm leading-relaxed outline-none transition-colors ${
              linkInInput ? "border-red-400/60" : "border-line focus:border-primary"
            }`}
          />
          <p className="mt-1 text-right text-xs text-muted-foreground/70">{caption.length}/220</p>
        </div>
      </div>

      {linkInInput && (
        <p className="mt-3 text-xs text-red-300">
          Links aren&apos;t allowed — keep it about the journey.
        </p>
      )}
      {error && <p className="mt-3 text-xs text-red-300">{error}</p>}

      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex flex-1 items-center justify-center gap-2 bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-40"
        >
          {busy ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              {phase === "compressing"
                ? "Compressing"
                : phase === "uploading"
                  ? "Uploading"
                  : "Sending"}
            </>
          ) : (
            <>
              <Upload className="h-3.5 w-3.5" />
              Send for review
            </>
          )}
        </button>
        <span className="inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground/70">
          <ShieldCheck className="h-3.5 w-3.5" />
          Reviewed
        </span>
      </div>
    </form>
  );
}
