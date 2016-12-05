<?php
/**
 * Adds resume functionality to the Faisonz.net theme.
 *
 * @since 0.1.0
 */

namespace FZ_Resume;

// Useful global constants
define( 'FZ_RESUME_VERSION', '0.1.0' );
define( 'FZ_RESUME_URL',     plugin_dir_url( __FILE__ ) );
define( 'FZ_RESUME_PATH',    dirname( __FILE__ ) . '/' );
define( 'FZ_RESUME_INC',     FZ_RESUME_PATH . 'includes/' );

// Include files
require_once FZ_RESUME_INC . 'setup.php';

setup();
