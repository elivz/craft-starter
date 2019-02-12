const mix = require('laravel-mix');
const path = require('path');
require('./config/build/sync-component');
require('laravel-mix-purgecss');

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
  });

// Replace default image loader
Mix.listen('configReady', require('./config/build/image-loader'));

// Build javascript
mix
  .js(path.join(srcPath, 'scripts/initial.js'), 'scripts')
  .js(path.join(srcPath, 'scripts/main.js'), 'scripts');

// Build stylesheets
mix.postCss(path.join(srcPath, 'styles/main.css'), 'styles').options({
  extractVueStyles: true,
  postCss: [
    require('postcss-easy-import'),
    require('postcss-nested'),
    require('tailwindcss')(path.join(srcPath, 'styles/tailwind-config.js')),
  ],
});

// Copy all other static files
mix
  .sync(path.join(srcPath, 'templates'), 'dist/templates')
  .copy(path.join(srcPath, 'images'), path.join(distPath, 'images'))
  .copy(path.join(srcPath, 'static'), path.join(distPath, 'static'));

// Remove unused CSS classes in production
if (mix.inProduction()) {
  mix.purgeCss({
    enabled: true,
    folders: ['src/templates', 'src/scripts'],
    extensions: ['twig', 'js', 'vue'],
    extractor: class TailwindExtractor {
      static extract(content) {
        return content.match(/[A-Za-z0-9-_:/]+/g) || [];
      }
    },
    whitelistPatternsChildren: [/^wysiwyg$/],
    whitelistPatterns: [/float-/, /caps/, /push-/, /pull-/, /numbers/],
  });
}
