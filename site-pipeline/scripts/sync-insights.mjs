#!/usr/bin/env node
/**
 * sync-insights.mjs — Notion "Website Insights" → static HTML for advisorymonks.io
 *
 * Reads the Notion database (Status = Published), generates one article page per
 * entry under insights/<slug>.html, and injects cards/links into insights.html,
 * sitemap.xml and rss.xml between marker comments (created automatically). Existing
 * hand-written content is preserved. Listing/sitemap/RSS updates are best-effort:
 * if an insertion point isn't found, it logs and continues (article still publishes).
 *
 * Env:
 *   NOTION_TOKEN        (required) Notion internal integration secret
 *   NOTION_DATABASE_ID  (required) the "Website Insights" database id
 *   CONTENT_DIR         (optional) repo path holding index.html etc. Default "."
 *
 * No external dependencies — uses Node 20+ built-in fetch.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const TOKEN = process.env.NOTION_TOKEN;
const DB = process.env.NOTION_DATABASE_ID;
const ROOT = process.env.CONTENT_DIR || '.';
const SITE = 'https://www.advisorymonks.io';
const NOTION_VERSION = '2022-06-28';

if (!TOKEN || !DB) { console.error('Missing NOTION_TOKEN or NOTION_DATABASE_ID'); process.exit(1); }

const api = async (url, opts = {}) => {
  const r = await fetch(url, {
    ...opts,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  });
  if (!r.ok) throw new Error(`Notion API ${r.status} on ${url}\n${await r.text()}`);
  return r.json();
};

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) => s.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 70);

const richToHtml = (rt = []) => rt.map((t) => {
  let out = esc(t.plain_text || '');
  const a = t.annotations || {};
  if (a.code) out = `<code>${out}</code>`;
  if (a.bold) out = `<strong>${out}</strong>`;
  if (a.italic) out = `<em>${out}</em>`;
  if (t.href) out = `<a href="${esc(t.href)}" rel="noopener">${out}</a>`;
  return out;
}).join('');
const plain = (rt = []) => rt.map((t) => t.plain_text || '').join('');

async function blocksToHtml(blockId) {
  let html = '', cursor, listBuf = null, listTag = null;
  const flush = () => { if (listBuf) { html += `<${listTag}>${listBuf}</${listTag}>\n`; listBuf = null; listTag = null; } };
  do {
    const url = `https://api.notion.com/v1/blocks/${blockId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ''}`;
    const data = await api(url);
    for (const b of data.results) {
      const t = b.type;
      const rt = b[t]?.rich_text;
      if (t === 'bulleted_list_item' || t === 'numbered_list_item') {
        const tag = t === 'bulleted_list_item' ? 'ul' : 'ol';
        if (listTag && listTag !== tag) flush();
        listTag = tag; listBuf = (listBuf || '') + `<li>${richToHtml(rt)}</li>`;
        continue;
      }
      flush();
      switch (t) {
        case 'paragraph': if (plain(rt).trim()) html += `<p>${richToHtml(rt)}</p>\n`; break;
        case 'heading_1': case 'heading_2': html += `<h2>${richToHtml(rt)}</h2>\n`; break;
        case 'heading_3': html += `<h3>${richToHtml(rt)}</h3>\n`; break;
        case 'quote': case 'callout': html += `<blockquote>${richToHtml(rt)}</blockquote>\n`; break;
        case 'divider': html += `<hr>\n`; break;
        case 'code': html += `<pre><code>${esc(plain(rt))}</code></pre>\n`; break;
        default: if (rt && plain(rt).trim()) html += `<p>${richToHtml(rt)}</p>\n`;
      }
    }
    cursor = data.has_more ? data.next_cursor : null;
  } while (cursor);
  flush();
  return html;
}

const prop = (p, name) => p[name];
const getText = (p, name) => plain(prop(p, name)?.rich_text || []);
const getTitle = (p) => { const k = Object.keys(p).find((k) => p[k].type === 'title'); return k ? plain(p[k].title) : ''; };
const monthName = (d) => new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

const articleHtml = (a) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(a.title)} · Advisory Monks Consulting</title>
<meta name="description" content="${esc(a.seo)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${SITE}/insights/${a.slug}">
<meta property="og:type" content="article">
<meta property="og:url" content="${SITE}/insights/${a.slug}">
<meta property="og:title" content="${esc(a.title)} · Advisory Monks Consulting">
<meta property="og:description" content="${esc(a.seo)}">
<meta property="og:site_name" content="Advisory Monks Consulting">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(a.title)} · Advisory Monks Consulting">
<meta name="twitter:description" content="${esc(a.seo)}">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230A0A0A'/%3E%3Ctext x='16' y='22' font-family='Inter,sans-serif' font-size='18' font-weight='600' fill='%23FBFBF8' text-anchor='middle'%3EA%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="../practices/practice.css">
<link rel="stylesheet" href="../sections.css">
<link rel="stylesheet" href="../chambers.css">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":${JSON.stringify(a.title)},"datePublished":"${a.date}","dateModified":"${a.date}","author":{"@type":"Organization","name":"Advisory Monks Consulting"},"publisher":{"@type":"Organization","name":"Advisory Monks Consulting"},"mainEntityOfPage":{"@type":"WebPage","@id":"${SITE}/insights/${a.slug}"}}
</script>
</head>
<body>
<header class="rail">
  <div class="rail-l">
    <a href="../index.html" aria-label="Advisory Monks Consulting home">
      <img src="../logo.svg" alt="Advisory Monks Consulting" width="200" height="72" style="height:32px; width:auto; display:block;">
    </a>
  </div>
  <input type="checkbox" id="nav-toggle" class="nav-toggle-cb" aria-hidden="true">
  <nav class="rail-c" aria-label="Primary navigation">
      <a href="../index.html#practices">Practices</a>
      <a href="../index.html#who">Who we serve</a>
      <a href="../index.html#pricing">Engagements</a>
      <a href="../team.html">Team</a>
      <a href="../insights.html" class="active">Insights</a>
      <a href="../index.html#about">About</a>
      <a href="../index.html#contact">Contact</a>
  </nav>
  <div class="rail-r">
    <label for="nav-toggle" class="nav-toggle" aria-label="Toggle navigation menu" title="Menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></label>
    <a class="cta" href="mailto:shamik@advisorymonks.io">Speak with a partner</a>
  </div>
</header>
<main id="main">
<article class="page-view page-view-wide ins-article" aria-labelledby="ia-h">
  <a href="../insights.html" class="pv-back" style="margin-bottom:24px; margin-top:0;">← All insights</a>
  <span class="pv-eyebrow">${esc(a.tag)}</span>
  <h1 id="ia-h">${esc(a.title)}</h1>
  <p class="pv-lead">${esc(a.deck)}</p>
  <div class="pv-meta">
    <span>${a.dateLabel}</span>
    <span>${a.readMin} min read</span>
    <span>By the partnership</span>
  </div>
${a.body}
  <a href="../insights.html" class="pv-back">← All insights</a>
</article>
</main>
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} Advisory Monks Consulting (OPC) Private Limited</span>
      <span>Independent advisory · ex-Big 4 leadership · Founded 2021</span>
    </div>
  </div>
</footer>
<a class="wa-fab" href="https://wa.me/918595116297?text=Hi%20Advisory%20Monks%2C%20I%27d%20like%20to%20speak%20with%20a%20partner" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.768.967-.941 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg></a>
</body>
</html>
`;

const cardHtml = (a) => `    <a class="ins-card" href="insights/${a.slug}.html">
      <div class="ins-card-meta">
        <span class="ins-card-tag">${esc(a.tag)}</span>
        <span class="ins-card-date">${a.dateLabel} · ${a.readMin} min read</span>
      </div>
      <h3 class="ins-card-h">${esc(a.title)}</h3>
      <p class="ins-card-deck">${esc(a.deck)}</p>
      <span class="ins-card-cta">Read the full note <span aria-hidden="true">→</span></span>
    </a>`;

const START = '<!-- NOTION:START -->', END = '<!-- NOTION:END -->';

/** Insert/replace a marked block. mode 'after' inserts after openRe match; 'before' inserts before closeStr. Returns new string or null if no insertion point. */
function injectInto(src, block, { afterRe, beforeStr } = {}) {
  if (src.includes(START)) {
    return src.replace(new RegExp(`${START}[\\s\\S]*?${END}`), `${START}\n${block}\n${END}`);
  }
  if (afterRe) {
    const m = src.match(afterRe);
    if (m) { const at = m.index + m[0].length; return src.slice(0, at) + `\n${START}\n${block}\n${END}` + src.slice(at); }
  }
  if (beforeStr) {
    const i = src.lastIndexOf(beforeStr);
    if (i !== -1) return src.slice(0, i) + `${START}\n${block}\n${END}\n` + src.slice(i);
  }
  return null;
}

