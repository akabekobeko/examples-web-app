var gulp = require( 'gulp' );

/**
 * JavaScript の依存関係を解決し、単一ファイルにコンパイルします。
 * このタスクは開発用で、JavaScript は Minify されません。
 * Minify するとデバッガで Source Maps を展開したとき、変数名を復元できず不便なので開発時はそのまま結合します。
 *
 * @return {Object} gulp ストリーム。
 */
gulp.task( 'js', function() {
    return compile( false );
} );

/**
 * JavaScript の依存関係を解決し、単一ファイルにコンパイルします。
 * このタスクはリリース用で、JavaScript は Minify されます。
 *
 * @return {Object} gulp ストリーム。
 */
gulp.task( 'js-release', function() {
    return compile( true );
} );

/**
 * JavaScript の変更を監視して差分コンパイルします。
 *
 * @return {Object} gulp ストリーム。
 */
gulp.task( 'watchify', function() {
    return compile( false, true );
} );

/**
 * JavaScript の依存関係を解決し、単一ファイルにコンパイルします。
 *
 * @param {Boolean} isMinify 圧縮を有効にする場合は true。
 * @param {Boolean} isWatch  差分監視モードで実行する場合は true。
 *
 * @return {Object} gulp ストリーム。
 */
function compile( isUglify, isWatch ) {
    var $          = require( 'gulp-load-plugins' )();
    var config     = require( '../config.js' ).js;
    var errorUtil  = require( '../util/error' );
    var browserify = require( 'browserify' );
    var source     = require( 'vinyl-source-stream' );
    var buffer     = require( 'vinyl-buffer' );
    var watchify   = require( 'watchify' );

    var bundler = null;
    if( isWatch ) {
        var option = config.browserify;
        option.cache        = {};
        option.packageCache = {};
        option.fullPaths    = true;

        bundler = watchify( browserify( config.src, option ) );

    } else {
        bundler = browserify( config.src, config.browserify );
    }

    function bundle() {
        return bundler
            .bundle()
            .on( 'error', errorUtil )
            .pipe( source( config.bundle ) )
            .pipe( $.duration( 'compiled "' + config.bundle + '"' ) )
            .pipe( buffer() )
            .pipe( $.sourcemaps.init( { loadMaps: true } ) )
            .pipe( $.if( isUglify, $.uglify() ) )
            .pipe( $.sourcemaps.write( '.' ) )
            .pipe( gulp.dest( config.dest ) );
    }

    bundler.on( 'update', bundle );

    return bundle();
}