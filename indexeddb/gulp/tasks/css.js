var gulp = require( 'gulp' );

/**
 * Stylus ファイルをコンパイルして CSS を生成します。
 *
 * @return {Object} ストリーム。
 */
gulp.task( 'css', function() {
    var $          = require( 'gulp-load-plugins' )();
    var config     = require( '../config.js' ).css;

    return gulp.src( config.src )
        .pipe( $.plumber() )
        .pipe( $.sourcemaps.init() )
        .pipe( $.stylus( { compress: true } ) )
        .pipe( $.sourcemaps.write( '.' ) )
        .pipe( gulp.dest( config.dest ) );
} );
