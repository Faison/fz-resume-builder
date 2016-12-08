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
 * A collection of Field Type names that were registered as repeater fields.
 *
 * @summary A collection of Field Type names that were registered as repeater fields.
 *
 * @since 0.1.0
 * @access private
 *
 * @type {string[]}
 */
let repeater_fields = [];

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

/**
 * Registers a field type as a Repeater Field with the Field View.
 *
 * @summary Registers a field type as a Repeater Field with the Field View.
 *
 * @since 0.1.0
 * @access public
 *
 * @param {string} field_type - A unique name for the field type.
 */
function register_repeater_field_type( field_type ) {
	if ( ! field_type ) {
		return;
	}

	if ( field_type_is_a_repeater( field_type ) ) {
		return;
	}

	repeater_fields.push( field_type );
}

/**
 * Checks if the specified field type is a Repeater Field.
 *
 * @summary Checks if the specified field type is a Repeater Field.
 *
 * @since 0.1.0
 * @access private
 *
 * @param {string} field_type - A unique name for the field type.
 *
 * @return {boolean} true if it is a repeater, false if not.
 */
function field_type_is_a_repeater( field_type ) {
	if ( ! field_type ) {
		return false;
	}

	return ( -1 !== repeater_fields.indexOf( field_type ) );
}

/**
 * The Backbone View for Fields.
 *
 * @summary The Backbone View for Fields.
 *
 * @since 0.1.0
 * @access public
 *
 * @type {Backbone.View}
 */
let Field_View = window.Backbone.View.extend( {
	tagName: 'li',
	wrap_template: '',
	initialize: field_view_initialize,
	render: field_view_render
} );

/**
 * The initialization function for Field Views, used in the Field_View Backbone View.
 * Makes sure the View has a copy of the field wrap template.
 *
 * @summary The initialization function for Field Views.
 *
 * @since 0.1.0
 * @access private
 */
function field_view_initialize() {
	let wrap_el = document.getElementById( 'fz-resume-template-meta-field-wrap' );
	this.wrap_template = Handlebars.compile( wrap_el.innerHTML );
}

/**
 * The render function for Field Views, used in the Field_View Backbone View.
 * Creates the field wrap and then fills it in with the template for the
 * field type the model is for.
 *
 * @summary The render function for Field Views.
 *
 * @since 0.1.0
 * @access private
 */
function field_view_render() {
	this.$el.html( this.wrap_template() );

	let field_type = this.model.get( 'field' );

	this.$el.find( '.meta-field-inside').append( field_templates[ field_type ]( this.model.toJSON() ) );

	return this;
}

export default {
	register_field_type_template, register_repeater_field_type, Field_View
};
