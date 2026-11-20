'use client';

import React, { useEffect, useState } from 'react';
import { ExternalLink, Save, Search } from 'lucide-react';
import type { CmsPageSeo } from '@/lib/cms/types';
import { adminFetch, btnPrimary, btnSecondary, ImageField, inputCls, Label, Notice } from './shared';

export function SeoManager() {
    const [pages, setPages] = useState<CmsPageSeo[]>([]);
    const [current, setCurrent] = useState('home');
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        adminFetch<{ pages: CmsPageSeo[] }>('/api/admin/seo')
            .then((d) => setPages(d.pages))
            .catch((e) => setStatus(`Error: ${e.message}`));
    }, []);

    const page = pages.find((p) => p.id === current);
    const update = (patch: Partial<CmsPageSeo>) =>
        setPages((prev) => prev.map((p) => (p.id === current ? { ...p, ...patch } : p)));

    const save = async () => {
        if (!page) return;
        setSaving(true);
        setStatus(null);
        try {
            await adminFetch('/api/admin/seo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(page),
            });
            setStatus(`Saved! SEO for ${page.label} is live.`);
        } catch (e) {
            setStatus(`Error: ${e instanceof Error ? e.message : 'Save failed'}`);
        } finally {
            setSaving(false);
        }
    };

    const visible = pages.filter((p) => p.label.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">SEO</h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Google title, description, share image and structured data for each page. Blog posts have their own SEO fields in the Blogs tab.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {page && (
                        <a href={page.path} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                            View page <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                    <button type="button" className={btnPrimary} disabled={!page || saving} onClick={save}>
                        <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save SEO'}
                    </button>
                </div>
            </div>

            <Notice message={status} />

            <div className="grid lg:grid-cols-[240px_1fr] gap-5 items-start">
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <div className="p-2 border-b border-slate-100 relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Find page…"
                            className="w-full pl-7 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none"
                        />
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto">
                        {visible.map((p) => (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => { setCurrent(p.id); setStatus(null); }}
                                className={`w-full text-left px-3 py-2 text-xs border-b border-slate-50 cursor-pointer ${
                                    p.id === current ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-700'
                                }`}
                            >
                                <span className="font-medium">{p.label}</span>
                                {!p.title && <span className={`ml-1 ${p.id === current ? 'text-amber-300' : 'text-amber-600'}`}>· not set</span>}
                                {p.noindex && <span className="ml-1 opacity-70">· hidden</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {page && (
                    <div className="space-y-4" key={page.id}>
                        <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-4">
                            <div>
                                <Label hint={`${page.title.length}/60`}>SEO title</Label>
                                <input className={inputCls} value={page.title} onChange={(e) => update({ title: e.target.value })} />
                            </div>
                            <div>
                                <Label hint={`${page.description.length}/160`}>Meta description</Label>
                                <textarea rows={3} className={inputCls} value={page.description} onChange={(e) => update({ description: e.target.value })} />
                            </div>
                            <div className="p-3 rounded-md bg-slate-50 border border-slate-100">
                                <p className="text-[11px] text-emerald-700 truncate">deepetservices.com{page.path === '/' ? '' : page.path.replace(/\//g, ' › ')}</p>
                                <p className="text-sm text-blue-700 font-medium leading-snug">{page.title || 'Page title'}</p>
                                <p className="text-[11px] text-slate-600 line-clamp-2">{page.description || 'Meta description'}</p>
                            </div>
                            <ImageField
                                label="Share image (WhatsApp / Facebook preview)"
                                folder="site"
                                value={page.ogImage ? { url: page.ogImage, alt: '' } : null}
                                onChange={(v) => update({ ogImage: v?.url ?? '' })}
                            />
                            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                                <input type="checkbox" checked={page.noindex} onChange={(e) => update({ noindex: e.target.checked })} className="w-4 h-4" />
                                Hide this page from Google (noindex, and leave it out of the sitemap)
                            </label>
                        </div>

                        <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-2">
                            <Label hint="advanced — JSON-LD for business info, FAQs, etc.">Structured data</Label>
                            <textarea
                                rows={12}
                                spellCheck={false}
                                className={`${inputCls} font-mono text-[11px]`}
                                value={page.schemaJson}
                                onChange={(e) => update({ schemaJson: e.target.value })}
                                placeholder='{"@context":"https://schema.org", ...}'
                            />
                            <p className="text-[11px] text-slate-400">
                                Leave as is unless you know what you&apos;re changing. Test it at search.google.com/test/rich-results after saving.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
