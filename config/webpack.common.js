// webpack.common.js - common webpack config
// node modules
const path = require('path');
const merge = require('webpack-merge');

// webpack plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const WriteFilePlugin = require('write-file-webpack-plugin');

// config files
const pkg = require('../package.json');
const settings = require('./webpack.settings');

// Configure Babel loader
const configureBabelLoader = browserList => ({
  test: /\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: 'entry',
            targets: {
              browsers: browserList,
            },
          },
        ],
      ],
      plugins: ['@babel/plugin-syntax-dynamic-import'],
    },
  },
});

// Configure Entries
const configureEntries = () => {
  const entries = {};
  for (const [key, value] of Object.entries(settings.entries)) {
    entries[key] = path.resolve(settings.paths.src.js, value);
  }

  return entries;
};

// Configure Font loader
const configureFontLoader = () => ({
  test: /\.(ttf|eot|woff2?)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]',
      },
    },
  ],
});

// Configure Manifest
const configureManifest = fileName => ({
  fileName,
  // publicPath: settings.paths.root,
  basePath: settings.manifestConfig.basePath,
  filter: file => !file.name.includes('../../templates'),
  // map: file => {
  //   file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
  //   return file;
  // },
});

// Configure Vue loader
const configureVueLoader = () => ({
  test: /\.vue$/,
  loader: 'vue-loader',
});

// The base webpack config
const baseConfig = {
  name: pkg.name,
  entry: configureEntries(),
  output: {
    path: settings.paths.dist.base,
    publicPath: settings.paths.root,
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [configureFontLoader(), configureVueLoader()],
  },
  plugins: [
    new WebpackNotifierPlugin({ title: 'Webpack', excludeWarnings: true, alwaysNotify: true }),
    new VueLoaderPlugin(),
    new WriteFilePlugin({ test: /..\/templates\/|manifest.*\.json/ }),
  ],
};

// Legacy webpack config
const legacyConfig = {
  module: {
    rules: [configureBabelLoader(Object.values(pkg.browserslist.legacyBrowsers))],
  },
  plugins: [
    new CleanWebpackPlugin(settings.paths.dist.clean, { root: path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin(settings.copyWebpackConfig),
    new ManifestPlugin(configureManifest('manifest-legacy.json')),
  ],
};

// Modern webpack config
const modernConfig = {
  module: {
    rules: [configureBabelLoader(Object.values(pkg.browserslist.modernBrowsers))],
  },
  plugins: [new ManifestPlugin(configureManifest('manifest.json'))],
};

// Common module exports
module.exports = {
  legacyConfig: merge(legacyConfig, baseConfig),
  modernConfig: merge(modernConfig, baseConfig),
};
