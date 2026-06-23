const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

function og(html, prop) {
  const p = prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = html.match(new RegExp('<meta[^>]+(?:property|name)=["\']' + p + '["\'][^>]+content=["\']([^"\']+)["\']', 'i'))
    || html.match(new RegExp('<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']' + p + '["\']', 'i'));
  return m?.[1] || null;
}

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'missing url' });

  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': 'text/html', 'Accept-Language': 'en-US,en;q=0.9' },
      signal: AbortSignal.timeout(15000),
    });
    const html = await r.text();
    const low = url.toLowerCase();

    let title = og(html, 'og:title') || og(html, 'twitter:title') || '';
    if (!title) { const m = html.match(/<title[^>]*>([^<]+)<\/title>/i); if (m) title = m[1].trim(); }

    let platform = 'unknown';
    if (low.includes('tiktok')) platform = 'tiktok';
    else if (low.includes('instagram')) platform = 'instagram';
    else if (low.includes('youtube') || low.includes('youtu.be')) platform = 'youtube';
    else if (low.includes('facebook') || low.includes('fb.')) platform = 'facebook';
    else if (low.includes('twitter') || low.includes('x.com')) platform = 'twitter';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ title, platform });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
