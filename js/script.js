// ── i18n ──
const i18n = {
  en: { badgeText: 'No watermark \u2022 4K \u2022 Free', h1a: 'Download Any', h1b: 'Video Without Watermark', h1p: 'Paste the link from TikTok, Instagram, or YouTube and download in original quality \u2014 completely free, no sign-up required.', dlBtnText: 'Download', descTitle: '4DownVid', descText: 'The fastest way to download videos from TikTok, Instagram, and YouTube without watermarks. Paste any link, choose your quality, and save in seconds. No registration. No limits. Just pure, high-quality video downloads \u2014 free for everyone.', f1: 'No Limits', f2: 'Ultra HD', f3: '100% Free' },
  ar: { badgeText: '\u0628\u062F\u0648\u0646 \u0639\u0644\u0627\u0645\u0629 \u0645\u0627\u0626\u064A\u0629 \u2022 4K \u2022 \u0645\u062C\u0627\u0646\u064A', h1a: '\u062D\u0645\u0651\u0644 \u0623\u064A', h1b: '\u0641\u064A\u062F\u064A\u0648 \u0628\u062F\u0648\u0646 \u0639\u0644\u0627\u0645\u0629 \u0645\u0627\u0626\u064A\u0629', h1p: '\u0627\u0646\u0633\u062E \u0631\u0627\u0628\u0637 \u0627\u0644\u0641\u064A\u062F\u064A\u0648 \u0645\u0646 \u062A\u064A\u0643 \u062A\u0648\u0643 \u0623\u0648 \u0625\u0646\u0633\u062A\u063A\u0631\u0627\u0645 \u0623\u0648 \u064A\u0648\u062A\u064A\u0648\u0628 \u0648\u062D\u0645\u0651\u0644\u0647 \u0628\u062C\u0648\u062F\u062A\u0647 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u2014 \u0645\u062C\u0627\u0646\u064B\u0627 \u062A\u0645\u0627\u0645\u064B\u0627\u060C \u0628\u062F\u0648\u0646 \u062A\u0633\u062C\u064A\u0644.', dlBtnText: '\u062A\u062D\u0645\u064A\u0644', descTitle: '4DownVid', descText: '\u0623\u0633\u0631\u0639 \u0637\u0631\u064A\u0642\u0629 \u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0641\u064A\u062F\u064A\u0648\u0647\u0627\u062A \u0645\u0646 \u062A\u064A\u0643 \u062A\u0648\u0643 \u0648\u0625\u0646\u0633\u062A\u063A\u0631\u0627\u0645 \u0648\u064A\u0648\u062A\u064A\u0648\u0628 \u0628\u062F\u0648\u0646 \u0639\u0644\u0627\u0645\u0627\u062A \u0645\u0627\u0626\u064A\u0629. \u0627\u0644\u0635\u0642 \u0627\u0644\u0631\u0627\u0628\u0637\u060C \u0627\u062E\u062A\u0631 \u0627\u0644\u062C\u0648\u062F\u0629\u060C \u0648\u0627\u062D\u0641\u0638 \u0627\u0644\u0641\u064A\u062F\u064A\u0648 \u0641\u064A \u062B\u0648\u0627\u0646\u064D.', f1: '\u0628\u062F\u0648\u0646 \u062D\u062F\u0648\u062F', f2: '\u0641\u0627\u0626\u0642\u0629 \u0627\u0644\u062F\u0642\u0629', f3: '\u0645\u062C\u0627\u0646\u064A \u0661\u0660\u0660\u066A' },
  fr: { badgeText: 'Sans filigrane \u2022 4K \u2022 Gratuit', h1a: 'T\u00E9l\u00E9chargez', h1b: 'Vid\u00E9o Sans Filigrane', h1p: 'Collez le lien depuis TikTok, Instagram ou YouTube et t\u00E9l\u00E9chargez en qualit\u00E9 originale \u2014 enti\u00E8rement gratuit, sans inscription.', dlBtnText: 'T\u00E9l\u00E9charger', descTitle: '4DownVid', descText: "Le moyen le plus rapide de t\u00E9l\u00E9charger des vid\u00E9os depuis TikTok, Instagram et YouTube sans filigrane. Collez le lien, choisissez la qualit\u00E9 et sauvegardez en quelques secondes.", f1: 'Illimit\u00E9', f2: 'Ultra HD', f3: '100% Gratuit' },
  es: { badgeText: 'Sin marca de agua \u2022 4K \u2022 Gratis', h1a: 'Descarga', h1b: 'Video Sin Marca de Agua', h1p: 'Pega el enlace de TikTok, Instagram o YouTube y descarga en calidad original \u2014 completamente gratis, sin registro.', dlBtnText: 'Descargar', descTitle: '4DownVid', descText: 'La forma m\u00E1s r\u00E1pida de descargar videos de TikTok, Instagram y YouTube sin marcas de agua.', f1: 'Sin l\u00EDmites', f2: 'Ultra HD', f3: '100% Gratis' },
  de: { badgeText: 'Ohne Wasserzeichen \u2022 4K \u2022 Kostenlos', h1a: 'Lade jedes', h1b: 'Video Ohne Wasserzeichen', h1p: 'F\u00FCge den Link von TikTok, Instagram oder YouTube ein und lade in Originalqualit\u00E4t herunter \u2014 v\u00F6llig kostenlos.', dlBtnText: 'Herunterladen', descTitle: '4DownVid', descText: 'Der schnellste Weg, Videos von TikTok, Instagram und YouTube ohne Wasserzeichen herunterzuladen.', f1: 'Keine Grenzen', f2: 'Ultra HD', f3: '100% Kostenlos' },
  tr: { badgeText: 'Filigrans\u0131z \u2022 4K \u2022 \u00DCcretsiz', h1a: 'Herhangi Bir', h1b: 'Videoyu Filigrans\u0131z \u0130ndir', h1p: 'TikTok, Instagram veya YouTube\'dan ba\u011Flant\u0131y\u0131 yap\u0131\u015Ft\u0131r\u0131n ve orijinal kalitede indirin.', dlBtnText: '\u0130ndir', descTitle: '4DownVid', descText: 'TikTok, Instagram ve YouTube\'dan filigrans\u0131z video indirmenin en h\u0131zl\u0131 yolu.', f1: 'S\u0131n\u0131rs\u0131z', f2: 'Ultra HD', f3: '%100 \u00DCcretsiz' }
};

