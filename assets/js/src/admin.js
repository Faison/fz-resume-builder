/**
 *
 *
 */

import resume_builder from './resume-builder/resume-builder';

let $ = window.jQuery;

let field_types = {
	'section-title': {
		'label': 'Section Title',
		'template_id': 'fz-resume-template-meta-field-section-title'
	},
	'subsection-title': {
		'label': 'Subsection Title',
		'template_id': 'fz-resume-template-meta-field-subsection-title'
	},
	'experience': {
		'label': 'Experience',
		'template_id': 'fz-resume-template-meta-field-experience'
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
	},
	{
		field: 'experience',
		value: {
			name: '10up',
			title: 'Senior Web Engineer',
			start: '06-09-2014',
			end: '12-01-2016'
		}
	}
];

$( document ).ready( function() {
	resume_builder.init( field_types, data );
} );
