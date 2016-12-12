/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _resumeBuilder = __webpack_require__(1);

	var _resumeBuilder2 = _interopRequireDefault(_resumeBuilder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.jQuery(document).ready(function () {
	  var field_types = window.fz_resume_field_types;
	  var data = window.fz_resume_field_data;

	  _resumeBuilder2.default.init(field_types, data);
	}); /**
	     *
	     *
	     */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * The Controller for the Resume Builder. Handles the registering of
	                                                                                                                                                                                                                                                                               * field types, the management of field data, and updating of views.
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * @summary The Controller for the Resume Builder.
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * @since 0.1.0
	                                                                                                                                                                                                                                                                               */

	var _fieldTypeManager = __webpack_require__(2);

	var _fieldTypeManager2 = _interopRequireDefault(_fieldTypeManager);

	var _fieldModel = __webpack_require__(5);

	var _fieldModel2 = _interopRequireDefault(_fieldModel);

	var _builderView = __webpack_require__(4);

	var _builderView2 = _interopRequireDefault(_builderView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	function init(field_types, data) {
	  var registration_success = register_field_types(field_types);

	  if (!registration_success) {
	    return false;
	  }

	  if (!Array.isArray(data)) {
	    return false;
	  }

	  var builder = new _builderView2.default.Builder_View();

	  for (var i = 0; i < data.length; i++) {
	    add_field_to_builder(data[i], builder);
	  }

	  builder.on('add-field-click', add_field_click_handler);

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
	function register_field_types(field_types) {
	  if ((typeof field_types === 'undefined' ? 'undefined' : _typeof(field_types)) !== 'object') {
	    return false;
	  }

	  var field_type_names = Object.keys(field_types);

	  // Must provide some field types
	  if (0 >= field_type_names.length) {
	    return false;
	  }

	  var success = field_type_names.every(function (field_type_name) {
	    return _fieldTypeManager2.default.register_field_type(field_type_name, field_types[field_type_name]);
	  });

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
	function add_field_to_builder(field_data, builder) {
	  var field = new _fieldModel2.default.Field_Model(field_data);
	  builder.render_fields(field);
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
	function add_field_click_handler(field_type, builder) {
	  add_field_to_builder({ field: field_type }, builder);
	}

	exports.default = {
	  init: init
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * The Field Type Manager for the Resume Builder.
	                                                                                                                                                                                                                                                                               * Acts as the single authority for what Field Types are registered
	                                                                                                                                                                                                                                                                               * and makes sure other components have what they need regarding Field Types.
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * @summary The Field Type Manager for the Resume Builder.
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * @since 0.1.0
	                                                                                                                                                                                                                                                                               */

	var _fieldView = __webpack_require__(3);

	var _fieldView2 = _interopRequireDefault(_fieldView);

	var _builderView = __webpack_require__(4);

	var _builderView2 = _interopRequireDefault(_builderView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	var field_types = {};

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
	function register_field_type(field_type, options) {
		if (typeof field_type !== 'string' || (typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
			return false;
		}

		// Ensure a valid string for the field type
		field_type = field_type.trim();

		if (!field_type || typeof field_types[field_type] !== 'undefined') {
			return false;
		}

		// Make sure we have a name
		if (typeof options.label !== 'string' || !options.label) {
			return false;
		}

		// Make sure the template ID is valid
		if (typeof options.template_id !== 'string') {
			return false;
		}

		var field_view_success = _fieldView2.default.register_field_type_template(field_type, options.template_id);

		if (!field_view_success) {
			return false;
		}

		var builder_view_success = _builderView2.default.register_field_type_button(field_type, options.label);

		if (!builder_view_success) {
			return false;
		}

		if (options.repeater) {
			_fieldView2.default.register_repeater_field_type(field_type);
		}

		field_types[field_type] = options;

		return true;
	}

	exports.default = {
		register_field_type: register_field_type
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	var field_templates = {};

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
	var repeater_fields = [];

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
	function register_field_type_template(field_type, template_id) {
	  if (!field_type || typeof field_templates[field_type] !== 'undefined') {
	    return false;
	  }

	  if (typeof template_id !== 'string') {
	    return false;
	  }

	  var template_el = document.getElementById(template_id);

	  if (!template_el) {
	    return false;
	  }

	  field_templates[field_type] = window.Handlebars.compile(template_el.innerHTML);

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
	function register_repeater_field_type(field_type) {
	  if (!field_type) {
	    return;
	  }

	  if (field_type_is_a_repeater(field_type)) {
	    return;
	  }

	  repeater_fields.push(field_type);
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
	function field_type_is_a_repeater(field_type) {
	  if (!field_type) {
	    return false;
	  }

	  return -1 !== repeater_fields.indexOf(field_type);
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
	var Field_View = window.Backbone.View.extend({
	  tagName: 'li',
	  wrap_template: '',
	  repeater_template: '',
	  repeater_wrap_template: '',
	  events: {
	    'click .add-list-item-button': 'add_repeater_item',
	    'click .fz-resume-list-remove': 'remove_repeater_item'
	  },
	  initialize: field_view_initialize,
	  render: field_view_render,
	  render_repeater_field: field_view_render_repeater_field,
	  render_repeater_item: field_view_render_repeater_item,
	  add_repeater_item: function add_repeater_item(e) {
	    var model_object = this.model.toJSON();
	    this.render_repeater_item(null, model_object.field_number);
	  },
	  remove_repeater_item: function remove_repeater_item(e) {
	    e.target.parentElement.remove();
	  }
	});

	/**
	 * The initialization function for Field Views, used in the Field_View Backbone View.
	 * Makes sure the View has a copy of the field wrap template, repeater template
	 * and repeater item wrap template.
	 *
	 * @summary The initialization function for Field Views.
	 *
	 * @since 0.1.0
	 * @access private
	 */
	function field_view_initialize() {
	  this.next_item_num = 0;

	  var wrap_el = document.getElementById('fz-resume-template-meta-field-wrap');
	  this.wrap_template = Handlebars.compile(wrap_el.innerHTML);

	  var repeater_el = document.getElementById('fz-resume-template-meta-repeater');
	  this.repeater_template = Handlebars.compile(repeater_el.innerHTML);

	  var repeater_wrap_el = document.getElementById('fz-resume-template-meta-repeater-item-wrap');
	  this.repeater_wrap_template = Handlebars.compile(repeater_wrap_el.innerHTML);

	  this.render();

	  var field_type = this.model.get('field');

	  if (field_type_is_a_repeater(field_type)) {
	    this.$el.sortable({
	      items: '.list-items > li',
	      handle: '> .fz-resume-list-handle'
	    });
	  }
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
	  var field_number = this.model.get('field_number');
	  var field_type = this.model.get('field');

	  this.$el.html(this.wrap_template({ field_number: field_number, field_type: field_type }));

	  if (field_type_is_a_repeater(field_type)) {
	    this.render_repeater_field();
	  } else {
	    var field = field_templates[field_type](this.model.toJSON());
	    this.$el.find('.meta-field-inside').append(field);
	  }

	  return this;
	}

	/**
	 * The render function for Repeater Field Types, used in the Field_View Backbone View.
	 * Creates the Repeater wrap and then fills it in with the template for the
	 * field type the model is for.
	 *
	 * @summary The render function for Repeater Field Types.
	 *
	 * @since 0.1.0
	 * @access private
	 */
	function field_view_render_repeater_field() {
	  var field_type = this.model.get('field');

	  if (!field_type_is_a_repeater(field_type)) {
	    return;
	  }

	  var repeater = window.jQuery(this.repeater_template());
	  this.$el.find('.meta-field-inside').append(repeater);

	  var model_object = this.model.toJSON();

	  if (model_object.value && model_object.value.items) {
	    for (var i = 0; i < model_object.value.items.length; i++) {
	      this.render_repeater_item(model_object.value.items[i], model_object.field_number);
	    }
	  }
	}

	/**
	 * The render function for single Repeater Field Item, used in the Field_View Backbone View.
	 *
	 * @summary The render function for single Repeater Field Item.
	 *
	 * @since 0.1.0
	 * @access private
	 *
	 * @param {Object|string} item - The item value to render in the repeater field.
	 */
	function field_view_render_repeater_item(item, field_number) {
	  var field_type = this.model.get('field');
	  var wrap = window.jQuery(this.repeater_wrap_template());
	  var item_field = field_templates[field_type]({
	    value: item,
	    field_number: field_number,
	    item_number: this.next_item_num++
	  });

	  wrap.find('.list-item-inside').append(item_field);

	  this.$el.find('.list-items').append(wrap);
	}

	exports.default = {
	  register_field_type_template: register_field_type_template, register_repeater_field_type: register_repeater_field_type, Field_View: Field_View
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _fieldView = __webpack_require__(3);

	var _fieldView2 = _interopRequireDefault(_fieldView);

	var _fieldModel = __webpack_require__(5);

	var _fieldModel2 = _interopRequireDefault(_fieldModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	/**
	 * The Builder View and Builder View Functions used in the Resume Builder.
	 * Handles the Backbone View for The Builder Meta Box as well as the buttons
	 * used to add fields into the builder.
	 *
	 * @summary The Builder View and Builder View Functions used in the Resume Builder.
	 *
	 * @since 0.1.0
	 */

	var field_type_button_labels = {};

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
	function register_field_type_button(field_type, field_label) {
	  if (!field_type || typeof field_type_button_labels[field_type] !== 'undefined') {
	    return false;
	  }

	  if (typeof field_label !== 'string') {
	    return false;
	  }

	  field_label = field_label.trim();

	  if (!field_label) {
	    return false;
	  }

	  field_type_button_labels[field_type] = field_label;

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
	var Builder_View = Backbone.View.extend({
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
	  remove_field: function remove_field(e) {
	    e.target.parentElement.remove();
	  }
	});

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
	  this.next_field_num = 0;

	  var template_el = document.getElementById('fz-resume-template-meta-box');
	  this.template = Handlebars.compile(template_el.innerHTML);

	  var button_wrap_el = document.getElementById('fz-resume-template-field-button');
	  this.add_button_template = Handlebars.compile(button_wrap_el.innerHTML);

	  var meta_box_inside = window.jQuery('#fz-resume-meta-box .inside');

	  meta_box_inside.prepend(this.$el);

	  this.render();

	  this.$('.meta-fields').sortable({
	    items: '> li',
	    handle: '> .fz-resume-handle'
	  });

	  this.$el.delegate('.fz-resume-date', 'focusin', function () {
	    window.jQuery(this).datepicker({
	      dateFormat: 'mm-dd-yy',
	      changeMonth: true,
	      changeYear: true
	    });
	  });
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
	  this.$el.html(this.template());

	  var field_types = Object.keys(field_type_button_labels);

	  if (0 >= field_types.length) {
	    return;
	  }

	  var $button_wrap = this.$('.add-button-wrap');

	  for (var i = 0; i < field_types.length; i++) {
	    var field_type = field_types[i];
	    var button_data = {
	      field_type: field_type,
	      field_label: field_type_button_labels[field_type]
	    };

	    $button_wrap.append(this.add_button_template(button_data));
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
	function builder_view_render_fields(field) {
	  field.set('field_number', this.next_field_num++);
	  var view = new _fieldView2.default.Field_View({ model: field });
	  this.$('.meta-fields').append(view.render().el);
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
	function builder_view_add_view_handler(e) {
	  var field_type = e.target.getAttribute('data-field-type');

	  this.trigger('add-field-click', field_type, this);
	}

	exports.default = {
	  register_field_type_button: register_field_type_button, Builder_View: Builder_View
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	var Field_Model = Backbone.Model.extend({
	  defaults: function defaults() {
	    return {
	      field: '',
	      value: ''
	    };
	  }
	});

	exports.default = {
	  Field_Model: Field_Model
	};

/***/ }
/******/ ]);