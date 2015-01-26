var gulp = require( 'gulp' );
var $    = require( 'gulp-load-plugins' )();

/**
 * SVG からアイコンフォントを生成します。
 *
 * @return {Object} ストリーム。
 */
gulp.task( 'font', function() {
    var fontName = 'icon';

    return gulp.src( 'src/icons/*.svg' )
        .pipe( $.iconfont( { fontName: fontName } ) )
            .on( 'codepoints', function( codepoints ) {
                var options = {
                    className: fontName,
                    fontName:  fontName,
                    fontPath:  '../fonts/',
                    glyphs: codepoints
                };

                // CSS
                gulp.src( 'src/icons/template.css' )
                    .pipe( $.consolidate( 'lodash', options ) )
                    .pipe( $.rename( { basename: fontName } ) )
                    .pipe( gulp.dest( 'src/css' ) );

                // フォント一覧 HTML
                gulp.src( 'src/icons/template.html' )
                    .pipe( $.consolidate( 'lodash', options ) )
                    .pipe( $.rename( { basename: 'icon-sample' }))
                    .pipe( gulp.dest( 'src' ) );
            } )
        .pipe( gulp.dest( 'src/fonts' ) );
} );