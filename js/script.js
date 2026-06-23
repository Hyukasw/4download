// ── i18n ──
const i18n = {
  en: { badgeText: 'No watermark \u2022 4K \u2022 Free', h1a: 'Download Any', h1b: 'Video Without Watermark', h1p: 'Paste the link from TikTok, Instagram, or YouTube and download in original quality \u2014 completely free, no sign-up required.', dlBtnText: 'Download', descTitle: '4download', descText: 'The fastest way to download videos from TikTok, Instagram, and YouTube without watermarks. Paste any link, choose your quality, and save in seconds. No registration. No limits. Just pure, high-quality video downloads \u2014 free for everyone.', f1: 'No Limits', f2: 'Ultra HD', f3: '100% Free' },
  ar: { badgeText: '\u0628\u062F\u0648\u0646 \u0639\u0644\u0627\u0645\u0629 \u0645\u0627\u0626\u064A\u0629 \u2022 4K \u2022 \u0645\u062C\u0627\u0646\u064A', h1a: '\u062D\u0645\u0651\u0644 \u0623\u064A', h1b: '\u0641\u064A\u062F\u064A\u0648 \u0628\u062F\u0648\u0646 \u0639\u0644\u0627\u0645\u0629 \u0645\u0627\u0626\u064A\u0629', h1p: '\u0627\u0646\u0633\u062E \u0631\u0627\u0628\u0637 \u0627\u0644\u0641\u064A\u062F\u064A\u0648 \u0645\u0646 \u062A\u064A\u0643 \u062A\u0648\u0643 \u0623\u0648 \u0625\u0646\u0633\u062A\u063A\u0631\u0627\u0645 \u0623\u0648 \u064A\u0648\u062A\u064A\u0648\u0628 \u0648\u062D\u0645\u0651\u0644\u0647 \u0628\u062C\u0648\u062F\u062A\u0647 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u2014 \u0645\u062C\u0627\u0646\u064B\u0627 \u062A\u0645\u0627\u0645\u064B\u0627\u060C \u0628\u062F\u0648\u0646 \u062A\u0633\u062C\u064A\u0644.', dlBtnText: '\u062A\u062D\u0645\u064A\u0644', descTitle: '4download', descText: '\u0623\u0633\u0631\u0639 \u0637\u0631\u064A\u0642\u0629 \u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0641\u064A\u062F\u064A\u0648\u0647\u0627\u062A \u0645\u0646 \u062A\u064A\u0643 \u062A\u0648\u0643 \u0648\u0625\u0646\u0633\u062A\u063A\u0631\u0627\u0645 \u0648\u064A\u0648\u062A\u064A\u0648\u0628 \u0628\u062F\u0648\u0646 \u0639\u0644\u0627\u0645\u0627\u062A \u0645\u0627\u0626\u064A\u0629. \u0627\u0644\u0635\u0642 \u0627\u0644\u0631\u0627\u0628\u0637\u060C \u0627\u062E\u062A\u0631 \u0627\u0644\u062C\u0648\u062F\u0629\u060C \u0648\u0627\u062D\u0641\u0638 \u0627\u0644\u0641\u064A\u062F\u064A\u0648 \u0641\u064A \u062B\u0648\u0627\u0646\u064D. \u0628\u062F\u0648\u0646 \u062A\u0633\u062C\u064A\u0644 \u0648\u0644\u0627 \u062D\u062F\u0648\u062F.', f1: '\u0628\u062F\u0648\u0646 \u062D\u062F\u0648\u062F', f2: '\u0641\u0627\u0626\u0642\u0629 \u0627\u0644\u062F\u0642\u0629', f3: '\u0645\u062C\u0627\u0646\u064A \u0661\u0660\u0660\u066A' },
  fr: { badgeText: 'Sans filigrane \u2022 4K \u2022 Gratuit', h1a: 'T\u00E9l\u00E9chargez', h1b: 'Vid\u00E9o Sans Filigrane', h1p: 'Collez le lien depuis TikTok, Instagram ou YouTube et t\u00E9l\u00E9chargez en qualit\u00E9 originale \u2014 enti\u00E8rement gratuit, sans inscription.', dlBtnText: 'T\u00E9l\u00E9charger', descTitle: '4download', descText: "Le moyen le plus rapide de t\u00E9l\u00E9charger des vid\u00E9os depuis TikTok, Instagram et YouTube sans filigrane. Collez le lien, choisissez la qualit\u00E9 et sauvegardez en quelques secondes. Gratuit pour tous.", f1: 'Illimit\u00E9', f2: 'Ultra HD', f3: '100% Gratuit' },
  es: { badgeText: 'Sin marca de agua \u2022 4K \u2022 Gratis', h1a: 'Descarga', h1b: 'Video Sin Marca de Agua', h1p: 'Pega el enlace de TikTok, Instagram o YouTube y descarga en calidad original \u2014 completamente gratis, sin registro.', dlBtnText: 'Descargar', descTitle: '4download', descText: 'La forma m\u00E1s r\u00E1pida de descargar videos de TikTok, Instagram y YouTube sin marcas de agua. Pega el enlace, elige calidad y guarda en segundos.', f1: 'Sin l\u00EDmites', f2: 'Ultra HD', f3: '100% Gratis' },
  de: { badgeText: 'Ohne Wasserzeichen \u2022 4K \u2022 Kostenlos', h1a: 'Lade jedes', h1b: 'Video Ohne Wasserzeichen', h1p: 'F\u00FCge den Link von TikTok, Instagram oder YouTube ein und lade in Originalqualit\u00E4t herunter \u2014 v\u00F6llig kostenlos, ohne Anmeldung.', dlBtnText: 'Herunterladen', descTitle: '4download', descText: 'Der schnellste Weg, Videos von TikTok, Instagram und YouTube ohne Wasserzeichen herunterzuladen. Link einf\u00FCgen, Qualit\u00E4t w\u00E4hlen, speichern.', f1: 'Keine Grenzen', f2: 'Ultra HD', f3: '100% Kostenlos' },
  tr: { badgeText: 'Filigrans\u0131z \u2022 4K \u2022 \u00DCcretsiz', h1a: 'Herhangi Bir', h1b: 'Videoyu Filigrans\u0131z \u0130ndir', h1p: 'TikTok, Instagram veya YouTube\'dan ba\u011Flant\u0131y\u0131 yap\u0131\u015Ft\u0131r\u0131n ve orijinal kalitede indirin \u2014 tamamen \u00FCcretsiz, kay\u0131t gerekmez.', dlBtnText: '\u0130ndir', descTitle: '4download', descText: 'TikTok, Instagram ve YouTube\'dan filigrans\u0131z video indirmenin en h\u0131zl\u0131 yolu. Ba\u011Flant\u0131y\u0131 yap\u0131\u015Ft\u0131r, kaliteyi se\u00E7, saniyeler i\u00E7inde kaydet.', f1: 'S\u0131n\u0131rs\u0131z', f2: 'Ultra HD', f3: '%100 \u00DCcretsiz' }
};

