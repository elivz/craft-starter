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
    'useProjectConfigFile' => true,
    'omitScriptNameInUrls' => true,
    'usePathInfo' => true,
    'backupOnUpdate' => true,
    'useEmailAsUsername' => true,
    'maxUploadFileSize' => 67108864,
  ],

  // Live (production) environment
  'live' => [
    'allowUpdates' => false,
    'allowAdminChanges' => false,
  ],

  // Staging (pre-production) environment
  'staging' => [
    'allowUpdates' => false,
    'devMode' => true,
    'allowAdminChanges' => false,
    'enableTemplateCaching' => true,
    'isSystemLive' => false,
  ],

  // Local (development) environment
  'dev' => [
    'devMode' => true,
    'enableTemplateCaching' => false,
    'backupOnUpdate' => false,
  ],
];
