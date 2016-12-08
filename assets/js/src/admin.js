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

let Field = Backbone.Model.extend( {
	defaults: function() {
		return {
			field: '',
			value: ''
		};
	}
} );

window.Field_Collection = Backbone.Collection.extend( {
	model: Field
} );

$( document ).ready( function() {
	resume_builder.register_field_types( field_types );

	var meta_view = new builder_view.Builder_View();

	window.mv = meta_view;
} );
