#!/usr/bin/env node
/**
 * sync-insights.mjs — Notion "Website Insights" → static HTML for advisorymonks.io
 *
 * Reads the Notion database (Status = Published), generates one article page per
 * entry under insights/<slug>.html, and injects cards/links into insights.html,
 * sitemap.xml and rss.xml between <!-- NOTION:START --> / <!-- NOTION:END --> markers
 * (which it creates automatically on first run). Existing hand-written articles are
 * left untouched.
 *
 * Env:
 *   NOTION_TOKEN        (required) Notion internal integration secret
 *   NOTION_DATABASE_ID  (required) the "Website Insights" database id
 *   CONTENT_DIR         (optional) repo path that holds index.html etc. Default "."
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
  if (!r.ok) throw new Error(`Notion ${r.status}: ${await r.text()}`);
  return r.json();
};

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) => s.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 70);

// ---- rich text → HTML ----
const richToHtml = (rt = []) => rt.map((t) => {
  let out = esc(t.plain_text);
  const a = t.annotations || {};
  if (a.code) out = `<code>${out}</code>`;
  if (a.bold) out = `<strong>${out}</strong>`;
  if (a.italic) out = `<em>${out}</em>`;
  if (t.href) out = `<a href="${esc(t.href)}" rel="noopener">${out}</a>`;
  return out;
}).join('');

const plain = (rt = []) => rt.map((t) => t.plain_text).join('');

// ---- blocks → HTML ----
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
        case 'heading_1': html += `<h2>${richToHtml(rt)}</h2>\n`; break;
        case 'heading_2': html += `<h2>${richToHtml(rt)}</h2>\n`; break;
        case 'heading_3': html += `<h3>${richToHtml(rt)}</h3>\n`; break;
        case 'quote': html += `<blockquote>${richToHtml(rt)}</blockquote>\n`; break;
        case 'divider': html += `<hr>\n`; break;
        case 'callout': html += `<blockquote>${richToHtml(rt)}</blockquote>\n`; break;
        case 'code': html += `<pre><code>${esc(plain(rt))}</code></pre>\n`; break;
        default: if (rt && plain(rt).trim()) html += `<p>${richToHtml(rt)}</p>\n`;
      }
    }
    cursor = data.has_more ? data.next_cursor : null;
  } while (cursor);
  flush();
  return html;
}

// ---- property helpers ----
const prop = (p, name) => p[name];
const getText = (p, name) => plain(prop(p, name)?.rich_text || []);
const getTitle = (p) => { const k = Object.keys(p).find((k) => p[k].type === 'title'); return plain(p[k].title); };

// ---- templates ----
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

// inject content between markers, creating them after `anchor` if absent
function inject(src, anchor, block) {
  const START = '<!-- NOTION:START -->', END = '<!-- NOTION:END -->';
  if (!src.includes(START)) {
    const i = src.indexOf(anchor);
    if (i === -1) throw new Error(`Anchor not found: ${anchor}`);
    const at = i + anchor.length;
    src = src.slice(0, at) + `\n${START}\n${END}\n` + src.slice(at);
  }
  const re = new RegExp(`${START}[\\s\\S]*?${END}`);
  return src.replace(re, `${START}\n${block}\n${END}`);
}

// ---- main ----
const monthName = (d) => new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

async function main() {
  const q = await api(`https://api.notion.com/v1/databases/${DB}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: { property: 'Status', select: { equals: 'Published' } },
      sorts: [{ property: 'Publish Date', direction: 'descending' }],
    }),
  });

  const articles = [];
  for (const page of q.results) {
    const p = page.properties;
    const title = getTitle(p);
    if (!title) continue;
    const slug = (getText(p, 'Slug') || slugify(title)).replace(/[^\w-]/g, '');
    const deck = getText(p, 'Deck');
    const tag = prop(p, 'Tag')?.select?.name || 'Insights';
    const date = prop(p, 'Publish Date')?.date?.start || page.created_time.slice(0, 10);
    const seo = getText(p, 'SEO Description') || deck;
    const body = await blocksToHtml(page.id);
    const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    const readMin = Math.max(1, Math.round(words / 200));
    articles.push({ title, slug, deck, tag, date, dateLabel: monthName(date), seo, body, readMin });
  }

  // write article pages
  await mkdir(path.join(ROOT, 'insights'), { recursive: true });
  for (const a of articles) {
    await writeFile(path.join(ROOT, 'insights', `${a.slug}.html`), articleHtml(a));
    console.log(`✓ insights/${a.slug}.html`);
  }

  // insights.html listing
  const listingPath = path.join(ROOT, 'insights.html');
  let listing = await readFile(listingPath, 'utf8');
  listing = inject(listing, '<div class="ins-list">', articles.map(cardHtml).join('\n'));
  await writeFile(listingPath, listing);

  // sitemap.xml
  const smPath = path.join(ROOT, 'sitemap.xml');
  if (existsSync(smPath)) {
    let sm = await readFile(smPath, 'utf8');
    const urls = articles.map((a) => `  <url><loc>${SITE}/insights/${a.slug}</loc><lastmod>${a.date}</lastmod></url>`).join('\n');
    sm = inject(sm, '<urlset', urls);
    await writeFile(smPath, sm);
  }

  // rss.xml
  const rssPath = path.join(ROOT, 'rss.xml');
  if (existsSync(rssPath)) {
    let rss = await readFile(rssPath, 'utf8');
    const items = articles.map((a) => `    <item><title>${esc(a.title)}</title><link>${SITE}/insights/${a.slug}</link><guid>${SITE}/insights/${a.slug}</guid><pubDate>${new Date(a.date).toUTCString()}</pubDate><description>${esc(a.deck)}</description></item>`).join('\n');
    rss = inject(rss, '<channel>', items);
    await writeFile(rssPath, rss);
  }

  console.log(`Done. ${articles.length} published article(s) synced.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
