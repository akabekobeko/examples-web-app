var gulp = require( 'gulp' );

/**
 * HTML 内の CSS、JavaScript 参照を調べ、適切なファイルにまとめます。
 */
gulp.task( 'useref', function() {
    var $      = require( 'gulp-load-plugins' )();
    var config = require( '../config' ).useref;
    var assets = $.useref.assets();

    return gulp.src( config.src )
        .pipe( assets )
        .pipe( $.if( '*.css', $.minifyCss() ) )
        .pipe( assets.restore() )
        .pipe( $.useref() )
        .pipe( gulp.dest( config.dest ) );
} );