async function updateFile(file, build, opts) {
  const fp = path.join(ROOT, file);
  if (!existsSync(fp)) { console.log(`• ${file} not found — skipped.`); return; }
  try {
    const src = await readFile(fp, 'utf8');
    const out = injectInto(src, build(), opts);
    if (out == null) { console.log(`• ${file}: no insertion point found — skipped (article page still published).`); return; }
    await writeFile(fp, out);
    console.log(`✓ updated ${file}`);
  } catch (e) { console.log(`• ${file}: update skipped (${e.message})`); }
}

async function main() {
  const q = await api(`https://api.notion.com/v1/databases/${DB}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: { property: 'Status', select: { equals: 'Published' } },
      sorts: [{ property: 'Publish Date', direction: 'descending' }],
    }),
  });
  console.log(`Notion returned ${q.results.length} published entr${q.results.length === 1 ? 'y' : 'ies'}.`);

  const articles = [];
  for (const page of q.results) {
    try {
      const p = page.properties;
      const title = getTitle(p);
      if (!title) { console.log('• skipping an entry with no title'); continue; }
      const slug = (getText(p, 'Slug') || slugify(title)).replace(/[^\w-]/g, '');
      const deck = getText(p, 'Deck');
      const tag = prop(p, 'Tag')?.select?.name || 'Insights';
      const date = prop(p, 'Publish Date')?.date?.start || page.created_time.slice(0, 10);
      const seo = getText(p, 'SEO Description') || deck;
      const body = await blocksToHtml(page.id);
      const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
      const readMin = Math.max(1, Math.round(words / 200));
      const a = { title, slug, deck, tag, date, dateLabel: monthName(date), seo, body, readMin };
      await mkdir(path.join(ROOT, 'insights'), { recursive: true });
      await writeFile(path.join(ROOT, 'insights', `${slug}.html`), articleHtml(a));
      console.log(`✓ insights/${slug}.html`);
      articles.push(a);
    } catch (e) {
      console.error(`! failed to build "${getTitle(page.properties) || page.id}": ${e.message}`);
    }
  }

  if (articles.length) {
    await updateFile('insights.html', () => articles.map(cardHtml).join('\n'), { afterRe: /<div\s+class="ins-list"\s*>/ });
    await updateFile('sitemap.xml', () => articles.map((a) => `  <url><loc>${SITE}/insights/${a.slug}</loc><lastmod>${a.date}</lastmod></url>`).join('\n'), { beforeStr: '</urlset>' });
    await updateFile('rss.xml', () => articles.map((a) => `    <item><title>${esc(a.title)}</title><link>${SITE}/insights/${a.slug}</link><guid>${SITE}/insights/${a.slug}</guid><pubDate>${new Date(a.date).toUTCString()}</pubDate><description>${esc(a.deck)}</description></item>`).join('\n'), { beforeStr: '</channel>' });
  }
  console.log(`Done. ${articles.length} article page(s) generated.`);
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
