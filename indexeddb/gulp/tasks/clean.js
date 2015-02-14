var gulp = require( 'gulp' );

/**
 * リリース用イメージを削除します。
 *
 * @param {Function} cb コールバック関数。
 */
gulp.task( 'clean', function( cb ) {
    var del    = require( 'del' );
    var config = require( '../config' );

    del( [ config.dist ], cb );
} );
