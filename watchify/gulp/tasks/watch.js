var gulp   = require( 'gulp' );
var config = require( '../config' ).watch;

/**
 * 開発用リソースの変更を監視して、必要ならビルドを実行します。
 */
gulp.task( 'watch', config.depends, function () {
    gulp.watch( config.css.src, config.css.task );
} );
