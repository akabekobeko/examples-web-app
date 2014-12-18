
$ = require( 'jquery' );

$( '.l-content' )
    .append( $( '<div>' )
        .text( 'This page is ' + document.title )
    )
    .append( $( '<div>' )
        .addClass( 'button' )
        .text( 'Test' )
        .on( 'click', function() {
            alert( 'test' );
        } )
    );
