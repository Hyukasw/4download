import ytdl from '@distube/ytdl-core';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

export default async function handler(req, res) {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).json({ error: 'bad id' });

  const url = 'https://www.youtube.com/watch?v=' + vid;

  try {
    // Try multiple clients to get a format with a usable URL
    const info = await ytdl.getInfo(url, {
      requestOptions: {
        headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' },
        timeout: 20000,
      },
      clients: ['ANDROID_VR', 'WEB', 'ANDROID', 'TV', 'TV_EMBED'],
    });

    // Try formats with video + audio + URL first (best quality), then video-only + URL
    let fmt =
      info.formats
        .filter(f => f.hasVideo && f.hasAudio && f.url)
        .sort((a, b) => ((b.bitrate || 0) - (a.bitrate || 0)))[0] ||
      info.formats
        .filter(f => f.hasVideo && f.url)
        .sort((a, b) => ((b.bitrate || 0) - (a.bitrate || 0)))[0];

    if (!fmt?.url) {
      // Some formats may have an encrypted URL; try to find any format with a URL
      fmt = info.formats.find(f => f.url) || null;
    }

    if (!fmt?.url) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(502).json({
        error: 'YouTube blocked this request (requires sign-in or captcha). Try the local tunnel version.',
      });
    }

    const r = await fetch(fmt.url, {
      headers: { 'User-Agent': UA, 'Referer': 'https://www.youtube.com/' },
      signal: AbortSignal.timeout(180000),
    });
    if (!r.ok) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(502).json({ error: 'YouTube stream fetch failed (HTTP ' + r.status + ')' });
    }

    res.setHeader('Content-Type', fmt.mimeType || 'video/mp4');
    res.setHeader('Content-Disposition', 'attachment; filename="' + vid + '.mp4"');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Access-Control-Allow-Origin', '*');
    const reader = r.body.getReader();
    (async function pump() {
      while (true) {
        const { done, value } = await reader.read();
        if (done) { res.end(); return; }
        res.write(value);
      }
    })().catch(err => { if (!res.headersSent) res.status(502).end(); else res.end(); });
  } catch (e) {
    if (!res.headersSent) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      const msg = e.message || 'Unknown error';
      // Provide user-friendly guidance
      if (msg.includes('Status code: 429') || msg.includes('too many requests') || msg.includes('captcha') || msg.includes('Sign in')) {
        return res.status(502).json({ error: 'YouTube blocked this request (rate limit / captcha). Use the local server instead.' });
      }
      return res.status(502).json({ error: msg });
    }
  }
}
