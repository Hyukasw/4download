const localtunnel = require('localtunnel');
(async () => {
  try {
    const tunnel = await localtunnel({ port: 3001 });
    console.log('LT_URL=' + tunnel.url);
    console.log('PID=' + process.pid);
    tunnel.on('close', () => process.exit(0));
  } catch (err) {
    console.error('LT_ERROR', err && err.stack ? err.stack : err);
    process.exit(1);
  }
})();
