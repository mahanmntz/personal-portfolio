// Extracts a clean @handle from a social URL — works for x.com, twitter.com, etc.
// Returns null when the URL is missing/invalid so callers can hide the @handle.
export function socialHandle(url?: string | null): string | null {
  if (!url) return null;
  try {
    const path = new URL(url).pathname;
    const handle = path.split("/").filter(Boolean).pop();
    return handle ? handle.replace(/^@/, "") : null;
  } catch {
    const handle = url.split("/").filter(Boolean).pop();
    return handle ? handle.replace(/^@/, "") : null;
  }
}
