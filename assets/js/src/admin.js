/**
 *
 *
 */

import resume_builder from './resume-builder/resume-builder';

let $ = window.jQuery;

$( document ).ready( function() {
	let field_types = window.fz_resume_field_types;
	let data = window.fz_resume_field_data;

	resume_builder.init( field_types, data );
} );
