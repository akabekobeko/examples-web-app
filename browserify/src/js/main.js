
var $    = require( 'jquery' );
var test = require( './test.js' );


$( '.l-content' )
    .append( $( '<div>' )
        .text( 'This page is ' + document.title )
    )
    .append( test( 'test' ) );
