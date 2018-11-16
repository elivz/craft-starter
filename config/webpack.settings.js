// webpack.settings.js - webpack settings config

// node modules
require('dotenv').config();
const path = require('path');
const pkg = require('../package.json');

// Webpack settings exports
module.exports = {
  name: pkg.description,
  copyright: pkg.author,
  paths: {
    root: '/assets/',
    src: {
      base: 'src',
      css: 'src/styles',
      js: 'src/scripts',
    },
    dist: {
      base: path.join(process.cwd(), process.env.PUBLIC_FOLDER, 'assets'),
      clean: [
        path.join(process.cwd(), process.env.PUBLIC_FOLDER, 'assets/*'),
        path.join(process.cwd(), 'dist/templates/*'),
      ],
    },
    templates: './dist/templates/',
  },
  vars: {
    cssName: 'main',
  },
  entries: {
    initial: 'initial.js',
    main: 'main.js',
  },
  copyWebpackConfig: [
    {
      from: './src/templates',
      to: path.resolve(__dirname, '../dist/templates'),
    },
    {
      from: './src/images',
      to: 'images',
    },
  ],
  postcssPlugins: {
    plugins: [require('postcss-preset-env')],
  },
  purgeCssConfig: {
    paths: ['./templates/**/*.{twig,html}', './src/vue/**/*.{vue,html}'],
    whitelist: ['./src/css/components/**/*.{css,pcss}'],
    whitelistPatterns: [],
    extensions: ['html', 'js', 'twig', 'vue'],
  },
  createSymlinkConfig: [
    {
      origin: './images/favicons/favicon.ico',
      symlink: '../favicon.ico',
    },
  ],
  webappConfig: {
    logo: './src/images/favicon.svg',
    prefix: 'images/favicons/',
  },
  manifestConfig: {
    basePath: '',
  },
  devServerConfig: {
    public: `http://127.0.0.1.xip.io:3000`,
    host: '0.0.0.0',
    poll: false,
    port: 3000,
    https: false,
  },
  // workboxConfig: {
  //   swDest: '../sw.js',
  //   precacheManifestFilename: 'js/precache-manifest.[manifestHash].js',
  //   importScripts: ['/dist/workbox-catch-handler.js'],
  //   exclude: [/\.(png|jpe?g|gif|svg|webp)$/i, /\.map$/, /^manifest.*\\.js(?:on)?$/],
  //   globDirectory: './web/',
  //   globPatterns: ['offline.html', 'offline.svg'],
  //   offlineGoogleAnalytics: true,
  //   runtimeCaching: [
  //     {
  //       urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
  //       handler: 'cacheFirst',
  //       options: {
  //         cacheName: 'images',
  //         expiration: {
  //           maxEntries: 20,
  //         },
  //       },
  //     },
  //   ],
  // },
};
