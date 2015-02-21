var gulp = require( 'gulp' );

/**
 * プロジェクト フォルダをルートにして HTTP サーバーを起動します。
 */
gulp.task( 'connect', function () {
    var app         = require( 'connect' )();
    var serveStatic = require( 'serve-static' );
    var config      = require( '../config.js' ).connect;

    app.use( serveStatic( config.root ) );
    app.listen( config.port );
} );