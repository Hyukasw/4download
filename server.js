import express from 'express';
import { join } from 'path';
import { Readable } from 'stream';
import * as cheerio from 'cheerio';

const app = express();
app.use(express.json());
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

// ─── YouTube via yt-dlp ───
import { execSync, spawn } from 'child_process';

app.get('/api/yt', async (req, res) => {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).json({ error: 'bad id' });

  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', 'attachment; filename="' + vid + '.mp4"');
  res.setHeader('Cache-Control', 'no-cache');

  const proc = spawn('C:\\Users\\User\\AppData\\Local\\Programs\\Python\\Python313\\Scripts\\yt-dlp.exe', [
    '-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
    '-o', '-',
    'https://www.youtube.com/watch?v=' + vid,
  ], { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true, timeout: 180000 });

  let started = false;
  proc.stdout.on('data', () => { if (!started) { started = true; } });
  proc.stdout.pipe(res);

  proc.on('error', () => { if (!res.headersSent) res.status(502).json({ error: 'process error' }); });
  proc.on('close', code => {
    if (code !== 0 && !started && !res.headersSent) {
      res.status(502).json({ error: 'yt-dlp failed with code ' + code });
    }
  });

  // Kill if client disconnects
  req.on('close', () => { proc.kill(); });
});

// ─── YouTube info (show metadata before download) ───
function fmtSize(bytes) {
  if (!bytes) return null;
  const b = parseInt(bytes);
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
  if (b < 1024 * 1024 * 1024) return (b / 1024 / 1024).toFixed(1) + ' MB';
  return (b / 1024 / 1024 / 1024).toFixed(2) + ' GB';
}
function fmtDuration(sec) {
  if (!sec && sec !== 0) return null;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  if (m >= 60) {
    const h = Math.floor(m / 60);
    return h + ':' + String(m % 60).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }
  return m + ':' + String(s).padStart(2, '0');
}

app.get('/api/info', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'missing url' });
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const low = url.toLowerCase();

    // YouTube — use yt-dlp --dump-json for full metadata (fast, no download)
    if (low.includes('youtube.com') || low.includes('youtu.be')) {
      const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (!m) return res.status(400).json({ error: 'bad youtube id' });

      const ytpath = 'C:\\Users\\User\\AppData\\Local\\Programs\\Python\\Python313\\Scripts\\yt-dlp.exe';
      const out = execSync(`"${ytpath}" -j "${'https://www.youtube.com/watch?v=' + m[1]}"`, {
        timeout: 30000, windowsHide: true, encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024,
      });
      const data = JSON.parse(out.trim().split('\n')[0]);

      const formats = (data.formats || [])
        .filter(f => f.vcodec !== 'none')
        .map(f => ({
          label: f.format_note || f.height + 'p' || 'unknown',
          size: f.filesize || f.filesize_approx || 0,
          format: f.extension || 'mp4',
          hasAudio: f.acodec !== 'none',
          bitrate: f.tbr || f.vbr || 0,
        }))
        .sort((a, b) => {
          if (a.hasAudio !== b.hasAudio) return b.hasAudio - a.hasAudio;
          return (b.bitrate || 0) - (a.bitrate || 0);
        });

      const best = formats[0] || null;
      const allLabels = [...new Set(formats.map(f => f.label).filter(Boolean))];
      const maxQ = [...allLabels].sort((a, b) => {
        const na = parseInt(a), nb = parseInt(b);
        return (nb || 0) - (na || 0);
      })[0] || null;
      return res.json({
        title: data.title || 'YouTube Video',
        duration: data.duration || 0,
        durationFormatted: fmtDuration(data.duration),
        thumbnail: data.thumbnail || null,
        platform: 'youtube',
        qualities: allLabels,
        maxQuality: maxQ,
        best: best ? {
          quality: best.label, size: best.size,
          sizeFormatted: fmtSize(best.size), format: best.format,
          hasAudio: best.hasAudio,
        } : null,
      });
    }

    // Non-YouTube: scrape og tags
    const r = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': 'text/html' },
      signal: AbortSignal.timeout(15000),
    });
    const html = await r.text();
    let platform = 'unknown';
    if (low.includes('tiktok')) platform = 'tiktok';
    else if (low.includes('instagram')) platform = 'instagram';
    else if (low.includes('facebook') || low.includes('fb.')) platform = 'facebook';
    else if (low.includes('twitter') || low.includes('x.com')) platform = 'twitter';

    return res.json({
      title: og(html, 'og:title') || og(html, 'twitter:title') || '',
      duration: null, durationFormatted: null,
      thumbnail: og(html, 'og:image') || og(html, 'twitter:image'),
      platform, qualities: [], best: null,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
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
    if (ct.startsWith('video/')) return res.json({ url, found: true });

    const html = await r.text();
    const low = url.toLowerCase();
    let src = null;
    if (low.includes('tiktok')) src = await extractTikTok(html);
    else src = og(html, 'og:video') || og(html, 'og:video:url') || og(html, 'twitter:player:stream');

    if (src) return res.json({ url: src, found: true, referer: url });
    res.status(404).json({ error: 'no video found' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Pipe proxy (same-origin download, streaming) ───
app.get('/api/pipe', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'missing url' });
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': '*/*' },
      signal: AbortSignal.timeout(180000),
    });
    if (!r.ok) return res.status(502).json({ error: 'fetch failed ' + r.status });
    const ct = r.headers.get('content-type') || 'video/mp4';
    res.setHeader('Content-Type', ct);
    res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
    res.setHeader('Cache-Control', 'no-cache');
    Readable.fromWeb(r.body).pipe(res);
  } catch (e) {
    if (!res.headersSent) res.status(500).json({ error: e.message });
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
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  'https://videos.pexels.com/video-files/1851190/1851190-sd_640_360_25fps.mp4',
  'https://videos.pexels.com/video-files/2611250/2611250-sd_640_360_30fps.mp4',
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

