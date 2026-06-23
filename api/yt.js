import ytdl from '@distube/ytdl-core';
import { Readable } from 'stream';

export default async function handler(req, res) {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).json({ error: 'bad id' });

  try {
    const info = await ytdl.getInfo('https://www.youtube.com/watch?v=' + vid, {
      requestOptions: { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 },
    });

    const fmt = info.formats
      .filter(f => f.hasVideo && f.hasAudio && f.url)
      .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))[0]
      || info.formats
      .filter(f => f.hasVideo && f.url)
      .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))[0];

    if (!fmt?.url) return res.status(502).json({ error: 'no downloadable format' });

    const r = await fetch(fmt.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      signal: AbortSignal.timeout(120000),
    });
    if (!r.ok) return res.status(502).json({ error: 'upstream fetch failed' });

    res.setHeader('Content-Type', fmt.mimeType || 'video/mp4');
    res.setHeader('Content-Disposition', 'attachment; filename="' + vid + '.mp4"');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Access-Control-Allow-Origin', '*');
    Readable.fromWeb(r.body).pipe(res);
  } catch (e) {
    if (!res.headersSent) res.status(502).json({ error: e.message });
  }
}
