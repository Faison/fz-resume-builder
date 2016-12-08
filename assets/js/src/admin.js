/**
 *
 *
 */

import resume_builder from './resume-builder/resume-builder';
import field_view from './resume-builder/field-view';

let $ = window.jQuery;
let Handlebars = window.Handlebars;

let field_types = {
	'section-title': {
		'name': 'Section Title',
		'template_id': 'fz-resume-template-meta-field-section-title'
	},
	'subsection-title': {
		'name': 'Subsection Title',
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

let meta_box_area = $( document.getElementById( 'postbox-container-2' ) );
let meta_box = null;
let meta_box_template = $( document.getElementById( 'fz-resume-template-meta-box' ) );
let list_template = $( document.getElementById( 'fz-resume-template-list' ) );

let Field = Backbone.Model.extend( {
	defaults: function() {
		return {
			field: '',
			value: ''
		};
	}
} );

let Field_Collection = Backbone.Collection.extend( {
	model: Field
} );

let MetaView = Backbone.View.extend( {
	tagName: 'div',
	template: Handlebars.compile( meta_box_template.html() ),
	events: {
		'click .add-button': 'add_field',
		'click .fz-resume-remove': 'remove_field'
	},
	initialize: function() {
		meta_box_area.prepend( this.$el );

		this.field_collection = new Field_Collection( data );

		this.listenTo( this.field_collection, 'add', this.render_fields );

		this.render();
		this.field_collection.each( this.render_fields, this );
	},
	render: function() {
		this.$el.html( this.template() );
	},
	render_fields: function( field ) {
		let view = new field_view.Field_View( { model: field } );
		this.$('.meta-fields').append( view.render().el );
	},
	add_field: function( e ) {
		let field_type = e.target.getAttribute( 'data-field-type' );

		this.field_collection.add( { field: field_type } );
	},
	remove_field: function( e ) {
		e.target.parentElement.remove();
	}

} );

$( document ).ready( function() {
	resume_builder.register_field_types( field_types );

	var meta_view = new MetaView();

	window.mv = meta_view;
} );
