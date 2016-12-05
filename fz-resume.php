<?php
/**
 * Plugin Name: Faisonz.net Resume
 * Plugin URI:  http://wordpress.org/plugins/
 * Description: The Resume feature for Faisonz.net.
 * Version:     0.1.0
 * Author:      Faison Zutavern
 * Author URI:  http://faisonz.net/
 * Text Domain: fz-resume
 * Domain Path: /languages
 * License:     GPL2
 */

// Useful global constants
define( 'FZ_RESUME_VERSION', '0.1.0' );
define( 'FZ_RESUME_URL',     plugin_dir_url( __FILE__ ) );
define( 'FZ_RESUME_PATH',    dirname( __FILE__ ) . '/' );
define( 'FZ_RESUME_INC',     FZ_RESUME_PATH . 'includes/' );

// Include files
require_once FZ_RESUME_INC . 'setup.php';

// Activation/Deactivation
register_activation_hook( __FILE__, '\FZ_Resume\activate' );

FZ_Resume\setup();
