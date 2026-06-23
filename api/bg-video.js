const BG = [
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://media.w3.org/2010/05/sintel/trailer.mp4',
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
