/**
 * The Builder View and Builder View Functions used in the Resume Builder.
 * Handles the Backbone View for The Builder Meta Box as well as the buttons
 * used to add fields into the builder.
 *
 * @summary The Builder View and Builder View Functions used in the Resume Builder.
 *
 * @since 0.1.0
 */

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

export default {
	register_field_type_button
};
