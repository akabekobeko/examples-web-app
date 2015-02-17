var gulp = require( 'gulp' );

/**
 * プロジェクト フォルダをルートにして HTTP サーバーを起動します。
 */
gulp.task( 'connect', function () {
    var app         = require( 'connect' )();
    var serveStatic = require( 'serve-static' );

    app.use( serveStatic( __dirname ) );
    app.listen( 8080 );
} );