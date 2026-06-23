import { execSync } from 'child_process';

export default async function handler(req, res) {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).json({ error: 'bad id' });

  try {
    const url = execSync(
      '"C:\\Users\\User\\AppData\\Local\\Programs\\Python\\Python313\\Scripts\\yt-dlp.exe" -g --format "best[height<=1080][ext=mp4]/best[ext=mp4]" "https://www.youtube.com/watch?v=' + vid + '" 2>NUL',
      { timeout: 30000, encoding: 'utf8', maxBuffer: 1048576, shell: 'cmd.exe' }
    ).trim();
    if (!url) return res.status(502).json({ error: 'no url' });
    return res.json({ url, host: 'youtube.com' });
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
