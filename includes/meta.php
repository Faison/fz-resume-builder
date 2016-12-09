<?php
/**
 * Meta fields for the Resume Builder.
 *
 * @since 0.1.0
 */

namespace FZ_Resume;

/**
 * Adds the Resume Builder Meta Box.
 *
 * @since 0.1.0
 */
function add_resume_meta_box() {
	if ( ! is_admin() ) {
		return;
	}

	add_meta_box(
		'fz-resume-meta-box',
		esc_html__( 'Resume Builder', 'fz_resume' ),
		__NAMESPACE__ . '\display_resume_builder_meta_box',
		'page',
		'normal',
		'high'
	);
}

add_action( 'add_meta_boxes', __NAMESPACE__ . '\add_resume_meta_box' );

/**
 * Displays the Resume Builder meta box and makes sure the required JS and CSS is enqueued.
 *
 * @since 0.1.0
 */
function display_resume_builder_meta_box() {
	enqueue_meta_scripts();
	enqueue_meta_styles();

	add_action( 'admin_footer', __NAMESPACE__ . '\add_meta_templates' );
}

/**
 * Adds the Resume Builder Handlebar templates to the page.
 *
 * @since 0.1.0
 */
function add_meta_templates() {
	include FZ_RESUME_PATH . 'templates/admin/meta.php';
}

/**
 * Enqueues the scripts needed to ue the Resume Builder.
 *
 * @since 0.1.0
 */
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
		array(
			'fz-resume-handlebars',
			'jquery',
			'backbone',
			'underscore',
			'jquery-ui-sortable',
			'jquery-ui-datepicker',
		),
		FZ_RESUME_VERSION,
		true
	);

	$field_types = get_default_field_types();
	$field_types = apply_filters( 'fz_resume_field_types', $field_types );

	wp_localize_script( 'fz-resume-admin', 'fz_resume_field_types', $field_types );
}

/**
 * Enqueues the styles needed for the Resume Builder.
 *
 * @since 0.1.0
 */
function enqueue_meta_styles() {
	wp_register_style(
		'fz-resume-jquery-ui',
		FZ_RESUME_URL . '/assets/css/vendor/jquery-ui/jquery-ui.css',
		array(),
		'1.12.1'
	);

	wp_enqueue_style(
		'fz-resume-admin',
		FZ_RESUME_URL . '/assets/css/admin.css',
		array( 'fz-resume-jquery-ui' ),
		FZ_RESUME_VERSION
	);
}

/**
 * Returns the default field types.
 *
 * @since 0.1.0
 *
 * @return array The default field types.
 */
function get_default_field_types() {
	return array(
		'section-title' => array(
			'label'       => esc_html__( 'Section Title', 'fz_resume' ),
			'template_id' => 'fz-resume-template-meta-field-section-title',
		),
		'subsection-title' => array(
			'label'       => esc_html__( 'Subsection Title', 'fz_resume' ),
			'template_id' => 'fz-resume-template-meta-field-subsection-title',
		),
		'experience' => array(
			'label'       => esc_html__( 'Experience', 'fz_resume' ),
			'template_id' => 'fz-resume-template-meta-field-experience',
		),
		'list' => array(
			'label'       => esc_html__( 'List', 'fz_resume' ),
			'repeater'    => true,
			'template_id' => 'fz-resume-template-meta-field-list-item',
		),
	);
}
