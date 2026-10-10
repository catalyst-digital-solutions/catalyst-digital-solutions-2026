"use client";

import { jitter, randomKey } from "@/lib/onboarding/client/util";
import { useEffect, useRef, useState } from "react";
import type { FieldDef } from "@/config/onboarding/types";
import { ApiError, api, putWithProgress } from "@/lib/onboarding/client/api";
import type { UploadedFileRef } from "@/lib/onboarding/types";
import { useOnboarding } from "../context";
import { Check, Close, FileIcon, Lock, UploadIcon } from "../icons";

const MAX = 50 * 1024 * 1024;
const fmtSize = (b: number) => (b >= 1e6 ? (b / 1e6).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1e3)) + " KB");
const extOf = (n: string) => (n.includes(".") ? n.split(".").pop()!.toLowerCase() : "");

interface Pending {
  key: string;
  name: string;
  size: number;
  pct: number;
  error?: string;
  category: string;
  abort?: () => void;
}

/**
 * Drag/drop zone → validate type/size → signed upload URL → direct PUT to the
 * private bucket with progress → server confirms the object → "Uploaded".
 */
export function UploadZone({ f }: { f: FieldDef }) {
  const { slug, preview, config, answers, setFiles, onSessionExpired } = useOnboarding();
  const files = answers[f.id]?.files || [];
  const [pending, setPending] = useState<Pending[]>([]);
  const [drag, setDrag] = useState(false);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const accept = f.accept || config.defaultAccept;
  const acceptList = accept.split(",").map((s) => s.trim().replace(/^\./, "").toLowerCase());
  const formats = (accept.includes(".pdf") ? "PDF, Word, spreadsheets, images, or ZIP" : "JPG, PNG, HEIC, or ZIP") + " · up to 50 MB each";
  const inputId = `up-${f.id}`;

  const patchPending = (key: string, p: Partial<Pending>) => setPending((list) => list.map((x) => (x.key === key ? { ...x, ...p } : x)));
  const dropPending = (key: string) => setPending((list) => list.filter((x) => x.key !== key));

  async function uploadOne(file: File, key: string, getCategory: () => string) {
    if (preview) {
      for (let p = 0; p < 100; p += jitter(12, 14)) {
        patchPending(key, { pct: p });
        await new Promise((r) => setTimeout(r, 140));
      }
      setFiles(f.id, (list) => [...list, { id: key, name: file.name, size: file.size, type: file.type, category: getCategory() }]);
      dropPending(key);
      return;
    }
    try {
      const created = await api<{ fileId: string; upload: { url: string; headers: Record<string, string> } }>(slug, "uploads", {
        body: { fieldId: f.id, name: file.name, size: file.size, category: getCategory() || undefined },
      });
      const put = putWithProgress(created.upload.url, created.upload.headers, file, (pct) => patchPending(key, { pct }));
      patchPending(key, { abort: put.abort });
      await put.promise;
      const done = await api<{ file: UploadedFileRef }>(slug, `uploads/${created.fileId}/complete`);
      const cat = getCategory();
      if (cat && cat !== done.file.category) {
        await api(slug, `uploads/${created.fileId}`, { method: "PATCH", body: { category: cat } }).catch(() => undefined);
        done.file.category = cat;
      }
      setFiles(f.id, (list) => [...list.filter((x) => x.id !== done.file.id), done.file]);
      dropPending(key);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) onSessionExpired();
      if (e instanceof ApiError && e.code === "aborted") return dropPending(key);
      patchPending(key, { error: e instanceof ApiError && e.code === "invalid" && e.message !== "invalid" ? e.message : "Upload didn’t finish. Remove it and try again.", abort: undefined });
    }
  }

  const add = (list: FileList | null | undefined) => {
    const arr = Array.from(list || []);
    for (const file of arr) {
      const key = randomKey();
      const ext = extOf(file.name);
      let error: string | undefined;
      if (!ext || !acceptList.includes(ext)) error = "That file type isn’t supported here.";
      else if (file.size > MAX) error = "That file is larger than 50 MB.";
      else if (file.size === 0) error = "That file looks empty.";
      setPending((p) => [...p, { key, name: file.name, size: file.size, pct: 0, error, category: "" }]);
      if (error) continue;
      const getCategory = () => pendingRef.current.find((x) => x.key === key)?.category || "";
      // Upload sequentially per zone to keep mobile connections happy.
      queue.current = queue.current.then(() => uploadOne(file, key, getCategory));
    }
  };

  const pendingRef = useRef(pending);
  useEffect(() => {
    pendingRef.current = pending;
  }, [pending]);

  const remove = async (file: UploadedFileRef) => {
    setFiles(f.id, (list) => list.filter((x) => x.id !== file.id));
    if (preview) return;
    try {
      await api(slug, `uploads/${file.id}`, { method: "DELETE" });
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) onSessionExpired();
      setFiles(f.id, (list) => [...list, file]);
    }
  };

  const setCategory = async (file: UploadedFileRef, category: string) => {
    setFiles(f.id, (list) => list.map((x) => (x.id === file.id ? { ...x, category } : x)));
    if (preview) return;
    try {
      await api(slug, `uploads/${file.id}`, { method: "PATCH", body: { category } });
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) onSessionExpired();
    }
  };

  const catSelect = (value: string, onChange: (v: string) => void) =>
    f.categories ? (
      <select aria-label="File category" value={value} onChange={(e) => onChange(e.target.value)} className="onb-input min-h-11 flex-[1_1_200px] px-3 text-[14px]">
        <option value="">Choose a category</option>
        {f.categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    ) : null;

  const meta = (name: string, size: number) => {
    const ext = extOf(name).toUpperCase();
    return (ext ? ext + " · " : "") + fmtSize(size);
  };

  return (
    <>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          add(e.dataTransfer?.files);
        }}
        className="relative flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-xl px-5 py-[clamp(24px,4vw,36px)] text-center transition-[border-color,background] duration-150 hover:!border-blue hover:!bg-[#F3F8FD]"
        style={{ border: `1.5px dashed ${drag ? "#1E6FE6" : "#AFC0D2"}`, background: drag ? "#EEF5FD" : "#FAFCFE" }}
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-panel-confirmed">
          <UploadIcon />
        </span>
        <span className="text-[16px] font-semibold text-navy">
          Drag files here, or <span className="text-blue-link underline underline-offset-[3px]">browse</span>
        </span>
        <span className="text-[13px] leading-[1.5] text-caption">{formats}</span>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold leading-[1.4] text-navy-deep">
          <Lock className="mt-0.5 flex-none" />
          Stored privately. Only Catalyst can see these files.
        </span>
        <input
          id={inputId}
          type="file"
          multiple
          accept={accept}
          onChange={(e) => {
            add(e.target.files);
            e.target.value = "";
          }}
          className="pointer-events-none absolute size-px opacity-0"
        />
      </label>
      {(files.length > 0 || pending.length > 0) && (
        <ul className="m-0 flex list-none flex-col gap-2 p-0" aria-label="Files">
          {files.map((x) => (
            <li key={x.id} className="flex flex-col gap-2 rounded-lg border border-line bg-[#FAFBFC] py-2.5 pl-3.5 pr-2">
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
                <FileIcon />
                <div className="flex min-w-0 flex-[1_1_160px] flex-col gap-0.5">
                  <span className="truncate text-[15px] font-semibold text-navy">{x.name}</span>
                  <span className="text-[13px] text-caption">{meta(x.name, x.size)}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D6E7F8] py-[3px] pl-2 pr-2.5 text-[13px] font-bold text-navy-deep">
                  <Check size={12} stroke={2.8} />
                  Uploaded
                </span>
                {catSelect(x.category || "", (v) => setCategory(x, v))}
                <button type="button" aria-label={`Remove ${x.name}`} onClick={() => remove(x)} className="flex size-11 flex-none cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-secondary hover:bg-hover hover:text-navy">
                  <Close />
                </button>
              </div>
            </li>
          ))}
          {pending.map((x) => (
            <li key={x.key} className="flex flex-col gap-2 rounded-lg border border-line bg-[#FAFBFC] py-2.5 pl-3.5 pr-2">
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
                <FileIcon />
                <div className="flex min-w-0 flex-[1_1_160px] flex-col gap-0.5">
                  <span className="truncate text-[15px] font-semibold text-navy">{x.name}</span>
                  <span className="text-[13px]" style={{ color: x.error ? "#9A4615" : "#6B7685" }}>{x.error || meta(x.name, x.size)}</span>
                </div>
                {!x.error && <span className="text-[13px] font-semibold tabular-nums text-secondary">Uploading {Math.round(x.pct)}%</span>}
                {!x.error && catSelect(x.category, (v) => patchPending(x.key, { category: v }))}
                <button
                  type="button"
                  aria-label={`Remove ${x.name}`}
                  onClick={() => {
                    x.abort?.();
                    dropPending(x.key);
                  }}
                  className="flex size-11 flex-none cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-secondary hover:bg-hover hover:text-navy"
                >
                  <Close />
                </button>
              </div>
              {!x.error && (
                <div className="mb-0.5 ml-8 mr-1.5 h-1 overflow-hidden rounded-sm bg-[#E3E8EE]" role="progressbar" aria-valuenow={Math.round(x.pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`Uploading ${x.name}`}>
                  <div className="h-full rounded-sm bg-blue transition-[width] duration-150" style={{ width: `${Math.round(x.pct)}%` }} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
