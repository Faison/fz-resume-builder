<?php

namespace FZ_Resume;

/**
 * Default setup routine.
 */
function setup() {
	add_action( 'init', __NAMESPACE__ . '\i18n' );
	add_action( 'init', __NAMESPACE__ . '\init' );

	do_action( 'fz_resume_loaded' );
}

/**
 * Registers the default textdomain.
 */
function i18n() {
	$locale = apply_filters( 'plugin_locale', get_locale(), 'fz_resume' );
	load_textdomain( 'fz_resume', WP_LANG_DIR . '/fz_resume/fz_resume-' . $locale . '.mo' );
	load_plugin_textdomain( 'fz_resume', false, plugin_basename( FZ_RESUME_PATH ) . '/languages/' );
}

/**
 * Initializes the plugin and fires an action other plugins can hook into.
 */
function init() {
	do_action( 'fz_resume_init' );
}

/**
 * Activate the plugin.
 */
function activate() {
	// First load the init scripts in case any rewrite functionality is being loaded
	init();
	flush_rewrite_rules();
}
