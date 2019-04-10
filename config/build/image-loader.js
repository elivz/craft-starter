module.exports = webpackConfig => {
  // Remove original rule
  webpackConfig.module.rules = webpackConfig.module.rules.filter(
    rule => String(rule.test) !== String(/(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/)
  );

  // Add rule for PNG, JPEG, & GIF files
  webpackConfig.module.rules.push({
    test: /(\.(png|jpe?g|gif|webp)$)/,
    loaders: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path => {
            if (!/node_modules|bower_components/.test(path)) {
              return `${Config.fileLoaderDirs.images}/[name].[ext]?[hash]`;
            }

            return `${Config.fileLoaderDirs.images}/vendor/${path
              .replace(/\\/g, '/')
              .replace(
                /((.*(node_modules|bower_components))|images|image|img|assets)\//g,
                ''
              )}?[hash]`;
          },
          publicPath: Config.resourceRoot,
        },
      },
    ],
  });

  // Add rule for SVGs
  webpackConfig.module.rules.push({
    test: /(\.svg$)/,
    loaders: [
      {
        loader: 'svg-url-loader',
        options: {
          limit: 10000,
          name: path => {
            if (!/node_modules|bower_components/.test(path)) {
              return `${Config.fileLoaderDirs.images}/[name].[ext]?[hash]`;
            }

            return `${Config.fileLoaderDirs.images}/vendor/${path
              .replace(/\\/g, '/')
              .replace(
                /((.*(node_modules|bower_components))|images|image|img|assets)\//g,
                ''
              )}?[hash]`;
          },
          publicPath: Config.resourceRoot,
          iesafe: true,
        },
      },
      {
        loader: 'img-loader',
        options: Config.imgLoaderOptions,
      },
    ],
  });
};
