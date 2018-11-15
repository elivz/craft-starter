// Node modules
const merge = require('webpack-merge');
const path = require('path');
const sane = require('sane');
const webpack = require('webpack');

// Webpack plugins
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

// Config files
const LEGACY_CONFIG = 'legacy';
const MODERN_CONFIG = 'modern';
const common = require('./webpack.common');
const settings = require('./webpack.settings');

const dashboard = new Dashboard();

// Configure the webpack-dev-server
const configureDevServer = buildType => ({
  public: settings.devServerConfig.public,
  contentBase: settings.paths.templates,
  host: settings.devServerConfig.host,
  port: settings.devServerConfig.port,
  https: !!settings.devServerConfig.https,
  quiet: false,
  hot: true,
  hotOnly: true,
  overlay: true,
  stats: 'minimal',
  allowedHosts: ['.xip.io'],
  watchOptions: {
    poll: !!settings.devServerConfig.poll,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  // Use sane to monitor all of the templates files and sub-directories
  before: (app, server) => {
    const watcher = sane(settings.paths.templates, {
      glob: ['**/*'],
      poll: !!parseInt(settings.devServerConfig.poll, 10),
    });
    watcher.on('change', (filePath, root, stat) => {
      console.log('  File modified:', filePath);
      server.sockWrite(server.sockets, 'content-changed');
    });
  },
});

// Configure Image loader
const configureImageLoader = buildType => {
  if (buildType === LEGACY_CONFIG) {
    return {
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash].[ext]',
          },
        },
      ],
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash].[ext]',
          },
        },
      ],
    };
  }
};

// Configure the Postcss loader
const configurePostcssLoader = buildType => {
  // Don't generate CSS for the legacy config in development
  if (buildType === LEGACY_CONFIG) {
    return {
      test: /\.(pcss|css)$/,
      loader: 'ignore-loader',
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      test: /\.(pcss|css)$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'vue-style-loader' },
        { loader: 'css-loader', options: { importLoaders: 2, sourceMap: true } },
        { loader: 'resolve-url-loader' },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, plugins: settings.postcssPlugins },
        },
      ],
    };
  }
};

// Development module exports
module.exports = [
  merge(common.legacyConfig, {
    output: {
      filename: path.join('./scripts', '[name]-legacy.[hash].js'),
      publicPath: `${settings.devServerConfig.public}/`,
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: configureDevServer(LEGACY_CONFIG),
    module: {
      rules: [configurePostcssLoader(LEGACY_CONFIG), configureImageLoader(LEGACY_CONFIG)],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  }),
  merge(common.modernConfig, {
    output: {
      filename: path.join('./scripts', '[name].[hash].js'),
      publicPath: `${settings.devServerConfig.public}/`,
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: configureDevServer(MODERN_CONFIG),
    module: {
      rules: [configurePostcssLoader(MODERN_CONFIG), configureImageLoader(MODERN_CONFIG)],
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new DashboardPlugin(dashboard.setData)],
  }),
];
