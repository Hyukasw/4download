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

// ── Store last detected data ──
let lastUrl = '';
let lastPlatform = '';
let lastDirectVideoUrl = '';
let lastThumbUrl = '';

function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '\u2014';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

function formatFileSize(bytes) {
  if (!bytes || isNaN(bytes)) return '\u2014';
  if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(1) + ' GB';
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(0) + ' MB';
  if (bytes >= 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return bytes + ' B';
}

function formatQuality(w, h) {
  if (!w || !h) return null;
  const d = Math.max(w, h);
  if (d >= 3840) return '4K';
  if (d >= 1920) return 'Full HD';
  if (d >= 1280) return 'HD';
  if (d >= 720) return 'HD';
  if (d >= 480) return 'SD';
  return 'SD';
}

async function fetchYouTubeMeta(videoId) {
  const instances = [
    'https://inv.nadeko.net/api/v1/videos/' + videoId,
    'https://invidious.snopyta.org/api/v1/videos/' + videoId,
    'https://yewtu.be/api/v1/videos/' + videoId,
    'https://vid.puffyan.us/api/v1/videos/' + videoId,
  ];
  for (const url of instances) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (!r.ok) continue;
      return await r.json();
    } catch(e) { continue; }
  }
  return null;
}

async function fetchPageMeta(url) {
  const proxies = [
    'https://api.allorigins.win/raw?url=' + encodeURIComponent(url),
    'https://corsproxy.io/?' + encodeURIComponent(url),
  ];
  for (const proxy of proxies) {
    try {
      const r = await fetch(proxy, { signal: AbortSignal.timeout(10000) });
      if (!r.ok) continue;
      const html = await r.text();
      const ogImg = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i)?.[1]
        || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i)?.[1]
        || html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i)?.[1];
      const ogVideo = html.match(/<meta[^>]+property=["']og:video:url["'][^>]+content=["']([^"']+)["'][^>]*>/i)?.[1]
        || html.match(/<meta[^>]+property=["']og:video["'][^>]+content=["']([^"']+)["'][^>]*>/i)?.[1];
      const vidWidth = parseInt(html.match(/<meta[^>]+property=["']og:video:width["'][^>]+content=["'](\d+)["'][^>]*>/i)?.[1]);
      const vidHeight = parseInt(html.match(/<meta[^>]+property=["']og:video:height["'][^>]+content=["'](\d+)["'][^>]*>/i)?.[1]);
      const durationSec = parseInt(html.match(/<meta[^>]+property=["']video:duration["'][^>]+content=["'](\d+)["'][^>]*>/i)?.[1]);

      return { image: ogImg || null, video: ogVideo || null, html: html, width: vidWidth, height: vidHeight, duration: durationSec };
    } catch(e) { continue; }
  }
  return { image: null, video: null, html: null, width: null, height: null, duration: null };
}

function extractTikTokData(html) {
  if (!html) return null;
  const videoUrl = html.match(/"video":{"url":"([^"]+)"/) || html.match(/"playAddr":"([^"]+)"/) || html.match(/"downloadAddr":"([^"]+)"/);
  const duration = html.match(/"duration":(\d+)/)?.[1];
  const width = html.match(/"width":(\d+)/)?.[1];
  const height = html.match(/"height":(\d+)/)?.[1];
  return {
    video: videoUrl ? videoUrl[1].replace(/\\u002F/g, '/').replace(/\\/g, '') : null,
    duration: duration ? parseInt(duration) : null,
    width: width ? parseInt(width) : null,
    height: height ? parseInt(height) : null,
  };
}

function updateMeta(duration, quality, dims) {
  document.getElementById('resultDuration').textContent = duration || '\u2014';
  document.getElementById('resultSize').textContent = '\u2022 ' + (quality || '\u2014');
  document.getElementById('resultRes').textContent = '\u2022 ' + (dims || '\u2014');
}

function handleDownload() {
  const input = document.getElementById('urlInput');
  const select = document.getElementById('platformSelect');
  const url = input.value.trim();
  if (!url) {
    input.style.borderColor = 'var(--accent)';
    input.focus();
    setTimeout(() => input.style.borderColor = '', 800);
    return;
  }

  const platform = select.value !== 'auto' ? select.value : detectPlatform(url);
  lastUrl = url;
  lastPlatform = platform;

  const icons = { tiktok: '\uD83C\uDFB5', instagram: '\uD83D\uDCF8', youtube: '\u25B6\uFE0F', facebook: '\uD83D\uDCD8', twitter: '\uD835\uDD4F', snapchat: '\uD83D\uDC7B', pinterest: '\uD83D\uDCCC', vimeo: '\uD83C\uDFA5', dailymotion: '\uD83D\uDCFA', direct: '\uD83D\uDCF9' };
  const labels = { tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube', facebook: 'Facebook', twitter: 'Twitter / X', snapchat: 'Snapchat', pinterest: 'Pinterest', vimeo: 'Vimeo', dailymotion: 'Dailymotion', direct: 'Direct Video' };
  const label = labels[platform] || 'Video';
  const username = getUserInfo(url, platform);
  const shortUrl = url.length > 50 ? url.slice(0, 47) + '...' : url;

  updateMeta('\u2026', '\u2026', '\u2026');
  document.getElementById('resultTitle').textContent = label + ' Video' + (username ? ' \u2014 @' + username : ' \u2014 ' + shortUrl);
  document.getElementById('resultThumb').innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:28px">' + (icons[platform] || '\uD83C\uDFAC') + '</div>';

  const previewWrap = document.getElementById('resultPreview');
  previewWrap.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;padding:20px"><div style="width:32px;height:32px;border:2px solid var(--accent-dim);border-top-color:var(--accent);border-radius:50%;animation:spin .8s linear infinite"></div></div>';

  document.getElementById('result').classList.add('show');
  lastDirectVideoUrl = '';
  lastThumbUrl = '';

  async function buildPreview() {
    let duration = null, width = null, height = null, thumb = null, videoUrl = null;

    if (platform === 'youtube') {
      const vid = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
      if (vid) {
        thumb = 'https://img.youtube.com/vi/' + vid + '/maxresdefault.jpg';
        const meta = await fetchYouTubeMeta(vid);
        if (meta) {
          duration = meta.lengthSeconds;
          width = meta.author ? 1920 : null;
          height = meta.author ? 1080 : null;
          videoUrl = (meta.adaptiveFormats || [])[0]?.url || (meta.formatStreams || [])[0]?.url || null;
          if (meta.videoThumbnails && meta.videoThumbnails.length) {
            thumb = meta.videoThumbnails[meta.videoThumbnails.length - 1].url || thumb;
          }
        }
      }
    } else {
      const meta = await fetchPageMeta(url);
      thumb = meta.image || null;
      if (platform === 'tiktok') {
        const tt = extractTikTokData(meta.html);
        if (tt) {
          videoUrl = tt.video || videoUrl;
          duration = tt.duration || meta.duration;
          width = tt.width || meta.width;
          height = tt.height || meta.height;
        }
      }
      if (!videoUrl) videoUrl = meta.video || null;
      if (!duration) duration = meta.duration;
      if (!width) width = meta.width;
      if (!height) height = meta.height;
    }

    lastDirectVideoUrl = videoUrl || '';
    lastThumbUrl = thumb || '';

    const durStr = formatDuration(duration);
    const qualStr = formatQuality(width, height) || '\u2014';
    const dimStr = (width && height) ? width + 'x' + height : qualStr;
    updateMeta(durStr, qualStr, dimStr);

    let previewHtml = '';
    if (platform === 'youtube') {
      const vid = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
      if (vid) {
        previewHtml = '<iframe src="https://www.youtube.com/embed/' + vid + '?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen style="width:100%;height:100%;border:none;"></iframe>';
      } else {
        previewHtml = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;padding:20px;text-align:center;background:rgba(0,0,0,.3)"><span style="font-size:48px">\u25B6\uFE0F</span><span style="color:var(--text);font-size:15px;font-weight:600">YouTube Video</span></div>';
      }
    } else if (thumb) {
      previewHtml = '<div style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden">' +
        '<div style="position:absolute;inset:0;background-image:url(' + JSON.stringify(thumb) + ');background-size:cover;background-position:center;filter:blur(8px) brightness(.5);transform:scale(1.1)"></div>' +
        '<img src="' + thumb.replace(/"/g, '&quot;') + '" style="position:relative;max-height:85%;max-width:90%;border-radius:8px;box-shadow:0 4px 30px rgba(0,0,0,.5);z-index:1" alt="" onerror="this.style.display=\'none\'">' +
        '</div>';
    } else {
      previewHtml = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;padding:20px;text-align:center;background:radial-gradient(ellipse at center, rgba(230,57,70,.05), transparent)">' +
        '<span style="font-size:48px">' + (icons[platform] || '\uD83C\uDFAC') + '</span>' +
        '<span style="color:var(--text);font-size:15px;font-weight:600">' + label + ' Video</span>' +
        '<span style="color:var(--text-muted);font-size:10px;word-break:break-all;max-width:100%">' + url + '</span></div>';
    }

    if (thumb) {
      document.getElementById('resultThumb').innerHTML = '<img src="' + thumb.replace(/"/g, '&quot;') + '" style="width:100%;height:100%;object-fit:cover" alt="" onerror="this.outerHTML=\'<div style=width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:28px>' + (icons[platform] || '\uD83C\uDFAC') + '</div>\'">';
    }

    previewWrap.innerHTML = previewHtml;
  }

  buildPreview();
  setTimeout(function() { document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 300);
}

function downloadFile() {
  const url = lastUrl || document.getElementById('urlInput').value.trim();
  if (!url) return;
  const btn = document.getElementById('dlBtn');
  btn.textContent = '\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...';
  btn.disabled = true;
  const plat = lastPlatform || detectPlatform(url);
  if (plat === 'youtube') {
    const vid = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
    if (vid) downloadVideoUrl('https://api.vevioz.com/api/button/Youtube/' + vid, btn, 'video.mp4');
    else { btn.textContent = 'Download HD'; btn.disabled = false; }
  } else if (lastDirectVideoUrl) {
    downloadVideoUrl(lastDirectVideoUrl, btn, 'video.mp4');
  } else {
    fetchViaProxy(url, btn);
  }
}

function installVideo() {
  const url = lastUrl || document.getElementById('urlInput').value.trim();
  if (!url) return;
  const btn = document.getElementById('installBtn');
  btn.textContent = '\u062C\u0627\u0631\u064A...';
  btn.disabled = true;
  const plat = lastPlatform || detectPlatform(url);
  if (plat === 'youtube') {
    const vid = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
    if (vid) downloadVideoUrl('https://api.vevioz.com/api/button/Youtube/' + vid, btn, 'video.mp4');
    else { btn.textContent = '\u2B07 Install'; btn.disabled = false; }
  } else if (lastDirectVideoUrl) {
    downloadVideoUrl(lastDirectVideoUrl, btn, 'video.mp4');
  } else {
    fetchViaProxy(url, btn);
  }
}

async function downloadVideoUrl(videoUrl, btn, filename) {
  const proxies = [
    'https://api.allorigins.win/raw?url=' + encodeURIComponent(videoUrl),
    'https://corsproxy.io/?' + encodeURIComponent(videoUrl),
    'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(videoUrl),
    'https://thingproxy.freeboard.io/fetch/' + encodeURIComponent(videoUrl),
  ];
  for (const proxy of proxies) {
    try {
      const r = await fetch(proxy, { signal: AbortSignal.timeout(20000) });
      if (!r.ok) continue;
      const blob = await r.blob();
      const ext = (blob.type.split('/')[1] || 'mp4').replace('x-', '');
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename || 'video.' + ext;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() { URL.revokeObjectURL(blobUrl); }, 5000);
      btn.textContent = btn.id === 'installBtn' ? '\u2B07 Install' : 'Download HD';
      btn.disabled = false;
      return;
    } catch(e) { continue; }
  }
  window.open(videoUrl, '_blank');
  btn.textContent = btn.id === 'installBtn' ? '\u2B07 Install' : 'Download HD';
  btn.disabled = false;
}

async function fetchViaProxy(url, btn) {
  const proxies = [
    'https://api.allorigins.win/raw?url=' + encodeURIComponent(url),
    'https://corsproxy.io/?' + encodeURIComponent(url),
    'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(url),
  ];
  for (const proxy of proxies) {
    try {
      const r = await fetch(proxy, { signal: AbortSignal.timeout(15000) });
      if (!r.ok) continue;
      const blob = await r.blob();
      const ext = (blob.type.split('/')[1] || 'mp4').replace('x-', '');
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'video.' + ext;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() { URL.revokeObjectURL(blobUrl); }, 5000);
      btn.textContent = btn.id === 'installBtn' ? '\u2B07 Install' : 'Download HD';
      btn.disabled = false;
      return;
    } catch(e) { continue; }
  }
  window.open(url, '_blank');
  btn.textContent = btn.id === 'installBtn' ? '\u2B07 Install' : 'Download HD';
  btn.disabled = false;
}

// ── Enter key ──
document.getElementById('urlInput').addEventListener('keydown', function(e) { if (e.key === 'Enter') handleDownload(); });
