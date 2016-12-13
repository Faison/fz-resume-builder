/**
 * The starting point for the Resume Builder. Handles passing the field types
 * and resume data into the resume builder to initialize it.
 *
 * @summary The starting point for the Resume Builder.
 *
 * @since 0.1.0
 */

import resume_builder from './resume-builder/resume-builder';

window.jQuery( document ).ready( function() {
	let field_types = window.fz_resume_field_types;
	let data = window.fz_resume_field_data;

	resume_builder.init( field_types, data );
} );
