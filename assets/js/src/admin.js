/**
 *
 *
 */

let $ = window.jQuery;
let Handlebars = window.Handlebars;

let data = {
	items : [
		'item 1',
		'item 2',
		'item 40'
	]
};

let meta_box_area = $( document.getElementById( 'postbox-container-2' ) );
let meta_box = null;
let meta_box_template = $( document.getElementById( 'fz-resume-template-meta-box' ) );
let list_template = $( document.getElementById( 'fz-resume-template-list' ) );

$( document ).ready( function() {
	console.log( 'hi' );

	var source   = meta_box_template.html();
	var template = Handlebars.compile( source );

	meta_box = $( template() );

	meta_box_area.prepend( meta_box );

	var temp2 = Handlebars.compile( list_template.html() );
	meta_box.find( '.meta-fields' ).append( temp2( data ) );

} );
