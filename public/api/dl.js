const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'missing url' });

  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': '*/*', 'Accept-Language': 'en-US,en;q=0.9' },
      signal: AbortSignal.timeout(30000),
    });
    if (!r.ok) throw Error('HTTP ' + r.status);
    const ct = (r.headers.get('content-type') || '').toLowerCase();
    if (ct.startsWith('video/')) return res.json({ url: url, found: true });

    const html = await r.text();
    const low = url.toLowerCase();
    let src = null;

    if (low.includes('tiktok')) {
      const m = html.match(/"video":{"url":"([^"]+)"/) || html.match(/"playAddr":"([^"]+)"/);
      if (m) src = m[1].replace(/\\u002F/g, '/').replace(/\\/g, '');
    } else {
      src = og(html, 'og:video') || og(html, 'og:video:url') || og(html, 'twitter:player:stream');
    }

    if (src) return res.json({ url: src, found: true, referer: url });
    res.status(404).json({ error: 'no video found' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

function og(html, prop) {
  const p = prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = html.match(new RegExp('<meta[^>]+(?:property|name)=["\']' + p + '["\'][^>]+content=["\']([^"\']+)["\']', 'i'))
    || html.match(new RegExp('<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']' + p + '["\']', 'i'));
  return m?.[1] || null;
}
