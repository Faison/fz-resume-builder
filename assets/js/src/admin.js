/**
 *
 *
 */

import resume_builder from './resume-builder/resume-builder';

let $ = window.jQuery;

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
	},
	{
		field: 'list',
		value: {
			items: [
				'test 1',
				'test 2',
				'test 7'
			]
		}
	}
];

$( document ).ready( function() {
	let field_types = window.fz_resume_field_types;
	resume_builder.init( field_types, data );
} );
