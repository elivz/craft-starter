const mix = require('laravel-mix');
const path = require('path');
const webpack = require('webpack');
require('./config/build/sync-component');

// Base paths
const srcPath = 'src';
const publicPath = 'dist/public';
const distPath = path.join(publicPath, 'assets');

// Mix configuration
mix
  .setPublicPath(distPath)
  .setResourceRoot('/assets/')
  .sourceMaps(true, 'source-map')
  .version()
  .browserSync({
    proxy: 'localhost',
    files: ['dist/templates/**/*', path.join(distPath, 'styles/*.css')],
    open: false,
    xip: true,
    reloadOnRestart: false,
  });

// Replace default image loader
Mix.listen('configReady', require('./config/build/image-loader'));

// Build everything
mix
  .js(path.join(srcPath, 'scripts/initial.js'), 'scripts')
  .js(path.join(srcPath, 'scripts/main.js'), 'scripts')
  .sass(path.join(srcPath, 'styles/main.scss'), 'styles')
  .sync(path.join(srcPath, 'templates'), 'dist/templates')
  .copy(path.join(srcPath, 'images'), path.join(distPath, 'images'))
  .copy(path.join(srcPath, 'static'), path.join(distPath, 'static'));
