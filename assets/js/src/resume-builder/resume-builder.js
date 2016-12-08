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

/**
 * Registers field types to use in the Resume Builder.
 *
 * @summary Registers field types to use in the Resume Builder.
 *
 * @since 0.1.0
 * @access public
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

export default {
	register_field_types
};
