const BG = [
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  'https://videos.pexels.com/video-files/1851190/1851190-sd_640_360_25fps.mp4',
  'https://videos.pexels.com/video-files/2611250/2611250-sd_640_360_30fps.mp4',
];

export default async function handler(req, res) {
  const idx = parseInt(req.query.idx) || 0;
  try {
    const r = await fetch(BG[Math.abs(idx) % BG.length], {
      headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(30000),
    });
    if (!r.ok) return res.status(502).end();
    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', r.headers.get('content-type') || 'video/mp4');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(buf);
  } catch (_) { res.status(502).end(); }
}
