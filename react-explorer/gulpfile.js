var gulp = require( 'gulp' );
var $    = require( 'gulp-load-plugins' )();

/**
 * JavaScript をコンパイルして開発用イメージを scr フォルダに生成します。
 *
 * @return {Object} gulp ストリーム。
 */
gulp.task( 'js', function() {
    var browserify = require( 'browserify' );
    var source     = require( 'vinyl-source-stream' );
    var buffer     = require( 'vinyl-buffer' );
 
    return browserify(
            './src/js/main.js',
            {
                debug: true,
                transform: [ 'reactify', 'debowerify' ]
            }
        )
        .bundle()
        .pipe( source( 'app.js' ) )
        .pipe( buffer() )
        .pipe( $.sourcemaps.init( { loadMaps: true } ) )
        .pipe( $.uglify() )
        .pipe( $.sourcemaps.write( './' ) )
        .pipe( gulp.dest( './src/js' ) );
} );

/**
 * Stylus ファイルをコンパイルして CSS を生成します。
 *
 * @return {Object} ストリーム。
 */
gulp.task( 'css', function() {
    return gulp.src( 'src/css/*.styl' )
        .pipe( $.sourcemaps.init() )
        .pipe( $.stylus( { compress: true } ) )
        .pipe( $.sourcemaps.write( '.' ) )
        .pipe( gulp.dest( 'src/css' ) );
} );

/**
 * 開発用イメージのビルドをまとめて実行します。
 */
gulp.task( 'build', [ 'js', 'css' ] );

/**
 * リリース用イメージを削除します。
 *
 * @param {Function} cb コールバック関数。
 */
gulp.task( 'clean', function( cb ) {
    var del = require( 'del' );
    del( [ './dist' ], cb );
} );

/**
 * リリース用イメージに必要なファイルをコピーします。
 */
gulp.task( 'copy', [ 'build', 'clean' ], function() {
    return gulp.src(
            [ 'src/fonts/**', 'src/js/app.js' ],
            { base: 'src' }
        )
        .pipe( gulp.dest( 'dist' ) );
} );

/**
 * ブロジェクトのリリース用イメージを dist フォルダに生成します。
 */
gulp.task( 'release', [ 'copy' ], function() {
    var assets = $.useref.assets();
    gulp.src( './src/*.html' )
        .pipe( assets )
        .pipe( $.if( '*.css', $.minifyCss() ) )
        .pipe( assets.restore() )
        .pipe( $.useref() )
        .pipe( gulp.dest( './dist' ) );
} );
 
/**
 * 開発用リソースの変更を監視して、必要ならビルドを実行します。
 */
gulp.task( 'watch', [ 'js', 'css' ], function () {
    gulp.watch( [ './src/js/*.js',    '!./src/js/app.js' ], [ 'js'  ]);
    gulp.watch( [ './src/css/*.styl', '!./src/css/*.css' ], [ 'css' ]);
} );
 
/**
 * プロジェクト フォルダをルートにして HTTP サーバーを起動します。
 */
gulp.task( 'server', [ 'watch' ], function () {
    var connect     = require( 'connect' );
    var serveStatic = require( 'serve-static' );
 
    var app = connect();
    app.use( serveStatic( __dirname ) );
    app.listen( 8080 );
} );
 
/**
 * gulp の既定タスクです。
 */
gulp.task( 'default', [ 'watch' ] );
