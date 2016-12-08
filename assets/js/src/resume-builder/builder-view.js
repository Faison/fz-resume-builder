/**
 * The Builder View and Builder View Functions used in the Resume Builder.
 * Handles the Backbone View for The Builder Meta Box as well as the buttons
 * used to add fields into the builder.
 *
 * @summary The Builder View and Builder View Functions used in the Resume Builder.
 *
 * @since 0.1.0
 */

import field_view from './field-view';

/**
 * A collection of Field Type Button Labels, indexed by the unique field type name.
 *
 * @summary A collection of Field Type Button Labels.
 *
 * @since 0.1.0
 * @access private
 *
 * @type {Object}
 */
let field_type_button_labels = {};

/**
 * Registers a field type template with the Field View.
 *
 * @summary Registers a field type template with the Field View.
 *
 * @since 0.1.0
 * @access public
 *
 * @param {string} field_type  - A unique name for the field type.
 * @param {Object} field_label - The label to use for a Field Type's button.
 *
 * @return {boolean} true if successful, false if not.
 */
function register_field_type_button( field_type, field_label ) {
	if ( ! field_type || typeof field_type_button_labels[ field_type ] !== 'undefined' ) {
		return false;
	}

	if ( typeof field_label !== 'string' ) {
		return false;
	}

	field_label = field_label.trim();

	if ( ! field_label ) {
		return false;
	}

	field_type_button_labels[ field_type ] = field_label;

	return true;
}

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

let Builder_View = Backbone.View.extend( {
	tagName: 'div',
	template: '',
	events: {
		'click .add-button': 'add_field',
		'click .fz-resume-remove': 'remove_field'
	},
	initialize: function() {
		let template_el = document.getElementById( 'fz-resume-template-meta-box' );
		this.template = Handlebars.compile( template_el.innerHTML );

		let meta_box_area = window.jQuery( document.getElementById( 'postbox-container-2' ) );

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

export default {
	register_field_type_button, Builder_View
};
