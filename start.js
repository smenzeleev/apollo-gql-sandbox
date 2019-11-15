const http = require('http');
const path = require('path');
const fs = require('fs');

const bundleFront = require('./client/bundle');
const startApi = require('./serv/index');

function getFilePathByRequestUrl(bundleDir, url) {
  const fileName = url === '/' ? 'index.html' : url.split('/')[1];
  return `${bundleDir}/${fileName}`;
}

async function serveFront(bundle) {
  const server = await http.createServer((req, res) => {
    console.log(`requested url ${req.url}`);
    const bundleDir = bundle.entryAsset.options.outDir;
    const filePath = getFilePathByRequestUrl(bundleDir, req.url);
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end();
      return;
    }
    const buffer = fs.readFileSync(filePath);
    const bufferLength = buffer.length;
    const body = buffer.toString();
    res.writeHead(200, {
      'Content-Length': bufferLength,
    });
    res.end(body);
  });
  await server.listen(1234);
  console.log('front-end server started');
  return server;
}

async function start() {
  const bundle = await bundleFront();
  await serveFront(bundle);
  await startApi();
}

start();
