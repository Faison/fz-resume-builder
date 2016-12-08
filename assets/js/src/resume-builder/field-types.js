/**
 * The Functions for Field Types used in the Resume Builder.
 * Acts as the single authority for what Field Types are
 * registered to use in the Resume Builder.
 *
 * @summary The Functions for Field Types used in the Resume Builder.
 *
 * @since 0.1.0
 */

/**
 * A collection of Field Type data, indexed by the unique field type name.
 *
 * @summary A collection of Field Type data.
 *
 * @since 0.1.0
 * @access private
 *
 * @type {Object}
 */
let field_types = {};

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
 * Registers a field type for use with the Resume Builder.
 *
 * @summary Registers a field type.
 *
 * @since 0.1.0
 * @access public
 *
 * @param {string} field_type - A unique name for the field type.
 * @param {Object} options    - Registration options.
 *
 * @return {boolean} true if successful, false if not.
 */
function register_field_type( field_type, options ) {
	if ( typeof field_type !== 'string' || typeof options !== 'object' ) {
		return false;
	}

	// Ensure a valid string for the field type
	field_type = field_type.trim();

	if ( ! field_type || typeof field_types[ field_type ] !== 'undefined' ) {
		return false;
	}

	// Make sure we have a name
	if ( typeof options.name !== 'string' || ! options.name ) {
		return false;
	}

	// Make sure the template ID is valid
	if ( typeof options.template_id !== 'string' ) {
		return false;
	}

	let template_el = document.getElementById( options.template_id );

	if ( ! template_el ) {
		return false;
	}

	let template = window.Handlebars.compile( template_el.innerHTML );

	field_types[ field_type ] = options;
	field_templates[ field_type ] = template;

	return true;
}

export default {
	register_field_type
};
