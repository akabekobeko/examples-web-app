var gulp      = require( 'gulp' );
var uglify    = require( 'gulp-uglify' );
var minifyCSS = require( 'gulp-minify-css' );
var usemin    = require( 'gulp-usemin' );
var rimraf    = require( 'rimraf' );

gulp.task( 'clean', function( cb ) {
    rimraf( 'dist', cb );
} );

gulp.task( 'build', [ 'clean' ], function() {
    gulp.src( 'src/img/**'  ).pipe( gulp.dest( 'dist/img'  ) );

    gulp.src( 'src/**/*.html' )
        .pipe( usemin( {
            css: [ minifyCSS() ],
            js:[ uglify() ]
        } ) )
        .pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'watch', function( cb ) {
    gulp.watch( [ 'src/js/*.js', 'src/css/*.css' ], [ 'build' ] );
} );

gulp.task( 'default', [ 'watch' ] );