
module.exports = function( message ) {
    var $ = require( 'jquery' );

    return $( '<div>' )
        .addClass( 'button' )
        .text( 'Test' )
        .on( 'click', function() {
            alert( message );
        } );
};