let currentLang = 'en', isLight = false;
let lastUrl = '', lastPlatform = '';

function applyLang(lang) {
  const t = i18n[lang] || i18n.en;
  Object.keys(t).forEach(k => { const el = document.getElementById(k); if (el) el.textContent = t[k]; });
  document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('langLabel').textContent = lang.toUpperCase();
  currentLang = lang;
}
function toggleLang() { document.getElementById('langDropdown').classList.toggle('open'); }
function setLang(lang) { applyLang(lang); document.getElementById('langDropdown').classList.remove('open'); }
document.addEventListener('click', e => { if (!e.target.closest('.lang-wrap')) document.getElementById('langDropdown').classList.remove('open'); });
function toggleTheme() { isLight = !isLight; document.documentElement.classList.toggle('light', isLight); }

// Preloader
window.addEventListener('load', () => setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 1200));

// Scroll reveal
const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: .1 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// Background video
const bgVid = document.getElementById('bgVideo');
let vidIdx = 0;
function loadBg(i) { bgVid.src = '/api/bg-video?idx=' + i; bgVid.play().catch(() => {}); }
loadBg(0);
bgVid.addEventListener('ended', () => { vidIdx = (vidIdx + 1) % 3; loadBg(vidIdx); });
setInterval(() => { vidIdx = (vidIdx + 1) % 3; loadBg(vidIdx); }, 15000);

