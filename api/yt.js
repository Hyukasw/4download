const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
const HOSTS = ['invidious.snopyta.org', 'yewtu.be', 'invidious.private.coffee', 'inv.riverside.rocks'];

export default async function handler(req, res) {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).json({ error: 'bad id' });

  for (const host of HOSTS) {
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
}

async function pipe(resp, res, name) {
  res.setHeader('Content-Type', resp.headers.get('content-type') || 'video/mp4');
  res.setHeader('Content-Disposition', 'attachment; filename="' + name + '"');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const buf = Buffer.from(await resp.arrayBuffer());
  res.end(buf);
}
