<?php
/**
 * Meta fields for the Resume Builder.
 *
 * @since 0.1.0
 */

namespace FZ_Resume;

/**
 * Registers the Resume Meta with its sanitization callback.
 *
 * @since 0.1.0
 */
function register_resume_meta() {
	register_meta( 'post', 'fz_resume_meta', array(
		'type'              => 'array',
		'description'       => 'The Resume Builder meta.',
		'single'            => true,
		'sanitize_callback' => __NAMESPACE__ . '\sanitize_resume_meta',
		'show_in_rest'      => false,
	) );
}

add_action( 'fz_resume_init', __NAMESPACE__ . '\register_resume_meta' );

/**
 * Sanitizes the Resume Builder Meta Values.
 *
 * @param array $values An array of field values for the resume builder.
 *
 * @return array|string The sanitized values for the resume builder, empty string if no values.
 */
function sanitize_resume_meta( $values ) {
	if ( empty( $values ) || ! is_array( $values ) ) {
		return '';
	}

	$sanitized_values = array();

	foreach ( $values as $value_set ) {
		$field_type = $value_set['field'];
		$value      = $value_set['value'];

		$sanitized_value = '';

		if ( 'section-title' === $field_type ) {
			$sanitized_value = sanitize_text_field( $value );
		} else if ( 'subsection-title' === $field_type ) {
			$sanitized_value = sanitize_text_field( $value );
		} else if ( 'experience' === $field_type ) {
			$sanitized_value['name']  = sanitize_text_field( $value['name'] );
			$sanitized_value['title'] = sanitize_text_field( $value['title'] );

			$start = date_create_from_format( 'm-d-Y', $value['start'] );
			$sanitized_value['start'] = ( $start ) ? $start->format( 'm-d-Y' ) : '';

			$end = date_create_from_format( 'm-d-Y', $value['end'] );
			$sanitized_value['end'] = ( $end ) ? $end->format( 'm-d-Y' ) : '';
		} else if ( 'list' === $field_type ) {
			$sanitized_value['items'] = array();
			foreach ( $value as $v ) {
				$sanitized_value['items'][] = sanitize_text_field( $v );
			}
		}

		$sanitized_values[] = array(
			'field' => $field_type,
			'value' => $sanitized_value,
		);
	}

	return $sanitized_values;
}

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
 *
 * @param \WP_Post $post The post currently being edited.
 */
function display_resume_builder_meta_box( $post ) {
	wp_nonce_field( 'fz_resume_builder_meta', 'fz_resume_builder_nonce' );

	enqueue_meta_scripts();
	enqueue_meta_styles();

	$resume_data = get_post_meta( $post->ID, 'fz_resume_meta', true );

	if ( empty( $resume_data ) ) {
		$resume_data = array();
	}

	wp_localize_script( 'fz-resume-admin', 'fz_resume_field_data', $resume_data );

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

/**
 * Saves the Resume Builder meta.
 *
 * @param int $post_id The ID of the post being saved.
 */
function save_resume_meta( $post_id ) {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( 'page' !== get_post_type( $post_id ) ) {
		return;
	}

	if ( ! isset( $_POST['fz_resume_builder_nonce' ] ) || ! wp_verify_nonce( $_POST['fz_resume_builder_nonce'], 'fz_resume_builder_meta' ) ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	if ( empty( $_POST['fz_resume'] ) ) {
		delete_post_meta( $post_id, 'fz_resume_meta' );
	} else {
		update_post_meta( $post_id, 'fz_resume_meta', $_POST['fz_resume'] );
	}
}

add_action( 'save_post', __NAMESPACE__ . '\save_resume_meta' );
