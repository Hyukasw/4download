export default async function handler(req, res) {
  const vid = req.query.v;
  if (!vid || !/^[a-zA-Z0-9_-]{11}$/.test(vid)) return res.status(400).end('Invalid video ID');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(`<!DOCTYPE html>
<html><head>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;display:flex;align-items:center;justify-content:center;height:100vh;overflow:hidden}
iframe{width:100vw;height:56.25vw;max-height:100vh;max-width:177.78vh;border:none}
</style>
</head><body>
<iframe src="https://www.youtube.com/embed/${vid}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</body></html>`);
}
