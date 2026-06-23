import express from 'express';
import { Readable } from 'stream';
import { join } from 'path';
import * as cheerio from 'cheerio';

const app = express();
app.use(express.json());

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

function pipeDownload(resp, res, filename) {
  const ct = resp.headers.get('content-type') || 'video/mp4';
  res.setHeader('Content-Type', ct);
  res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Cache-Control', 'no-cache');
  const cl = resp.headers.get('content-length');
  if (cl) res.setHeader('Content-Length', cl);
  Readable.fromWeb(resp.body).pipe(res);
}

// ─── YouTube ───
const INSTANCES = [
  'invidious.snopyta.org',
  'yewtu.be',
  'invidious.private.coffee',
  'invidious.projectsegfau.lt',
  'inv.riverside.rocks',
];

app.get('/api/yt', async (req, res) => {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).json({ error: 'Invalid video ID' });

  for (const host of INSTANCES) {
    try {
      const r = await fetch('https://' + host + '/api/v1/videos/' + vid, {
        headers: { 'User-Agent': UA },
        signal: AbortSignal.timeout(8000),
      });
      if (!r.ok) continue;
      const data = await r.json();
      const streams = data.formatStreams || [];
      const sorted = streams.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
      const bestUrl = sorted[0]?.url || data.downloadUrl;
      if (!bestUrl) continue;

      const stream = await fetch(bestUrl, {
        headers: { 'User-Agent': UA, 'Accept': '*/*', 'Referer': 'https://' + host + '/' },
        signal: AbortSignal.timeout(180000),
      });
      if (!stream.ok) continue;
      return pipeDownload(stream, res, 'youtube-' + vid + '.mp4');
    } catch (e) { continue; }
  }
  res.status(502).json({ error: 'All instances failed' });
});

// ─── Generic download ───
function ogTag(html, prop) {
  const re = new RegExp('<meta[^>]+(?:property|name)=["\']' + prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\'][^>]+content=["\']([^"\']+)["\']', 'i');
  const m1 = html.match(re);
  if (m1) return m1[1];
  const re2 = new RegExp('<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']' + prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\']', 'i');
  return html.match(re2)?.[1] || null;
}

async function extractTikTok(html) {
  const $ = cheerio.load(html);
  const scripts = $('script').toArray();
  for (const script of scripts) {
    const text = $(script).html() || '';
    const sigi = text.match(/window\.__SIGI_STATE__\s*=\s*({.+?});/);
    if (sigi) {
      try { const data = JSON.parse(sigi[1]); const u = data?.VideoModule?.video?.videoUrl; if (u) return u; } catch (e) {}
    }
  }
  const jsonLd = $('script[type="application/ld+json"]').html();
  if (jsonLd) { try { const ld = JSON.parse(jsonLd); const u = ld?.video?.contentUrl; if (u) return u; } catch (e) {} }
  const m = html.match(/"video":{"url":"([^"]+)"/) || html.match(/"playAddr":"([^"]+)"/) || html.match(/"downloadAddr":"([^"]+)"/);
  if (m) return m[1].replace(/\\u002F/g, '/').replace(/\\/g, '');
  return null;
}

async function extractInstagram(html) {
  const $ = cheerio.load(html);
  return $('meta[property="og:video"]').attr('content') || $('meta[property="og:video:url"]').attr('content') || null;
}

async function extractFromPage(html) {
  const $ = cheerio.load(html);
  return $('meta[property="og:video:url"]').attr('content')
    || $('meta[property="og:video"]').attr('content')
    || $('meta[name="twitter:player:stream"]').attr('content')
    || $('video source').attr('src')
    || $('video').attr('src')
    || null;
}

app.get('/api/dl', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: 'Missing ?url=' });

  try {
    const resp = await fetch(videoUrl, {
      headers: { 'User-Agent': UA, 'Accept': '*/*', 'Accept-Language': 'en-US,en;q=0.9' },
      signal: AbortSignal.timeout(30000),
    });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const ct = (resp.headers.get('content-type') || '').toLowerCase();

    if (ct.startsWith('video/')) return pipeDownload(resp, res, 'video.mp4');

    const html = await resp.text();
    const lowerUrl = videoUrl.toLowerCase();
    let extractedUrl = null;

    if (lowerUrl.includes('tiktok.com')) extractedUrl = await extractTikTok(html);
    else if (lowerUrl.includes('instagram.com')) extractedUrl = await extractInstagram(html);
    else extractedUrl = await extractFromPage(html);

    if (!extractedUrl) extractedUrl = ogTag(html, 'og:video') || ogTag(html, 'og:video:url');

    if (extractedUrl) {
      const vresp = await fetch(extractedUrl, {
        headers: { 'User-Agent': UA, 'Accept': '*/*', 'Referer': videoUrl },
        signal: AbortSignal.timeout(60000),
      });
      if (vresp.ok) return pipeDownload(vresp, res, 'video.mp4');
    }

    res.status(404).json({ error: 'No downloadable video found' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Thumbnail proxy ───
app.get('/api/thumb', async (req, res) => {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).end();

  const qualities = ['maxresdefault', 'hqdefault', 'mqdefault', 'sddefault'];
  for (const q of qualities) {
    try {
      const r = await fetch('https://img.youtube.com/vi/' + vid + '/' + q + '.jpg', {
        headers: { 'User-Agent': UA },
        signal: AbortSignal.timeout(5000),
      });
      if (r.ok) {
        const buf = Buffer.from(await r.arrayBuffer());
        res.setHeader('Content-Type', r.headers.get('content-type') || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.end(buf);
      }
    } catch (e) {}
  }
  res.status(404).end();
});

// ─── Embed proxy ───
app.get('/api/embed', async (req, res) => {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).end('Invalid video ID');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end('<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#000;display:flex;align-items:center;justify-content:center;height:100vh;overflow:hidden}iframe{width:100vw;height:56.25vw;max-height:100vh;max-width:177.78vh;border:none}</style></head><body><iframe src="https://www.youtube.com/embed/' + vid + '?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe></body></html>');
});

// ─── Serve public/ static ───
app.use(express.static(join(process.cwd(), 'public')));

// ─── Fallback for SPA-like routing ───
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(join(process.cwd(), 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('4download server running on http://localhost:' + PORT);
});
