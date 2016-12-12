/**
 * The Controller for the Resume Builder. Handles the registering of
 * field types, the management of field data, and updating of views.
 *
 * @summary The Controller for the Resume Builder.
 *
 * @since 0.1.0
 */

import field_type_manager from './field-type-manager';
import field_model from './field-model';
import builder_view from './builder-view';

/**
 * Initializes the Resume Builder.
 *
 * @summary Initializes the Resume Builder.
 *
 * @since 0.1.0
 * @access public
 *
 * @param {Object}   field_types - Field types to register, indexed by their unique field type name.
 * @param {Object[]} data        - The data to populate the Resume Builder with.
 *
 * @return {boolean} true if successful, false if not.
 */
function init( field_types, data ) {
	let registration_success = register_field_types( field_types );

	if ( ! registration_success ) {
		return false;
	}

	if ( ! Array.isArray( data ) ) {
		return false;
	}

	let builder = new builder_view.Builder_View();

	for ( let i = 0; i < data.length; i++ ) {
		add_field_to_builder( data[ i ], builder );
	}

	builder.on( 'add-field-click', add_field_click_handler );

	return true;
}

/**
 * Registers field types to use in the Resume Builder.
 *
 * @summary Registers field types to use in the Resume Builder.
 *
 * @since 0.1.0
 * @access private
 *
 * @param {Object} field_types - Field types to register, indexed by their unique field type name.
 *
 * @return {boolean} true if successful, false if not.
 */
function register_field_types( field_types ) {
	if ( typeof field_types !== 'object' ) {
		return false;
	}

	let field_type_names = Object.keys( field_types );

	// Must provide some field types
	if ( 0 >= field_type_names.length ) {
		return false;
	}

	let success = field_type_names.every( function( field_type_name ) {
		return field_type_manager.register_field_type( field_type_name, field_types[ field_type_name ] );
	} );

	return success;
}

/**
 * Adds a Field to the provided builder view. This first creates a Field_Model,
 * then adds it to the provided Builder_View
 *
 * @summary Adds a Field to the provided builder view.
 *
 * @since 0.1.0
 * @access private
 *
 * @param {Object}        field_data - The field data to add as a field to the Builder.
 * @param {Backbone.View} builder    - The Builder View the clicked button belongs to.
 */
function add_field_to_builder( field_data, builder ) {
	let field = new field_model.Field_Model( field_data );
	builder.render_fields( field );
}

/**
 * Handles add field button clicks on the resume builder view.
 *
 * @summary Handles add field button clicks on the resume builder view.
 *
 * @since 0.1.0
 * @access private
 *
 * @param {Object}        field_type - The field type of the button clicked.
 * @param {Backbone.View} builder    - The Builder View the clicked button belongs to.
 */
function add_field_click_handler( field_type, builder ) {
	add_field_to_builder( { field: field_type }, builder );
}

export default {
	init
};
