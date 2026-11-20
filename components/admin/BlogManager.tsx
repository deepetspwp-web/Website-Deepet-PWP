'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, ArrowLeft, Search, RefreshCw, Save, LayoutTemplate, CheckCircle2, Circle } from 'lucide-react';
import type { CmsImage, CmsPost } from '@/lib/cms/types';
import { RichTextEditor } from './RichTextEditor';
import { BLOG_TEMPLATE, blogChecklist, firstParagraphText } from './blogFormat';
import { adminFetch, btnDanger, btnPrimary, btnSecondary, ImageField, inputCls, Label, Notice } from './shared';

type PostSummary = Pick<CmsPost, 'slug' | 'title' | 'date' | 'status' | 'featuredImage' | 'categories'>;

type Draft = {
    originalSlug: string | null;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string; // yyyy-mm-dd
    status: 'published' | 'draft';
    featuredImage: CmsImage | null;
    author: string;
    categories: string;
    tags: string;
    seoTitle: string;
    seoDescription: string;
};

const emptyDraft = (): Draft => ({
    originalSlug: null,
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().slice(0, 10),
    status: 'published',
    featuredImage: null,
    author: 'DeePet',
    categories: 'Updates',
    tags: '',
    seoTitle: '',
    seoDescription: '',
});

const slugify = (v: string) =>
    v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120);

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

function fromPost(p: CmsPost): Draft {
    return {
        originalSlug: p.slug,
        title: p.title,
        slug: p.slug,
        excerpt: stripHtml(p.excerpt),
        content: p.content,
        date: (p.date || '').slice(0, 10),
        status: p.status,
        featuredImage: p.featuredImage,
        author: p.author || 'DeePet',
        categories: (p.categories ?? []).map((c) => c.name).join(', '),
        tags: (p.tags ?? []).map((t) => t.name).join(', '),
        seoTitle: p.seo?.title ?? '',
        seoDescription: p.seo?.description ?? '',
    };
}

