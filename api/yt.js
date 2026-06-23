import { spawn } from 'child_process';

export default async function handler(req, res) {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).json({ error: 'bad id' });

  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', 'attachment; filename="' + vid + '.mp4"');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const proc = spawn('yt-dlp', [
    '-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
    '-o', '-',
    'https://www.youtube.com/watch?v=' + vid,
  ], { stdio: ['ignore', 'pipe', 'pipe'], timeout: 180000 });

  let started = false;
  proc.stdout.on('data', () => { if (!started) started = true; });
  proc.stdout.pipe(res);

  proc.on('error', () => { if (!res.headersSent) res.status(502).json({ error: 'process error' }); });
  proc.on('close', code => {
    if (code !== 0 && !started && !res.headersSent) {
      res.status(502).json({ error: 'yt-dlp failed with code ' + code });
    }
  });

  req.on('close', () => { proc.kill(); });
}
