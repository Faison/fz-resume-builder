/**
 *
 *
 */

let $ = window.jQuery;
let Handlebars = window.Handlebars;

let data = [
	{
		field: 'section-title',
		value: 'Experience'
	},
	{
		field: 'section-title',
		value: 'Shazam!'
	}
];

let meta_box_area = $( document.getElementById( 'postbox-container-2' ) );
let meta_box = null;
let meta_box_template = $( document.getElementById( 'fz-resume-template-meta-box' ) );
let list_template = $( document.getElementById( 'fz-resume-template-list' ) );

let meta_field_wrap_template = $( document.getElementById( 'fz-resume-template-meta-field-wrap' ) );
let meta_field_section_title_template = $( document.getElementById( 'fz-resume-template-meta-field-section-title' ) );

let Field = Backbone.Model.extend( {
	defaults: function() {
		return {
			field: '',
			value: ''
		};
	}
} );

let Field_Collection = Backbone.Collection.extend( {
	model: Field
} );

let FieldView = Backbone.View.extend( {
	tagName: 'li',
	wrap_template: Handlebars.compile( meta_field_wrap_template.html() ),
	template: Handlebars.compile( meta_field_section_title_template.html() ),
	fetch: function() {
		return [];
	},
	render: function() {
		this.$el.html( this.wrap_template() );

		this.$el.find( '.meta-field-inside').append( this.template( this.model.toJSON() ) );

		return this;
	}
} );

let MetaView = Backbone.View.extend( {
	tagName: 'div',
	template: Handlebars.compile( meta_box_template.html() ),
	events: {
		'click .add-button': 'add_field',
		'click .fz-resume-remove': 'remove_field'
	},
	initialize: function() {
		meta_box_area.prepend( this.$el );

		this.field_collection = new Field_Collection( data );

		this.listenTo( this.field_collection, 'add', this.render_fields );

		this.render();
		this.field_collection.each( this.render_fields, this );
	},
	render: function() {
		this.$el.html( this.template() );
	},
	render_fields: function( field ) {
		let view = new FieldView( { model: field } );
		this.$('.meta-fields').append( view.render().el );
	},
	add_field: function( e ) {
		let field_type = e.target.getAttribute( 'data-field-type' );

		this.field_collection.add( { field_type: field_type } );
	},
	remove_field: function( e ) {
		e.target.parentElement.remove();
	}

} );

$( document ).ready( function() {
	var meta_view = new MetaView();

	window.mv = meta_view;
} );
