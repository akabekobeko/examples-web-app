var gulp   = require( 'gulp' );
var config = require( '../config' ).copy;

/**
 * リリース用イメージに必要なファイルをコピーします。
 */
gulp.task( 'copy', config.depends, function() {
    return gulp.src( config.src, { base: config.base } )
        .pipe( gulp.dest( config.dest ) );
} );
