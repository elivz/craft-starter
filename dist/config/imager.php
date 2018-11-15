<?php

return [
  'filenamePattern' => '{fullname}.{extension}',
  'imagerSystemPath' => '@webroot/images/sized/',
  'imagerUrl' => '/images/sized/',
  'suppressExceptions' => true,
  'smartResizeEnabled' => true,
  'removeMetadata' => true,
  'convertToRGB' => true,
  'jpegQuality' => 85,
  'optimizers' => ['jpegoptim', 'optipng'],
];