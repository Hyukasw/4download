import express from 'express';
import { Readable } from 'stream';
import { join } from 'path';
import * as cheerio from 'cheerio';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

async function fetchWithUA(url, timeout = 30000) {
  return fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.google.com/',
    },
    signal: AbortSignal.timeout(timeout),
  });
}

function pipeDownload(resp, res, filename) {
  const ct = resp.headers.get('content-type') || 'video/mp4';
  res.setHeader('Content-Type', ct);
  res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Cache-Control', 'no-cache');
  const cl = resp.headers.get('content-length');
  if (cl) res.setHeader('Content-Length', cl);
  Readable.fromWeb(resp.body).pipe(res);
}

// ─── YouTube via Invidious API ───
app.get('/yt', async (req, res) => {
  const videoId = req.query.v;
  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return res.status(400).json({ error: 'Invalid video ID' });
  }

  const instances = [
    'https://inv.nadeko.net/api/v1/videos/' + videoId,
    'https://invidious.snopyta.org/api/v1/videos/' + videoId,
    'https://yewtu.be/api/v1/videos/' + videoId,
    'https://vid.puffyan.us/api/v1/videos/' + videoId,
    'https://invidious.private.coffee/api/v1/videos/' + videoId,
  ];

  for (const apiUrl of instances) {
    try {
      const r = await fetch(apiUrl, { signal: AbortSignal.timeout(8000) });
      if (!r.ok) continue;
      const data = await r.json();
      const formats = (data.adaptiveFormats || []).concat(data.formatStreams || []);
      let best = null;
      for (const f of formats) {
        if (!f.url || !f.type) continue;
        if (f.type.startsWith('video/mp4')) {
          const label = f.qualityLabel || '';
          if (!best) best = f;
          if (label.includes('1080p') || label.includes('720p') || label.includes('480p')) best = f;
        }
      }
      if (!best) best = formats.find(f => f.url);
      if (!best || !best.url) continue;

      const stream = await fetch(best.url, {
        headers: { 'User-Agent': UA, 'Accept': '*/*', 'Referer': 'https://www.youtube.com/' },
        signal: AbortSignal.timeout(180000),
      });
      if (!stream.ok) continue;
      return pipeDownload(stream, res, 'youtube-' + videoId + '.mp4');
    } catch (e) { continue; }
  }
  res.status(404).json({ error: 'Could not retrieve YouTube video from any instance' });
});

// ─── TikTok ───
async function extractTikTok(html) {
  const $ = cheerio.load(html);
  const scripts = $('script').toArray();
  for (const script of scripts) {
    const text = $(script).html() || '';
    // Look for the SIGI_STATE or similar JSON
    const sigi = text.match(/window\.__SIGI_STATE__\s*=\s*({.+?});/);
    if (sigi) {
      try {
        const data = JSON.parse(sigi[1]);
        const vidModule = data?.VideoModule?.video?.videoUrl;
        if (vidModule) return vidModule;
      } catch (e) {}
    }
  }

  const jsonLd = $('script[type="application/ld+json"]').html();
  if (jsonLd) {
    try {
      const ld = JSON.parse(jsonLd);
      const url = ld?.video?.contentUrl || ld?.contentUrl;
      if (url) return url;
    } catch (e) {}
  }

  // Regex fallback
  const m = html.match(/"video":{"url":"([^"]+)"/) || html.match(/"playAddr":"([^"]+)"/) || html.match(/"downloadAddr":"([^"]+)"/);
  if (m) return m[1].replace(/\\u002F/g, '/').replace(/\\/g, '');

  return null;
}

// ─── Instagram ───
async function extractInstagram(html) {
  const $ = cheerio.load(html);
  const ogVideo = $('meta[property="og:video"]').attr('content') || $('meta[property="og:video:url"]').attr('content');
  if (ogVideo) return ogVideo;

  const jsonLd = $('script[type="application/ld+json"]').html();
  if (jsonLd) {
    try {
      const ld = JSON.parse(jsonLd);
      const url = ld?.video?.contentUrl;
      if (url) return url;
    } catch (e) {}
  }

  const url = $('meta[property="og:image"]').attr('content');
  if (url) return url.replace(/\.(jpg|png|webp)/, '.mp4');

  return null;
}

// ─── Generic page extraction ───
async function extractFromPage(html, url) {
  const $ = cheerio.load(html);
  const sources = [
    $('meta[property="og:video:url"]').attr('content'),
    $('meta[property="og:video"]').attr('content'),
    $('meta[name="twitter:player:stream"]').attr('content'),
    $('meta[property="twitter:player:stream"]').attr('content'),
    $('video source').attr('src'),
    $('video').attr('src'),
  ];

  for (const src of sources) {
    if (src && (src.startsWith('http') || src.startsWith('//'))) {
      return src.startsWith('//') ? 'https:' + src : src;
    }
  }

  return null;
}

// ─── Direct download with page extraction fallback ───
app.get('/dl', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: 'Missing ?url=' });
  const ua = req.query.ua || '';

  try {
    // Try direct fetch first
    const resp = await fetchWithUA(videoUrl, 30000);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);

    const ct = (resp.headers.get('content-type') || '').toLowerCase();

    // If it's a video, pipe it directly
    if (ct.startsWith('video/')) {
      return pipeDownload(resp, res, 'video.mp4');
    }

    // Otherwise it's HTML — extract video URL
    const html = await resp.text();
    const lowerUrl = videoUrl.toLowerCase();
    let extractedUrl = null;

    if (lowerUrl.includes('tiktok.com')) {
      extractedUrl = await extractTikTok(html);
    } else if (lowerUrl.includes('instagram.com')) {
      extractedUrl = await extractInstagram(html);
    } else {
      extractedUrl = await extractFromPage(html, videoUrl);
    }

    if (!extractedUrl) {
      // Try regex for og:video as last resort
      const ogMatch = html.match(/<meta[^>]+property=["']og:video["'][^>]+content=["']([^"']+)["'][^>]*>/i)
        || html.match(/<meta[^>]+property=["']og:video:url["'][^>]+content=["']([^"']+)["'][^>]*>/i);
      if (ogMatch) extractedUrl = ogMatch[1];
    }

    if (extractedUrl) {
      const videoResp = await fetchWithUA(extractedUrl, 60000);
      if (!videoResp.ok) {
        return res.status(502).json({ error: 'Video extraction succeeded but fetch failed: ' + videoResp.status });
      }
      return pipeDownload(videoResp, res, 'video.mp4');
    }

    // If nothing worked but UA was provided, try with that
    if (!ua) {
      const resp2 = await fetch(videoUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
          'Accept': '*/*',
        },
        signal: AbortSignal.timeout(15000),
      });
      if (resp2.ok && (resp2.headers.get('content-type') || '').startsWith('video/')) {
        return pipeDownload(resp2, res, 'video.mp4');
      }
    }

    res.status(404).json({ error: 'Could not find downloadable video at this URL' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Health check ───
app.get('/ping', (req, res) => res.json({ ok: true }));

// ─── Serve static ───
app.use(express.static(join(process.cwd())));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('4download server running on http://localhost:' + PORT);
  console.log('Frontend: http://localhost:' + PORT + '/index.html');
});
