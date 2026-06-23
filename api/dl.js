const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

function ogTag(html, prop) {
  const re = new RegExp('<meta[^>]+(?:property|name)=["\']' + prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\'][^>]+content=["\']([^"\']+)["\']', 'i');
  const m1 = html.match(re);
  if (m1) return m1[1];
  const re2 = new RegExp('<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']' + prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\']', 'i');
  const m2 = html.match(re2);
  return m2 ? m2[1] : null;
}

async function pipeOrBuffer(resp, res, filename) {
  const ct = resp.headers.get('content-type') || 'video/mp4';
  const cl = resp.headers.get('content-length');
  res.setHeader('Content-Type', ct);
  res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Cache-Control', 'no-cache');
  if (cl) res.setHeader('Content-Length', cl);
  const buf = Buffer.from(await resp.arrayBuffer());
  res.end(buf);
}

export default async function handler(req, res) {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: 'Missing ?url=' });

  try {
    const resp = await fetch(videoUrl, {
      headers: { 'User-Agent': UA, 'Accept': '*/*', 'Accept-Language': 'en-US,en;q=0.9' },
      signal: AbortSignal.timeout(30000),
    });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);

    const ct = (resp.headers.get('content-type') || '').toLowerCase();

    if (ct.startsWith('video/')) {
      return pipeOrBuffer(resp, res, 'video.mp4');
    }

    const html = await resp.text();
    const lowerUrl = videoUrl.toLowerCase();
    let extractedUrl = null;

    if (lowerUrl.includes('tiktok.com')) {
      const m = html.match(/"video":{"url":"([^"]+)"/) || html.match(/"playAddr":"([^"]+)"/) || html.match(/"downloadAddr":"([^"]+)"/);
      if (m) extractedUrl = m[1].replace(/\\u002F/g, '/').replace(/\\/g, '');
    } else if (lowerUrl.includes('instagram.com')) {
      extractedUrl = ogTag(html, 'og:video') || ogTag(html, 'og:video:url');
    } else {
      extractedUrl = ogTag(html, 'og:video:url') || ogTag(html, 'og:video') || ogTag(html, 'twitter:player:stream');
    }

    if (extractedUrl) {
      const vresp = await fetch(extractedUrl, {
        headers: { 'User-Agent': UA, 'Accept': '*/*', 'Referer': videoUrl },
        signal: AbortSignal.timeout(60000),
      });
      if (vresp.ok) return pipeOrBuffer(vresp, res, 'video.mp4');
    }

    res.status(404).json({ error: 'No downloadable video found' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
