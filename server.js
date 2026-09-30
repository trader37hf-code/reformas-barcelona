const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const BASE_DIR = __dirname;

function requestHandler(req, res) {
  // Parse URL and strip query strings / hash
  const urlPath = decodeURI(req.url.split('?')[0].split('#')[0]);
  let safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, '');
  
  if (safePath === '/' || safePath === '\\' || safePath === '') {
    safePath = '/index.html';
  }

  let filePath = path.join(BASE_DIR, safePath);

  // Check if directory, then try index.html inside
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        // Fallback: if requesting unknown route, serve index.html (SPA style) or 404
        if (readErr.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(`<h1>404 No Encontrado</h1><p>El archivo <code>${urlPath}</code> no existe.</p><p><a href="/">Volver a Inicio</a></p>`);
          return;
        }
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Error interno del servidor: ${readErr.code}`);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  });
}

function startServer(port) {
  const server = http.createServer(requestHandler);

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`🚀 SERVIDOR LOCAL ACTIVO`);
    console.log(`🌐 URL Local:    http://localhost:${port}`);
    console.log(`🌐 URL Network:  http://127.0.0.1:${port}`);
    console.log(`📁 Directorio:   ${BASE_DIR}`);
    console.log(`📄 Documento:    index.html`);
    console.log(`======================================================\n`);
  });
}

const DEFAULT_PORT = parseInt(process.env.PORT || '3000', 10);
startServer(DEFAULT_PORT);
