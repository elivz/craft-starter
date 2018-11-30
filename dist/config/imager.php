<?php

return [
  'filenamePattern' => '{basename}_{transformString|shorthash}',
  'imagerSystemPath' => '@webroot/images/sized/',
  'imagerUrl' => '/media/sized/',
  'suppressExceptions' => true,
  'smartResizeEnabled' => true,
  'removeMetadata' => true,
  'convertToRGB' => true,
  'jpegQuality' => 85,
  'optimizers' => ['jpegoptim', 'optipng'],
];