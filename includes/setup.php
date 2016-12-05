<?php
/**
 * Setup files, mostly triggers some actions.
 *
 * @since 0.1.0
 */

namespace FZ_Resume;

/**
 * Default setup routine.
 */
function setup() {
	add_action( 'init', __NAMESPACE__ . '\init' );

	do_action( 'fz_resume_loaded' );
}

/**
 * Initializes the plugin and fires an action other plugins can hook into.
 */
function init() {
	do_action( 'fz_resume_init' );
}
