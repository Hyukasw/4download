export default async function handler(req, res) {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).end();

  for (const q of ['maxresdefault', 'hqdefault', 'mqdefault', 'sddefault']) {
    try {
      const r = await fetch('https://img.youtube.com/vi/' + vid + '/' + q + '.jpg', {
        headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(5000),
      });
      if (r.ok) {
        const buf = Buffer.from(await r.arrayBuffer());
        res.setHeader('Content-Type', r.headers.get('content-type') || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.end(buf);
      }
    } catch (_) {}
  }
  res.status(404).end();
}
