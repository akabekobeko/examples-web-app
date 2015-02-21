var gulp   = require( 'gulp' );
var config = require( '../config' ).build;

/**
 * 開発用イメージのビルドをまとめて実行します。
 */
gulp.task( 'build', config.depends );