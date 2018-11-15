<?php
/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in src/config/DbConfig.php
 */

return [

    // All environments
    '*' => [
        'driver' => 'mysql',
        'tablePrefix' => 'craft_',
        'server' => getenv('DB_HOST'),
        'database' => getenv('DB_NAME'),
        'user' => getenv('DB_USER'),
        'password' => getenv('DB_PASS'),
        'port' => getenv('DB_PORT'),
    ],

    // Live (production) environment
    'production'  => [
    ],

    // Staging (pre-production) environment
    'staging'  => [
    ],

    // Local (development) environment
    'dev'  => [
    ],
];
