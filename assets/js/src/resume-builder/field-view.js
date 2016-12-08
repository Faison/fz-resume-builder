/**
 * The Field View and Field View Functions used in the Resume Builder.
 * Handles the Backbone View for Fields as well as all the Field Type Templates.
 *
 * @summary The Field View and Field View Functions used in the Resume Builder.
 *
 * @since 0.1.0
 */

/**
 * A collection of Field Type Templates, indexed by the unique field type name.
 *
 * @summary A collection of Field Type Templates.
 *
 * @since 0.1.0
 * @access private
 *
 * @type {Object}
 */
let field_templates = {};

/**
 * Registers a field type template with the Field View.
 *
 * @summary Registers a field type template with the Field View.
 *
 * @since 0.1.0
 * @access public
 *
 * @param {string} field_type  - A unique name for the field type.
 * @param {Object} template_id - The DOM Id for the field type's template.
 *
 * @return {boolean} true if successful, false if not.
 */
function register_field_type_template( field_type, template_id ) {
	if ( ! field_type || typeof field_templates[ field_type ] !== 'undefined' ) {
		return false;
	}

	if ( typeof template_id !== 'string' ) {
		return false;
	}

	let template_el = document.getElementById( template_id );

	if ( ! template_el ) {
		return false;
	}

	field_templates[ field_type ] = window.Handlebars.compile( template_el.innerHTML );

	return true;
}

export default {
	register_field_type_template
};
