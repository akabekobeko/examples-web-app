var gulp = require( 'gulp' );

/**
 * JavaScript をコンパイルして開発用イメージを scr フォルダに生成します。
 *
 * @return {Object} gulp ストリーム。
 */
gulp.task( 'js', function() {
    var $          = require( 'gulp-load-plugins' )();
    var config     = require( '../config.js' ).js;
    var errorUtil  = require( '../util/error' );
    var browserify = require( 'browserify' );
    var source     = require( 'vinyl-source-stream' );
    var buffer     = require( 'vinyl-buffer' );
 
    return browserify( config.src, { debug: config.debug, transform: config.transform } )
        .bundle()
        .on( 'error', errorUtil )
        .pipe( source( config.file ) )
        .pipe( buffer() )
        .pipe( $.sourcemaps.init( { loadMaps: true } ) )
        //.pipe( $.uglify() )
        .pipe( $.sourcemaps.write( './' ) )
        .pipe( gulp.dest( config.dest ) );
} );
