/**
 *
 *
 */

import resume_builder from './resume-builder/resume-builder';
import field_view from './resume-builder/field-view';
import builder_view from './resume-builder/builder-view';

let $ = window.jQuery;

let field_types = {
	'section-title': {
		'label': 'Section Title',
		'template_id': 'fz-resume-template-meta-field-section-title'
	},
	'subsection-title': {
		'label': 'Subsection Title',
		'template_id': 'fz-resume-template-meta-field-subsection-title'
	}
};

let data = [
	{
		field: 'section-title',
		value: 'Experience'
	},
	{
		field: 'section-title',
		value: 'Shazam!'
	}
];

$( document ).ready( function() {
	resume_builder.init( field_types, data );
} );
