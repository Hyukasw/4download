import express from 'express';
import { Readable } from 'stream';
import { join } from 'path';
import * as cheerio from 'cheerio';

const app = express();
app.use(express.json());
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

function pipe(resp, res, name) {
  const ct = resp.headers.get('content-type') || 'video/mp4';
  const cl = resp.headers.get('content-length');
  res.setHeader('Content-Type', ct);
  res.setHeader('Content-Disposition', 'attachment; filename="' + name + '"');
  res.setHeader('Cache-Control', 'no-cache');
  if (cl) res.setHeader('Content-Length', cl);
  Readable.fromWeb(resp.body).pipe(res);
}

// ─── YouTube via Invidious ───
const YT_HOSTS = ['invidious.snopyta.org', 'yewtu.be', 'invidious.private.coffee', 'inv.riverside.rocks'];

app.get('/api/yt', async (req, res) => {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).json({ error: 'bad id' });
  for (const host of YT_HOSTS) {
    try {
      const r = await fetch('https://' + host + '/api/v1/videos/' + vid, {
        headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(8000),
      });
      if (!r.ok) continue;
      const data = await r.json();
      const best = (data.formatStreams || []).sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))[0];
      const url = best?.url || data.downloadUrl;
      if (!url) continue;
      const s = await fetch(url, {
        headers: { 'User-Agent': UA, 'Accept': '*/*', 'Referer': 'https://' + host + '/' },
        signal: AbortSignal.timeout(180000),
      });
      if (s.ok) return pipe(s, res, vid + '.mp4');
    } catch (_) {}
  }
  res.status(502).json({ error: 'download failed' });
});

// ─── Generic download ───
function og(html, prop) {
  const p = prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = html.match(new RegExp('<meta[^>]+(?:property|name)=["\']' + p + '["\'][^>]+content=["\']([^"\']+)["\']', 'i'))
    || html.match(new RegExp('<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']' + p + '["\']', 'i'));
  return m?.[1] || null;
}

async function extractTikTok(html) {
  const $ = cheerio.load(html);
  for (const s of $('script').toArray()) {
    const t = $(s).html() || '';
    const m = t.match(/window\.__SIGI_STATE__\s*=\s*({.+?});/);
    if (m) { try { const d = JSON.parse(m[1]); const u = d?.VideoModule?.video?.videoUrl; if (u) return u; } catch (_) {} }
  }
  const j = $('script[type="application/ld+json"]').html();
  if (j) { try { const d = JSON.parse(j); const u = d?.video?.contentUrl; if (u) return u; } catch (_) {} }
  const m = html.match(/"video":{"url":"([^"]+)"/) || html.match(/"playAddr":"([^"]+)"/);
  return m ? m[1].replace(/\\u002F/g, '/').replace(/\\/g, '') : null;
}

app.get('/api/dl', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'missing url' });
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': '*/*', 'Accept-Language': 'en-US,en;q=0.9' },
      signal: AbortSignal.timeout(30000),
    });
    if (!r.ok) throw Error('HTTP ' + r.status);
    const ct = (r.headers.get('content-type') || '').toLowerCase();
    if (ct.startsWith('video/')) return pipe(r, res, 'video.mp4');

    const html = await r.text();
    const low = url.toLowerCase();
    let src = null;
    if (low.includes('tiktok')) src = await extractTikTok(html);
    else src = og(html, 'og:video') || og(html, 'og:video:url') || og(html, 'twitter:player:stream');

    if (src) {
      const v = await fetch(src, {
        headers: { 'User-Agent': UA, 'Accept': '*/*', 'Referer': url },
        signal: AbortSignal.timeout(60000),
      });
      if (v.ok) return pipe(v, res, 'video.mp4');
    }
    res.status(404).json({ error: 'no video found' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Thumbnail proxy ───
app.get('/api/thumb', async (req, res) => {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).end();
  for (const q of ['maxresdefault', 'hqdefault', 'mqdefault', 'sddefault']) {
    try {
      const r = await fetch('https://img.youtube.com/vi/' + vid + '/' + q + '.jpg', {
        headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(5000),
      });
      if (r.ok) {
        const buf = Buffer.from(await r.arrayBuffer());
        res.setHeader('Content-Type', r.headers.get('content-type') || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.end(buf);
      }
    } catch (_) {}
  }
  res.status(404).end();
});

// ─── Embed proxy ───
app.get('/api/embed', (req, res) => {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).end('bad id');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end('<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#000;display:flex;align-items:center;justify-content:center;height:100vh;overflow:hidden}iframe{width:100vw;height:56.25vw;max-height:100vh;max-width:177.78vh;border:none}</style></head><body><iframe src="https://www.youtube.com/embed/' + vid + '?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe></body></html>');
});

// ─── Background video proxy ───
const BG = [
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://media.w3.org/2010/05/sintel/trailer.mp4',
];

app.get('/api/bg-video', async (req, res) => {
  const idx = parseInt(req.query.idx) || 0;
  try {
    const r = await fetch(BG[Math.abs(idx) % BG.length], {
      headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000),
    });
    if (!r.ok) return res.status(502).end();
    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', r.headers.get('content-type') || 'video/mp4');
    res.setHeader('Cache-Control', 'no-cache');
    res.end(buf);
  } catch (_) { res.status(502).end(); }
});

// ─── Static files ───
app.use(express.static(join(process.cwd(), 'public')));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'not found' });
  res.sendFile(join(process.cwd(), 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('4DownVid running on http://localhost:' + PORT));
