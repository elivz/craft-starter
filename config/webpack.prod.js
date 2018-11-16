// webpack.prod.js - production builds
const LEGACY_CONFIG = 'legacy';
const MODERN_CONFIG = 'modern';

// node modules
const glob = require('glob-all');
const merge = require('webpack-merge');
const moment = require('moment');
const path = require('path');
const webpack = require('webpack');

// webpack plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CreateSymlinkPlugin = require('create-symlink-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const WhitelisterPlugin = require('purgecss-whitelister');
const WorkboxPlugin = require('workbox-webpack-plugin');

// config files
const common = require('./webpack.common.js');
const pkg = require('../package.json');
const settings = require('./webpack.settings.js');

// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

// Configure file banner
const configureBanner = () => ({
  banner: [
    '/*!',
    ` * @project        ${settings.name}`,
    ' * @name           ' + '[filebase]',
    ` * @author         ${pkg.author.name}`,
    ` * @build          ${moment().format('llll')} ET`,
    ` * @copyright      Copyright (c) ${moment().format('YYYY')} ${settings.copyright}`,
    ' */',
    '',
  ].join('\n'),
  raw: true,
});

// Configure Bundle Analyzer
const configureBundleAnalyzer = buildType => {
  if (buildType === LEGACY_CONFIG) {
    return {
      analyzerMode: 'static',
      reportFilename: 'report-legacy.html',
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      analyzerMode: 'static',
      reportFilename: 'report-modern.html',
    };
  }
};

// Configure Html webpack
const configureHtml = () => ({
  templateContent: '',
  filename: 'webapp.html',
  inject: false,
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
        {
          loader: 'img-loader',
          options: {
            plugins: [
              require('imagemin-mozjpeg')({
                progressive: true,
                arithmetic: false,
              }),
              require('imagemin-optipng')({
                optimizationLevel: 5,
              }),
              require('imagemin-svgo')({
                plugins: [{ convertPathData: false }],
              }),
            ],
          },
        },
      ],
    };
  }
};

// Configure optimization
const configureOptimization = buildType => {
  if (buildType === LEGACY_CONFIG) {
    return {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          common: false,
          styles: {
            name: settings.vars.cssName,
            test: /\.(pcss|css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin(configureTerser()),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
            safe: true,
            discardComments: true,
          },
        }),
      ],
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          common: false,
        },
      },
      minimizer: [new TerserPlugin(configureTerser())],
    };
  }
};

// Configure Postcss loader
const configurePostcssLoader = buildType => {
  if (buildType === LEGACY_CONFIG) {
    return {
      test: /\.(pcss|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { importLoaders: 2, sourceMap: true } },
        { loader: 'resolve-url-loader' },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, plugins: settings.postcssPlugins },
        },
      ],
    };
  }
  // Don't generate CSS for the modern config in production
  if (buildType === MODERN_CONFIG) {
    return {
      test: /\.(pcss|css)$/,
      loader: 'ignore-loader',
    };
  }
};

// Configure PurgeCSS
const configurePurgeCss = () => {
  const paths = [];
  // Configure whitelist paths
  for (const [key, value] of Object.entries(settings.purgeCssConfig.paths)) {
    paths.push(path.join(__dirname, value));
  }

  return {
    paths: glob.sync(paths),
    whitelist: WhitelisterPlugin(settings.purgeCssConfig.whitelist),
    whitelistPatterns: settings.purgeCssConfig.whitelistPatterns,
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: settings.purgeCssConfig.extensions,
      },
    ],
  };
};

// Configure terser
const configureTerser = () => ({
  cache: true,
  parallel: true,
  sourceMap: true,
  terserOptions: {
    output: {
      comments: /@project/i,
    },
  },
});

// Configure Webapp webpack
const configureWebapp = () => ({
  logo: settings.webappConfig.logo,
  prefix: settings.webappConfig.prefix,
  cache: true,
  inject: 'force',
  favicons: {
    appName: pkg.name,
    appDescription: pkg.description,
    developerName: pkg.author.name,
    developerURL: pkg.author.url,
    path: settings.paths.dist.base,
    icons: {
      coast: false,
      firefox: false,
      yandex: false,
    },
  },
});

// Configure Workbox service worker
const configureWorkbox = () => {
  const config = settings.workboxConfig;
  return config;
};

// Production module exports
module.exports = [
  merge(common.legacyConfig, {
    output: {
      filename: path.join('./js', '[name]-legacy.[chunkhash].js'),
    },
    mode: 'production',
    devtool: 'source-map',
    optimization: configureOptimization(LEGACY_CONFIG),
    module: {
      rules: [configurePostcssLoader(LEGACY_CONFIG), configureImageLoader(LEGACY_CONFIG)],
    },
    plugins: [
      new MiniCssExtractPlugin({
        path: path.resolve(__dirname, settings.paths.dist.base),
        filename: path.join('./css', '[name].[chunkhash].css'),
      }),
      // new PurgecssPlugin(configurePurgeCss()),
      new webpack.BannerPlugin(configureBanner()),
      new HtmlWebpackPlugin(configureHtml()),
      new WebappWebpackPlugin(configureWebapp()),
      new CreateSymlinkPlugin(settings.createSymlinkConfig, true),
      new BundleAnalyzerPlugin(configureBundleAnalyzer(LEGACY_CONFIG)),
    ],
  }),
  merge(common.modernConfig, {
    output: {
      filename: path.join('./js', '[name].[chunkhash].js'),
    },
    mode: 'production',
    devtool: 'source-map',
    optimization: configureOptimization(MODERN_CONFIG),
    module: {
      rules: [configurePostcssLoader(MODERN_CONFIG), configureImageLoader(MODERN_CONFIG)],
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.BannerPlugin(configureBanner()),
      new WorkboxPlugin.GenerateSW(configureWorkbox()),
      new BundleAnalyzerPlugin(configureBundleAnalyzer(MODERN_CONFIG)),
    ],
  }),
];
