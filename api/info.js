import ytdl from '@distube/ytdl-core';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

function og(html, prop) {
  const p = prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = html.match(new RegExp('<meta[^>]+(?:property|name)=["\']' + p + '["\'][^>]+content=["\']([^"\']+)["\']', 'i'))
    || html.match(new RegExp('<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']' + p + '["\']', 'i'));
  return m?.[1] || null;
}

function fmtSize(bytes) {
  if (!bytes) return null;
  const b = parseInt(bytes);
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
  if (b < 1024 * 1024 * 1024) return (b / 1024 / 1024).toFixed(1) + ' MB';
  return (b / 1024 / 1024 / 1024).toFixed(2) + ' GB';
}

function fmtDuration(sec) {
  if (!sec && sec !== 0) return null;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  if (m >= 60) {
    const h = Math.floor(m / 60);
    return h + ':' + String(m % 60).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }
  return m + ':' + String(s).padStart(2, '0');
}

async function youtubeInfo(vid) {
  try {
    const info = await ytdl.getInfo('https://www.youtube.com/watch?v=' + vid, {
      requestOptions: { headers: { 'User-Agent': UA }, timeout: 15000 },
    });
    const vd = info.videoDetails;
    const formats = info.formats
      .filter(f => f.hasVideo)
      .map(f => ({
        label: f.qualityLabel || f.quality || 'unknown',
        size: f.contentLength ? parseInt(f.contentLength) : 0,
        format: f.container || 'mp4',
        hasAudio: !!f.hasAudio,
        hasVideo: !!f.hasVideo,
        bitrate: f.bitrate || 0,
        url: f.url || null,
      }))
      .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));

    const best = formats[0] || null;
    const allLabels = [...new Set(formats.map(f => f.label).filter(Boolean))];
    const maxQ = [...allLabels].sort((a, b) => {
      const na = parseInt(a), nb = parseInt(b);
      return (nb || 0) - (na || 0);
    })[0] || null;
    return {
      title: vd.title,
      duration: parseInt(vd.lengthSeconds) || 0,
      durationFormatted: fmtDuration(vd.lengthSeconds),
      thumbnail: vd.thumbnails?.sort((a, b) => b.width - a.width)?.[0]?.url || null,
      platform: 'youtube',
      qualities: allLabels,
      maxQuality: maxQ,
      best: best ? {
        quality: best.label, size: best.size,
        sizeFormatted: fmtSize(best.size), format: best.format,
        hasAudio: best.hasAudio,
      } : null,
    };
  } catch (_) {
    const r = await fetch('https://www.youtube.com/watch?v=' + vid, {
      headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(10000),
    });
    const html = await r.text();
    return {
      title: og(html, 'og:title') || og(html, 'twitter:title') || 'YouTube Video',
      duration: null, durationFormatted: null,
      thumbnail: og(html, 'og:image'),
      platform: 'youtube', qualities: [], best: null,
    };
  }
}

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'missing url' });
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const low = url.toLowerCase();
    let result;

    if (low.includes('youtube.com') || low.includes('youtu.be')) {
      const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (m) result = await youtubeInfo(m[1]);
    } else {
      const r = await fetch(url, {
        headers: { 'User-Agent': UA, 'Accept': 'text/html' },
        signal: AbortSignal.timeout(15000),
      });
      const html = await r.text();
      let platform = 'unknown';
      if (low.includes('tiktok')) platform = 'tiktok';
      else if (low.includes('instagram')) platform = 'instagram';
      else if (low.includes('facebook') || low.includes('fb.')) platform = 'facebook';
      else if (low.includes('twitter') || low.includes('x.com')) platform = 'twitter';

      result = {
        title: og(html, 'og:title') || og(html, 'twitter:title') || '',
        duration: null, durationFormatted: null,
        thumbnail: og(html, 'og:image') || og(html, 'twitter:image'),
        platform, qualities: [], best: null,
      };
    }

    return res.json(result || { title: 'Unknown', platform: 'unknown', qualities: [], best: null });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
