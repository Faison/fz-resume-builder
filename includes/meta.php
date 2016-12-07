<?php
/**
 * Meta fields for a Resume.
 *
 * @since 0.1.0
 */

namespace FZ_Resume;

function add_meta_templates() {
	include FZ_RESUME_PATH . 'templates/admin/meta.php';
}

add_action( 'admin_footer', __NAMESPACE__ . '\add_meta_templates' );

function enqueue_meta_scripts() {
	wp_register_script(
		'fz-resume-handlebars',
		FZ_RESUME_URL . '/assets/js/vendor/handlebars.js',
		array(),
		'4.0.5',
		true
	);

	wp_enqueue_script(
		'fz-resume-admin',
		FZ_RESUME_URL . '/assets/js/admin.js',
		array( 'jquery', 'fz-resume-handlebars' ),
		FZ_RESUME_VERSION,
		true
	);
}

add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\enqueue_meta_scripts' );