let currentLang = 'en';
let isLight = false;

function applyLang(lang) {
  const t = i18n[lang] || i18n.en;
  Object.keys(t).forEach(k => {
    const el = document.getElementById(k);
    if (el) el.textContent = t[k];
  });
  document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('langLabel').textContent = lang.toUpperCase();
  currentLang = lang;
}

function toggleLang() { document.getElementById('langDropdown').classList.toggle('open'); }
function setLang(lang) { applyLang(lang); document.getElementById('langDropdown').classList.remove('open'); }

document.addEventListener('click', e => {
  if (!e.target.closest('.lang-menu')) document.getElementById('langDropdown').classList.remove('open');
});

function toggleTheme() {
  isLight = !isLight;
  document.documentElement.classList.toggle('light', isLight);
}

// ── Preloader ──
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 1400);
});

// ── Scroll Reveal ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .1 });
document.querySelectorAll('.fade-up, .scale-in').forEach(el => observer.observe(el));

// ── Background Video Cycling ──
const bgVid = document.getElementById('bgVideo');
const sources = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
];
let vidIdx = 0;
function cycleBg() {
  vidIdx = (vidIdx + 1) % sources.length;
  bgVid.src = sources[vidIdx];
  bgVid.play().catch(() => {});
}
bgVid.src = sources[0];
bgVid.play().catch(() => {});
bgVid.addEventListener('ended', cycleBg);
setInterval(cycleBg, 15000);

