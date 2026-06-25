import { writeFileSync } from 'fs';
import { join } from 'path';

const out = join(import.meta.dirname, 'public');

const W = 16, H = 16;

function gradient(x, y) {
  const t = (x + y) / (W + H) * 2;
  const r = Math.round(99 + (168 - 99) * Math.min(t, 1));
  const g = Math.round(102 + (92 - 102) * Math.min(t, 1));
  const b = Math.round(241 + (247 - 241) * Math.min(t, 1));
  return [b, g, r, 255];
}

function dvPixel(x, y) {
  const cx = W/2, cy = H/2, rx = 6, ry = 6;
  const dx = Math.abs(x - cx + 0.5) - (cx - rx);
  const dy = Math.abs(y - cy + 0.5) - (cy - ry);
  const dist = Math.sqrt(Math.max(dx,0)**2 + Math.max(dy,0)**2);
  if (dist > 1) return null;

  // D shape
  if (x >= 3 && x <= 4 && y >= 4 && y <= 11) return [255, 255, 255, 255];
  if (x >= 5 && x <= 8 && y >= 4 && y <= 11) {
    const ox = x - 4, oy = y - 4;
    const d = Math.sqrt((ox-2.5)**2 + (oy-3.5)**2);
    if (d > 1.5 && d < 4.5) return [255, 255, 255, 255];
  }
  // V shape
  if (x >= 10 && x <= 12 && y >= 4 && y <= 11) {
    const ox = x - 10, oy = y - 4;
    const line = Math.abs(oy - 3.5 - ox * 3.5/3);
    if (line < 1.2) return [255, 255, 255, 255];
  }
  return gradient(x, y);
}

const pixels = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const c = dvPixel(x, H - 1 - y);
    const [b, g, r, a] = c || [0, 0, 0, 0];
    const off = (y * W + x) * 4;
    pixels[off] = b; pixels[off+1] = g;
    pixels[off+2] = r; pixels[off+3] = a;
  }
}

const bih = Buffer.alloc(40);
bih.writeUInt32LE(40, 0);
bih.writeInt32LE(W, 4);
bih.writeInt32LE(H * 2, 8);
bih.writeUInt16LE(1, 12);
bih.writeUInt16LE(32, 14);
bih.writeUInt32LE(0, 16);
bih.writeUInt32LE(pixels.length, 20);

const ico = Buffer.alloc(22 + bih.length + pixels.length);
ico.writeUInt16LE(0, 0);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico.writeUInt8(W >= 256 ? 0 : W, 6);
ico.writeUInt8(H >= 256 ? 0 : H, 7);
ico.writeUInt8(0, 8);
ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(bih.length + pixels.length, 14);
ico.writeUInt32LE(22, 18);
bih.copy(ico, 22);
pixels.copy(ico, 62);

writeFileSync(join(out, 'favicon.ico'), ico);
console.log('favicon.ico:', ico.length, 'bytes');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#6366f1"/>
    <stop offset="100%" stop-color="#a855f7"/>
  </linearGradient></defs>
  <rect x="2" y="2" width="28" height="28" rx="7" fill="url(#g)"/>
  <text x="6" y="23" font-family="system-ui,sans-serif" font-size="18" font-weight="800" fill="#fff">4D</text>
</svg>`;
writeFileSync(join(out, 'favicon.svg'), svg);
console.log('favicon.svg created');
