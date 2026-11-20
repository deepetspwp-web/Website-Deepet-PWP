'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, Save, Trash2 } from 'lucide-react';
import type { CmsGalleryItem } from '@/lib/cms/types';
import { adminFetch, btnPrimary, btnSecondary, Notice, uploadImage } from './shared';

export function GalleryManager() {
    const [items, setItems] = useState<CmsGalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState<string | null>(null);
    const [dirty, setDirty] = useState(false);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const load = async () => {
        setLoading(true);
        try {
            const data = await adminFetch<{ items: CmsGalleryItem[] }>('/api/admin/gallery');
            setItems(data.items);
            setDirty(false);
        } catch (e) {
            setStatus(`Error: ${e instanceof Error ? e.message : 'Failed to load gallery'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const addFiles = async (files: FileList | null) => {
        if (!files?.length) return;
        setStatus(null);
        const list = Array.from(files);
        for (let i = 0; i < list.length; i++) {
            setUploading(`Uploading ${i + 1} of ${list.length}…`);
            try {
                const { url, path } = await uploadImage(list[i], 'gallery');
                const data = await adminFetch<{ item: CmsGalleryItem }>('/api/admin/gallery', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url, path, alt: '' }),
                });
                setItems((prev) => [...prev, data.item]);
            } catch (e) {
                setStatus(`Error: ${list[i].name}: ${e instanceof Error ? e.message : 'upload failed'}`);
            }
        }
        setUploading(null);
        if (fileRef.current) fileRef.current.value = '';
    };

    const move = (index: number, dir: -1 | 1) => {
        const next = index + dir;
        if (next < 0 || next >= items.length) return;
        const copy = [...items];
        [copy[index], copy[next]] = [copy[next], copy[index]];
        setItems(copy);
        setDirty(true);
    };

    const remove = async (item: CmsGalleryItem) => {
        if (!confirm('Delete this photo from the gallery? This cannot be undone.')) return;
        try {
            await adminFetch(`/api/admin/gallery?id=${encodeURIComponent(item.id)}`, { method: 'DELETE' });
            setItems((prev) => prev.filter((i) => i.id !== item.id));
        } catch (e) {
            alert(e instanceof Error ? e.message : 'Delete failed');
        }
    };

    const save = async () => {
        setSaving(true);
        setStatus(null);
        try {
            await adminFetch('/api/admin/gallery', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: items.map((it, order) => ({ id: it.id, alt: it.alt, order })) }),
            });
            setDirty(false);
            setStatus('Saved! The gallery page is updated.');
        } catch (e) {
            setStatus(`Error: ${e instanceof Error ? e.message : 'Save failed'}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Gallery</h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {items.length} photos on the <a href="/gallery" target="_blank" className="underline">gallery page</a>. New photos go live as soon as they upload.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button type="button" className={btnSecondary} disabled={!!uploading} onClick={() => fileRef.current?.click()}>
                        {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImagePlus className="w-3.5 h-3.5" />}
                        {uploading ?? 'Add photos'}
                    </button>
                    <button type="button" className={btnPrimary} disabled={!dirty || saving} onClick={save}>
                        <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save order & captions'}
                    </button>
                </div>
            </div>

            <Notice message={status} />

            {loading ? (
                <p className="py-10 text-center text-slate-400 text-xs">Loading gallery…</p>
            ) : items.length === 0 ? (
                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full py-16 rounded-lg border-2 border-dashed border-slate-300 text-slate-500 text-sm hover:bg-white cursor-pointer"
                >
                    No photos yet — click to upload
                </button>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {items.map((item, i) => (
                        <div key={item.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                            <div className="aspect-square bg-slate-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.url} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
                            </div>
                            <div className="p-2 space-y-2">
                                <input
                                    value={item.alt}
                                    placeholder="Caption / alt text"
                                    onChange={(e) => {
                                        const alt = e.target.value;
                                        setItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, alt } : it)));
                                        setDirty(true);
                                    }}
                                    className="w-full px-2 py-1 text-[11px] border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1">
                                        <button type="button" title="Move earlier" disabled={i === 0} onClick={() => move(i, -1)} className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-30 cursor-pointer">
                                            <ArrowLeft className="w-3 h-3" />
                                        </button>
                                        <button type="button" title="Move later" disabled={i === items.length - 1} onClick={() => move(i, 1)} className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-30 cursor-pointer">
                                            <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <button type="button" title="Delete" onClick={() => remove(item)} className="w-6 h-6 rounded border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer">
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
        </div>
    );
}
