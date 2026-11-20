'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
    Bold,
    Italic,
    Underline,
    Heading2,
    Heading3,
    Heading4,
    Pilcrow,
    List,
    ListOrdered,
    Quote,
    Link2,
    Unlink,
    ImagePlus,
    Table,
    MessageCircleQuestion,
    Undo2,
    Redo2,
    Code2,
    Eraser,
    Loader2,
    X,
} from 'lucide-react';
import { uploadImage } from './shared';
import { cleanPastedHtml, INTERNAL_LINKS, SITE_ORIGIN } from './blogFormat';

/**
 * Editor for blog posts and pages. It writes the same HTML structure as the
 * existing DeePet posts: <p> paragraphs, bold <h3> section headings, bold
 * internal links, lists, tables and a "Short FAQ" block. Text pasted from
 * Google Docs / Word is cleaned to that structure automatically.
 */
export function RichTextEditor({
    value,
    onChange,
    minHeight = 420,
}: {
    value: string;
    onChange: (html: string) => void;
    minHeight?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const savedRange = useRef<Range | null>(null);
    const [mode, setMode] = useState<'visual' | 'html'>('visual');
    const [uploading, setUploading] = useState(false);
    const [linkOpen, setLinkOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkBold, setLinkBold] = useState(true);

    // Load external value into the editable area (initial load / switching back from HTML).
    useEffect(() => {
        if (mode === 'visual' && ref.current && ref.current.innerHTML !== value) {
            ref.current.innerHTML = value;
        }
    }, [value, mode]);

    // Enter creates <p> paragraphs (browsers default to <div>).
    useEffect(() => {
        document.execCommand('defaultParagraphSeparator', false, 'p');
    }, []);

    const sync = () => {
        if (ref.current) onChange(ref.current.innerHTML);
    };

    const exec = (command: string, arg?: string) => {
        ref.current?.focus();
        document.execCommand(command, false, arg);
        sync();
    };

    const insertHtml = (html: string) => exec('insertHTML', html);

    /** Headings are written bold, like the existing posts: <h3><b>…</b></h3>. */
    const heading = (tag: 'H2' | 'H3' | 'H4') => {
        exec('formatBlock', tag);
        const sel = window.getSelection();
        const block = sel?.anchorNode
            ? (sel.anchorNode.nodeType === 1 ? (sel.anchorNode as Element) : sel.anchorNode.parentElement)?.closest('h2,h3,h4')
            : null;
        if (block && !block.querySelector('b') && block.textContent?.trim()) {
            block.innerHTML = `<b>${block.innerHTML}</b>`;
            sync();
        }
    };

    const paragraph = () => {
        exec('formatBlock', 'P');
        const sel = window.getSelection();
        const block = sel?.anchorNode
            ? (sel.anchorNode.nodeType === 1 ? (sel.anchorNode as Element) : sel.anchorNode.parentElement)?.closest('p')
            : null;
        // A heading turned back into text shouldn't stay bold.
        if (block && block.children.length === 1 && block.firstElementChild?.tagName === 'B' && block.textContent === block.firstElementChild.textContent) {
            block.innerHTML = block.firstElementChild.innerHTML;
            sync();
        }
    };

    const openLink = () => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
            alert('Select the words you want to turn into a link first.');
            return;
        }
        savedRange.current = sel.getRangeAt(0).cloneRange();
        setLinkUrl('');
        setLinkOpen(true);
    };

    const applyLink = (url: string) => {
        if (!url || !savedRange.current) return;
        const sel = window.getSelection();
        ref.current?.focus();
        sel?.removeAllRanges();
        sel?.addRange(savedRange.current);
        const text = sel?.toString() ?? '';
        const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
        const href = url.replace(/"/g, '%22');
        insertHtml(`<a href="${href}">${linkBold ? `<b>${safe}</b>` : safe}</a>`);
        setLinkOpen(false);
        savedRange.current = null;
    };

    const insertImage = async (file: File | undefined) => {
        if (!file) return;
        setUploading(true);
        try {
            const { url } = await uploadImage(file, 'blog');
            const alt = window.prompt('Describe this image (alt text, helps Google)') || '';
            insertHtml(`<p><img src="${url}" alt="${alt.replace(/"/g, '&quot;')}" /></p>`);
        } catch (e) {
            alert(e instanceof Error ? e.message : 'Upload failed');
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    const insertTable = () => {
        const rows = Number(window.prompt('How many rows (including the header row)?', '4'));
        const cols = Number(window.prompt('How many columns?', '2'));
        if (!rows || !cols || rows > 30 || cols > 8) return;
        const row = (header: boolean) =>
            `<tr>${Array.from({ length: cols }, (_, i) => `<td>${header ? `<b>Heading ${i + 1}</b>` : '&nbsp;'}</td>`).join('')}</tr>`;
        insertHtml(`<table><tbody>${row(true)}${Array.from({ length: rows - 1 }, () => row(false)).join('')}</tbody></table><p><br></p>`);
    };

    const insertFaq = () => {
        const hasFaq = /<h[2-5][^>]*>(?:<b>)?\s*(short\s+)?faqs?\b/i.test(ref.current?.innerHTML ?? '');
        const item = '<p><b>Question goes here?</b> Short, direct answer in one or two sentences.</p>';
        insertHtml(hasFaq ? item : `<h3><b>Short FAQ</b></h3>${item}${item}${item}`);
    };

    const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        const html = e.clipboardData.getData('text/html');
        const text = e.clipboardData.getData('text/plain');
        e.preventDefault();
        if (html) {
            insertHtml(cleanPastedHtml(html));
        } else if (text) {
            const paras = text
                .split(/\n{2,}|\r\n\r\n/)
                .map((t) => t.trim())
                .filter(Boolean)
                .map((t) => `<p>${t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>')}</p>`)
                .join('');
            insertHtml(paras);
        }
    };

    const tools: { icon: React.ElementType; title: string; run: () => void; text?: string }[] = [
        { icon: Pilcrow, title: 'Normal paragraph text', run: paragraph },
        { icon: Heading2, title: 'Big heading (H2)', run: () => heading('H2') },
        { icon: Heading3, title: 'Section heading (H3) — used for every section in our posts', run: () => heading('H3') },
        { icon: Heading4, title: 'Small heading (H4)', run: () => heading('H4') },
        { icon: Bold, title: 'Bold', run: () => exec('bold') },
        { icon: Italic, title: 'Italic', run: () => exec('italic') },
        { icon: Underline, title: 'Underline', run: () => exec('underline') },
        { icon: List, title: 'Bullet list', run: () => exec('insertUnorderedList') },
        { icon: ListOrdered, title: 'Numbered list', run: () => exec('insertOrderedList') },
        { icon: Quote, title: 'Quote', run: () => exec('formatBlock', 'BLOCKQUOTE') },
        { icon: Link2, title: 'Add link (select words first)', run: openLink },
        { icon: Unlink, title: 'Remove link', run: () => exec('unlink') },
        { icon: Table, title: 'Insert table', run: insertTable },
        { icon: MessageCircleQuestion, title: 'Add FAQ question', run: insertFaq, text: 'FAQ' },
        { icon: Eraser, title: 'Clear formatting', run: () => exec('removeFormat') },
        { icon: Undo2, title: 'Undo', run: () => exec('undo') },
        { icon: Redo2, title: 'Redo', run: () => exec('redo') },
    ];

    return (
        <div className="border border-slate-300 rounded-md bg-white overflow-hidden relative">
            <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-slate-200 bg-slate-50">
                {mode === 'visual' &&
                    tools.map(({ icon: Icon, title, run, text }) => (
                        <button
                            key={title}
                            type="button"
                            title={title}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={run}
                            className="h-8 min-w-8 px-1.5 rounded flex items-center justify-center gap-1 text-xs text-slate-600 hover:bg-white hover:text-slate-900 cursor-pointer"
                        >
                            <Icon className="w-4 h-4" />
                            {text}
                        </button>
                    ))}
                {mode === 'visual' && (
                    <button
                        type="button"
                        title="Insert image"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => fileRef.current?.click()}
                        className="h-8 px-2 rounded flex items-center gap-1 text-xs text-slate-600 hover:bg-white hover:text-slate-900 cursor-pointer"
                    >
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
                        Image
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => setMode(mode === 'visual' ? 'html' : 'visual')}
                    className={`ml-auto h-8 px-2.5 rounded flex items-center gap-1 text-xs font-semibold cursor-pointer ${
                        mode === 'html' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-white'
                    }`}
                >
                    <Code2 className="w-4 h-4" />
                    {mode === 'html' ? 'Back to editor' : 'HTML'}
                </button>
            </div>

            {linkOpen && (
                <div className="absolute z-20 left-2 right-2 sm:left-auto sm:right-2 sm:w-96 top-12 bg-white border border-slate-200 rounded-lg shadow-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900">Add link</p>
                        <button type="button" onClick={() => setLinkOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <select
                        className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded"
                        defaultValue=""
                        onChange={(e) => e.target.value && setLinkUrl(`${SITE_ORIGIN}${e.target.value === '/' ? '' : e.target.value}`)}
                    >
                        <option value="">Pick a DeePet page…</option>
                        {INTERNAL_LINKS.map((l) => (
                            <option key={l.path} value={l.path}>{l.label}</option>
                        ))}
                    </select>
                    <input
                        className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded font-mono"
                        placeholder="…or paste any URL (another blog post, a website)"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), applyLink(linkUrl))}
                    />
                    <label className="flex items-center gap-1.5 text-[11px] text-slate-600">
                        <input type="checkbox" checked={linkBold} onChange={(e) => setLinkBold(e.target.checked)} />
                        Make the link bold (like our other posts)
                    </label>
                    <button
                        type="button"
                        disabled={!linkUrl}
                        onClick={() => applyLink(linkUrl)}
                        className="w-full py-1.5 bg-slate-900 text-white text-xs font-semibold rounded disabled:bg-slate-300 cursor-pointer"
                    >
                        Add link
                    </button>
                </div>
            )}

            {mode === 'visual' ? (
                <div
                    ref={ref}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={sync}
                    onBlur={sync}
                    onPaste={onPaste}
                    className="post-content admin-editor p-5 focus:outline-none"
                    style={{ minHeight }}
                />
            ) : (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    spellCheck={false}
                    className="w-full p-4 font-mono text-xs text-slate-800 focus:outline-none resize-y"
                    style={{ minHeight }}
                />
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => insertImage(e.target.files?.[0])} />
        </div>
    );
}
