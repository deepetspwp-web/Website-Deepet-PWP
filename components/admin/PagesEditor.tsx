'use client';

import React, { useEffect, useState } from 'react';
import { ExternalLink, Save } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { adminFetch, btnPrimary, btnSecondary, inputCls, Label, Notice } from './shared';

type EditablePage = { uri: string; label: string; title: string; content: string };

export function PagesEditor() {
    const [pages, setPages] = useState<EditablePage[]>([]);
    const [current, setCurrent] = useState<string>('');
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        adminFetch<{ pages: EditablePage[] }>('/api/admin/pages')
            .then((d) => {
                setPages(d.pages);
                setCurrent(d.pages[0]?.uri ?? '');
            })
            .catch((e) => setStatus(`Error: ${e.message}`));
    }, []);

    const page = pages.find((p) => p.uri === current);
    const update = (patch: Partial<EditablePage>) =>
        setPages((prev) => prev.map((p) => (p.uri === current ? { ...p, ...patch } : p)));

    const save = async () => {
        if (!page) return;
        setSaving(true);
        setStatus(null);
        try {
            await adminFetch('/api/admin/pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uri: page.uri, title: page.title, content: page.content }),
            });
            setStatus(`Saved! ${page.label} is updated.`);
        } catch (e) {
            setStatus(`Error: ${e instanceof Error ? e.message : 'Save failed'}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Pages</h1>
                    <p className="text-xs text-slate-500 mt-0.5">Edit the Privacy Policy and Terms of Service pages.</p>
                </div>
                <div className="flex items-center gap-2">
                    {page && (
                        <a href={`/${page.uri}`} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                            View <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                    <button type="button" className={btnPrimary} disabled={!page || saving} onClick={save}>
                        <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save page'}
                    </button>
                </div>
            </div>

            <div className="flex gap-1">
                {pages.map((p) => (
                    <button
                        key={p.uri}
                        type="button"
                        onClick={() => { setCurrent(p.uri); setStatus(null); }}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${
                            p.uri === current ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            <Notice message={status} />

            {page && (
                <div className="space-y-3" key={page.uri}>
                    <div>
                        <Label>Page title</Label>
                        <input className={inputCls} value={page.title} onChange={(e) => update({ title: e.target.value })} />
                    </div>
                    <RichTextEditor value={page.content} onChange={(content) => update({ content })} />
                </div>
            )}
        </div>
    );
}
