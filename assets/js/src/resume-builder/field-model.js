/**
 * The Field Model used in the Resume Builder.
 * Handles the Backbone Model for Fields.
 *
 * @summary The Field Model used in the Resume Builder.
 *
 * @since 0.1.0
 */

/**
 * The Backbone Model for Fields.
 *
 * @summary The Backbone Model for Fields.
 *
 * @since 0.1.0
 * @access public
 *
 * @type {Backbone.Model}
 */
let Field_Model = Backbone.Model.extend( {
	defaults: function() {
		return {
			field: '',
			value: ''
		};
	}
} );

export default {
	Field_Model
};
