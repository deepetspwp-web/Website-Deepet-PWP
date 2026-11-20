'use client';

import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2, X, AlertCircle, CheckCircle2 } from 'lucide-react';

export const inputCls =
    'w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900';
export const btnPrimary =
    'inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-2xs transition-colors cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed';
export const btnSecondary =
    'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md shadow-2xs transition-colors cursor-pointer disabled:opacity-50';
export const btnDanger =
    'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-semibold rounded-md transition-colors cursor-pointer disabled:opacity-50';

export function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
    return (
        <label className="block text-xs font-semibold text-slate-700 mb-1">
            {children}
            {hint && <span className="font-normal text-slate-400"> — {hint}</span>}
        </label>
    );
}

export function Notice({ message }: { message: string | null }) {
    if (!message) return null;
    const ok = message.startsWith('Success') || message.startsWith('Saved');
    return (
        <div
            className={`p-3 rounded-md text-xs font-medium border flex items-center gap-2 ${
                ok ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
        >
            {ok ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{message}</span>
        </div>
    );
}

/** fetch() wrapper for the admin APIs: parses JSON and throws a readable error. */
export async function adminFetch<T = Record<string, unknown>>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, init);
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) {
        window.dispatchEvent(new Event('deepet-admin-logged-out'));
        throw new Error('Your session expired. Please sign in again.');
    }
    if (!res.ok || data.success === false) {
        if (res.status === 413) throw new Error('Too large to save (over 4.5 MB). Use smaller images, or remove pasted images and upload them with the Image button.');
        throw new Error(data.error || `Request failed (${res.status})`);
    }
    return data as T;
}

/**
 * Shrinks large photos in the browser before upload: max 1920px wide, saved as
 * WebP. Keeps uploads well under Vercel's 4.5 MB request limit and makes the
 * website load faster. Small images, GIFs, SVGs and icons are left untouched.
 */
async function prepareImage(file: File): Promise<File> {
    const resizable = /^image\/(jpeg|png|webp|avif)$/.test(file.type);
    if (!resizable || file.size < 500 * 1024) return file;
    try {
        const bitmap = await createImageBitmap(file);
        const scale = Math.min(1, 1920 / bitmap.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(bitmap.width * scale);
        canvas.height = Math.round(bitmap.height * scale);
        canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        bitmap.close();
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.85));
        if (!blob || blob.size >= file.size) return file;
        const name = file.name.replace(/\.[a-z0-9]+$/i, '') + '.webp';
        return new File([blob], name, { type: 'image/webp' });
    } catch {
        return file;
    }
}

export async function uploadImage(original: File, folder: 'blog' | 'gallery' | 'site') {
    const file = await prepareImage(original);
    if (file.size > 4 * 1024 * 1024) {
        throw new Error('This image is too large (over 4 MB even after compressing). Please use a smaller image.');
    }
    const form = new FormData();
    form.append('file', file);
    form.append('folder', folder);
    return adminFetch<{ url: string; path: string }>('/api/admin/upload', { method: 'POST', body: form });
}

/** Image picker that uploads to Firebase Storage and shows a preview. */
export function ImageField({
    value,
    onChange,
    folder,
    label,
}: {
    value: { url: string; alt?: string; path?: string } | null;
    onChange: (v: { url: string; alt: string; path?: string } | null) => void;
    folder: 'blog' | 'gallery' | 'site';
    label?: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const pick = async (file: File | undefined) => {
        if (!file) return;
        setBusy(true);
        setError(null);
        try {
            const { url, path } = await uploadImage(file, folder);
            onChange({ url, path, alt: value?.alt ?? '' });
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Upload failed');
        } finally {
            setBusy(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    return (
        <div>
            {label && <Label>{label}</Label>}
            <div className="flex items-start gap-3">
                <div className="w-32 h-20 rounded-md border border-dashed border-slate-300 bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
                    {value?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={value.url} alt={value.alt || ''} className="w-full h-full object-cover" />
                    ) : (
                        <ImagePlus className="w-5 h-5 text-slate-400" />
                    )}
                </div>
                <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                        <button type="button" className={btnSecondary} disabled={busy} onClick={() => inputRef.current?.click()}>
                            {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImagePlus className="w-3.5 h-3.5" />}
                            {busy ? 'Uploading…' : value?.url ? 'Replace image' : 'Upload image'}
                        </button>
                        {value?.url && (
                            <button type="button" className={btnDanger} onClick={() => onChange(null)}>
                                <X className="w-3.5 h-3.5" /> Remove
                            </button>
                        )}
                    </div>
                    {value?.url && (
                        <input
                            className={inputCls}
                            placeholder="Image description (alt text, helps SEO)"
                            value={value.alt ?? ''}
                            onChange={(e) => onChange({ url: value.url, path: value.path, alt: e.target.value })}
                        />
                    )}
                    {error && <p className="text-[11px] text-rose-600">{error}</p>}
                </div>
            </div>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
        </div>
    );
}
