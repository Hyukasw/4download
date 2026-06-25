import { execSync } from 'child_process';
const yt = 'C:\\Users\\User\\AppData\\Local\\Programs\\Python\\Python313\\Scripts\\yt-dlp.exe';
const cmd = `"${yt}" -f "b[ext=mp4]" -o - --no-warnings "https://www.youtube.com/watch?v=dQw4w9WgXcQ"`;
console.log('Running:', cmd);
try {
  const buf = execSync(cmd, { timeout: 60000, windowsHide: true, maxBuffer: 500 * 1024 * 1024 });
  console.log('Success! Size:', buf.length, 'bytes');
} catch (e) {
  console.log('Error:', e.message);
  console.log('stdout:', (e.stdout || '').length, 'bytes');
  console.log('stderr:', (e.stderr || '').toString().slice(0, 500));
}
