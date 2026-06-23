const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

function ogTag(html, prop) {
  const re = new RegExp('<meta[^>]+(?:property|name)=["\']' + prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\'][^>]+content=["\']([^"\']+)["\']', 'i');
  const m1 = html.match(re);
  if (m1) return m1[1];
  const re2 = new RegExp('<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']' + prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\']', 'i');
  return html.match(re2)?.[1] || null;
}

function extractVideoId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'Missing ?url=' });

  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': 'text/html', 'Accept-Language': 'en-US,en;q=0.9' },
      signal: AbortSignal.timeout(15000),
    });
    const html = await resp.text();
    const lowerUrl = url.toLowerCase();

    let title = ogTag(html, 'og:title') || ogTag(html, 'twitter:title') || '';
    if (!title) { const tm = html.match(/<title[^>]*>([^<]+)<\/title>/i); if (tm) title = tm[1]; }

    let duration = '';
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
      const vid = extractVideoId(url);
      if (vid) duration = vid;
    }

    res.json({ title: title.trim(), thumbnail: '/api/thumb?v=' + (extractVideoId(url) || ''), platform: lowerUrl.includes('tiktok') ? 'tiktok' : lowerUrl.includes('instagram') ? 'instagram' : 'youtube', user: null });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