export function BlogManager() {
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [draft, setDraft] = useState<Draft | null>(null);
    const [slugTouched, setSlugTouched] = useState(false);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await adminFetch<{ posts: PostSummary[] }>('/api/admin/posts');
            setPosts(data.posts);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return q ? posts.filter((p) => p.title.toLowerCase().includes(q) || p.slug.includes(q)) : posts;
    }, [posts, search]);

    const openNew = () => {
        setDraft(emptyDraft());
        setSlugTouched(false);
        setStatus(null);
    };

    const openEdit = async (slug: string) => {
        setStatus(null);
        try {
            const data = await adminFetch<{ post: CmsPost }>(`/api/admin/posts?slug=${encodeURIComponent(slug)}`);
            setDraft(fromPost(data.post));
            setSlugTouched(true);
        } catch (e) {
            alert(e instanceof Error ? e.message : 'Failed to open post');
        }
    };

    const remove = async (slug: string, title: string) => {
        if (!confirm(`Delete "${title}"?\n\nThis removes it from the website and cannot be undone.`)) return;
        try {
            await adminFetch(`/api/admin/posts?slug=${encodeURIComponent(slug)}`, { method: 'DELETE' });
            setPosts((prev) => prev.filter((p) => p.slug !== slug));
            if (draft?.originalSlug === slug) setDraft(null);
        } catch (e) {
            alert(e instanceof Error ? e.message : 'Delete failed');
        }
    };

    const save = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!draft) return;
        setSaving(true);
        setStatus(null);
        try {
            const data = await adminFetch<{ post: CmsPost }>('/api/admin/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    originalSlug: draft.originalSlug,
                    title: draft.title,
                    slug: draft.slug || slugify(draft.title),
                    // Same as existing posts: the summary is the intro paragraph.
                    excerpt: `<p>${draft.excerpt.trim() || firstParagraphText(draft.content)}</p>`,
                    content: draft.content,
                    date: draft.date,
                    status: draft.status,
                    featuredImage: draft.featuredImage,
                    author: draft.author,
                    categories: draft.categories.split(',').map((s) => s.trim()).filter(Boolean),
                    tags: draft.tags.split(',').map((s) => s.trim()).filter(Boolean),
                    seo: { title: draft.seoTitle, description: draft.seoDescription },
                }),
            });
            setDraft(fromPost(data.post));
            setStatus(
                data.post.status === 'published'
                    ? `Saved! Live at /blog/${data.post.slug}`
                    : 'Saved as draft (not visible on the website).',
            );
            load();
        } catch (e) {
            setStatus(`Error: ${e instanceof Error ? e.message : 'Save failed'}`);
        } finally {
            setSaving(false);
        }
    };

    // ------------------------------------------------------------------ editor
    if (draft) {
        const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => (d ? { ...d, [k]: v } : d));
        const effectiveSlug = draft.slug || slugify(draft.title);
        return (
            <form onSubmit={save} className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <button type="button" className={btnSecondary} onClick={() => { setDraft(null); load(); }}>
                        <ArrowLeft className="w-3.5 h-3.5" /> All posts
                    </button>
                    <div className="flex items-center gap-2">
                        {draft.originalSlug && draft.status === 'published' && (
                            <a href={`/blog/${draft.originalSlug}`} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                                View on site <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                        <select
                            value={draft.status}
                            onChange={(e) => set('status', e.target.value as Draft['status'])}
                            className="text-xs font-semibold px-2 py-1.5 rounded-md border border-slate-300 bg-white"
                        >
                            <option value="published">Published</option>
                            <option value="draft">Draft (hidden)</option>
                        </select>
                        <button type="submit" disabled={saving} className={btnPrimary}>
                            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : draft.originalSlug ? 'Save changes' : 'Publish post'}
                        </button>
                    </div>
                </div>

                <Notice message={status} />

                <div className="grid lg:grid-cols-[1fr_320px] gap-5 items-start">
                    <div className="space-y-4">
                        <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-4">
                            <div>
                                <Label>Title</Label>
                                <input
                                    required
                                    className={`${inputCls} text-base font-semibold`}
                                    value={draft.title}
                                    onChange={(e) => {
                                        const title = e.target.value;
                                        setDraft((d) => (d ? { ...d, title, slug: slugTouched ? d.slug : slugify(title) } : d));
                                    }}
                                    placeholder="e.g. Dog Vaccination Schedule in Delhi"
                                />
                            </div>
                            <div>
                                <Label hint="the web address of the post">URL</Label>
                                <div className="flex items-center">
                                    <span className="px-2 py-2 text-xs text-slate-500 bg-slate-100 border border-r-0 border-slate-300 rounded-l-md">/blog/</span>
                                    <input
                                        className={`${inputCls} rounded-l-none font-mono text-xs`}
                                        value={draft.slug}
                                        onChange={(e) => { setSlugTouched(true); set('slug', slugify(e.target.value)); }}
                                        placeholder={effectiveSlug}
                                    />
                                </div>
                                {draft.originalSlug && draft.slug !== draft.originalSlug && (
                                    <p className="text-[11px] text-amber-600 mt-1">Changing the URL breaks old links to this post.</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <Label>Content</Label>
                                {!stripHtml(draft.content) && (
                                    <button type="button" className={btnSecondary} onClick={() => set('content', BLOG_TEMPLATE)}>
                                        <LayoutTemplate className="w-3.5 h-3.5" /> Start with the DeePet blog layout
                                    </button>
                                )}
                            </div>
                            <RichTextEditor value={draft.content} onChange={(html) => set('content', html)} />
                            <p className="text-[11px] text-slate-400 mt-1">
                                Tip: you can paste from Google Docs or Word. Fonts and colours are removed automatically so the post matches the rest of the blog.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                            <p className="text-xs font-bold text-slate-900">Blog checklist</p>
                            {blogChecklist({
                                title: draft.title,
                                content: draft.content,
                                featuredImage: draft.featuredImage,
                                seoTitle: draft.seoTitle,
                                seoDescription: draft.seoDescription,
                            }).map((c) => (
                                <p key={c.label} className={`flex items-start gap-1.5 text-[11px] ${c.ok ? 'text-emerald-700' : 'text-slate-500'}`}>
                                    {c.ok ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-px" /> : <Circle className="w-3.5 h-3.5 shrink-0 mt-px" />}
                                    {c.label}
                                </p>
                            ))}
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
                            <ImageField
                                label="Featured image"
                                folder="blog"
                                value={draft.featuredImage}
                                onChange={(v) => set('featuredImage', v)}
                            />
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
                            <div>
                                <Label>Publish date</Label>
                                <input type="date" className={inputCls} value={draft.date} onChange={(e) => set('date', e.target.value)} />
                            </div>
                            <div>
                                <Label>Author</Label>
                                <input className={inputCls} value={draft.author} onChange={(e) => set('author', e.target.value)} />
                            </div>
                            <div>
                                <Label hint="comma separated">Categories</Label>
                                <input className={inputCls} value={draft.categories} onChange={(e) => set('categories', e.target.value)} />
                            </div>
                            <div>
                                <Label hint="comma separated">Tags</Label>
                                <input className={inputCls} value={draft.tags} onChange={(e) => set('tags', e.target.value)} />
                            </div>
                            <div>
                                <Label hint="leave empty to use the intro paragraph">Short summary</Label>
                                <textarea rows={3} className={inputCls} value={draft.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
                            <p className="text-xs font-bold text-slate-900">Google search (SEO)</p>
                            <div>
                                <Label hint={`${draft.seoTitle.length}/60`}>SEO title</Label>
                                <input className={inputCls} value={draft.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} placeholder={draft.title} />
                            </div>
                            <div>
                                <Label hint={`${draft.seoDescription.length}/160`}>Meta description</Label>
                                <textarea rows={3} className={inputCls} value={draft.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} />
                            </div>
                            <div className="p-3 rounded-md bg-slate-50 border border-slate-100">
                                <p className="text-[11px] text-emerald-700 truncate">deepetservices.com › blog › {effectiveSlug}</p>
                                <p className="text-sm text-blue-700 font-medium leading-snug line-clamp-2">{draft.seoTitle || draft.title || 'Post title'}</p>
                                <p className="text-[11px] text-slate-600 line-clamp-2">{draft.seoDescription || draft.excerpt || stripHtml(draft.content).slice(0, 160)}</p>
                            </div>
                        </div>

                        {draft.originalSlug && (
                            <button type="button" className={`${btnDanger} w-full`} onClick={() => remove(draft.originalSlug!, draft.title)}>
                                <Trash2 className="w-3.5 h-3.5" /> Delete this post
                            </button>
                        )}
                    </div>
                </div>
            </form>
        );
    }

    // ------------------------------------------------------------------ list
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Blog Posts</h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {posts.length} posts · {posts.filter((p) => p.status === 'draft').length} drafts. Changes appear on the website right after saving.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button type="button" className={btnSecondary} onClick={load} disabled={loading}>
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
                    </button>
                    <button type="button" className={btnPrimary} onClick={openNew}>
                        <Plus className="w-3.5 h-3.5" /> New post
                    </button>
                </div>
            </div>

            <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search posts…"
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
            </div>

            <Notice message={error ? `Error: ${error}` : null} />

            <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                {loading && posts.length === 0 ? (
                    <p className="py-10 text-center text-slate-400 text-xs">Loading posts…</p>
                ) : filtered.length === 0 ? (
                    <p className="py-10 text-center text-slate-500 text-xs">No posts found.</p>
                ) : (
                    filtered.map((p) => (
                        <div key={p.slug} className="flex items-center gap-3 p-3 hover:bg-slate-50">
                            <div className="w-16 h-11 rounded bg-slate-100 overflow-hidden shrink-0">
                                {p.featuredImage?.url && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={p.featuredImage.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                                )}
                            </div>
                            <button type="button" onClick={() => openEdit(p.slug)} className="min-w-0 flex-1 text-left cursor-pointer">
                                <p className="font-semibold text-slate-900 truncate">{p.title}</p>
                                <p className="text-[11px] text-slate-500 truncate">
                                    {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    {' · '}/blog/{p.slug}
                                </p>
                            </button>
                            {p.status === 'draft' && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">Draft</span>
                            )}
                            <div className="flex items-center gap-1.5 shrink-0">
                                <button type="button" title="Edit" onClick={() => openEdit(p.slug)} className="w-7 h-7 rounded border border-slate-200 text-slate-600 hover:bg-white flex items-center justify-center cursor-pointer">
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" title="View" className="w-7 h-7 rounded border border-slate-200 text-slate-600 hover:bg-white flex items-center justify-center">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <button type="button" title="Delete" onClick={() => remove(p.slug, p.title)} className="w-7 h-7 rounded border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