// Platform detection
function detectPlatform(url) {
  if (!url) return null;
  const u = url.toLowerCase();
  if (u.includes('tiktok.com')) return 'tiktok';
  if (u.includes('instagram.com')) return 'instagram';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('facebook.com') || u.includes('fb.watch') || u.includes('fb.com')) return 'facebook';
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter';
  if (u.includes('snapchat.com')) return 'snapchat';
  if (u.includes('vimeo.com')) return 'vimeo';
  if (u.includes('dailymotion.com') || u.includes('dai.ly')) return 'dailymotion';
  if (u.match(/\.(mp4|webm|mov)(\?|#|$)/i)) return 'direct';
  return null;
}

// Download: fetch JSON, extract URL, pipe through server (same-origin -> download works)
async function apiDL(path) {
  try {
    const r = await fetch(path);
    const data = await r.json();
    if (!data.url) throw new Error(data.error || 'no url');
    const a = document.createElement('a');
    a.href = '/api/pipe?url=' + encodeURIComponent(data.url);
    a.download = 'video.mp4';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {
    console.error('Download failed', e);
    document.getElementById('resultTitle').textContent = '\u274C Download failed: ' + (e.message || 'unknown error');
  }
}

function triggerDownload(path) {
  const a = document.createElement('a');
  a.href = path;
  a.download = 'video.mp4';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Handle paste / download
function handleDownload() {
  const input = document.getElementById('urlInput');
  const select = document.getElementById('platformSelect');
  const url = input.value.trim();
  if (!url) {
    input.style.borderColor = 'var(--g1)';
    input.focus();
    setTimeout(() => input.style.borderColor = '', 800);
    return;
  }
  const platform = select.value !== 'auto' ? select.value : detectPlatform(url);
  lastUrl = url;
  lastPlatform = platform;

  document.getElementById('resultDuration').textContent = '\u2026';
  document.getElementById('resultQuality').textContent = '';
  document.getElementById('resultTitle').textContent = 'Processing...';
  document.getElementById('resultThumb').innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:26px">\u23F3</div>';
  document.getElementById('resultPreview').innerHTML = '<div class="spinner"></div>';
  document.getElementById('result').classList.add('show');

  if (platform === 'youtube') {
    const vid = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
    if (vid) {
      document.getElementById('resultThumb').innerHTML = '<img src="/api/thumb?v=' + vid + '" style="width:100%;height:100%;object-fit:cover" alt="" onerror="this.outerHTML=\'<div style=width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:26px>\uD83C\uDFAC</div>\'">';
      document.getElementById('resultPreview').innerHTML = '<div style="width:100%;height:100%;position:relative"><iframe src="/api/embed?v=' + vid + '" allow="autoplay; encrypted-media" allowfullscreen style="width:100%;height:100%;border:none;"></iframe></div>';
      document.getElementById('resultTitle').textContent = 'YouTube Video';
    }
  }

  setTimeout(() => document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 300);
}

async function doDownload(btn, text) {
  const url = lastUrl || document.getElementById('urlInput').value.trim();
  if (!url) return;
  btn.textContent = '\u23F3 Downloading...';
  btn.disabled = true;

  const plat = lastPlatform || detectPlatform(url);
  if (plat === 'youtube') {
    const vid = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
    if (vid) triggerDownload('/api/yt?v=' + vid);
  } else {
    await apiDL('/api/dl?url=' + encodeURIComponent(url));
  }
  setTimeout(() => { btn.textContent = text; btn.disabled = false; }, 3000);
}

function downloadFile() { doDownload(document.getElementById('dlBtn'), 'Download HD'); }
function installVideo() { doDownload(document.getElementById('installBtn'), 'Install'); }

document.getElementById('urlInput').addEventListener('keydown', e => { if (e.key === 'Enter') handleDownload(); });
