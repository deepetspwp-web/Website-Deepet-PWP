'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import type { CmsSiteConfig } from '@/lib/cms/types';
import { adminFetch, btnPrimary, btnSecondary, ImageField, inputCls, Label, Notice } from './shared';

const EMPTY: CmsSiteConfig = {
    analytics: { gtmId: '' },
    company: { siteTitle: 'DeePet Services', favicon: '', logoVar1: '', logoVar2: '', logoVar3: '', logoVar4: '' },
    contact: { address: '', email: '', latitude: '', longitude: '', phones: [] },
    socialMedia: [],
    robotsTxt: '',
    llmsTxt: '',
};

const LOGOS: { key: 'logoVar1' | 'logoVar2' | 'logoVar3' | 'logoVar4' | 'favicon'; label: string }[] = [
    { key: 'logoVar1', label: 'Main logo' },
    { key: 'logoVar2', label: 'Logo (variant 2)' },
    { key: 'logoVar3', label: 'Logo (variant 3)' },
    { key: 'logoVar4', label: 'Logo (variant 4)' },
    { key: 'favicon', label: 'Favicon (browser tab icon)' },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-4">
            <h2 className="text-sm font-bold text-slate-900">{title}</h2>
            {children}
        </div>
    );
}

export function SiteSettingsForm() {
    const [site, setSite] = useState<CmsSiteConfig>(EMPTY);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        adminFetch<{ site: CmsSiteConfig | null }>('/api/admin/site')
            .then((d) => d.site && setSite({ ...EMPTY, ...d.site, contact: { ...EMPTY.contact, ...d.site.contact }, company: { ...EMPTY.company, ...d.site.company } }))
            .catch((e) => setStatus(`Error: ${e.message}`))
            .finally(() => setLoading(false));
    }, []);

    const save = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setStatus(null);
        try {
            await adminFetch('/api/admin/site', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(site),
            });
            setStatus('Saved! Website details are updated across all pages.');
        } catch (err) {
            setStatus(`Error: ${err instanceof Error ? err.message : 'Save failed'}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="py-10 text-center text-slate-400 text-xs">Loading website info…</p>;

    const setContact = (patch: Partial<CmsSiteConfig['contact']>) => setSite((s) => ({ ...s, contact: { ...s.contact, ...patch } }));
    const setCompany = (patch: Partial<CmsSiteConfig['company']>) => setSite((s) => ({ ...s, company: { ...s.company, ...patch } }));

    return (
        <form onSubmit={save} className="max-w-3xl mx-auto space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Website Info</h1>
                    <p className="text-xs text-slate-500 mt-0.5">Contact details, phone numbers, social links, logos and tracking used across the whole site.</p>
                </div>
                <button type="submit" disabled={saving} className={btnPrimary}>
                    <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save website info'}
                </button>
            </div>

            <Notice message={status} />

            <Card title="Contact details">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <Label>Email</Label>
                        <input type="email" className={inputCls} value={site.contact.email} onChange={(e) => setContact({ email: e.target.value })} />
                    </div>
                    <div>
                        <Label>Business name</Label>
                        <input className={inputCls} value={site.company.siteTitle} onChange={(e) => setCompany({ siteTitle: e.target.value })} />
                    </div>
                </div>
                <div>
                    <Label>Address</Label>
                    <textarea rows={2} className={inputCls} value={site.contact.address} onChange={(e) => setContact({ address: e.target.value })} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <Label hint="for the map">Latitude</Label>
                        <input className={inputCls} value={site.contact.latitude} onChange={(e) => setContact({ latitude: e.target.value })} />
                    </div>
                    <div>
                        <Label hint="for the map">Longitude</Label>
                        <input className={inputCls} value={site.contact.longitude} onChange={(e) => setContact({ longitude: e.target.value })} />
                    </div>
                </div>
            </Card>

            <Card title="Phone numbers">
                <p className="text-[11px] text-slate-500 -mt-2">
                    Keep the names <strong>Phone</strong> and <strong>WhatsApp</strong> — the call and WhatsApp buttons on the site look for those names.
                </p>
                {site.contact.phones.map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <input className={`${inputCls} w-36`} placeholder="Name" value={p.name} onChange={(e) => setContact({ phones: site.contact.phones.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)) })} />
                        <input className={inputCls} placeholder="+91…" value={p.phone} onChange={(e) => setContact({ phones: site.contact.phones.map((x, j) => (j === i ? { ...x, phone: e.target.value } : x)) })} />
                        <button type="button" title="Remove" onClick={() => setContact({ phones: site.contact.phones.filter((_, j) => j !== i) })} className="w-8 h-8 shrink-0 rounded border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}
                <button type="button" className={btnSecondary} onClick={() => setContact({ phones: [...site.contact.phones, { name: '', phone: '' }] })}>
                    <Plus className="w-3.5 h-3.5" /> Add phone
                </button>
            </Card>

            <Card title="Social media">
                {site.socialMedia.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <input className={`${inputCls} w-36`} placeholder="Instagram" value={s.platformName} onChange={(e) => setSite({ ...site, socialMedia: site.socialMedia.map((x, j) => (j === i ? { ...x, platformName: e.target.value } : x)) })} />
                        <input className={inputCls} placeholder="https://…" value={s.url} onChange={(e) => setSite({ ...site, socialMedia: site.socialMedia.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)) })} />
                        <button type="button" title="Remove" onClick={() => setSite({ ...site, socialMedia: site.socialMedia.filter((_, j) => j !== i) })} className="w-8 h-8 shrink-0 rounded border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}
                <button type="button" className={btnSecondary} onClick={() => setSite({ ...site, socialMedia: [...site.socialMedia, { platformName: '', url: '', iconClass: '' }] })}>
                    <Plus className="w-3.5 h-3.5" /> Add social link
                </button>
            </Card>

            <Card title="Logos">
                <div className="grid sm:grid-cols-2 gap-5">
                    {LOGOS.map(({ key, label }) => (
                        <ImageField
                            key={key}
                            label={label}
                            folder="site"
                            value={site.company[key] ? { url: site.company[key], alt: '' } : null}
                            onChange={(v) => setCompany({ [key]: v?.url ?? '' })}
                        />
                    ))}
                </div>
            </Card>

            <Card title="Tracking & SEO files">
                <div>
                    <Label hint="loads Meta Pixel + GA4">Google Tag Manager ID</Label>
                    <input className={`${inputCls} font-mono`} placeholder="GTM-XXXXXXX" value={site.analytics.gtmId} onChange={(e) => setSite({ ...site, analytics: { gtmId: e.target.value } })} />
                </div>
                <div>
                    <Label hint="leave empty for the default">robots.txt</Label>
                    <textarea rows={5} className={`${inputCls} font-mono text-xs`} value={site.robotsTxt ?? ''} onChange={(e) => setSite({ ...site, robotsTxt: e.target.value })} />
                </div>
                <div>
                    <Label>llms.txt</Label>
                    <textarea rows={5} className={`${inputCls} font-mono text-xs`} value={site.llmsTxt ?? ''} onChange={(e) => setSite({ ...site, llmsTxt: e.target.value })} />
                </div>
            </Card>
        </form>
    );
}
