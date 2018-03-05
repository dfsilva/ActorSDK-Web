import path from 'path';
import express from 'express';
import webpack from 'webpack';
import dev from 'webpack-dev-middleware';

function createServer(webpackConfig) {
  const app = express();
  const compiler = webpack(webpackConfig);

  app.use(dev(compiler, {
    publicPath: webpackConfig.publicPath,
    stats: {
      colors: true
    }
  }));

  app.use('/assets', express.static('assets'));
  app.use('/assets/images/emoji', express.static('node_modules/actor-emoji'));
  app.use('/decoderWorker.js', express.static('node_modules/opus-recorder/decoderWorker.js'));
  app.use('/decoderWorker.wasm', express.static('node_modules/opus-recorder/decoderWorker.wasm'));
  app.use('/decoderWorker.wast', express.static('node_modules/opus-recorder/decoderWorker.wast'));
  app.use('/encoderWorker.js', express.static('node_modules/opus-recorder/encoderWorker.js'));
  app.use('/encoderWorker.wasm', express.static('node_modules/opus-recorder/encoderWorker.wasm'));
  app.use('/encoderWorker.wast', express.static('node_modules/opus-recorder/encoderWorker.wast'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'devapp/index.html'));
  });

  return app;
}

export default createServer;
