<?php

return [
  // Global settings
  '*' => [
    // If `devMode` is on, use webpack-dev-server to all for HMR (hot module reloading)
    'useDevServer' => false,
    // The JavaScript entry from the manifest.json to inject on Twig error pages
    'errorEntry' => '',
    // Manifest file names
    'manifest' => [
      'legacy' => 'manifest-legacy.json',
      'modern' => 'manifest.json',
    ],
    // Public server config
    'server' => [
      'manifestPath' => '@webroot/assets',
      'publicPath' => '@web',
    ],
    // webpack-dev-server config
    'devServer' => [
      'manifestPath' => 'http://localhost:8080/assets',
      'publicPath' => 'http://localhost:8080',
    ],
  ],
  // Live (production) environment
  'live' => [
  ],
  // Staging (pre-production) environment
  'staging' => [
  ],
  // Local (development) environment
  'local' => [
      // If `devMode` is on, use webpack-dev-server to all for HMR (hot module reloading)
      'useDevServer' => true,
  ],
];