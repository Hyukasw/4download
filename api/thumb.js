export default async function handler(req, res) {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).json({ error: 'Invalid video ID' });

  const qualities = ['maxresdefault', 'hqdefault', 'mqdefault', 'sddefault'];
  for (const q of qualities) {
    try {
      const url = 'https://img.youtube.com/vi/' + vid + '/' + q + '.jpg';
      const resp = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(5000),
      });
      if (resp.ok) {
        const buf = Buffer.from(await resp.arrayBuffer());
        const ct = resp.headers.get('content-type') || 'image/jpeg';
        res.setHeader('Content-Type', ct);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.end(buf);
      }
    } catch (e) {}
  }
  res.status(404).end();
}
