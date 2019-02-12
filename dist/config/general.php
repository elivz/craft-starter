<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in src/config/GeneralConfig.php
 */

return [
  // All environments
  '*' => [
    // Craft defined config settings
    'siteUrl' =>  getenv('BASE_URL'),
    'cpTrigger' => 'siteadmin',
    'securityKey' => getenv('SECURITY_KEY'),
    'enableCsrfProtection' => true,
    'useProjectConfigFile' => false,
    'omitScriptNameInUrls' => true,
    'cacheDuration'=> 604800,
    'usePathInfo' => true,
    'backupOnUpdate' => true,
    'useEmailAsUsername' => true,
    'maxUploadFileSize' => 134217728,
  ],

  // Live (production) environment
  'live' => [
    'allowUpdates' => false,
    'devMode' => false,
    'allowAdminChanges' => true,
    'enableTemplateCaching' => true,
    'backupOnUpdate' => true,
    'isSystemLive' => true,
  ],

  // Staging (pre-production) environment
  'staging' => [
    'allowUpdates' => false,
    'devMode' => true,
    'enableTemplateCaching' => true,
    'backupOnUpdate' => true,
    'isSystemLive' => true,
  ],

  // Local (development) environment
  'dev' => [
    'allowUpdates' => true,
    'devMode' => true,
    'enableTemplateCaching' => false,
    'backupOnUpdate' => false,
    'isSystemLive' => true,
  ],
];
