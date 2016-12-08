/**
 * The Field Model and Collection used in the Resume Builder.
 * Handles the Backbone Model and Backbone Collection for Fields.
 *
 * @summary The Field Model and Collection used in the Resume Builder.
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

/**
 * The Backbone Collection for Fields.
 *
 * @summary The Backbone Collection for Fields.
 *
 * @since 0.1.0
 * @access public
 *
 * @type {Backbone.Collection}
 */
let Field_Collection = Backbone.Collection.extend( {
	model: Field_Model
} );

export default {
	Field_Model, Field_Collection
};
