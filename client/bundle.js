const Bundler = require('parcel-bundler');
const path = require('path');

const entry = path.resolve(__dirname, 'index.html');

const config = {
  outDir: path.resolve(__dirname, 'dist'),
  outFile: 'index.html',
  publicUrl: './',
  watch: false, // we will try to watch with nodemon
  cache: true,
  cacheDir: path.resolve(__dirname, '.cache'),
  target: 'browser', //node/electron/browser
  logLevel: 3,
};

async function bundle() {
  const bundler = new Bundler(entry, config);
  const bundle = await bundler.bundle();
  return bundle;
}

module.exports = bundle;
