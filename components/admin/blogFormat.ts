// Helpers that keep every blog post in the same structure as the existing
// DeePet posts (e.g. /blog/dog-neutering-surgery-in-gurgaon-…):
//
//   <p>Intro … <a href="…"><b>internal link</b></a> …</p>
//   <h3><b>Section heading</b></h3>
//   <p>…</p>
//   <h3><b>Short FAQ</b></h3>
//   <p><b>Question?</b> Answer.</p>

/** Internal pages offered in the "Add link" picker. */
export const INTERNAL_LINKS: { label: string; path: string }[] = [
    { label: 'Vet home visit (Veterinary Doctor)', path: '/veterinary-doctor' },
    { label: 'Online vet consultation', path: '/online-vet-consultation' },
    { label: 'Pet vaccinations', path: '/pet-vaccinations' },
    { label: 'Pet surgery', path: '/pet-surgery' },
    { label: 'Pet boarding', path: '/pet-boarding' },
    { label: 'Pet grooming', path: '/pet-grooming' },
    { label: 'Pet training', path: '/pet-training' },
    { label: 'Dog walking', path: '/dog-walking' },
    { label: 'Services', path: '/services' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Pet care services in Delhi', path: '/deepet-services-delhi' },
    { label: 'Pet care services in Gurgaon', path: '/deepet-services-gurgaon' },
    { label: 'Pet care services in Noida', path: '/deepet-services-noida' },
    { label: 'Pet care services in Ghaziabad', path: '/deepet-services-ghaziabad' },
    { label: 'Contact', path: '/contact' },
    { label: 'Home', path: '/' },
];

export const SITE_ORIGIN = 'https://deepetservices.com';

export const BLOG_TEMPLATE = `<p>Start with a short, friendly introduction that speaks to the pet parent's worry or question. Mention a service naturally, for example our <a href="${SITE_ORIGIN}/veterinary-doctor"><b>vet home visit in Delhi NCR</b></a>, and say what this guide will cover.</p>
<h3><b>First section heading</b></h3>
<p>Explain the first point in two or three short paragraphs. Keep sentences simple and practical.</p>
<h3><b>Second section heading</b></h3>
<p>Second point. Use a bullet list when there are steps or options:</p>
<ul>
<li>First item</li>
<li>Second item</li>
<li>Third item</li>
</ul>
<h3><b>Third section heading</b></h3>
<p>Third point. Add costs, timings or local details (Delhi, Gurgaon, Noida) where useful.</p>
<h3><b>How DeePet can help</b></h3>
<p>Close with how DeePet Services helps, and link to the right page, e.g. <a href="${SITE_ORIGIN}/pet-vaccinations"><b>pet vaccinations at home</b></a>.</p>
<h3><b>Short FAQ</b></h3>
<p><b>First question?</b> Short, direct answer in one or two sentences.</p>
<p><b>Second question?</b> Short, direct answer in one or two sentences.</p>
<p><b>Third question?</b> Short, direct answer in one or two sentences.</p>`;

const ALLOWED = new Set([
    'P', 'H2', 'H3', 'H4', 'H5', 'UL', 'OL', 'LI', 'B', 'STRONG', 'I', 'EM', 'U', 'A', 'BR',
    'TABLE', 'THEAD', 'TBODY', 'TR', 'TD', 'TH', 'IMG', 'BLOCKQUOTE',
]);

/**
 * Cleans HTML pasted from Google Docs, Word or web pages down to the tags the
 * blog uses: removes fonts, colours, classes and wrapper spans, turns bold /
 * italic styled spans into <b>/<i>, and H1 into H2 (the post title is the H1).
 */
export function cleanPastedHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const walk = (node: Node): Node[] => {
        if (node.nodeType === Node.TEXT_NODE) return [document.createTextNode(node.textContent ?? '')];
        if (node.nodeType !== Node.ELEMENT_NODE) return [];
        const el = node as HTMLElement;
        const tag = el.tagName;
        if (['SCRIPT', 'STYLE', 'META', 'LINK', 'TITLE', 'HEAD'].includes(tag)) return [];

        const children = Array.from(el.childNodes).flatMap(walk);
        const style = (el.getAttribute('style') || '').toLowerCase();
        // Google Docs wraps everything in <b style="font-weight:normal" id="docs-internal-guid…">.
        const docsWrapper = tag === 'B' && /font-weight:\s*normal/.test(style);
        const isBold = !docsWrapper && (/font-weight:\s*(bold|[6-9]00)/.test(style) || tag === 'B' || tag === 'STRONG');
        const isItalic = /font-style:\s*italic/.test(style) || tag === 'I' || tag === 'EM';

        const wrap = (name: string, kids: Node[]) => {
            const out = document.createElement(name);
            kids.forEach((k) => out.appendChild(k));
            return out;
        };

        let mapped = tag === 'H1' ? 'H2' : tag === 'H6' ? 'H5' : tag === 'DIV' ? 'P' : tag;
        if (docsWrapper) mapped = 'UNWRAP';

        if (!ALLOWED.has(mapped)) {
            let kids = children;
            if (tag === 'SPAN' && isBold) kids = [wrap('b', kids)];
            if (tag === 'SPAN' && isItalic) kids = [wrap('i', kids)];
            return kids;
        }

        const out = document.createElement(mapped === 'STRONG' ? 'b' : mapped === 'EM' ? 'i' : mapped.toLowerCase());
        if (mapped === 'A') {
            const href = el.getAttribute('href') || '';
            if (/^(https?:|mailto:|tel:|\/)/i.test(href)) out.setAttribute('href', href);
        }
        if (mapped === 'IMG') {
            const src = el.getAttribute('src') || '';
            if (!/^https?:/i.test(src)) return [];
            out.setAttribute('src', src);
            out.setAttribute('alt', el.getAttribute('alt') || '');
            return [out];
        }
        children.forEach((k) => out.appendChild(k));
        // Headings in the blog are bold: <h3><b>…</b></h3>
        if (/^H[2-5]$/.test(mapped) && !out.querySelector('b')) {
            const b = document.createElement('b');
            while (out.firstChild) b.appendChild(out.firstChild);
            out.appendChild(b);
        }
        return [out];
    };

    const container = document.createElement('div');
    Array.from(doc.body.childNodes).flatMap(walk).forEach((n) => container.appendChild(n));

    // Docs puts <p> inside list items and table cells — keep just the text.
    container.querySelectorAll('li > p, td > p, th > p').forEach((p) => {
        const parent = p.parentElement!;
        while (p.firstChild) parent.insertBefore(p.firstChild, p);
        if (p.nextSibling && p.nextElementSibling?.tagName === 'P') parent.insertBefore(document.createElement('br'), p);
        p.remove();
    });
    // Drop empty paragraphs/headings left behind by Docs/Word spacing.
    container.querySelectorAll('p, h2, h3, h4, h5, li').forEach((el) => {
        if (!el.textContent?.trim() && !el.querySelector('img')) el.remove();
    });
    // Loose text at the top level becomes a paragraph.
    Array.from(container.childNodes).forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()) {
            const p = document.createElement('p');
            n.replaceWith(p);
            p.appendChild(n);
        } else if (n.nodeType === Node.TEXT_NODE) {
            n.remove();
        }
    });
    return container.innerHTML.replace(/&nbsp;/g, ' ');
}