// ── Download Handler ──
function detectPlatform(url) {
  if (!url) return null;
  const u = url.toLowerCase();
  if (u.includes('tiktok.com')) return 'tiktok';
  if (u.includes('instagram.com')) return 'instagram';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('fb.watch') || u.includes('facebook.com') || u.includes('fb.com')) return 'facebook';
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter';
  if (u.includes('snapchat.com')) return 'snapchat';
  if (u.includes('pinterest.com')) return 'pinterest';
  if (u.includes('vimeo.com')) return 'vimeo';
  if (u.includes('dailymotion.com') || u.includes('dai.ly')) return 'dailymotion';
  if (u.includes('.mp4') || u.includes('.webm') || u.includes('.mov')) return 'direct';
  return null;
}

function getUserInfo(url, platform) {
  if (platform === 'tiktok') {
    const m = url.match(/@([a-zA-Z0-9_.]+)/);
    return m ? m[1] : null;
  }
  if (platform === 'instagram') {
    const m = url.match(/(?:instagram\.com\/)([a-zA-Z0-9_.]+)/);
    return m && !m[1].startsWith('reel') && !m[1].startsWith('p') ? m[1] : null;
  }
  return null;
}

function handleDownload() {
  const input = document.getElementById('urlInput');
  const select = document.getElementById('platformSelect');
  const url = input.value.trim();
  if (!url) {
    input.style.borderColor = 'var(--accent)';
    input.style.transition = 'border-color .3s';
    input.focus();
    setTimeout(() => input.style.borderColor = '', 800);
    return;
  }

  const platform = select.value !== 'auto' ? select.value : detectPlatform(url);
  lastDownloadUrl = url;
  lastPlatform = platform;
  const result = document.getElementById('result');
  const previewWrap = document.getElementById('resultPreview');

  const icons = { tiktok: '\uD83C\uDFB5', instagram: '\uD83D\uDCF8', youtube: '\u25B6\uFE0F', facebook: '\uD83D\uDCD8', twitter: '\uD835\uDD4F', snapchat: '\uD83D\uDC7B', pinterest: '\uD83D\uDCCC', vimeo: '\uD83C\uDFA5', dailymotion: '\uD83D\uDCFA', direct: '\uD83D\uDCF9' };
  const labels = { tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube', facebook: 'Facebook', twitter: 'Twitter / X', snapchat: 'Snapchat', pinterest: 'Pinterest', vimeo: 'Vimeo', dailymotion: 'Dailymotion', direct: 'Direct Video' };
  const icon = icons[platform] || '\uD83C\uDFAC';
  const label = labels[platform] || 'Video';
  const shortUrl = url.length > 55 ? url.slice(0, 52) + '...' : url;
  const username = getUserInfo(url, platform);

  let title = label + ' Video';
  if (username) title += ' \u2014 @' + username;
  else title += ' \u2014 ' + shortUrl;

  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultThumb').textContent = icon;

  let previewHtml = '';
  if (platform === 'youtube') {
    let vid = null;
    const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (m) vid = m[1];
    if (vid) {
      previewHtml = '<iframe src="https://www.youtube.com/embed/' + vid + '?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen style="width:100%;height:100%;border:none;"></iframe>';
    } else {
      previewHtml = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;padding:20px;text-align:center;background:rgba(0,0,0,.3)">' +
        '<span style="font-size:56px">\u25B6\uFE0F</span>' +
        '<span style="color:var(--text);font-size:16px;font-weight:600">YouTube Video Detected</span>' +
        '<span style="color:var(--text-dim);font-size:13px">Ready to download in HD \u2022 4K available</span></div>';
    }
  } else if (platform) {
    previewHtml = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;padding:24px;text-align:center;background:radial-gradient(ellipse at center, rgba(230,57,70,.05), transparent)">' +
      '<span style="font-size:64px">' + icon + '</span>' +
      '<span style="color:var(--text);font-size:18px;font-weight:700">' + label + ' Video Ready</span>' +
      '<span style="color:var(--text-dim);font-size:13px;max-width:320px">No watermark \u2022 Original quality \u2022 Fast download</span>' +
      '<div style="display:flex;gap:8px;margin-top:4px">' +
        '<span style="padding:4px 12px;border-radius:100px;background:var(--accent-dim);color:var(--accent);font-size:11px;font-weight:600">HD</span>' +
        '<span style="padding:4px 12px;border-radius:100px;background:var(--accent-dim);color:var(--accent);font-size:11px;font-weight:600">Full HD</span>' +
        '<span style="padding:4px 12px;border-radius:100px;background:var(--accent-dim);color:var(--accent);font-size:11px;font-weight:600">4K</span>' +
      '</div>' +
      '<span style="color:var(--text-muted);font-size:10px;word-break:break-all;max-width:100%;margin-top:4px">' + url + '</span></div>';
  } else {
    previewHtml = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;padding:20px;text-align:center">' +
      '<span style="font-size:48px">\uD83D\uDD17</span>' +
      '<span style="color:var(--text-dim);font-size:14px">URL received \u2014 select platform manually</span>' +
      '<span style="color:var(--text-muted);font-size:11px">Platform auto-detect failed for this link. Choose from the dropdown.</span>' +
      '<span style="color:var(--text-muted);font-size:10px;word-break:break-all;max-width:100%">' + url + '</span></div>';
  }

  previewWrap.innerHTML = previewHtml;
  result.classList.add('show');

  setTimeout(function() { result.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 200);
}

// ── Store last detected URL/platform for download ──
let lastDownloadUrl = '';
let lastPlatform = '';

function downloadFile() {
  const url = lastDownloadUrl || document.getElementById('urlInput').value.trim();
  if (!url) return;

  const btn = document.getElementById('dlBtn');
  btn.textContent = 'جاري التحميل...';
  btn.disabled = true;

  const plat = lastPlatform || detectPlatform(url);

  if (plat === 'youtube') {
    downloadYouTube(url, btn);
  } else {
    fetchViaProxy(url, btn);
  }
}

async function downloadYouTube(url, btn) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (!m) { btn.textContent = 'Download HD'; btn.disabled = false; return; }
  const vid = m[1];

  const instances = [
    'https://inv.nadeko.net/api/v1/videos/' + vid,
    'https://invidious.snopyta.org/api/v1/videos/' + vid,
    'https://yewtu.be/api/v1/videos/' + vid,
    'https://vid.puffyan.us/api/v1/videos/' + vid,
  ];

  for (const apiUrl of instances) {
    try {
      const resp = await fetch(apiUrl, { signal: AbortSignal.timeout(8000) });
      if (!resp.ok) continue;
      const data = await resp.json();

      let videoUrl = null;
      const allFormats = (data.adaptiveFormats || []).concat(data.formatStreams || []);
      for (const f of allFormats) {
        if (f.url && f.type && f.type.startsWith('video/mp4')) {
          const label = f.qualityLabel || '';
          if (label.includes('720p') || label.includes('1080p') || label.includes('480p')) {
            if (!videoUrl) videoUrl = f;
          }
          if (!videoUrl) videoUrl = f;
        }
      }
      if (!videoUrl) {
        for (const f of allFormats) {
          if (f.url) { videoUrl = f; break; }
        }
      }
      if (videoUrl && videoUrl.url) {
        await fetchViaProxy(videoUrl.url, btn);
        return;
      }
    } catch(e) { continue; }
  }

  // Fallback: use direct API download endpoint
  window.open('https://api.vevioz.com/api/button/Youtube/' + vid, '_blank');
  btn.textContent = 'Download HD';
  btn.disabled = false;
}

async function fetchViaProxy(url, btn) {
  const proxies = [
    'https://api.allorigins.win/raw?url=' + encodeURIComponent(url),
    'https://corsproxy.io/?' + encodeURIComponent(url),
    'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(url),
  ];
  for (const proxyUrl of proxies) {
    try {
      const resp = await fetch(proxyUrl, { signal: AbortSignal.timeout(15000) });
      if (!resp.ok) continue;
      const blob = await resp.blob();
      const ext = (blob.type.split('/')[1] || 'mp4').replace('x-', '');
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'video.' + ext;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() { URL.revokeObjectURL(blobUrl); }, 5000);
      btn.textContent = 'Download HD';
      btn.disabled = false;
      return;
    } catch(e) { continue; }
  }

  // Last resort
  window.open(url, '_blank');
  btn.textContent = 'Download HD';
  btn.disabled = false;
}

function clearResult() {
  document.getElementById('result').classList.remove('show');
  document.getElementById('resultPreview').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-dim);font-size:13px">Paste a URL and click Download</div>';
  document.getElementById('urlInput').value = '';
  document.getElementById('urlInput').focus();
}

// ── Enter key ──
document.getElementById('urlInput').addEventListener('keydown', function(e) { if (e.key === 'Enter') handleDownload(); });
