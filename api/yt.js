const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
const INSTANCES = [
  'invidious.snopyta.org',
  'yewtu.be',
  'invidious.private.coffee',
  'invidious.projectsegfau.lt',
  'inv.riverside.rocks',
];

async function tryInstance(host, vid) {
  const url = 'https://' + host + '/api/v1/videos/' + vid;
  const resp = await fetch(url, {
    headers: { 'User-Agent': UA },
    signal: AbortSignal.timeout(10000),
  });
  if (!resp.ok) throw new Error('HTTP ' + resp.status);
  const data = await resp.json();
  const streams = data.formatStreams || [];
  const sorted = streams.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
  return sorted[0]?.url || data.downloadUrl || null;
}

export default async function handler(req, res) {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).json({ error: 'Invalid video ID' });

  let lastErr = 'No instances available';
  for (const host of INSTANCES) {
    try {
      const url = await tryInstance(host, vid);
      if (url) {
        const vresp = await fetch(url, {
          headers: { 'User-Agent': UA, 'Accept': '*/*', 'Referer': 'https://' + host + '/' },
          signal: AbortSignal.timeout(60000),
        });
        if (vresp.ok) {
          const ct = vresp.headers.get('content-type') || 'video/mp4';
          const cl = vresp.headers.get('content-length');
          res.setHeader('Content-Type', ct);
          res.setHeader('Content-Disposition', 'attachment; filename="' + vid + '.mp4"');
          res.setHeader('Cache-Control', 'no-cache');
          if (cl) res.setHeader('Content-Length', cl);
          const buf = Buffer.from(await vresp.arrayBuffer());
          return res.end(buf);
        }
        throw new Error('Video fetch HTTP ' + vresp.status);
      }
    } catch (e) {
      lastErr = host + ': ' + e.message;
    }
  }
  res.status(502).json({ error: 'All Invidious instances failed', details: lastErr });
}
