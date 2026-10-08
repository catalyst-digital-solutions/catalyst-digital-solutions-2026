"use client";

export class ApiError extends Error {
  constructor(public status: number, public code: string, message?: string) {
    super(message || code);
  }
}

export async function api<T = Record<string, unknown>>(
  slug: string,
  path: string,
  init: { method?: string; body?: unknown; keepalive?: boolean; raw?: Blob; contentType?: string } = {},
): Promise<T> {
  const res = await fetch(`/api/onboarding/${slug}/${path}`, {
    method: init.method || "POST",
    credentials: "same-origin",
    keepalive: init.keepalive,
    headers: { "Content-Type": init.contentType || "application/json" },
    body: init.raw ?? (init.body !== undefined ? JSON.stringify(init.body) : undefined),
  });
  let data: Record<string, unknown> = {};
  try {
    data = await res.json();
  } catch {
    /* empty */
  }
  if (!res.ok) throw new ApiError(res.status, String(data.error || "error"), data.message as string | undefined);
  return data as T;
}

/** PUT a file to a signed upload URL with progress (fetch has no upload progress). */
export function putWithProgress(
  url: string,
  headers: Record<string, string>,
  file: Blob,
  onProgress: (pct: number) => void,
): { promise: Promise<void>; abort: () => void } {
  const xhr = new XMLHttpRequest();
  const promise = new Promise<void>((resolve, reject) => {
    xhr.open("PUT", url);
    Object.entries(headers).forEach(([k, v]) => xhr.setRequestHeader(k, v));
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.min(99, (e.loaded / e.total) * 100));
    };
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new ApiError(xhr.status, "upload_failed")));
    xhr.onerror = () => reject(new ApiError(0, "network"));
    xhr.onabort = () => reject(new ApiError(0, "aborted"));
    xhr.send(file);
  });
  return { promise, abort: () => xhr.abort() };
}
