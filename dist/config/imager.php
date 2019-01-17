<?php

return [
  'filenamePattern' => '{basename}_{transformString|shorthash}.{extension}',
  'imagerSystemPath' => '@webroot/media/sized/',
  'imagerUrl' => '@web/media/sized/',
  'useForNativeTransforms' => true,
  'cacheDuration' => 5184000,
  'cacheDurationRemoteFiles' => 5184000,
  'suppressExceptions' => true,
  'removeMetadata' => true,
  'convertToRGB' => true,
  'jpegQuality' => 85,
  'optimizers' => ['jpegoptim', 'optipng'],
];