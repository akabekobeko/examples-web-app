
var gulp = require( 'gulp' );

/**
 * リリース用イメージを削除します。
 *
 * @param {Function} cb コールバック関数。
 */
gulp.task( 'clean', function( cb ) {
    var del = require( 'del' );
    del( [ './dist' ] );
    cb();
} );

/**
 * プロジェクトをビルドして開発用イメージを scr フォルダに生成します。
 */
gulp.task( 'build', function() {
    var browserify = require( 'browserify' );
    var source     = require( 'vinyl-source-stream' );
    var buffer     = require( 'vinyl-buffer' );
    var sourcemaps = require( 'gulp-sourcemaps' );
    var uglify     = require( 'gulp-uglify' );

    return browserify( './src/js/main.js', { debug: true } )
        .bundle()
        .pipe( source( 'app.js' ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( uglify() )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( './src/js' ) );
} );

/**
 * ブロジェクトのリリース用イメージを dist フォルダに生成します。
 */
gulp.task( 'release', [ 'clean', 'build' ], function() {
    var minifyCSS = require( 'gulp-minify-css' );
    var usemin    = require( 'gulp-usemin' );

    gulp.src( './src/img/**'    ).pipe( gulp.dest( './dist/img'  ) );
    gulp.src( './src/js/app.js' ).pipe( gulp.dest( './dist/js'  ) );

    gulp.src( './src/*.html' )
        .pipe( usemin( {
            css: [ minifyCSS() ]
        } ) )
        .pipe( gulp.dest( './dist' ) );
} );

/**
 * 開発用リソースの変更を監視して、必要ならビルドを実行します。
 */
gulp.task( 'watch', [ 'build' ], function () {
    gulp.watch( [ './src/js/*.js', '!./src/js/app.js' ], [ 'build' ]);
} );

/**
 * 開発用フォルダをルートにして HTTP サーバーを起動します。
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
gulp.task( 'default', [ 'build' ] );