const stripTags = (html: string) =>
    html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

/** First paragraph of the post — used as the blog-list summary when left empty. */
export function firstParagraphText(html: string): string {
    const m = html.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
    return stripTags(m ? m[1] : html);
}

/** Checks a post against the house structure; shown as a checklist in the editor. */
export function blogChecklist(input: {
    title: string;
    content: string;
    featuredImage: { url: string; alt?: string } | null;
    seoTitle: string;
    seoDescription: string;
}) {
    const c = input.content;
    const words = stripTags(c).split(' ').filter(Boolean).length;
    const sections = (c.match(/<h[23]\b/gi) || []).length;
    const internalLinks = (c.match(/<a\b[^>]*href="(https?:\/\/(www\.)?deepetservices\.com|\/)[^"]*"/gi) || []).length;
    const hasFaq = /<h[2-5][^>]*>(?:<b>)?\s*(short\s+)?faqs?\b/i.test(c);
    const seoTitleLen = (input.seoTitle || input.title).length;
    const descLen = input.seoDescription.length;
    return [
        { ok: !!input.featuredImage?.url, label: 'Featured image added' },
        { ok: !!input.featuredImage?.alt?.trim(), label: 'Featured image has a description (alt text)' },
        { ok: /^<p\b/i.test(c.trim()), label: 'Starts with an intro paragraph' },
        { ok: sections >= 3, label: `At least 3 section headings (${sections})` },
        { ok: internalLinks >= 1, label: `Links to a DeePet service page (${internalLinks})` },
        { ok: hasFaq, label: 'Has a "Short FAQ" section' },
        { ok: words >= 600, label: `Length 600+ words (${words})` },
        { ok: seoTitleLen > 0 && seoTitleLen <= 60, label: `SEO title up to 60 characters (${seoTitleLen})` },
        { ok: descLen >= 120 && descLen <= 160, label: `Meta description 120–160 characters (${descLen})` },
    ];
}
