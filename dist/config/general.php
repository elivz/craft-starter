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
        'siteUrl' =>  '@web',
        'cpTrigger' => 'siteadmin',
        'securityKey' => getenv('SECURITY_KEY'),
        'omitScriptNameInUrls' => true,
        'usePathInfo' => true,
        'useEmailAsUsername' => true,
        'maxUploadFileSize' => 67108864,

        // Aliases parsed in sites’ settings, volumes’ settings, and Local volumes’ settings
        'aliases' => [
            '@basePath' => getenv('BASE_PATH'),
            '@baseUrl' => getenv('BASE_URL'),
        ],
    ],

    // Live (production) environment
    'live' => [
        'allowUpdates' => false,
        'devMode' => false,
        'enableTemplateCaching' => true,
        'backupOnUpdate' => true,
        'isSystemOn' => true,
    ],

    // Staging (pre-production) environment
    'staging' => [
        'allowUpdates' => false,
        'devMode' => true,
        'enableTemplateCaching' => true,
        'backupOnUpdate' => true,
        'isSystemOn' => true,
    ],

    // Local (development) environment
    'dev' => [
        'allowUpdates' => true,
        'devMode' => true,
        'enableTemplateCaching' => false,
        'backupOnUpdate' => false,
        'isSystemOn' => true,
    ],
];
