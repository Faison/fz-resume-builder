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
import field_model from './field-model';

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

/**
 * The Backbone View for the Builder.
 *
 * @summary The Backbone View for the Builder.
 *
 * @since 0.1.0
 * @access public
 *
 * @type {Backbone.View}
 */
let Builder_View = Backbone.View.extend( {
	tagName: 'div',
	template: '',
	add_button_template: '',
	events: {
		'click .add-button': 'add_field',
		'click .fz-resume-remove': 'remove_field'
	},
	initialize: builder_view_initialize,
	render: builder_view_render,
	render_fields: builder_view_render_fields,
	add_field: builder_view_add_view_handler,
	remove_field: function( e ) {
		e.target.parentElement.remove();
	}
} );

/**
 * The initialization function for Builder Views, used in the Builder_View Backbone View.
 * Makes sure the View has a copy of the builder view template and is attached to the page.
 *
 * @summary The initialization function for Builder Views.
 *
 * @since 0.1.0
 * @access private
 */
function builder_view_initialize() {
	let template_el = document.getElementById( 'fz-resume-template-meta-box' );
	this.template = Handlebars.compile( template_el.innerHTML );

	let button_wrap_el = document.getElementById( 'fz-resume-template-field-button' );
	this.add_button_template = Handlebars.compile( button_wrap_el.innerHTML );

	let meta_box_inside = window.jQuery( '#fz-resume-meta-box .inside' );

	meta_box_inside.prepend( this.$el );

	this.render();

	this.$( '.meta-fields' ).sortable( {
		items: '> li',
		handle: '> .fz-resume-handle'
	} );

	this.$el.delegate( '.fz-resume-date', 'focusin', function() {
		window.jQuery( this).datepicker( {
			dateFormat: 'mm-dd-yy',
			changeMonth: true,
			changeYear: true
		} );
	} );
}

/**
 * The render function for Builder Views, used in the Field_View Backbone View.
 *
 * @summary The render function for Builder Views.
 *
 * @since 0.1.0
 * @access private
 */
function builder_view_render() {
	this.$el.html( this.template() );

	let field_types = Object.keys( field_type_button_labels );

	if ( 0 >= field_types.length ) {
		return;
	}

	let $button_wrap = this.$( '.add-button-wrap' );

	for ( let i = 0; i < field_types.length; i++ ) {
		let field_type = field_types[ i ];
		let button_data = {
			field_type: field_type,
			field_label: field_type_button_labels[ field_type ]
		};

		$button_wrap.append( this.add_button_template( button_data ) );
	}
}

/**
 * Renders fields on a Builder Views, used in the Builder_View Backbone View.
 *
 * @summary Renders fields on a Builder Views.
 *
 * @since 0.1.0
 * @access private
 */
function builder_view_render_fields( field ) {
	let view = new field_view.Field_View( { model: field } );
	this.$('.meta-fields').append( view.render().el );
}

/**
 * Handles an Add Button click on a Builder View, used in the Builder_View Backbone View.
 * Triggers an 'add-field-click' event with the field type selected and the Build_View it belongs to.
 *
 * @summary Handles an Add Button click on a Builder View.
 *
 * @since 0.1.0
 * @access private
 *
 * @param {Object} e - The click event object.
 */
function builder_view_add_view_handler( e ) {
	let field_type = e.target.getAttribute( 'data-field-type' );

	this.trigger( 'add-field-click', field_type, this );
}

export default {
	register_field_type_button, Builder_View
};
